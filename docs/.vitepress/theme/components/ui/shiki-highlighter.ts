import { createHighlighter } from 'shiki'

const SHIKI_THEMES = {
  light: 'github-light',
  dark: 'github-dark'
} as const

const SHIKI_LANGS = [
  'txt',
  'md',
  'markdown',
  'latex',
  'ini',
  'js',
  'jsx',
  'ts',
  'tsx',
  'vue',
  'svelte',
  'astro',
  'angular-ts',
  'html',
  'css',
  'scss',
  'less',
  'json',
  'yaml',
  'toml',
  'xml',
  'http',
  'properties',
  'sh',
  'bash',
  'shellscript',
  'powershell',
  'fish',
  'nu',
  'cmd',
  'bat',
  'asm',
  'py',
  'python',
  'c',
  'cpp',
  'java',
  'go',
  'rs',
  'rust',
  'php',
  'rb',
  'ruby',
  'sql',
  'plsql',
  'dart',
  'fortran-free-form',
  'haskell',
  'haxe',
  'hxml',
  'julia',
  'kotlin',
  'lua',
  'make',
  'makefile',
  'cmake',
  'matlab',
  'mermaid',
  'nginx',
  'objective-c',
  'objc',
  'ocaml',
  'pascal',
  'perl',
  'r',
  'sas',
  'scala',
  'scheme',
  'stata',
  'stylus',
  'swift',
  'vb',
  'verilog',
  'vhdl',
  'apache'
] as const

let shikiHighlighterPromise:
  | ReturnType<typeof createHighlighter>
  | null = null

export function getShikiHighlighterPromise() {
  if (!shikiHighlighterPromise) {
    shikiHighlighterPromise = createHighlighter({
      themes: [SHIKI_THEMES.light, SHIKI_THEMES.dark],
      langs: [...SHIKI_LANGS]
    })
  }

  return shikiHighlighterPromise
}

export function shouldUseShikiForLanguage(language: string) {
  return language !== 'mermaid'
}

export { SHIKI_THEMES }
