import {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
  type ReactNode,
  type CSSProperties,
} from 'react'
import { tokens } from '../../theme/tokens'
import type { SemanticClassNames, SemanticStyles } from '../../utils/semanticDom'
import { mergeSemanticClassName, mergeSemanticStyle } from '../../utils/semanticDom'

// ─── Types ──────────────────────────────────────────────────────────────────────

export type ToggleSize = 'large' | 'middle' | 'small'

export type ToggleSemanticSlot = 'root' | 'item' | 'thumb'
export type ToggleClassNames = SemanticClassNames<ToggleSemanticSlot>
export type ToggleStyles = SemanticStyles<ToggleSemanticSlot>

export interface ToggleItemType {
  value: string | number
  label?: ReactNode
  icon?: ReactNode
  disabled?: boolean
  className?: string
}

export interface ToggleProps {
  /** Array of segment options */
  options: (string | number | ToggleItemType)[]
  /** Currently selected value (controlled) */
  value?: string | number
  /** Default selected value (uncontrolled) */
  defaultValue?: string | number
  /** Callback when selection changes */
  onChange?: (value: string | number) => void
  /** Disable all segments */
  disabled?: boolean
  /** Fit to full width of container */
  block?: boolean
  /** Vertical layout */
  vertical?: boolean
  /** Size variant */
  size?: ToggleSize
  /** Form input name (enables native radio group behavior + arrow key navigation) */
  name?: string
  /** Root CSS class */
  className?: string
  /** Root inline style */
  style?: CSSProperties
  /** Semantic class names */
  classNames?: ToggleClassNames
  /** Semantic styles */
  styles?: ToggleStyles
}

// ─── Size Config ────────────────────────────────────────────────────────────────

const sizeConfig: Record<ToggleSize, {
  height: string
  fontSize: string
  paddingH: string
  radius: string
  thumbRadius: string
  thumbPadding: string
}> = {
  small:  { height: '1.5rem',  fontSize: '0.75rem',  paddingH: '0.4375rem', radius: '0.375rem', thumbRadius: '0.25rem', thumbPadding: '0.125rem' },
  middle: { height: '2rem',    fontSize: '0.875rem', paddingH: '0.6875rem', radius: '0.5rem',   thumbRadius: '0.375rem', thumbPadding: '0.125rem' },
  large:  { height: '2.5rem',  fontSize: '1rem',     paddingH: '0.75rem',   radius: '0.5rem',   thumbRadius: '0.375rem', thumbPadding: '0.125rem' },
}

// ─── Toggle Component ───────────────────────────────────────────────────────────

export function Toggle({
  options,
  value,
  defaultValue,
  onChange,
  disabled = false,
  block = false,
  vertical = false,
  size = 'middle',
  name,
  className,
  style,
  classNames,
  styles,
}: ToggleProps) {
  const sc = sizeConfig[size]

  // ─── Normalize options ──────────────────────────────────

  const normalizedOptions: ToggleItemType[] = options.map(opt => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { value: opt, label: String(opt) }
    }
    return { ...opt, label: opt.label ?? (opt.icon ? undefined : String(opt.value)) }
  })

  // ─── Controlled / uncontrolled ──────────────────────────

  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = useState<string | number | undefined>(
    defaultValue ?? normalizedOptions[0]?.value,
  )
  const currentValue = isControlled ? value : internalValue

  const handleSelect = useCallback((itemValue: string | number) => {
    if (!isControlled) setInternalValue(itemValue)
    onChange?.(itemValue)
  }, [isControlled, onChange])

  // ─── Refs ───────────────────────────────────────────────

  const trackRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<string | number, HTMLDivElement>>(new Map())
  const isFirstRender = useRef(true)

  const setItemRef = useCallback((val: string | number) => (el: HTMLDivElement | null) => {
    if (el) itemRefs.current.set(val, el)
    else itemRefs.current.delete(val)
  }, [])

  // ─── Thumb measurement ─────────────────────────────────

  const [thumbStyle, setThumbStyle] = useState<CSSProperties>({ opacity: 0 })

  const updateThumb = useCallback(() => {
    const trackEl = trackRef.current
    if (!trackEl) return

    const selectedEl = currentValue !== undefined ? itemRefs.current.get(currentValue) : undefined
    if (!selectedEl) {
      setThumbStyle(prev => prev.opacity === 0 ? prev : { opacity: 0 })
      return
    }

    const left = selectedEl.offsetLeft
    const top = selectedEl.offsetTop
    const width = selectedEl.offsetWidth
    const height = selectedEl.offsetHeight

    const transitionProps = vertical
      ? 'top 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), height 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)'
      : 'left 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)'

    setThumbStyle({
      position: 'absolute',
      top: vertical ? top : sc.thumbPadding,
      left: vertical ? sc.thumbPadding : left,
      width: vertical ? `calc(100% - 2 * ${sc.thumbPadding})` : width,
      height: vertical ? height : `calc(100% - 2 * ${sc.thumbPadding})`,
      borderRadius: sc.thumbRadius,
      backgroundColor: tokens.colorBg,
      boxShadow: '0 1px 2px 0 rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02), 0 2px 4px 0 rgba(0,0,0,0.02)',
      transition: isFirstRender.current ? 'none' : transitionProps,
      zIndex: 0,
      pointerEvents: 'none',
      opacity: 1,
    })

    if (isFirstRender.current) {
      requestAnimationFrame(() => { isFirstRender.current = false })
    }
  }, [currentValue, sc.thumbPadding, sc.thumbRadius, vertical])

  useLayoutEffect(() => {
    updateThumb()
  }, [updateThumb])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const ro = new ResizeObserver(() => updateThumb())
    ro.observe(track)

    return () => ro.disconnect()
  }, [updateThumb])

  // ─── Arrow key navigation ──────────────────────────────

  const handleKeyDown = useCallback((e: React.KeyboardEvent, itemValue: string | number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      const item = normalizedOptions.find(o => o.value === itemValue)
      if (item && !item.disabled && itemValue !== currentValue) handleSelect(itemValue)
      return
    }

    const prevKeys = vertical ? ['ArrowUp'] : ['ArrowLeft']
    const nextKeys = vertical ? ['ArrowDown'] : ['ArrowRight']

    if (!prevKeys.includes(e.key) && !nextKeys.includes(e.key)) return
    e.preventDefault()

    const currentIdx = normalizedOptions.findIndex(o => o.value === itemValue)
    const dir = nextKeys.includes(e.key) ? 1 : -1
    const len = normalizedOptions.length

    // Find next non-disabled option
    for (let i = 1; i < len; i++) {
      const idx = (currentIdx + dir * i + len) % len
      const opt = normalizedOptions[idx]
      if (!opt.disabled) {
        handleSelect(opt.value)
        itemRefs.current.get(opt.value)?.focus()
        return
      }
    }
  }, [normalizedOptions, currentValue, handleSelect, vertical])

  // ─── Hover ──────────────────────────────────────────────

  const hasCustomItemColors = !!(styles?.item && (
    'backgroundColor' in styles.item ||
    'borderColor' in styles.item ||
    'border' in styles.item ||
    'color' in styles.item
  ))

  const handleItemMouseEnter = (
    e: React.MouseEvent,
    isSelected: boolean,
    isItemDisabled: boolean,
  ) => {
    if (isItemDisabled || isSelected) return
    const el = e.currentTarget as HTMLElement
    if (hasCustomItemColors) {
      el.style.filter = 'brightness(1.15)'
    } else {
      el.style.color = tokens.colorText
    }
  }

  const handleItemMouseLeave = (
    e: React.MouseEvent,
    isSelected: boolean,
    isItemDisabled: boolean,
  ) => {
    if (isItemDisabled || isSelected) return
    const el = e.currentTarget as HTMLElement
    if (hasCustomItemColors) {
      el.style.filter = ''
    } else {
      el.style.color = tokens.colorTextMuted
    }
  }

  // ─── Styles ─────────────────────────────────────────────

  const trackStyle: CSSProperties = {
    position: 'relative',
    display: block || vertical ? 'flex' : 'inline-flex',
    flexDirection: vertical ? 'column' : 'row',
    width: block || vertical ? '100%' : undefined,
    alignItems: vertical ? 'stretch' : 'center',
    backgroundColor: tokens.colorBgMuted,
    borderRadius: sc.radius,
    padding: sc.thumbPadding,
    boxSizing: 'border-box',
    ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}),
  }

  const getItemStyle = (isSelected: boolean, isItemDisabled: boolean): CSSProperties => ({
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.375rem',
    height: vertical ? undefined : `calc(${sc.height} - 2 * ${sc.thumbPadding})`,
    padding: vertical ? `${sc.paddingH} ${sc.paddingH}` : `0 ${sc.paddingH}`,
    fontSize: sc.fontSize,
    fontFamily: 'inherit',
    color: isSelected ? tokens.colorText : tokens.colorTextMuted,
    fontWeight: isSelected ? 600 : 400,
    cursor: isItemDisabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    borderRadius: sc.thumbRadius,
    transition: 'color 0.2s ease, font-weight 0.2s ease',
    zIndex: 1,
    flex: block && !vertical ? 1 : undefined,
    ...(isItemDisabled && !disabled ? { opacity: 0.5 } : {}),
  })

  // ─── Render ─────────────────────────────────────────────

  return (
    <div
      ref={trackRef}
      role="radiogroup"
      className={mergeSemanticClassName(className, classNames?.root)}
      style={mergeSemanticStyle(trackStyle, styles?.root, style)}
    >
      <div
        className={classNames?.thumb}
        style={mergeSemanticStyle(thumbStyle, styles?.thumb)}
      />

      {normalizedOptions.map(item => {
        const isSelected = item.value === currentValue
        const isItemDisabled = !!(item.disabled || disabled)

        return (
          <div
            key={String(item.value)}
            ref={setItemRef(item.value)}
            role="radio"
            aria-checked={isSelected}
            aria-disabled={isItemDisabled || undefined}
            tabIndex={isSelected ? 0 : -1}
            className={mergeSemanticClassName(item.className, classNames?.item)}
            style={mergeSemanticStyle(getItemStyle(isSelected, isItemDisabled), styles?.item)}
            onClick={() => {
              if (!isItemDisabled && item.value !== currentValue) handleSelect(item.value)
            }}
            onMouseEnter={e => handleItemMouseEnter(e, isSelected, isItemDisabled)}
            onMouseLeave={e => handleItemMouseLeave(e, isSelected, isItemDisabled)}
            onKeyDown={e => handleKeyDown(e, item.value)}
          >
            {name && (
              <input
                type="radio"
                name={name}
                value={String(item.value)}
                checked={isSelected}
                disabled={isItemDisabled}
                onChange={() => handleSelect(item.value)}
                style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
              />
            )}
            {item.icon && <span style={{ display: 'inline-flex', lineHeight: 0 }}>{item.icon}</span>}
            {item.label && <span>{item.label}</span>}
          </div>
        )
      })}
    </div>
  )
}
