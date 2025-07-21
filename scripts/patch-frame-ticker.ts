import fs from 'fs'
import path from 'path'

function patchFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  ${filePath} not found, skipping.`)
    return
  }

  let content = fs.readFileSync(filePath, 'utf8')

  // Supprime les imports de modules three inutiles
  const regex = /^import.*from ['"]three\/(?:webgpu|tsl)['"];?\n?/gm
  content = content.replace(regex, '')

  // Corrige l'import de FrameTicker
  content = content.replace(
    /import\s+FrameTicker\s+from\s+['"]frame-ticker['"]/g,
    'import { FrameTicker } from "frame-ticker"',
  )

  fs.writeFileSync(filePath, content)
  console.log(`✅ Patched ${path.relative(process.cwd(), filePath)}`)
}

function patchReactGlobe() {
  console.log('🛠️  Patching react-globe.gl imports...')
  const files = [
    path.resolve('node_modules/react-globe.gl/dist/react-globe.gl.mjs'),
    path.resolve('node_modules/.vite/deps/react-globe_gl.js'),
  ]
  for (const file of files) {
    patchFile(file)
  }
}

function patchThreeGlobe() {
  console.log('🛠️  Patching three-globe imports...')
  const filePath = path.resolve('node_modules/three-globe/dist/three-globe.mjs')
  patchFile(filePath)
}

function fixFrameTickerExport() {
  console.log('🔧 Checking FrameTicker.js export...')
  const filePath = path.resolve('node_modules/frame-ticker/dist/FrameTicker.js')

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
    `.trim()
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, newContent)
    console.log(`✅ Created ${path.relative(process.cwd(), filePath)}`)
    return
  }

  let content = fs.readFileSync(filePath, 'utf8')
  if (/export\s+default\s+FrameTicker/.test(content)) {
    content = content.replace(/export\s+default\s+FrameTicker/, 'export { FrameTicker }')
    fs.writeFileSync(filePath, content)
    console.log(`✅ Replaced default export in ${path.relative(process.cwd(), filePath)}`)
  } else if (!/export\s+\{?\s*FrameTicker\s*\}?/.test(content)) {
    content += `\nexport { FrameTicker };`
    fs.writeFileSync(filePath, content)
    console.log(`✅ Added named export in ${path.relative(process.cwd(), filePath)}`)
  } else {
    console.log(`✅ Export already correct in ${path.relative(process.cwd(), filePath)}`)
  }
}

export function patchFrameTicker() {
  patchReactGlobe()
  patchThreeGlobe()
  fixFrameTickerExport()
}

// Exécution
try {
  patchFrameTicker()
  console.log('✅ FrameTicker patches applied.')
} catch (err) {
  console.error('❌ Failed to patch FrameTicker dependencies:', err)
  process.exit(1)
}

