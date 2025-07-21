// scripts/fix-portfolio.ts

import { execSync, spawn } from 'child_process';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { join } from 'path';
import fg from 'fast-glob';

// 🔧 Patch react-globe.gl + son cache vite
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

    // Supprimer les imports webgpu/tsl
    const regex = /^import.*from ['"]three\/(?:webgpu|tsl)['"];?\n?/gm;
    content = content.replace(regex, '');

    // Corriger l'import de frame-ticker
    content = content.replace(
      /import\s+FrameTicker\s+from\s+['"]frame-ticker['"]/g,
      'import { FrameTicker } from "frame-ticker"'
    );

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

  // Supprimer les imports webgpu/tsl
  const regex = /^import.*from ['"]three\/(?:webgpu|tsl)['"];?\n?/gm;
  content = content.replace(regex, '');

  // Corriger l'import de frame-ticker
  content = content.replace(
    /import\s+FrameTicker\s+from\s+['"]frame-ticker['"]/g,
    'import { FrameTicker } from "frame-ticker"'
  );

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

// 🔧 Patch exports dans three-stdlib
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

// 🔄 Remplace tous les imports vers three/examples/jsm → three-stdlib
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

// ▶️ Exécution principale
async function main() {
  await removeNodeModules();
  installPackages();
  patchThreeStdlib();
  patchReactGlobe();
  patchThreeGlobe();
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
