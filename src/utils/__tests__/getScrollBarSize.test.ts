import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getScrollBarSize } from '../getScrollBarSize'

describe('getScrollBarSize', () => {
  beforeEach(() => {
    // Reset the module-level cache between tests by using fresh=true
    // The cache lives at module scope so we can't reset it directly;
    // we rely on fresh=true to bypass it.
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns a number', () => {
    const size = getScrollBarSize(true)
    expect(typeof size).toBe('number')
  })

  it('returns 0 in jsdom (offsetWidth === clientWidth)', () => {
    // jsdom doesn't have real layout; div.offsetWidth and div.clientWidth are both 0
    const size = getScrollBarSize(true)
    expect(size).toBe(0)
  })

  it('caches the result on second call', () => {
    // Prime the cache
    getScrollBarSize(true)

    const appendSpy = vi.spyOn(document.body, 'appendChild')
    // Call without fresh — should use cached value, not touch DOM
    getScrollBarSize()
    expect(appendSpy).not.toHaveBeenCalled()
  })

  it('re-measures when fresh=true is passed', () => {
    // Prime cache
    getScrollBarSize(true)

    const appendSpy = vi.spyOn(document.body, 'appendChild')
    getScrollBarSize(true)
    expect(appendSpy).toHaveBeenCalledTimes(1)
  })

  it('creates and removes the measurement div', () => {
    const appendSpy = vi.spyOn(document.body, 'appendChild')
    const removeSpy = vi.spyOn(document.body, 'removeChild')

    getScrollBarSize(true)

    expect(appendSpy).toHaveBeenCalledTimes(1)
    expect(removeSpy).toHaveBeenCalledTimes(1)

    const appended = appendSpy.mock.calls[0][0] as HTMLElement
    expect(appended.style.overflow).toBe('scroll')
  })
})
