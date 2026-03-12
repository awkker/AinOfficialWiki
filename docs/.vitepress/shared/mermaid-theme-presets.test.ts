import { describe, expect, test } from 'bun:test'
import { MERMAID_THEME_PRESET_IDS, resolveMermaidThemePreset } from './mermaid-theme-presets'

describe('mermaid theme presets', () => {
  test('includes the documented custom presets', () => {
    expect(MERMAID_THEME_PRESET_IDS).toEqual(
      expect.arrayContaining([
        'pure-white',
        'business-soft',
        'macaron-gradient',
        'handdrawn-pastel',
        'tech-ice',
        'ethereal-purple'
      ])
    )
  })

  test('uses adaptive built-in defaults for the default preset', () => {
    expect(resolveMermaidThemePreset('default', false)).toMatchObject({
      id: 'default',
      theme: 'default',
      look: 'classic'
    })

    expect(resolveMermaidThemePreset('default', true)).toMatchObject({
      id: 'default',
      theme: 'dark',
      look: 'classic'
    })
  })

  test('resolves the handdrawn preset to handDrawn look with base theme', () => {
    expect(resolveMermaidThemePreset('handdrawn-pastel', false)).toMatchObject({
      id: 'handdrawn-pastel',
      theme: 'base',
      look: 'handDrawn',
      handDrawnSeed: 7
    })
  })

  test('matches the documented business-soft palette', () => {
    expect(resolveMermaidThemePreset('business-soft', false)).toMatchObject({
      themeVariables: {
        primaryColor: '#F0F4FC',
        primaryTextColor: '#1F2329',
        primaryBorderColor: '#000000',
        lineColor: '#888888',
        tertiaryColor: '#F5F6F7',
        tertiaryBorderColor: '#F5F6F7',
        tertiaryTextColor: '#00A4FF'
      }
    })
  })

  test('matches the documented handdrawn-pastel palette', () => {
    expect(resolveMermaidThemePreset('handdrawn-pastel', false)).toMatchObject({
      themeVariables: {
        background: '#fffaf0',
        primaryColor: '#e0bbff',
        primaryBorderColor: '#b388eb',
        lineColor: '#f694c1',
        mainBkg: '#caffbf',
        tertiaryColor: '#ffd6a5',
        nodeBorder: '#a0c4ff',
        fontFamily: 'Comic Sans MS, cursive'
      }
    })
  })

  test('matches the documented tech-ice palette', () => {
    expect(resolveMermaidThemePreset('tech-ice', false)).toMatchObject({
      themeVariables: {
        darkMode: true,
        background: '#0f172a',
        primaryColor: '#38bdf8',
        primaryBorderColor: '#0ea5e9',
        lineColor: '#7dd3fc',
        mainBkg: '#1e3a8a',
        tertiaryColor: '#7dd3fc',
        fontFamily: 'JetBrains Mono, monospace'
      }
    })
  })

  test('falls back to default preset for unknown ids', () => {
    expect(resolveMermaidThemePreset('unknown-theme', false)).toMatchObject({
      id: 'default',
      theme: 'default'
    })
  })
})
