// scripts/fix-three-deps.ts
import { execSync } from "child_process";
import fs, { mkdirSync, existsSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import https from "https";

// Étape 1 : suppression des fichiers bloquants
console.log("🧹 Suppression de node_modules et package-lock.json...");

if (fs.existsSync("node_modules")) {
  fs.rmSync("node_modules", { recursive: true, force: true });
}
if (fs.existsSync("package-lock.json")) {
  fs.rmSync("package-lock.json", { force: true });
}

// Étape 2 : réinstallation des dépendances Three.js
console.log("📦 Réinstallation des packages liés à Three.js...");
const packages = [
  "three@0.154.0",
  "@react-three/fiber@8.18.0",
  "@react-three/drei@9.122.0",
  "@react-three/rapier@1.5.0",
  "react-globe.gl@2.34.0",
  "@types/three@0.162.0"
];

execSync(`npm install ${packages.join(" ")}`, { stdio: "inherit" });

// Étape 3 : téléchargement des fichiers manquants dans three/examples/jsm
console.log("📁 Téléchargement des fichiers JSM manquants...");

const filesToDownload = [
  {
    name: "AdditiveBlendingShader.js",
    url: "https://unpkg.com/three@0.150.1/examples/jsm/shaders/AdditiveBlendingShader.js",
  },
  {
    name: "Nodes.js",
    url: "https://unpkg.com/three@0.150.1/examples/jsm/nodes/Nodes.js",
  },
  {
    name: "WebGPURenderer.js",
    url: "https://unpkg.com/three@0.150.1/examples/jsm/renderers/webgpu/WebGPURenderer.js",
  },
  {
    name: "tsl.js",
    url: "https://unpkg.com/three@0.150.1/examples/jsm/nodes/tsl/tsl.js",
  },
];

const baseDir = "node_modules/three/examples/jsm";

function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          return reject(new Error(`❌ Échec du téléchargement : ${url}`));
        }

        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          mkdirSync(dirname(dest), { recursive: true });
          writeFileSync(dest, data);
          console.log(`✅ Téléchargé : ${dest}`);
          resolve();
        });
      })
      .on("error", (err) => reject(err));
  });
}

async function downloadMissingFiles() {
  for (const file of filesToDownload) {
    const relativePath = file.url.split("/examples/jsm/")[1];
    const destPath = join(baseDir, relativePath);
    if (existsSync(destPath)) {
      console.log(`ℹ️  Déjà présent : ${destPath}`);
      continue;
    }
    try {
      await downloadFile(file.url, destPath);
    } catch (err) {
      console.error(`❌ Erreur pour ${file.name} :`, err);
    }
  }
}

downloadMissingFiles().then(() => {
  console.log("🚀 Tous les fichiers nécessaires ont été restaurés.");
  // Patch three-stdlib exports so these files can be imported
  const stdlibPkgPath = join("node_modules", "three-stdlib", "package.json");
  if (existsSync(stdlibPkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(stdlibPkgPath, "utf8")) as Record<string, any>;
    pkg.exports = {
      ...(pkg.exports || {}),
      "./nodes": "../three/examples/jsm/nodes/Nodes.js",
      "./shaders/AdditiveBlendingShader": "../three/examples/jsm/shaders/AdditiveBlendingShader.js",
      "./renderers/webgpu/WebGPURenderer": "../three/examples/jsm/renderers/webgpu/WebGPURenderer.js",
      "./nodes/tsl/tsl": "../three/examples/jsm/nodes/tsl/tsl.js",
    };
    fs.writeFileSync(stdlibPkgPath, JSON.stringify(pkg, null, 2));
    console.log("🛠️  three-stdlib exports patched.");
  } else {
    console.warn("⚠️  three-stdlib package.json introuvable.");
  }
});
