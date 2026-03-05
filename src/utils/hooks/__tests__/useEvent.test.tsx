import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useEvent } from '../useEvent'

describe('useEvent', () => {
  it('returns a function', () => {
    const { result } = renderHook(() => useEvent(() => 42))
    expect(typeof result.current).toBe('function')
  })

  it('stable reference across renders', () => {
    const { result, rerender } = renderHook(({ fn }) => useEvent(fn), {
      initialProps: { fn: () => 1 },
    })
    const first = result.current
    rerender({ fn: () => 2 })
    expect(result.current).toBe(first)
  })

  it('always calls the latest version of fn', () => {
    let counter = 1
    const { result, rerender } = renderHook(() => useEvent(() => counter))

    expect(result.current()).toBe(1)

    counter = 2
    rerender()
    // stable ref but now calls updated fn
    expect(result.current()).toBe(2)
  })

  it('passes arguments through', () => {
    const { result } = renderHook(() => useEvent((a: number, b: number) => a + b))
    expect(result.current(3, 4)).toBe(7)
  })

  it('uses updated fn after rerender without changing ref', () => {
    const fn1 = vi.fn(() => 'v1')
    const fn2 = vi.fn(() => 'v2')

    const { result, rerender } = renderHook(({ fn }) => useEvent(fn), {
      initialProps: { fn: fn1 },
    })

    const stable = result.current
    expect(stable()).toBe('v1')
    expect(fn1).toHaveBeenCalledTimes(1)

    rerender({ fn: fn2 })
    expect(stable()).toBe('v2')
    expect(fn2).toHaveBeenCalledTimes(1)
    expect(fn1).toHaveBeenCalledTimes(1)
  })

  it('handles void return type', () => {
    const spy = vi.fn()
    const { result } = renderHook(() => useEvent(spy))
    expect(() => result.current()).not.toThrow()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
