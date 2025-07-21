import { execSync, spawn } from 'child_process';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { join } from 'path';
import fg from 'fast-glob';

function patchReactGlobe() {
  console.log('🛠️  Patching react-globe.gl imports...');
  const filePath = join(
    'node_modules',
    'react-globe.gl',
    'dist',
    'react-globe.gl.mjs'
  );
  if (!fs.existsSync(filePath)) {
    console.warn('⚠️  react-globe.gl.mjs not found, skipping patch.');
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = /^import.*from ['"]three\/(?:webgpu|tsl)['"];?\n?/gm;
  const updated = content.replace(regex, '');
  if (updated !== content) {
    fs.writeFileSync(filePath, updated);
    console.log('✅ Removed three/webgpu and three/tsl imports from react-globe.gl.');
  } else {
    console.log('ℹ️  No three/webgpu or three/tsl imports found in react-globe.gl.');
  }
}

async function removeNodeModules() {
  console.log('🧹 Removing node_modules and package-lock.json...');
  if (fs.existsSync('node_modules')) fs.rmSync('node_modules', { recursive: true, force: true });
  if (fs.existsSync('package-lock.json')) fs.rmSync('package-lock.json', { force: true });
}

function installPackages() {
  console.log('📦 Reinstalling packages with legacy peer deps...');
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
}

function patchThreeStdlib() {
  console.log('🛠️  Patching three-stdlib exports...');
  const pkgPath = join('node_modules', 'three-stdlib', 'package.json');
  if (!fs.existsSync(pkgPath)) {
    console.warn('⚠️  three-stdlib package.json not found.');
    return;
  }
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8')) as Record<string, unknown>;
  pkg.exports = {
    '.': { import: './index.js', require: './index.js' },
    './*': { import: './*.js', require: './*.js' }
  };
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  console.log('✅ Patched three-stdlib package.json.');
}

async function replaceImports() {
  console.log('🔄 Fixing imports...');
  const files = await fg(['src/**/*.{ts,tsx}'], { absolute: true });
  let count = 0;
  for (const file of files) {
    const content = await fsPromises.readFile(file, 'utf8');
    if (content.includes('three/examples/jsm/')) {
      const updated = content.replace(/(["'])three\/examples\/jsm\//g, '$1three-stdlib/');
      if (updated !== content) {
        await fsPromises.writeFile(file, updated);
        console.log(`Updated ${file}`);
        count++;
      }
    }
  }
  console.log(`✅ Replaced imports in ${count} file${count === 1 ? '' : 's'}.`);
}

function runDev() {
  console.log('🚀 Launching development server...');
  const dev = spawn('npm', ['run', 'dev'], { stdio: 'inherit', shell: true });
  dev.on('exit', (code) => process.exit(code ?? 0));
}

async function main() {
  await removeNodeModules();
  installPackages();
  patchThreeStdlib();
  patchReactGlobe();
  await replaceImports();
  runDev();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

