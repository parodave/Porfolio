import { patchThreeStdlib } from './utils/patchThreeStdlib.ts'

try {
  patchThreeStdlib()
  console.log('✅ Successfully patched three-stdlib package.json.')
} catch (err) {
  console.error('❌ Failed to patch three-stdlib:', err)
}
