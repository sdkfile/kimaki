import { describe, test, expect } from 'vitest'
import { sanitizeSlashCommandName } from './utils.js'

describe('sanitizeSlashCommandName', () => {
  test('should replace colons with underscores', () => {
    expect(sanitizeSlashCommandName('websearch:web_search')).toBe(
      'websearch_web_search',
    )
  })

  test('should replace spaces with underscores', () => {
    expect(sanitizeSlashCommandName('my command')).toBe('my_command')
  })

  test('should convert to lowercase', () => {
    expect(sanitizeSlashCommandName('WebSearch:Query')).toBe('websearch_query')
  })

  test('should handle multiple colons', () => {
    expect(sanitizeSlashCommandName('namespace:sub:command')).toBe(
      'namespace_sub_command',
    )
  })

  test('should handle multiple spaces', () => {
    expect(sanitizeSlashCommandName('my  test  command')).toBe(
      'my_test_command',
    )
  })

  test('should handle mixed colons and spaces', () => {
    expect(sanitizeSlashCommandName('websearch: search help')).toBe(
      'websearch_search_help',
    )
  })

  test('should preserve numbers and hyphens', () => {
    expect(sanitizeSlashCommandName('my-command-123')).toBe('my-command-123')
  })

  test('should handle mixed case and special chars', () => {
    expect(sanitizeSlashCommandName('WebSearch:Code_Search')).toBe(
      'websearch_code_search',
    )
  })

  test('should handle real MCP tool names', () => {
    expect(sanitizeSlashCommandName('websearch:web_search_exa-cmd')).toBe(
      'websearch_web_search_exa-cmd',
    )
    expect(sanitizeSlashCommandName('code_search:grep_pattern')).toBe(
      'code_search_grep_pattern',
    )
  })

  test('should trim whitespace', () => {
    expect(sanitizeSlashCommandName('  my:command  ')).toBe('my_command')
  })
})
