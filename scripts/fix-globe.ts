import fs from 'fs/promises';
import path from 'path';
import fg from 'fast-glob';

async function fixFile(file: string) {
  const content = await fs.readFile(file, 'utf8');
  const lines = content.split(/\r?\n/);
  let changed = false;

  const newLines = lines.flatMap((line) => {
    if (/from ['"]three\/webgpu['"]/.test(line)) {
      changed = true;
      return [];
    }
    if (
      /from ['"]three\/examples\/jsm\/renderers\/WebGPURenderer.js['"]/.test(line)
    ) {
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
    await fs.writeFile(file, newLines.join('\n'));
    console.log(`✅ Fixed ${path.relative(process.cwd(), file)}`);
  }
}

async function main() {
  const files = await fg(
    [
      'node_modules/globe.gl/**/*.{ts,tsx}',
      'node_modules/three-globe/**/*.{ts,tsx}',
    ],
    { dot: true }
  );

  await Promise.all(files.map((f) => fixFile(f)));
}

main().catch((err) => {
  console.error('❌ Failed to apply globe fix:', err);
  process.exit(1);
});
