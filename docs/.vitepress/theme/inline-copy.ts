export function shouldRegisterInlineCopyTarget(options: {
  isInsidePre: boolean
  inlineCopyMode?: string | null
}): boolean {
  if (options.isInsidePre) return false
  return options.inlineCopyMode !== 'off'
}
