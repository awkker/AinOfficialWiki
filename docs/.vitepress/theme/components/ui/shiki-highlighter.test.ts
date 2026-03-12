import { describe, expect, test } from 'bun:test'
import { getShikiHighlighterPromise, shouldUseShikiForLanguage } from './shiki-highlighter'

describe('shiki highlighter helper', () => {
  test('reuses the same highlighter promise across calls', () => {
    expect(getShikiHighlighterPromise()).toBe(getShikiHighlighterPromise())
  })

  test('skips shiki highlighting for mermaid blocks', () => {
    expect(shouldUseShikiForLanguage('mermaid')).toBe(false)
    expect(shouldUseShikiForLanguage('ts')).toBe(true)
  })
})
