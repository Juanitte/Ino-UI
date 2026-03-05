/**
 * Standard responsive breakpoints used throughout Ino-UI.
 * Matches the values in Grid, Avatar, Waterfall, and DataDisplay components.
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

/** A value that can be a scalar or a per-breakpoint map. */
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>

/** Minimum window widths (px) for each breakpoint */
export const BREAKPOINT_VALUES: Record<Breakpoint, number> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
}

/** Breakpoints ordered from largest to smallest (for cascade resolution) */
export const BREAKPOINT_ORDER: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']

/**
 * Resolves a responsive value for the given window width.
 * If `value` is a plain (non-object) scalar, it is returned as-is.
 * Otherwise the largest active breakpoint's value is returned.
 *
 * @example
 * getResponsiveValue({ sm: 1, md: 2, lg: 3 }, 900) // 2  (md is active)
 * getResponsiveValue(42, 900)                        // 42
 */
export function getResponsiveValue<T>(
  value: T | Partial<Record<Breakpoint, T>>,
  windowWidth: number,
): T | undefined {
  if (typeof value !== 'object' || value === null) return value as T
  const responsive = value as Partial<Record<Breakpoint, T>>
  for (const bp of BREAKPOINT_ORDER) {
    if (windowWidth >= BREAKPOINT_VALUES[bp] && responsive[bp] !== undefined) {
      return responsive[bp]
    }
  }
  return undefined
}
