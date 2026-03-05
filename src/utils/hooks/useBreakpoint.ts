import { BREAKPOINT_VALUES, type Breakpoint } from '../breakpoints'
import { useWindowWidth } from './useWindowWidth'

/**
 * Returns a map of which breakpoints are currently active (i.e. `windowWidth >= bp`).
 *
 * @example
 * const bp = useBreakpoint()
 * // At 900 px: { xs: true, sm: true, md: true, lg: false, xl: false, xxl: false }
 */
export function useBreakpoint(): Record<Breakpoint, boolean> {
  const width = useWindowWidth()

  return {
    xs: width >= BREAKPOINT_VALUES.xs,
    sm: width >= BREAKPOINT_VALUES.sm,
    md: width >= BREAKPOINT_VALUES.md,
    lg: width >= BREAKPOINT_VALUES.lg,
    xl: width >= BREAKPOINT_VALUES.xl,
    xxl: width >= BREAKPOINT_VALUES.xxl,
  }
}
