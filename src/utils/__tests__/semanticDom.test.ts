import { mergeSemanticClassName, mergeSemanticStyle } from '../semanticDom'

describe('mergeSemanticClassName', () => {
  it('returns undefined when both arguments are undefined', () => {
    expect(mergeSemanticClassName(undefined, undefined)).toBeUndefined()
  })

  it('returns the className when rootClassName is undefined', () => {
    expect(mergeSemanticClassName('foo', undefined)).toBe('foo')
  })

  it('returns the rootClassName when className is undefined', () => {
    expect(mergeSemanticClassName(undefined, 'bar')).toBe('bar')
  })

  it('merges both class names with a space', () => {
    expect(mergeSemanticClassName('foo', 'bar')).toBe('foo bar')
  })

  it('filters out empty strings', () => {
    expect(mergeSemanticClassName('', 'bar')).toBe('bar')
    expect(mergeSemanticClassName('foo', '')).toBe('foo')
  })
})

describe('mergeSemanticStyle', () => {
  it('returns only base when semantic and prop are undefined', () => {
    const base = { color: 'red', fontSize: 14 }
    expect(mergeSemanticStyle(base)).toEqual(base)
  })

  it('returns only base when semantic and prop are explicitly undefined', () => {
    const base = { color: 'red' }
    expect(mergeSemanticStyle(base, undefined, undefined)).toEqual(base)
  })

  it('merges base with semantic styles', () => {
    const base = { color: 'red', fontSize: 14 }
    const semantic = { color: 'blue' }
    const result = mergeSemanticStyle(base, semantic)
    expect(result).toEqual({ color: 'blue', fontSize: 14 })
  })

  it('merges base with prop styles', () => {
    const base = { color: 'red', fontSize: 14 }
    const prop = { fontSize: 20 }
    const result = mergeSemanticStyle(base, undefined, prop)
    expect(result).toEqual({ color: 'red', fontSize: 20 })
  })

  it('applies correct priority: base < semantic < prop', () => {
    const base = { color: 'red', fontSize: 14 }
    const semantic = { color: 'blue', fontWeight: 'bold' as const }
    const prop = { color: 'green' }
    const result = mergeSemanticStyle(base, semantic, prop)
    expect(result).toEqual({ color: 'green', fontSize: 14, fontWeight: 'bold' })
  })
})
