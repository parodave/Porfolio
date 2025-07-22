import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// 1. Cible le fichier problématique
const globeFile = path.resolve('node_modules/three-globe/dist/three-globe.mjs');

// 2. Vérifie que le fichier contient le mauvais import
if (!fs.existsSync(globeFile)) {
  console.error('❌ Fichier introuvable :', globeFile);
  process.exit(1);
}

let content = fs.readFileSync(globeFile, 'utf8');

if (!content.includes('frame-ticker')) {
  console.log('✅ Aucun patch nécessaire, frame-ticker absent.');
} else {
  // 3. Remplace proprement l’import cassé
  content = content.replace(
    /import _FrameTicker from ['"]frame-ticker['"];?/,
    `const _FrameTicker = () => ({ request: () => {}, cancel: () => {} });`
  );

  fs.writeFileSync(globeFile, content, 'utf8');
  console.log('✅ Import "frame-ticker" patché dans three-globe.mjs');
}

// 4. Supprime le cache Vite pour éviter les erreurs 500
try {
  fs.rmSync('node_modules/.vite', { recursive: true, force: true });
  console.log('🧹 Cache Vite supprimé.');
} catch (err) {
  console.warn('⚠️ Impossible de supprimer le cache Vite:', err);
}

// 5. Relance le projet
try {
  execSync('npm run dev', { stdio: 'inherit' });
} catch (err) {
  console.error('❌ Erreur lors du redémarrage :', err);
  process.exit(1);
}
