// scripts/fix-three-globe-imports.ts

import fs from 'fs';
import path from 'path';

const root = process.cwd();
const filePath = path.join(
  root,
  'node_modules/three-globe/dist/three-globe.mjs'
);

if (!fs.existsSync(filePath)) {
  console.error('❌ Fichier introuvable :', filePath);
  process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf-8');

// ❌ Supprime les lignes qui importent "frame-ticker" ou "three/tsl"
const cleaned = content
  .split('\n')
  .filter(
    (line) =>
      !line.includes('frame-ticker') &&
      !line.includes("from 'three/tsl'")
  )
  .join('\n');

fs.writeFileSync(filePath, cleaned, 'utf-8');
console.log('✅ Imports supprimés de three-globe.mjs');

