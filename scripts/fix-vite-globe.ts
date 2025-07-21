import fs from 'fs'
import path from 'path'

const filePath = path.resolve('node_modules/.vite/deps/react-globe_gl.js')

try {
  if (!fs.existsSync(filePath)) {
    console.warn('⚠️  react-globe_gl.js not found, skipping fix.')
    process.exit(0)
  }
  const content = fs.readFileSync(filePath, 'utf8')
  const regex = /^import.*from ['"]three\/(?:webgpu|tsl)['"];?\n?/gm
  const updated = content.replace(regex, '')
  if (updated !== content) {
    fs.writeFileSync(filePath, updated)
    console.log('✅ Removed three/webgpu and three/tsl imports from react-globe_gl.js.')
  } else {
    console.log('ℹ️  No three/webgpu or three/tsl imports found in react-globe_gl.js.')
  }
} catch (err) {
  console.error('❌ Failed to patch pre-bundled react-globe.gl:', err)
  process.exit(1)
}
