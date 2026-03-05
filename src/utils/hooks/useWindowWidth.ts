import { useEffect, useState } from 'react'

/**
 * Returns the current `window.innerWidth`, updating whenever the window is resized.
 * SSR-safe: returns `1200` on the server.
 *
 * @example
 * const width = useWindowWidth()
 * // 1440 on a desktop, updates on resize
 */
export function useWindowWidth(): number {
  const [width, setWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200,
  )

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler, { passive: true })
    return () => window.removeEventListener('resize', handler)
  }, [])

  return width
}
