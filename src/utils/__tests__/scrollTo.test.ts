import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { scrollTo } from '../scrollTo'

const START_TIME = 1000

function setupRaf() {
  const callbacks: FrameRequestCallback[] = []
  vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb) => {
    callbacks.push(cb)
    return callbacks.length
  })
  return {
    flush(timestamp: number) {
      const pending = callbacks.splice(0)
      for (const cb of pending) cb(timestamp)
    },
  }
}

describe('scrollTo', () => {
  beforeEach(() => {
    vi.spyOn(performance, 'now').mockReturnValue(START_TIME)
    // Reset window scroll
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 })
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('calls callback immediately when distance is 0', () => {
    const callback = vi.fn()
    // window.scrollY = 0, top = 0 → distance = 0
    scrollTo(0, { callback })
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('does not call requestAnimationFrame when distance is 0', () => {
    const raf = vi.spyOn(globalThis, 'requestAnimationFrame')
    scrollTo(0, { callback: vi.fn() })
    expect(raf).not.toHaveBeenCalled()
  })

  it('calls requestAnimationFrame when distance > 0', () => {
    const { flush } = setupRaf()
    scrollTo(500)
    expect(requestAnimationFrame).toHaveBeenCalledTimes(1)
    // clean up
    flush(START_TIME + 1000)
  })

  it('sets scroll position during animation', () => {
    const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    const { flush } = setupRaf()

    scrollTo(500)
    // Half-duration: easeInOutCubic(0.5) = 0.5 → scrollTop = 0 + 500 * 0.5 = 250
    flush(START_TIME + 225) // 225/450 = 0.5 progress
    expect(scrollSpy).toHaveBeenCalled()
    const [, y] = scrollSpy.mock.calls[0]
    expect(y).toBeGreaterThan(0)
    expect(y).toBeLessThan(500)
  })

  it('calls callback when animation completes', () => {
    const callback = vi.fn()
    const { flush } = setupRaf()

    scrollTo(200, { duration: 200, callback })
    // progress = 1 → complete
    flush(START_TIME + 200)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('sets final scroll to target when animation completes', () => {
    const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    const { flush } = setupRaf()

    scrollTo(300, { duration: 100 })
    // progress >= 1 → eased = 1 → scrollTop = 0 + 300 * 1 = 300
    flush(START_TIME + 100)
    const calls = scrollSpy.mock.calls
    const lastCall = calls[calls.length - 1]
    expect(lastCall[1]).toBe(300)
  })

  it('continues animation when progress < 1', () => {
    const { flush } = setupRaf()
    const rafSpy = requestAnimationFrame as ReturnType<typeof vi.spyOn>

    scrollTo(500, { duration: 450 })
    expect(rafSpy).toHaveBeenCalledTimes(1)

    // Flush at 50% — progress < 1, should request another frame
    flush(START_TIME + 200)
    expect(rafSpy).toHaveBeenCalledTimes(2)
  })

  it('scrolls an element container', () => {
    const el = { scrollTop: 0 } as HTMLElement
    const { flush } = setupRaf()

    scrollTo(100, { container: el, duration: 100 })
    flush(START_TIME + 100)
    expect(el.scrollTop).toBe(100)
  })

  it('element container: callback fires on completion', () => {
    const el = { scrollTop: 0 } as HTMLElement
    const callback = vi.fn()
    const { flush } = setupRaf()

    scrollTo(50, { container: el, duration: 50, callback })
    flush(START_TIME + 50)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('uses 450ms default duration', () => {
    const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    const { flush } = setupRaf()

    scrollTo(100)
    flush(START_TIME + 450)
    const calls = scrollSpy.mock.calls
    const lastCall = calls[calls.length - 1]
    expect(lastCall[1]).toBe(100)
  })
})
