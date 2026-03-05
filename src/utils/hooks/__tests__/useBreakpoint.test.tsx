import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { useBreakpoint } from '../useBreakpoint'

function setWindowWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: width,
  })
}

describe('useBreakpoint', () => {
  afterEach(() => {
    setWindowWidth(1024)
  })

  it('returns a map with all breakpoint keys', () => {
    const { result } = renderHook(() => useBreakpoint())
    const keys = Object.keys(result.current)
    expect(keys).toEqual(expect.arrayContaining(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']))
    expect(keys).toHaveLength(6)
  })

  it('xs is always true (width >= 0)', () => {
    setWindowWidth(0)
    const { result } = renderHook(() => useBreakpoint())
    expect(result.current.xs).toBe(true)
  })

  it('sm and above are false at 400px', () => {
    setWindowWidth(400)
    const { result } = renderHook(() => useBreakpoint())
    expect(result.current.xs).toBe(true)
    expect(result.current.sm).toBe(false)
    expect(result.current.md).toBe(false)
    expect(result.current.lg).toBe(false)
    expect(result.current.xl).toBe(false)
    expect(result.current.xxl).toBe(false)
  })

  it('xs and sm active at exactly 576px', () => {
    setWindowWidth(576)
    const { result } = renderHook(() => useBreakpoint())
    expect(result.current.xs).toBe(true)
    expect(result.current.sm).toBe(true)
    expect(result.current.md).toBe(false)
  })

  it('xs, sm, md active at exactly 768px', () => {
    setWindowWidth(768)
    const { result } = renderHook(() => useBreakpoint())
    expect(result.current.xs).toBe(true)
    expect(result.current.sm).toBe(true)
    expect(result.current.md).toBe(true)
    expect(result.current.lg).toBe(false)
  })

  it('xs through md active at 900px (lg requires 992px)', () => {
    setWindowWidth(900)
    const { result } = renderHook(() => useBreakpoint())
    expect(result.current.xs).toBe(true)
    expect(result.current.sm).toBe(true)
    expect(result.current.md).toBe(true)
    expect(result.current.lg).toBe(false)
    expect(result.current.xl).toBe(false)
    expect(result.current.xxl).toBe(false)
  })

  it('all breakpoints active at 1600px', () => {
    setWindowWidth(1600)
    const { result } = renderHook(() => useBreakpoint())
    expect(result.current.xs).toBe(true)
    expect(result.current.sm).toBe(true)
    expect(result.current.md).toBe(true)
    expect(result.current.lg).toBe(true)
    expect(result.current.xl).toBe(true)
    expect(result.current.xxl).toBe(true)
  })

  it('updates when window is resized', () => {
    setWindowWidth(400)
    const { result } = renderHook(() => useBreakpoint())
    expect(result.current.sm).toBe(false)

    act(() => {
      setWindowWidth(800)
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current.sm).toBe(true)
    expect(result.current.md).toBe(true)
    expect(result.current.lg).toBe(false)
  })

  it('xxl only false just below 1600px', () => {
    setWindowWidth(1599)
    const { result } = renderHook(() => useBreakpoint())
    expect(result.current.xl).toBe(true)
    expect(result.current.xxl).toBe(false)
  })
})
