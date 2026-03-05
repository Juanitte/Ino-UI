import { useCallback, useLayoutEffect, useRef } from 'react'

/**
 * Returns a stable callback reference that always calls the latest version of `fn`.
 * Safe to pass to memoized children without breaking referential equality.
 *
 * @example
 * const onClick = useEvent(() => console.log(count))
 * // onClick is stable across renders, but always reads the latest `count`
 */
export function useEvent<T extends (...args: never[]) => unknown>(fn: T): T {
  const fnRef = useRef<T>(fn)

  useLayoutEffect(() => {
    fnRef.current = fn
  })

  return useCallback((...args: Parameters<T>) => fnRef.current(...args), []) as unknown as T
}
