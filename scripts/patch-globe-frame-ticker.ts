import fs from 'fs'
import path from 'path'
import { removeThreeImports, rewriteFrameTickerImports } from './utils/importFixers.ts'

function patchFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  ${filePath} not found, skipping.`)
    return
  }
  let content = fs.readFileSync(filePath, 'utf8')
  content = removeThreeImports(content)
  content = rewriteFrameTickerImports(content)
  fs.writeFileSync(filePath, content)
  console.log(`✅ Patched ${path.relative(process.cwd(), filePath)}`)
}

function patchGlobeGL() {
  console.log('🛠️  Patching globe.gl imports...')
  const base = path.resolve('node_modules/globe.gl/dist')
  const files = [
    'globe.gl.js',
    'globe.gl.esm.js',
    'globe.gl.module.js',
  ].map((f) => path.join(base, f))
  for (const file of files) {
    patchFile(file)
  }
}

function patchThreeGlobe() {
  console.log('🛠️  Patching three-globe imports...')
  const filePath = path.resolve('node_modules/three-globe/dist/three-globe.mjs')
  patchFile(filePath)
}

try {
  patchGlobeGL()
  patchThreeGlobe()
  console.log('✅ Globe FrameTicker patch complete.')
} catch (err) {
  console.error('❌ Failed to patch globe FrameTicker:', err)
  process.exit(1)
}
