import { describe, expect, it } from 'vitest'
import { canUseDom } from '../canUseDom'

describe('canUseDom', () => {
  it('returns true in jsdom (window + document available)', () => {
    expect(canUseDom()).toBe(true)
  })

  it('returns a boolean', () => {
    expect(typeof canUseDom()).toBe('boolean')
  })

  it('window.document is accessible', () => {
    expect(window.document).toBeDefined()
    expect(typeof window.document.createElement).toBe('function')
  })
})
