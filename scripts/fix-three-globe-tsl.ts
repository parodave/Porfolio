import fs from 'fs/promises'
import path from 'path'
import fg from 'fast-glob'

async function fixTsl() {
  const patterns = [
    'node_modules/three-globe/**/*.{js,mjs,ts,tsx}',
    'node_modules/globe.gl/**/*.{js,mjs,ts,tsx}',
  ]
  const files = await fg(patterns, { dot: true })
  for (const file of files) {
    const original = await fs.readFile(file, 'utf8')
    let updated = original.replace(
      /^import\s+\*\s+as\s+tsl\s+from\s+['"]three\/tsl['"];?\r?\n?/gm,
      '',
    )
    updated = updated.replace(/tsl\.[a-zA-Z_$][\w$]*\([^)]*\)/g, '() => {}')
    if (updated !== original) {
      await fs.writeFile(file, updated)
      console.log(`✅ Fixed TSL in ${path.relative(process.cwd(), file)}`)
    }
  }
}

fixTsl().catch((err) => {
  console.error('❌ Failed to fix TSL imports:', err)
  process.exit(1)
})
