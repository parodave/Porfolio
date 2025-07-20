import fs from 'fs/promises';
import fg from 'fast-glob';

async function main() {
  const files = await fg('src/**/*.{ts,tsx}', { absolute: true });
  let count = 0;

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8');
    if (content.includes('three/examples/jsm/')) {
      const updated = content.replace(/from ['"]three\/examples\/jsm\//g, "from 'three-stdlib/");
      if (updated !== content) {
        await fs.writeFile(file, updated);
        console.log(`Updated ${file}`);
        count++;
      }
    }
  }

  console.log(`\u2705 Replaced imports in ${count} file${count === 1 ? '' : 's'}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
