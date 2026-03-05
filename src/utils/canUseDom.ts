/**
 * Returns true if the DOM is available (i.e., running in a browser, not SSR).
 */
export function canUseDom(): boolean {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )
}
