import { describe, expect, test } from 'bun:test'
import { computeNavMenuIndicatorLayout } from './nav-menu-indicator-layout'

describe('computeNavMenuIndicatorLayout', () => {
  test('returns the active tab width and horizontal offset relative to the menu shell', () => {
    expect(computeNavMenuIndicatorLayout(120, 196, 88)).toEqual({
      width: '88px',
      transform: 'translate3d(76px, 0, 0)'
    })
  })

  test('clamps negative offsets and invalid widths', () => {
    expect(computeNavMenuIndicatorLayout(220, 180, -24)).toEqual({
      width: '0px',
      transform: 'translate3d(0px, 0, 0)'
    })
  })
})
