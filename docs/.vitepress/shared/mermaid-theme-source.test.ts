import { describe, expect, test } from 'bun:test'
import { applyMermaidThemePresetToSource, buildMermaidDirectiveConfig } from './mermaid-theme-source'
import { resolveMermaidThemePreset } from './mermaid-theme-presets'

describe('mermaid theme source helpers', () => {
  test('builds per-diagram config for custom theme presets', () => {
    expect(buildMermaidDirectiveConfig(resolveMermaidThemePreset('tech-ice', false))).toEqual({
      theme: 'base',
      look: 'classic',
      themeVariables: {
        darkMode: true,
        background: '#0f172a',
        primaryColor: '#38bdf8',
        primaryTextColor: '#e0f2fe',
        primaryBorderColor: '#0ea5e9',
        lineColor: '#7dd3fc',
        textColor: '#cbd5e1',
        mainBkg: '#1e3a8a',
        secondaryColor: '#64748b',
        tertiaryColor: '#7dd3fc',
        nodeBorder: '#60a5fa',
        nodeTextColor: '#f0f9ff',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '14px',
        noteBkgColor: '#1e40af',
        noteTextColor: '#93c5fd',
        actorBkg: '#0ea5e9',
        actorBorder: '#0284c7',
        sequenceNumberColor: '#bae6fd',
        classText: '#e0f2fe',
        classBackground: '#1e3a8a',
        classBorder: '#0284c7',
        labelBoxBkgColor: '#172554',
        labelBoxBorderColor: '#38bdf8'
      }
    })
  })

  test('applies built-in theme presets directly into diagram source', () => {
    const source = applyMermaidThemePresetToSource(
      'flowchart LR\nA --> B',
      resolveMermaidThemePreset('dark', false)
    )

    expect(source).toContain('%%{init:')
    expect(source).toContain('"theme":"dark"')
    expect(source).toContain('flowchart LR\nA --> B')
  })

  test('preserves existing inline init directives', () => {
    const source = '%%{init: {"theme":"forest"}}%%\nflowchart LR\nA --> B'

    expect(
      applyMermaidThemePresetToSource(source, resolveMermaidThemePreset('tech-ice', false))
    ).toBe(source)
  })
})
