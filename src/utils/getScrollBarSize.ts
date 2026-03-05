let cached: number | undefined

/**
 * Returns the width of the browser's native scrollbar in pixels.
 * Result is cached after the first call. Pass `fresh = true` to re-measure.
 */
export function getScrollBarSize(fresh?: boolean): number {
  if (typeof window === 'undefined') return 0
  if (!fresh && cached !== undefined) return cached

  const div = document.createElement('div')
  div.style.cssText =
    'width:100px;height:100px;overflow:scroll;position:absolute;top:-9999px;visibility:hidden;'
  document.body.appendChild(div)
  cached = div.offsetWidth - div.clientWidth
  document.body.removeChild(div)
  return cached
}
