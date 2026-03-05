import { useCallback, useRef, useState } from 'react'

export interface UseMergedStateOptions<T> {
  /** External (controlled) value. When provided, the hook operates in controlled mode. */
  value?: T
  /** Called whenever the value changes (both controlled and uncontrolled). */
  onChange?: (value: T, prevValue: T) => void
  /** Optional transform applied to the value before it is returned. */
  postState?: (value: T) => T
}

/**
 * Merges controlled and uncontrolled state into a single interface.
 *
 * - **Controlled**: when `options.value` is defined, the returned state always
 *   reflects that value; the setter calls `onChange` but does NOT update internal state.
 * - **Uncontrolled**: internal `useState` is used; the setter updates state and calls `onChange`.
 *
 * @example
 * // Uncontrolled
 * const [val, setVal] = useMergedState('default')
 *
 * // Controlled
 * const [val, setVal] = useMergedState('default', { value: controlled, onChange: setControlled })
 */
export function useMergedState<T>(
  defaultValue: T,
  options: UseMergedStateOptions<T> = {},
): [T, (next: T) => void] {
  const { value: controlledValue, onChange, postState } = options

  const [innerValue, setInnerValue] = useState<T>(defaultValue)

  const isControlled = controlledValue !== undefined
  const mergedValue = isControlled ? controlledValue : innerValue
  const displayValue = postState ? postState(mergedValue) : mergedValue

  // Keep a ref so the setter closure always reads the latest value
  const mergedValueRef = useRef<T>(mergedValue)
  mergedValueRef.current = mergedValue

  const setValue = useCallback(
    (next: T) => {
      const prev = mergedValueRef.current
      if (!isControlled) {
        setInnerValue(next)
      }
      onChange?.(next, prev)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isControlled, onChange],
  )

  return [displayValue, setValue]
}
