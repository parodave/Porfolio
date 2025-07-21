import fs from 'fs'
import path from 'path'
import { removeThreeImports, rewriteFrameTickerImports } from './utils/importFixers.ts'
import { patchFrameTickerExport } from './utils/patchFrameTicker.ts'

// 🔧 Fonction de patch générique
function patchFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  ${filePath} not found, skipping.`)
    return
  }

  let content = fs.readFileSync(filePath, 'utf8')

  // Appliquer les fixers factorisés
  content = removeThreeImports(content)
  content = rewriteFrameTickerImports(content)

  fs.writeFileSync(filePath, content)
  console.log(`✅ Patched ${path.relative(process.cwd(), filePath)}`)
}

// 🔧 Patch react-globe.gl + cache Vite
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

// 🔧 Patch three-globe
function patchThreeGlobe() {
  console.log('🛠️  Patching three-globe imports...')
  const filePath = path.resolve('node_modules/three-globe/dist/three-globe.mjs')
  patchFile(filePath)
}

// ▶️ Script principal
try {
  patchReactGlobe()
  patchThreeGlobe()
  patchFrameTickerExport()
  console.log('✅ All patch operations completed successfully.')
} catch (err) {
  console.error('❌ Failed to patch FrameTicker dependencies:', err)
  process.exit(1)
}
