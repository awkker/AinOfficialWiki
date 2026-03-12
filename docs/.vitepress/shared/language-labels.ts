const LANGUAGE_ALIASES: Record<string, string> = {
  plaintext: 'text',
  plain: 'text',
  txt: 'text',
  typescript: 'ts',
  javascript: 'js',
  reactjs: 'react',
  vuejs: 'vue',
  vuedotjs: 'vue',
  sveltekit: 'svelte',
  angularjs: 'angular',
  solidjs: 'solid',
  next: 'nextjs',
  'next.js': 'nextjs',
  nuxtjs: 'nuxt',
  markdown: 'md',
  tex: 'latex',
  python: 'py',
  rust: 'rs',
  kotlin: 'kt',
  jquery: 'jquery',
  'c++': 'cpp',
  cxx: 'cpp',
  hxx: 'hpp',
  shell: 'sh',
  shellscript: 'sh',
  zshell: 'zsh',
  fishshell: 'fish',
  nushell: 'nu',
  bat: 'cmd',
  batch: 'cmd',
  ps1: 'powershell',
  psm1: 'powershell',
  pwsh: 'powershell',
  yml: 'yaml',
  ini: 'ini',
  pgsql: 'pgsql',
  postgresql: 'pgsql',
  mariadb: 'mariadb',
  mysql: 'mysql',
  assembly: 'assembly',
  asm: 'assembly',
  make: 'makefile',
  makefile: 'makefile',
  cpython: 'cpython',
  django: 'django',
  flutter: 'flutter',
  fortran: 'fortran',
  hive: 'hive',
  htaccess: 'htaccess',
  https: 'http',
  idl: 'idl',
  objectivec: 'objc',
  'objective-c': 'objc',
  octave: 'octave',
  pegis: 'pegjs',
  pegjs: 'pegjs',
  perle: 'perl',
  pgp: 'pgp',
  properties: 'properties',
  'visual basic': 'vb',
  visualbasic: 'vb',
  vbscript: 'vbscript',
  sqlite: 'sqlite',
  squirrel: 'squirrel',
  'squírrel': 'squirrel'
}

type LanguageLabel = {
  full: string
  short: string
}

const LANGUAGE_LABELS: Record<string, LanguageLabel> = {
  text: { full: 'Plain Text', short: 'TXT' },
  ts: { full: 'TypeScript', short: 'TS' },
  tsx: { full: 'TypeScript React', short: 'TSX' },
  js: { full: 'JavaScript', short: 'JS' },
  jsx: { full: 'JavaScript React', short: 'JSX' },
  react: { full: 'React', short: 'REACT' },
  vue: { full: 'Vue', short: 'VUE' },
  svelte: { full: 'Svelte', short: 'SVELTE' },
  angular: { full: 'Angular', short: 'NG' },
  solid: { full: 'SolidJS', short: 'SOLID' },
  preact: { full: 'Preact', short: 'PREACT' },
  nextjs: { full: 'Next.js', short: 'NEXT' },
  nuxt: { full: 'Nuxt', short: 'NUXT' },
  astro: { full: 'Astro', short: 'ASTRO' },
  remix: { full: 'Remix', short: 'REMIX' },
  qwik: { full: 'Qwik', short: 'QWIK' },
  py: { full: 'Python', short: 'PY' },
  cpp: { full: 'C++', short: 'C++' },
  c: { full: 'C', short: 'C' },
  h: { full: 'C Header', short: 'H' },
  hpp: { full: 'C++ Header', short: 'HPP' },
  java: { full: 'Java', short: 'JAVA' },
  go: { full: 'Go', short: 'GO' },
  rs: { full: 'Rust', short: 'RS' },
  php: { full: 'PHP', short: 'PHP' },
  ruby: { full: 'Ruby', short: 'RB' },
  swift: { full: 'Swift', short: 'SWIFT' },
  kt: { full: 'Kotlin', short: 'KT' },
  sql: { full: 'SQL', short: 'SQL' },
  html: { full: 'HTML', short: 'HTML' },
  ini: { full: 'INI', short: 'INI' },
  css: { full: 'CSS', short: 'CSS' },
  scss: { full: 'SCSS', short: 'SCSS' },
  less: { full: 'Less', short: 'LESS' },
  json: { full: 'JSON', short: 'JSON' },
  yaml: { full: 'YAML', short: 'YAML' },
  toml: { full: 'TOML', short: 'TOML' },
  xml: { full: 'XML', short: 'XML' },
  md: { full: 'Markdown', short: 'MD' },
  latex: { full: 'LaTeX', short: 'TEX' },
  sh: { full: 'Shell', short: 'SH' },
  bash: { full: 'Bash', short: 'SH' },
  zsh: { full: 'Zsh', short: 'ZSH' },
  fish: { full: 'Fish', short: 'FISH' },
  nu: { full: 'Nushell', short: 'NU' },
  cmd: { full: 'Windows CMD', short: 'CMD' },
  powershell: { full: 'PowerShell', short: 'PS' },
  jquery: { full: 'jQuery', short: 'JQ' },
  pgsql: { full: 'PostgreSQL', short: 'PG' },
  mariadb: { full: 'MariaDB', short: 'MDB' },
  mysql: { full: 'MySQL', short: 'SQL' },
  assembly: { full: 'Assembly', short: 'ASM' },
  basic: { full: 'BASIC', short: 'BAS' },
  makefile: { full: 'Makefile', short: 'MAKE' },
  cmake: { full: 'CMake', short: 'CMAKE' },
  cpython: { full: 'CPython', short: 'PY' },
  dart: { full: 'Dart', short: 'DART' },
  django: { full: 'Django', short: 'DJ' },
  flutter: { full: 'Flutter', short: 'FL' },
  fortran: { full: 'Fortran', short: 'F90' },
  haskell: { full: 'Haskell', short: 'HS' },
  haxe: { full: 'Haxe', short: 'HAXE' },
  hive: { full: 'HiveQL', short: 'HIVE' },
  htaccess: { full: '.htaccess', short: 'HTA' },
  http: { full: 'HTTP', short: 'HTTP' },
  hxml: { full: 'HXML', short: 'HXML' },
  idl: { full: 'IDL', short: 'IDL' },
  julia: { full: 'Julia', short: 'JL' },
  lua: { full: 'Lua', short: 'LUA' },
  matlab: { full: 'MATLAB', short: 'MAT' },
  mermaid: { full: 'Mermaid', short: 'MMD' },
  nginx: { full: 'Nginx', short: 'NGX' },
  objc: { full: 'Objective-C', short: 'OBJC' },
  ocaml: { full: 'OCaml', short: 'ML' },
  octave: { full: 'Octave', short: 'OCT' },
  oz: { full: 'Oz', short: 'OZ' },
  pascal: { full: 'Pascal', short: 'PASC' },
  pegjs: { full: 'PEG.js', short: 'PEG' },
  perl: { full: 'Perl', short: 'PL' },
  pgp: { full: 'PGP', short: 'PGP' },
  plsql: { full: 'PL/SQL', short: 'PLSQL' },
  properties: { full: 'Properties', short: 'PROP' },
  r: { full: 'R', short: 'R' },
  sas: { full: 'SAS', short: 'SAS' },
  scala: { full: 'Scala', short: 'SCALA' },
  scheme: { full: 'Scheme', short: 'SCM' },
  sequence: { full: 'Sequence', short: 'SEQ' },
  sqlite: { full: 'SQLite', short: 'SQLITE' },
  squirrel: { full: 'Squirrel', short: 'SQL' },
  stata: { full: 'Stata', short: 'STATA' },
  stylus: { full: 'Stylus', short: 'STYL' },
  systemverilog: { full: 'SystemVerilog', short: 'SV' },
  vb: { full: 'Visual Basic', short: 'VB' },
  vbscript: { full: 'VBScript', short: 'VBS' },
  velocity: { full: 'Velocity', short: 'VTL' },
  verilog: { full: 'Verilog', short: 'V' },
  vhdl: { full: 'VHDL', short: 'VHDL' }
}

function normalizeInput(value: string): string {
  return value.trim().toLowerCase()
}

type ParsedLanguageToken = {
  language: string
  variant: 'root' | null
}

function parseLanguageToken(value?: string): ParsedLanguageToken {
  if (!value) {
    return {
      language: 'text',
      variant: null
    }
  }

  let normalized = normalizeInput(value)

  if (!normalized) {
    return {
      language: 'text',
      variant: null
    }
  }

  if (normalized.startsWith('language-')) {
    normalized = normalized.slice('language-'.length)
  }

  let variant: ParsedLanguageToken['variant'] = null

  if (normalized.endsWith('-root')) {
    normalized = normalized.slice(0, -'-root'.length)
    variant = 'root'
  }

  if (!normalized) {
    return {
      language: 'text',
      variant
    }
  }

  return {
    language: normalized,
    variant
  }
}

function fallbackFullLabel(language: string): string {
  const cleaned = language.replace(/[_-]+/g, ' ').trim()
  if (!cleaned) return 'Plain Text'

  return cleaned
    .split(/\s+/g)
    .filter(Boolean)
    .map((word) => {
      if (word.length <= 3) return word.toUpperCase()
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

function fallbackShortLabel(language: string): string {
  const compact = language.replace(/[^a-z0-9+#]/gi, '')
  if (!compact) return 'TXT'
  if (compact.length <= 4) return compact.toUpperCase()
  return compact.slice(0, 3).toUpperCase()
}

export function normalizeLanguageId(value?: string): string {
  const { language } = parseLanguageToken(value)
  return LANGUAGE_ALIASES[language] ?? language
}

export function resolveLanguageVariant(value?: string): 'root' | null {
  return parseLanguageToken(value).variant
}

export function resolveLanguageLabel(language?: string): string {
  const normalized = normalizeLanguageId(language)
  return LANGUAGE_LABELS[normalized]?.full ?? fallbackFullLabel(normalized)
}

export function resolveLanguageShortLabel(language?: string): string {
  const normalized = normalizeLanguageId(language)
  return LANGUAGE_LABELS[normalized]?.short ?? fallbackShortLabel(normalized)
}
