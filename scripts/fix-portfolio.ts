import { execSync, spawn } from 'child_process';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { join } from 'path';
import fg from 'fast-glob';

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
  await replaceImports();
  runDev();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

