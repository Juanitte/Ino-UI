export interface ScrollToOptions {
  /** Scroll container — defaults to `window` */
  container?: Element | Window
  /** Animation duration in ms — defaults to 450 */
  duration?: number
  /** Called after the animation completes */
  callback?: () => void
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function getScrollTop(container: Element | Window): number {
  if (container === window) return window.scrollY ?? window.pageYOffset
  return (container as Element).scrollTop
}

function setScrollTop(container: Element | Window, value: number): void {
  if (container === window) {
    window.scrollTo(0, value)
  } else {
    ;(container as Element).scrollTop = value
  }
}

/**
 * Smoothly scrolls a container to the given `top` position.
 *
 * @param top      Target scrollTop value in pixels
 * @param options  Optional container, duration (ms), and callback
 */
export function scrollTo(top: number, options: ScrollToOptions = {}): void {
  const { container = window, duration = 450, callback } = options

  const startTop = getScrollTop(container)
  const distance = top - startTop

  if (distance === 0) {
    callback?.()
    return
  }

  const startTime = performance.now()

  function step(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = easeInOutCubic(progress)

    setScrollTop(container, startTop + distance * eased)

    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      callback?.()
    }
  }

  requestAnimationFrame(step)
}
