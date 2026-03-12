import type { MermaidThemePreset } from './mermaid-theme-presets'

type MermaidDirectiveConfig = {
  theme: MermaidThemePreset['theme']
  look?: MermaidThemePreset['look']
  handDrawnSeed?: number
  themeVariables?: MermaidThemePreset['themeVariables']
}

const MERMAID_INIT_DIRECTIVE_RE = /^\s*%%\{init:\s*[\s\S]+?\}%%/

export function buildMermaidDirectiveConfig(preset: MermaidThemePreset): MermaidDirectiveConfig {
  const config: MermaidDirectiveConfig = {
    theme: preset.theme
  }

  if (preset.look) {
    config.look = preset.look
  }

  if (preset.handDrawnSeed != null) {
    config.handDrawnSeed = preset.handDrawnSeed
  }

  if (preset.themeVariables) {
    config.themeVariables = preset.themeVariables
  }

  return config
}

export function applyMermaidThemePresetToSource(source: string, preset: MermaidThemePreset): string {
  if (!source.trim()) return source
  if (MERMAID_INIT_DIRECTIVE_RE.test(source)) return source

  const directive = `%%{init: ${JSON.stringify(buildMermaidDirectiveConfig(preset))}}%%`
  return `${directive}\n${source}`
}
