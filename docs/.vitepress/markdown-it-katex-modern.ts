import katex from 'katex'
import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token'

type KatexOptions = katex.KatexOptions

function escapeHtml(md: MarkdownIt, raw: string) {
  return md.utils.escapeHtml(raw)
}

function renderKatex(md: MarkdownIt, tex: string, displayMode: boolean, options: KatexOptions) {
  try {
    return katex.renderToString(tex, { ...options, displayMode })
  } catch (err) {
    return `<code class="katex-error">${escapeHtml(md, tex)}</code>`
  }
}

function isEscaped(src: string, pos: number) {
  let backslashes = 0
  for (let i = pos - 1; i >= 0 && src[i] === '\\'; i -= 1) backslashes += 1
  return backslashes % 2 === 1
}

export default function markdownItKatexModern(
  md: MarkdownIt,
  options: KatexOptions = {
    throwOnError: false,
    output: 'html'
  }
) {
  md.inline.ruler.after('escape', 'math_inline', (state, silent) => {
    const start = state.pos
    if (state.src[start] !== '$') return false
    if (state.src[start + 1] === '$') return false

    const open = start
    const closeCandidateStart = open + 1

    let close = state.src.indexOf('$', closeCandidateStart)
    while (close !== -1 && isEscaped(state.src, close)) {
      close = state.src.indexOf('$', close + 1)
    }

    if (close === -1) return false

    const content = state.src.slice(closeCandidateStart, close)
    if (content.trim().length === 0) return false

    if (silent) return true

    const token = state.push('math_inline', '', 0) as Token
    token.markup = '$'
    token.content = content

    state.pos = close + 1
    return true
  })

  md.block.ruler.after(
    'blockquote',
    'math_block',
    (state, startLine, endLine, silent) => {
      const startPos = state.bMarks[startLine] + state.tShift[startLine]
      const startMax = state.eMarks[startLine]
      const firstLine = state.src.slice(startPos, startMax).trim()
      if (firstLine !== '$$') return false

      if (silent) return true

      let nextLine = startLine + 1
      let found = false
      const lines: string[] = []

      while (nextLine < endLine) {
        const pos = state.bMarks[nextLine] + state.tShift[nextLine]
        const max = state.eMarks[nextLine]
        const line = state.src.slice(pos, max).trim()
        if (line === '$$') {
          found = true
          break
        }
        lines.push(state.src.slice(state.bMarks[nextLine], state.eMarks[nextLine]))
        nextLine += 1
      }

      if (!found) return false

      const token = state.push('math_block', '', 0) as Token
      token.block = true
      token.markup = '$$'
      token.content = lines.join('\n').trimEnd()
      token.map = [startLine, nextLine + 1]

      state.line = nextLine + 1
      return true
    },
    { alt: ['paragraph', 'reference', 'blockquote', 'list'] }
  )

  md.renderer.rules.math_inline = (tokens, idx) => {
    return renderKatex(md, tokens[idx].content, false, options)
  }

  md.renderer.rules.math_block = (tokens, idx) => {
    const html = renderKatex(md, tokens[idx].content, true, options)
    return `<p>${html}</p>\n`
  }
}

