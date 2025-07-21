import fs from 'fs'
import { join } from 'path'

function patchReactGlobe() {
  console.log('🛠️  Patching react-globe.gl imports...')
  const filesToPatch = [
    join('node_modules', 'react-globe.gl', 'dist', 'react-globe.gl.mjs'),
    join('node_modules', '.vite', 'deps', 'react-globe_gl.js'),
  ]
  for (const filePath of filesToPatch) {
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  ${filePath} not found, skipping.`)
      continue
    }
    let content = fs.readFileSync(filePath, 'utf8')
    const regex = /^import.*from ['"]three\/(?:webgpu|tsl)['"];?\n?/gm
    content = content.replace(regex, '')
    content = content.replace(
      /import\s+FrameTicker\s+from\s+['"]frame-ticker['"]/g,
      'import { FrameTicker } from "frame-ticker"',
    )
    fs.writeFileSync(filePath, content)
    console.log(`✅ Patched ${filePath}`)
  }
}

function patchThreeGlobe() {
  console.log('🛠️  Patching three-globe imports...')
  const filePath = join('node_modules', 'three-globe', 'dist', 'three-globe.mjs')
  if (!fs.existsSync(filePath)) {
    console.warn('⚠️  three-globe.mjs not found, skipping.')
    return
  }
  let content = fs.readFileSync(filePath, 'utf8')
  const regex = /^import.*from ['"]three\/(?:webgpu|tsl)['"];?\n?/gm
  content = content.replace(regex, '')
  content = content.replace(
    /import\s+FrameTicker\s+from\s+['"]frame-ticker['"]/g,
    'import { FrameTicker } from "frame-ticker"',
  )
  fs.writeFileSync(filePath, content)
  console.log('✅ Patched three-globe.mjs')
}

function fixFrameTickerExport() {
  console.log('🔧 Checking FrameTicker.js export...')
  const filePath = join('node_modules', 'frame-ticker', 'dist', 'FrameTicker.js')
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  ${filePath} not found, creating it manually...`)
    const newContent = `
export class FrameTicker {
  constructor(callback) {
    this.callback = callback
    this.running = false
    this.rafId = null
  }
  start() {
    if (this.running) return
    this.running = true
    const loop = () => {
      this.callback()
      this.rafId = requestAnimationFrame(loop)
    }
    loop()
  }
  stop() {
    if (!this.running) return
    this.running = false
    cancelAnimationFrame(this.rafId)
    this.rafId = null
  }
}
    `
    fs.mkdirSync(join('node_modules', 'frame-ticker', 'dist'), { recursive: true })
    fs.writeFileSync(filePath, newContent.trim())
    console.log(`✅ Created ${filePath}`)
    return
  }
  let content = fs.readFileSync(filePath, 'utf8')
  if (/export\s+default\s+FrameTicker/.test(content)) {
    content = content.replace(/export\s+default\s+FrameTicker/, 'export { FrameTicker }')
    fs.writeFileSync(filePath, content)
    console.log(`✅ Replaced default export in ${filePath}`)
  } else if (!/export\s+\{?\s*FrameTicker\s*\}?/.test(content)) {
    content += `\nexport { FrameTicker };`
    fs.writeFileSync(filePath, content)
    console.log(`✅ Added named export in ${filePath}`)
  } else {
    console.log(`✅ Export already correct in ${filePath}`)
  }
}

function main() {
  patchReactGlobe()
  patchThreeGlobe()
  fixFrameTickerExport()
}

main()
