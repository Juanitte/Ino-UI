import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useMergedState } from '../useMergedState'

describe('useMergedState — uncontrolled', () => {
  it('returns the default value initially', () => {
    const { result } = renderHook(() => useMergedState('default'))
    expect(result.current[0]).toBe('default')
  })

  it('updates internal state when setter is called', () => {
    const { result } = renderHook(() => useMergedState('a'))
    act(() => result.current[1]('b'))
    expect(result.current[0]).toBe('b')
  })

  it('calls onChange with (next, prev) on update', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() => useMergedState('a', { onChange }))
    act(() => result.current[1]('b'))
    expect(onChange).toHaveBeenCalledWith('b', 'a')
  })

  it('does not call onChange on initial render', () => {
    const onChange = vi.fn()
    renderHook(() => useMergedState('x', { onChange }))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('applies postState transform to returned value', () => {
    const { result } = renderHook(() =>
      useMergedState(3, { postState: (v) => v * 2 }),
    )
    expect(result.current[0]).toBe(6)
  })

  it('postState applies to updated value too', () => {
    const { result } = renderHook(() =>
      useMergedState(1, { postState: (v) => v + 10 }),
    )
    act(() => result.current[1](5))
    expect(result.current[0]).toBe(15)
  })

  it('setter is stable across renders', () => {
    const { result, rerender } = renderHook(() => useMergedState(0))
    const setter1 = result.current[1]
    rerender()
    expect(result.current[1]).toBe(setter1)
  })
})

describe('useMergedState — controlled', () => {
  it('returns the controlled value', () => {
    const { result } = renderHook(() =>
      useMergedState('default', { value: 'controlled' }),
    )
    expect(result.current[0]).toBe('controlled')
  })

  it('does NOT update internal state when controlled', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useMergedState('default', { value: 'controlled', onChange }),
    )
    act(() => result.current[1]('new'))
    // Displayed value still comes from external `value` prop
    expect(result.current[0]).toBe('controlled')
  })

  it('calls onChange when setter is called in controlled mode', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useMergedState('default', { value: 'controlled', onChange }),
    )
    act(() => result.current[1]('new'))
    expect(onChange).toHaveBeenCalledWith('new', 'controlled')
  })

  it('reflects updated controlled value on rerender', () => {
    let controlled = 'v1'
    const { result, rerender } = renderHook(() =>
      useMergedState('default', { value: controlled }),
    )
    expect(result.current[0]).toBe('v1')
    controlled = 'v2'
    rerender()
    expect(result.current[0]).toBe('v2')
  })

  it('applies postState in controlled mode', () => {
    const { result } = renderHook(() =>
      useMergedState('default', { value: 'hello', postState: (v) => v.toUpperCase() }),
    )
    expect(result.current[0]).toBe('HELLO')
  })

  it('prev value passed to onChange reflects the controlled value', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useMergedState(0, { value: 10, onChange }),
    )
    act(() => result.current[1](20))
    expect(onChange).toHaveBeenCalledWith(20, 10)
  })
})
