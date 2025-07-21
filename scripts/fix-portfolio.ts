import { execSync, spawn } from 'child_process';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { join } from 'path';
import fg from 'fast-glob';
import { patchThreeStdlib } from './utils/patchThreeStdlib.ts';
import {
  removeThreeImports,
  rewriteFrameTickerImports,
} from './utils/importFixers.ts';
import { patchFrameTickerExport } from './utils/patchFrameTicker.ts';

// 🔧 Patch react-globe.gl + cache vite
function patchReactGlobe() {
  console.log('🛠️  Patching react-globe.gl imports...');
  const filesToPatch = [
    join('node_modules', 'react-globe.gl', 'dist', 'react-globe.gl.mjs'),
    join('node_modules', '.vite', 'deps', 'react-globe_gl.js')
  ];
  for (const filePath of filesToPatch) {
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  ${filePath} not found, skipping.`);
      continue;
    }
    let content = fs.readFileSync(filePath, 'utf8');

    content = removeThreeImports(content);
    content = rewriteFrameTickerImports(content);

    fs.writeFileSync(filePath, content);
    console.log(`✅ Patched ${filePath}`);
  }
}

// 🔧 Patch three-globe (FrameTicker + imports inutiles)
function patchThreeGlobe() {
  console.log('🛠️  Patching three-globe imports...');
  const filePath = join('node_modules', 'three-globe', 'dist', 'three-globe.mjs');
  if (!fs.existsSync(filePath)) {
    console.warn('⚠️  three-globe.mjs not found, skipping.');
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  content = removeThreeImports(content);
  content = rewriteFrameTickerImports(content);

  fs.writeFileSync(filePath, content);
  console.log('✅ Patched three-globe.mjs');
}


// 🧹 Supprime node_modules et package-lock.json
async function removeNodeModules() {
  console.log('🧹 Removing node_modules and package-lock.json...');
  if (fs.existsSync('node_modules')) fs.rmSync('node_modules', { recursive: true, force: true });
  if (fs.existsSync('package-lock.json')) fs.rmSync('package-lock.json', { force: true });
}

// 📦 Réinstalle les packages avec legacy peer deps
function installPackages() {
  console.log('📦 Reinstalling packages with legacy peer deps...');
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
}

// 🔄 Corriger les imports three/examples/jsm → three-stdlib
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
        console.log(`✅ Updated ${file}`);
        count++;
      }
    }
  }
  console.log(`✅ Replaced imports in ${count} file${count === 1 ? '' : 's'}.`);
}

// 🚀 Relance le serveur de développement
function runDev() {
  console.log('🚀 Launching development server...');
  const dev = spawn('npm', ['run', 'dev'], { stdio: 'inherit', shell: true });
  dev.on('exit', (code) => process.exit(code ?? 0));
}

// ▶️ Script principal
async function main() {
  await removeNodeModules();
  installPackages();
  patchThreeStdlib();
  patchReactGlobe();
  patchThreeGlobe();
  patchFrameTickerExport();
  await replaceImports();

  if (process.argv.includes('--start')) {
    runDev();
  } else {
    console.log('ℹ️  Skipping dev server. Pass --start to launch it automatically.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
