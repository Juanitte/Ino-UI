import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { useWindowWidth } from '../useWindowWidth'

function setWindowWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: width,
  })
}

describe('useWindowWidth', () => {
  afterEach(() => {
    // Restore to default jsdom value
    setWindowWidth(1024)
    vi.restoreAllMocks()
  })

  it('returns the current window.innerWidth', () => {
    setWindowWidth(1440)
    const { result } = renderHook(() => useWindowWidth())
    expect(result.current).toBe(1440)
  })

  it('updates when the window is resized', () => {
    setWindowWidth(800)
    const { result } = renderHook(() => useWindowWidth())
    expect(result.current).toBe(800)

    act(() => {
      setWindowWidth(1200)
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current).toBe(1200)
  })

  it('removes the resize listener on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useWindowWidth())
    unmount()
    expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('adds the resize listener with passive option', () => {
    const addSpy = vi.spyOn(window, 'addEventListener')
    renderHook(() => useWindowWidth())
    const resizeCall = addSpy.mock.calls.find(([event]) => event === 'resize')
    expect(resizeCall).toBeDefined()
    expect(resizeCall?.[2]).toEqual({ passive: true })
  })

  it('reflects multiple successive resizes', () => {
    setWindowWidth(500)
    const { result } = renderHook(() => useWindowWidth())

    act(() => {
      setWindowWidth(700)
      window.dispatchEvent(new Event('resize'))
    })
    expect(result.current).toBe(700)

    act(() => {
      setWindowWidth(900)
      window.dispatchEvent(new Event('resize'))
    })
    expect(result.current).toBe(900)
  })
})
