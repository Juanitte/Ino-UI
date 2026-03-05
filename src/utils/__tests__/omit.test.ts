import { describe, expect, it } from 'vitest'
import { omit } from '../omit'

describe('omit', () => {
  it('removes a single key', () => {
    expect(omit({ a: 1, b: 2, c: 3 }, ['b'])).toEqual({ a: 1, c: 3 })
  })

  it('removes multiple keys', () => {
    expect(omit({ a: 1, b: 2, c: 3 }, ['b', 'c'])).toEqual({ a: 1 })
  })

  it('returns shallow copy when no keys are omitted', () => {
    const obj = { a: 1, b: 2 }
    const result = omit(obj, [])
    expect(result).toEqual({ a: 1, b: 2 })
    expect(result).not.toBe(obj)
  })

  it('does not mutate the original object', () => {
    const obj = { a: 1, b: 2, c: 3 }
    omit(obj, ['b'])
    expect(obj).toEqual({ a: 1, b: 2, c: 3 })
  })

  it('ignores keys that do not exist', () => {
    const obj = { a: 1, b: 2 }
    // @ts-expect-error testing with unknown key
    expect(omit(obj, ['z'])).toEqual({ a: 1, b: 2 })
  })

  it('removes all keys when all are specified', () => {
    expect(omit({ a: 1, b: 2 }, ['a', 'b'])).toEqual({})
  })

  it('preserves nested object references (shallow copy)', () => {
    const nested = { x: 1 }
    const obj = { a: nested, b: 2 }
    const result = omit(obj, ['b'])
    expect(result.a).toBe(nested)
  })

  it('works with string values', () => {
    expect(omit({ name: 'Alice', role: 'admin', id: '1' }, ['role'])).toEqual({
      name: 'Alice',
      id: '1',
    })
  })
})
