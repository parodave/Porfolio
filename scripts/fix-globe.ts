import fs from 'fs/promises';
import path from 'path';
import fg from 'fast-glob';

async function fixFile(file: string) {
  const content = await fs.readFile(file, 'utf8');
  const lines = content.split(/\r?\n/);
  let changed = false;

  // Skip files that might contain JSX in .mjs (causes Vite import-analysis failure)
  if (file.endsWith('.mjs') && content.includes('<') && content.includes('/>')) {
    console.log(`⚠️  Skipped JSX-in-.mjs file: ${file}`);
    return;
  }

  const newLines = lines.flatMap((line) => {
    // Remove imports that use WebGPU
    if (/from ['"]three\/webgpu['"]/.test(line)) {
      changed = true;
      return [];
    }

    if (/from ['"]three\/examples\/jsm\/renderers\/WebGPURenderer(\.js)?['"]/.test(line)) {
      changed = true;
      return [];
    }

    if (line.includes('WebGPURenderer')) {
      changed = true;
      return ['// WebGPURenderer removed for compatibility'];
    }

    return [line];
  });

  if (changed) {
    await fs.writeFile(file, newLines.join('\n'), 'utf8');
    console.log(`✅ Fixed ${path.relative(process.cwd(), file)}`);
  }
}

async function main() {
  try {
    const files = await fg([
      'node_modules/globe.gl/**/*.{js,mjs,ts,tsx}',
      'node_modules/three-globe/**/*.{js,mjs,ts,tsx}',
      'node_modules/three-render-objects/**/*.{js,mjs,ts,tsx}'
    ], { dot: true });

    await Promise.all(files.map(fixFile));
  } catch (err) {
    console.error('❌ Failed to apply globe fix:', err);
    process.exit(1);
  }
}

main();
