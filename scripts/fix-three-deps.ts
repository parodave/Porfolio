import { execSync } from 'child_process';
import fs from 'fs';

/**
 * Cleanup and reinstall Three.js dependencies.
 *
 * Steps:
 * 1. Delete `node_modules` and `package-lock.json`.
 * 2. Reinstall three along with all packages that use it.
 * 3. Print a success message when done.
 */

console.log('🧹 Removing node_modules and lockfile...');
if (fs.existsSync('node_modules')) {
  fs.rmSync('node_modules', { recursive: true, force: true });
}
if (fs.existsSync('package-lock.json')) {
  fs.rmSync('package-lock.json', { force: true });
}

console.log('📦 Installing Three.js related packages...');
const packages = [
  'three@0.154.0',
  '@react-three/fiber@8.18.0',
  '@react-three/drei@9.122.0',
  '@react-three/rapier@1.5.0',
  'react-globe.gl@2.34.0',
  '@types/three@0.162.0'
];
execSync(`npm install ${packages.join(' ')}`, { stdio: 'inherit' });

console.log('✅ Three.js dependencies reinstalled successfully.');
