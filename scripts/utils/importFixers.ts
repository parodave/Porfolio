
export function removeThreeImports(content: string): string {
  return content.replace(/^import.*from ['"]three\/(?:webgpu|tsl)['"];?\n?/gm, '')
}

export function rewriteFrameTickerImports(content: string): string {
  return content.replace(
    /import\s+FrameTicker\s+from\s+['"]frame-ticker['"]/g,
    'import { FrameTicker } from "frame-ticker"',
  )
}
