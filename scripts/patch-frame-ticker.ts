import fs from 'fs'
import path from 'path'
import { removeThreeImports, rewriteFrameTickerImports } from './utils/importFixers.ts'
import { patchFrameTickerExport } from './utils/patchFrameTicker.ts'

function patchReactGlobeFiles() {
  console.log('🛠️  Patching react-globe.gl imports...')
  const files = [
    path.join('node_modules', 'react-globe.gl', 'dist', 'react-globe.gl.mjs'),
    path.join('node_modules', '.vite', 'deps', 'react-globe_gl.js'),
  ]
  for (const filePath of files) {
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  ${filePath} not found, skipping.`)
      continue
    }
    let content = fs.readFileSync(filePath, 'utf8')
    content = removeThreeImports(content)
    content = rewriteFrameTickerImports(content)
    fs.writeFileSync(filePath, content)
    console.log(`✅ Patched ${filePath}`)
  }
}

function patchThreeGlobe() {
  console.log('🛠️  Patching three-globe imports...')
  const filePath = path.join('node_modules', 'three-globe', 'dist', 'three-globe.mjs')
  if (!fs.existsSync(filePath)) {
    console.warn('⚠️  three-globe.mjs not found, skipping.')
    return
  }
  let content = fs.readFileSync(filePath, 'utf8')
  content = removeThreeImports(content)
  content = rewriteFrameTickerImports(content)
  fs.writeFileSync(filePath, content)
  console.log('✅ Patched three-globe.mjs')
}

try {
  patchReactGlobeFiles()
  patchThreeGlobe()
  patchFrameTickerExport()
} catch (err) {
  console.error('❌ Failed to patch frame-ticker:', err)
  process.exit(1)
}
