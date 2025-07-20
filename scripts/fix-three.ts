import { execSync } from 'child_process';
import fs, { existsSync, mkdirSync, writeFileSync } from 'fs';
import fsPromises from 'fs/promises';
import { dirname, join } from 'path';
import https from 'https';
import fg from 'fast-glob';

// Step 1: remove existing install artifacts
console.log('🧹 Removing node_modules and package-lock.json...');
if (existsSync('node_modules')) fs.rmSync('node_modules', { recursive: true, force: true });
if (existsSync('package-lock.json')) fs.rmSync('package-lock.json', { force: true });

// Step 2: reinstall compatible Three.js related packages
console.log('📦 Installing compatible Three.js packages...');
const packages = [
  'three@0.154.0',
  '@react-three/fiber@8.18.0',
  '@react-three/drei@9.122.0',
  '@react-three/rapier@1.5.0',
  'react-globe.gl@2.34.0',
  '@types/three@0.162.0'
];
execSync(`npm install ${packages.join(' ')}`, { stdio: 'inherit' });

// Step 3: download missing files under three/examples/jsm
console.log('📁 Downloading missing JSM files...');
const filesToDownload = [
  {
    name: 'AdditiveBlendingShader.js',
    url: 'https://unpkg.com/three@0.150.1/examples/jsm/shaders/AdditiveBlendingShader.js',
  },
  {
    name: 'Nodes.js',
    url: 'https://unpkg.com/three@0.150.1/examples/jsm/nodes/Nodes.js',
  },
  {
    name: 'WebGPURenderer.js',
    url: 'https://unpkg.com/three@0.150.1/examples/jsm/renderers/webgpu/WebGPURenderer.js',
  },
  {
    name: 'tsl.js',
    url: 'https://unpkg.com/three@0.150.1/examples/jsm/nodes/tsl/tsl.js',
  },
];

const baseDir = 'node_modules/three/examples/jsm';

function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) return reject(new Error(`Failed to download ${url}`));
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          mkdirSync(dirname(dest), { recursive: true });
          writeFileSync(dest, data);
          console.log(`✅ Downloaded ${dest}`);
          resolve();
        });
      })
      .on('error', (err) => reject(err));
  });
}

async function downloadMissingFiles() {
  for (const file of filesToDownload) {
    const relativePath = file.url.split('/examples/jsm/')[1];
    const destPath = join(baseDir, relativePath);
    if (existsSync(destPath)) {
      console.log(`ℹ️  Already exists: ${destPath}`);
      continue;
    }
    try {
      await downloadFile(file.url, destPath);
    } catch (err) {
      console.error(`❌ Error downloading ${file.name}:`, err);
    }
  }
}

async function patchStdlib() {
  const stdlibPkgPath = join('node_modules', 'three-stdlib', 'package.json');
  if (existsSync(stdlibPkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(stdlibPkgPath, 'utf8')) as Record<string, unknown>;
    pkg.exports = {
      ...(pkg.exports || {}),
      './nodes': '../three/examples/jsm/nodes/Nodes.js',
      './shaders/AdditiveBlendingShader': '../three/examples/jsm/shaders/AdditiveBlendingShader.js',
      './renderers/webgpu/WebGPURenderer': '../three/examples/jsm/renderers/webgpu/WebGPURenderer.js',
      './nodes/tsl/tsl': '../three/examples/jsm/nodes/tsl/tsl.js',
    };
    fs.writeFileSync(stdlibPkgPath, JSON.stringify(pkg, null, 2));
    console.log('🛠️  Patched three-stdlib exports.');
  } else {
    console.warn('⚠️  Could not find three-stdlib package.json.');
  }
}

async function replaceImports() {
  const files = await fg('src/**/*.{ts,tsx}', { absolute: true });
  let count = 0;
  for (const file of files) {
    const content = await fsPromises.readFile(file, 'utf8');
    if (content.includes('three/examples/jsm/')) {
      const updated = content.replace(/from ['"]three\/examples\/jsm\//g, "from 'three-stdlib/");
      if (updated !== content) {
        await fsPromises.writeFile(file, updated);
        console.log(`Updated ${file}`);
        count++;
      }
    }
  }
  console.log(`✅ Replaced imports in ${count} file${count === 1 ? '' : 's'}.`);
}

async function main() {
  await downloadMissingFiles();
  await patchStdlib();
  await replaceImports();
  console.log('🚀 Fix completed.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
