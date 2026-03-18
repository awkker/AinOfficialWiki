export interface NavMenuIndicatorLayout {
  width: string
  transform: string
}

export function computeNavMenuIndicatorLayout(
  menuLeft: number,
  activeLeft: number,
  activeWidth: number
): NavMenuIndicatorLayout {
  const width = Math.max(0, Math.round(activeWidth))
  const offset = Math.max(0, Math.round(activeLeft - menuLeft))

  return {
    width: `${width}px`,
    transform: `translate3d(${offset}px, 0, 0)`
  }
}
