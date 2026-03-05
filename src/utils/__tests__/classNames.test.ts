import { describe, expect, it } from 'vitest'
import { classNames } from '../classNames'

describe('classNames', () => {
  it('returns empty string with no args', () => {
    expect(classNames()).toBe('')
  })

  it('returns a single string', () => {
    expect(classNames('foo')).toBe('foo')
  })

  it('joins multiple strings', () => {
    expect(classNames('foo', 'bar', 'baz')).toBe('foo bar baz')
  })

  it('ignores false', () => {
    expect(classNames('foo', false, 'bar')).toBe('foo bar')
  })

  it('ignores null', () => {
    expect(classNames('foo', null, 'bar')).toBe('foo bar')
  })

  it('ignores undefined', () => {
    expect(classNames('foo', undefined, 'bar')).toBe('foo bar')
  })

  it('ignores empty string', () => {
    expect(classNames('foo', '', 'bar')).toBe('foo bar')
  })

  it('includes truthy object keys', () => {
    expect(classNames({ foo: true, bar: false, baz: true })).toBe('foo baz')
  })

  it('ignores object with all false values', () => {
    expect(classNames({ foo: false, bar: false })).toBe('')
  })

  it('processes arrays recursively', () => {
    expect(classNames(['foo', 'bar'])).toBe('foo bar')
  })

  it('processes nested arrays', () => {
    expect(classNames(['foo', ['bar', 'baz']])).toBe('foo bar baz')
  })

  it('ignores falsy values inside arrays', () => {
    expect(classNames(['foo', false, null, undefined, 'bar'])).toBe('foo bar')
  })

  it('mixes strings, objects, and arrays', () => {
    expect(classNames('foo', false, { bar: true, baz: false }, ['qux'])).toBe('foo bar qux')
  })

  it('includes number values', () => {
    expect(classNames('foo', 42)).toBe('foo 42')
  })

  it('handles object with mixed truthy/falsy inside array', () => {
    expect(classNames([{ active: true, disabled: false }, 'extra'])).toBe('active extra')
  })

  it('handles all-falsy arguments', () => {
    expect(classNames(false, null, undefined, '')).toBe('')
  })
})
