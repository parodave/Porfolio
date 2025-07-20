import fs from 'fs'
import path from 'path'

const filePath = path.resolve('node_modules/three-globe/dist/three-globe.mjs')

try {
  if (!fs.existsSync(filePath)) {
    console.warn('⚠️  three-globe not found, skipping patch.')
    process.exit(0)
  }
  const content = fs.readFileSync(filePath, 'utf8')
  const regex = /(import\s+\{[^}]*WebGPURenderer[^}]*\}\s+from\s+['"]three\/webgpu['"];?)/
  if (regex.test(content)) {
    const updated = content.replace(regex, '// $1')
    fs.writeFileSync(filePath, updated)
    console.log('✅ Patched three-globe to comment out WebGPURenderer import.')
  } else {
    console.log('ℹ️  WebGPURenderer import not found, skipping.')
  }
} catch (err) {
  console.error('❌ Failed to patch three-globe:', err)
  process.exit(1)
}
