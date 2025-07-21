import fs from 'fs'
import path from 'path'
import { removeThreeImports } from './utils/importFixers.ts'

const filePath = path.resolve('node_modules/react-globe.gl/dist/react-globe.gl.mjs')
const troFilePaths = [
  path.resolve('node_modules/three-render-objects/dist/three-render-objects.mjs'),
  path.resolve(
    'node_modules/globe.gl/node_modules/three-render-objects/dist/three-render-objects.mjs',
  ),
]

try {
  if (!fs.existsSync(filePath)) {
    console.warn('⚠️  react-globe.gl not found, skipping fix.')
    process.exit(0)
  }
  const content = fs.readFileSync(filePath, 'utf8')
  const updated = removeThreeImports(content)
  if (updated !== content) {
    fs.writeFileSync(filePath, updated)
    console.log('✅ Removed three/webgpu and three/tsl imports from react-globe.gl.')
  } else {
    console.log('ℹ️  No three/webgpu or three/tsl imports found in react-globe.gl.')
  }

  for (const troFilePath of troFilePaths) {
    if (fs.existsSync(troFilePath)) {
      const troContent = fs.readFileSync(troFilePath, 'utf8')
      const troRegex = /^import.*WebGPURenderer.*from ['"]three\/webgpu['"];?\n?/gm
      const troUpdated = troContent.replace(troRegex, '')
      if (troUpdated !== troContent) {
        fs.writeFileSync(troFilePath, troUpdated)
        console.log(
          `✅ Removed WebGPURenderer import from ${path.relative(
            process.cwd(),
            troFilePath,
          )}.`,
        )
      } else {
        console.log(
          `ℹ️  No WebGPURenderer import found in ${path.relative(
            process.cwd(),
            troFilePath,
          )}.`,
        )
      }
    } else {
      console.warn(
        `⚠️  ${path.relative(process.cwd(), troFilePath)} not found, skipping fix.`,
      )
    }
  }
} catch (err) {
  console.error('❌ Failed to patch react-globe.gl:', err)
  process.exit(1)
}
