/**
 * Returns a shallow copy of `obj` without the specified `keys`.
 *
 * @example
 * omit({ a: 1, b: 2, c: 3 }, ['b', 'c']) // { a: 1 }
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...obj }
  for (const key of keys) {
    delete (result as Record<string, unknown>)[key as string]
  }
  return result as Omit<T, K>
}
