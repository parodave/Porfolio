import fs from 'fs/promises'
import path from 'path'
import fg from 'fast-glob'

async function main() {
  const pattern = 'node_modules/three-globe/**/*.mjs'
  const files = await fg(pattern, { dot: true })
  for (const file of files) {
    const content = await fs.readFile(file, 'utf8')
    const lines = content.split(/\r?\n/)
    const filtered = lines.filter(
      (line) => !/from ['"]three\/tsl['"]/.test(line),
    )
    if (filtered.length !== lines.length) {
      await fs.writeFile(file, filtered.join('\n'))
      console.log(`✅ Fixed ${path.relative(process.cwd(), file)}`)
    }
  }
}

main().catch((err) => {
  console.error('❌ Failed to remove three/tsl imports:', err)
  process.exit(1)
})
