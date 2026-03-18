export interface BreadcrumbShellLayout {
  width: string
  marginInlineStart: string
}

export function computeBreadcrumbShellLayout(shellLeft: number, contentLeft: number, contentWidth: number): BreadcrumbShellLayout {
  const safeWidth = Math.max(0, Math.round(contentWidth))
  const offset = Math.max(0, Math.round(contentLeft - shellLeft))

  return {
    width: `${safeWidth}px`,
    marginInlineStart: `${offset}px`
  }
}
