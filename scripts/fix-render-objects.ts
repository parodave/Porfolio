// ✅ Fichier : scripts/fix-render-objects.ts
// Objectif : patcher automatiquement le fichier three-render-objects.mjs pour corriger l'erreur d'analyse Vite

import fs from 'fs'
import path from 'path'

const target = path.join(
  process.cwd(),
  'node_modules/globe.gl/node_modules/three-render-objects/dist/three-render-objects.mjs'
)

if (!fs.existsSync(target)) {
  console.error('❌ Le fichier three-render-objects.mjs est introuvable.')
  process.exit(1)
}

const code = fs.readFileSync(target, 'utf-8')

// Vérifie si le patch a déjà été appliqué
if (code.includes('/* @vite-ignore */')) {
  console.log('✅ Patch déjà appliqué.')
  process.exit(0)
}

// Ajoute le commentaire spécial pour désactiver l’analyse Vite
const patched = '/* @vite-ignore */\n' + code
fs.writeFileSync(target, patched, 'utf-8')
console.log('✅ Patch ajouté avec succès à three-render-objects.mjs')
