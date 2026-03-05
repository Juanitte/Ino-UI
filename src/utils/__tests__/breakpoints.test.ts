import { describe, expect, it } from 'vitest'
import {
  BREAKPOINT_ORDER,
  BREAKPOINT_VALUES,
  getResponsiveValue,
  type Breakpoint,
} from '../breakpoints'

describe('BREAKPOINT_VALUES', () => {
  it('has correct values for each breakpoint', () => {
    expect(BREAKPOINT_VALUES.xs).toBe(0)
    expect(BREAKPOINT_VALUES.sm).toBe(576)
    expect(BREAKPOINT_VALUES.md).toBe(768)
    expect(BREAKPOINT_VALUES.lg).toBe(992)
    expect(BREAKPOINT_VALUES.xl).toBe(1200)
    expect(BREAKPOINT_VALUES.xxl).toBe(1600)
  })

  it('contains all 6 breakpoints', () => {
    const keys = Object.keys(BREAKPOINT_VALUES)
    expect(keys).toHaveLength(6)
    expect(keys).toContain('xs')
    expect(keys).toContain('sm')
    expect(keys).toContain('md')
    expect(keys).toContain('lg')
    expect(keys).toContain('xl')
    expect(keys).toContain('xxl')
  })
})

describe('BREAKPOINT_ORDER', () => {
  it('is ordered from largest to smallest', () => {
    expect(BREAKPOINT_ORDER).toEqual(['xxl', 'xl', 'lg', 'md', 'sm', 'xs'])
  })

  it('has 6 entries', () => {
    expect(BREAKPOINT_ORDER).toHaveLength(6)
  })
})

describe('getResponsiveValue', () => {
  it('returns scalar value as-is', () => {
    expect(getResponsiveValue(42, 900)).toBe(42)
  })

  it('returns string scalar as-is', () => {
    expect(getResponsiveValue('hello', 1200)).toBe('hello')
  })

  it('returns null as-is', () => {
    expect(getResponsiveValue(null, 900)).toBeNull()
  })

  it('resolves largest active breakpoint (md active at 900px)', () => {
    expect(getResponsiveValue({ sm: 1, md: 2, lg: 3 }, 900)).toBe(2)
  })

  it('resolves lg at 1000px', () => {
    expect(getResponsiveValue({ sm: 1, md: 2, lg: 3 }, 1000)).toBe(3)
  })

  it('resolves xs (0px) when only xs is specified', () => {
    expect(getResponsiveValue({ xs: 'mobile' }, 0)).toBe('mobile')
  })

  it('resolves xxl at 1600px or more', () => {
    expect(getResponsiveValue({ md: 'a', xxl: 'b' }, 1600)).toBe('b')
  })

  it('falls back to smaller breakpoint when larger is not set', () => {
    // No lg/xl/xxl defined, at 1000px → md is the largest active with a value
    expect(getResponsiveValue({ sm: 1, md: 2 }, 1000)).toBe(2)
  })

  it('returns undefined when no breakpoint matches', () => {
    // Empty responsive map
    expect(getResponsiveValue({} as Partial<Record<Breakpoint, number>>, 900)).toBeUndefined()
  })

  it('resolves exact boundary — sm at exactly 576px', () => {
    expect(getResponsiveValue({ sm: 'sm-val', md: 'md-val' }, 576)).toBe('sm-val')
  })

  it('resolves exact boundary — md at exactly 768px', () => {
    expect(getResponsiveValue({ sm: 'sm-val', md: 'md-val' }, 768)).toBe('md-val')
  })

  it('does not match sm below 576px', () => {
    expect(getResponsiveValue({ sm: 'sm-val', md: 'md-val' }, 575)).toBeUndefined()
  })

  it('handles boolean responsive value', () => {
    expect(getResponsiveValue({ xs: false, md: true }, 768)).toBe(true)
  })
})
