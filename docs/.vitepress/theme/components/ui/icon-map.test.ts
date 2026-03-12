import { describe, expect, test } from 'bun:test'
import { resolveFileIcon, resolveLanguageIcon } from './icon-map'

describe('icon map', () => {
  test('uses stable icons for matlab and visual basic', () => {
    expect(resolveLanguageIcon('matlab')).toBe('mdi:function-variant')
    expect(resolveLanguageIcon('vb')).toBe('mdi:microsoft-visual-studio')
  })

  test('uses the same stable icons for matching file extensions', () => {
    expect(resolveFileIcon('demo.matlab')).toBe('mdi:function-variant')
    expect(resolveFileIcon('demo.vb')).toBe('mdi:microsoft-visual-studio')
  })
})
