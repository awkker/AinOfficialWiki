import { describe, expect, test } from 'bun:test'
import { normalizeLanguageId, resolveLanguageLabel } from './language-labels'

describe('language expansions', () => {
  test('normalizes representative new aliases', () => {
    expect(normalizeLanguageId('visual basic')).toBe('vb')
    expect(normalizeLanguageId('postgresql')).toBe('pgsql')
    expect(normalizeLanguageId('mysql')).toBe('mysql')
    expect(normalizeLanguageId('assembly')).toBe('assembly')
    expect(normalizeLanguageId('mermaid')).toBe('mermaid')
    expect(normalizeLanguageId('django')).toBe('django')
  })

  test('resolves representative new labels', () => {
    expect(resolveLanguageLabel('ini')).toBe('INI')
    expect(resolveLanguageLabel('pgsql')).toBe('PostgreSQL')
    expect(resolveLanguageLabel('mermaid')).toBe('Mermaid')
    expect(resolveLanguageLabel('systemverilog')).toBe('SystemVerilog')
  })
})
