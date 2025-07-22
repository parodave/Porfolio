import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const filePath = path.resolve('node_modules/three-globe/dist/three-globe.mjs');

if (!fs.existsSync(filePath)) {
  console.error("❌ Fichier introuvable :", filePath);
  process.exit(1);
}

let code = fs.readFileSync(filePath, 'utf8');

if (code.includes('import _FrameTicker from "frame-ticker"')) {
  code = code.replace(
    /import _FrameTicker from ["']frame-ticker["'];?/,
    'const _FrameTicker = () => ({ request: () => {}, cancel: () => {} });'
  );

  fs.writeFileSync(filePath, code, 'utf8');
  console.log("✅ Import 'frame-ticker' supprimé et remplacé avec succès.");
} else {
  console.log("ℹ️ Aucun import 'frame-ticker' trouvé.");
}

try {
  fs.rmSync('node_modules/.vite', { recursive: true, force: true });
  console.log("🧹 Cache Vite supprimé.");
} catch (err) {
  console.warn("⚠️ Problème lors du nettoyage du cache :", err);
}

try {
  execSync('npm run dev', { stdio: 'inherit' });
} catch (err) {
  console.error("❌ Erreur lors du redémarrage :", err);
}
