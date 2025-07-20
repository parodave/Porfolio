// scripts/patch-three-stdlib.ts
import fs from 'fs'
import path from 'path'

const packagePath = path.resolve('node_modules/three-stdlib/package.json')

try {
  const content = fs.readFileSync(packagePath, 'utf-8')
  const parsed = JSON.parse(content)

  // Patch the exports field
  parsed.exports = {
    ".": {
      import: "./index.js",
      require: "./index.js"
    },
    "./*": {
      import: "./*.js",
      require: "./*.js"
    }
  }

  fs.writeFileSync(packagePath, JSON.stringify(parsed, null, 2))
  console.log("✅ Successfully patched three-stdlib package.json.")
} catch (err) {
  console.error("❌ Failed to patch three-stdlib:", err)
}
