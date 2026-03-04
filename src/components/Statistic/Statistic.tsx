import {
  useState,
  useEffect,
  useRef,
  type ReactNode,
  type CSSProperties,
} from 'react'
import { tokens } from '../../theme/tokens'
import type { SemanticClassNames, SemanticStyles } from '../../utils/semanticDom'
import { mergeSemanticClassName, mergeSemanticStyle } from '../../utils/semanticDom'

// ─── Types ──────────────────────────────────────────────────────────────────────

export type StatisticSemanticSlot = 'root' | 'title' | 'content' | 'prefix' | 'suffix'
export type StatisticClassNames = SemanticClassNames<StatisticSemanticSlot>
export type StatisticStyles = SemanticStyles<StatisticSemanticSlot>

export interface StatisticProps {
  /** Title displayed above the value */
  title?: ReactNode
  /** Numeric or string value to display */
  value?: string | number
  /** Number of decimal places */
  precision?: number
  /** Separator for decimal part */
  decimalSeparator?: string
  /** Separator for thousands grouping */
  groupSeparator?: string
  /** Content rendered before the value */
  prefix?: ReactNode
  /** Content rendered after the value */
  suffix?: ReactNode
  /** Custom formatter for the value — overrides default number formatting */
  formatter?: (value: string | number) => ReactNode
  /** Show loading placeholder instead of value */
  loading?: boolean
  /** Width of the loading placeholder (default '7rem') */
  loadingWidth?: string
  /** Root CSS class */
  className?: string
  /** Root inline style */
  style?: CSSProperties
  /** Semantic class names */
  classNames?: StatisticClassNames
  /** Semantic styles */
  styles?: StatisticStyles
}

export type CountdownSemanticSlot = StatisticSemanticSlot
export type CountdownClassNames = SemanticClassNames<CountdownSemanticSlot>
export type CountdownStyles = SemanticStyles<CountdownSemanticSlot>

export interface StatisticCountdownProps {
  /** Title displayed above the countdown */
  title?: ReactNode
  /** Target timestamp in milliseconds */
  value: number
  /** Format string — tokens: D, DD, H, HH, m, mm, s, ss, SSS. Use [text] for literals, [singular|plural] for inflection */
  format?: string
  /** Content rendered before the value */
  prefix?: ReactNode
  /** Content rendered after the value */
  suffix?: ReactNode
  /** Callback when countdown reaches zero */
  onFinish?: () => void
  /** Callback on each tick, receives remaining ms */
  onChange?: (value: number) => void
  /** Root CSS class */
  className?: string
  /** Root inline style */
  style?: CSSProperties
  /** Semantic class names */
  classNames?: CountdownClassNames
  /** Semantic styles */
  styles?: CountdownStyles
}

// ─── Loading Animation ──────────────────────────────────────────────────────────

const LOADING_KEYFRAMES = `
@keyframes j-statistic-loading {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}`

let stylesInjected = false
function injectStatisticStyles() {
  if (stylesInjected || typeof document === 'undefined') return
  const style = document.createElement('style')
  style.textContent = LOADING_KEYFRAMES
  document.head.appendChild(style)
  stylesInjected = true
}

// ─── Number Formatting ──────────────────────────────────────────────────────────

function formatNumber(
  value: string | number,
  precision?: number,
  decimalSeparator = '.',
  groupSeparator = ',',
): string {
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return String(value)

  const fixed = precision !== undefined ? num.toFixed(precision) : String(num)
  const [intPart, decPart] = fixed.split('.')
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator)

  return decPart !== undefined
    ? `${grouped}${decimalSeparator}${decPart}`
    : grouped
}

// ─── Countdown Formatting ───────────────────────────────────────────────────────

function formatCountdown(ms: number, format: string): string {
  const remaining = Math.max(0, ms)

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24))
  const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000)
  const milliseconds = Math.floor(remaining % 1000)

  // 1. Extract [bracketed] literals into placeholders
  const literals: string[] = []
  let safe = format.replace(/\[([^\]]*)\]/g, (_, text: string) => {
    literals.push(text)
    return `\x00${literals.length - 1}\x00`
  })

  // 2. Single-pass token replacement (longest first to avoid partial matches)
  safe = safe.replace(/SSS|DD|D|HH|H|mm|m|ss|s/g, (token) => {
    switch (token) {
      case 'SSS': return String(milliseconds).padStart(3, '0')
      case 'DD':  return String(days).padStart(2, '0')
      case 'D':   return String(days)
      case 'HH':  return String(hours).padStart(2, '0')
      case 'H':   return String(hours)
      case 'mm':  return String(minutes).padStart(2, '0')
      case 'm':   return String(minutes)
      case 'ss':  return String(seconds).padStart(2, '0')
      case 's':   return String(seconds)
      default:    return token
    }
  })

  // 3. Restore literals — supports [singular|plural] based on preceding number
  return safe.replace(/\x00(\d+)\x00/g, (_, idx, offset) => {
    const literal = literals[Number(idx)]
    const pipe = literal.indexOf('|')
    if (pipe === -1) return literal

    const before = safe.slice(0, offset)
    const numMatch = before.match(/(\d+)\s*$/)
    const n = numMatch ? parseInt(numMatch[1], 10) : 0
    return n === 1 ? literal.slice(0, pipe) : literal.slice(pipe + 1)
  })
}

// ─── Loading Placeholder ────────────────────────────────────────────────────────

function LoadingPlaceholder({ width = '7rem' }: { width?: string }) {
  injectStatisticStyles()
  return (
    <span
      style={{
        display: 'inline-block',
        width,
        height: '1.5rem',
        borderRadius: '0.25rem',
        backgroundColor: tokens.colorBgMuted,
        animation: 'j-statistic-loading 1.5s ease-in-out infinite',
        verticalAlign: 'middle',
      }}
    />
  )
}

// ─── Shared base styles ─────────────────────────────────────────────────────────

const baseTitleStyle: CSSProperties = {
  marginBottom: '0.25rem',
  color: tokens.colorTextMuted,
  fontSize: '0.875rem',
  lineHeight: 1.6,
}

const baseContentStyle: CSSProperties = {
  color: tokens.colorText,
  fontSize: '1.5rem',
  fontWeight: 600,
  fontFamily: 'inherit',
  fontVariantNumeric: 'tabular-nums',
  lineHeight: 1.4,
}

const basePrefixStyle: CSSProperties = {
  marginRight: '0.25rem',
  display: 'inline-flex',
  alignItems: 'center',
}

const baseSuffixStyle: CSSProperties = {
  marginLeft: '0.25rem',
  display: 'inline-flex',
  alignItems: 'center',
}

// ─── Statistic Component ────────────────────────────────────────────────────────

function StatisticComponent({
  title,
  value = 0,
  precision,
  decimalSeparator = '.',
  groupSeparator = ',',
  prefix,
  suffix,
  formatter,
  loading = false,
  loadingWidth,
  className,
  style,
  classNames,
  styles,
}: StatisticProps) {
  const displayValue = loading
    ? <LoadingPlaceholder width={loadingWidth} />
    : formatter
      ? formatter(value)
      : formatNumber(value, precision, decimalSeparator, groupSeparator)

  return (
    <div
      className={mergeSemanticClassName(className, classNames?.root)}
      style={mergeSemanticStyle({}, styles?.root, style)}
    >
      {title != null && (
        <div className={classNames?.title} style={mergeSemanticStyle(baseTitleStyle, styles?.title)}>
          {title}
        </div>
      )}
      <div className={classNames?.content} style={mergeSemanticStyle(baseContentStyle, styles?.content)}>
        {prefix != null && (
          <span className={classNames?.prefix} style={mergeSemanticStyle(basePrefixStyle, styles?.prefix)}>
            {prefix}
          </span>
        )}
        <span>{displayValue}</span>
        {suffix != null && (
          <span className={classNames?.suffix} style={mergeSemanticStyle(baseSuffixStyle, styles?.suffix)}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Statistic.Countdown ────────────────────────────────────────────────────────

function StatisticCountdown({
  title,
  value,
  format = 'HH:mm:ss',
  prefix,
  suffix,
  onFinish,
  onChange,
  className,
  style,
  classNames,
  styles,
}: StatisticCountdownProps) {
  const [remaining, setRemaining] = useState(() => Math.max(0, value - Date.now()))
  const onFinishRef = useRef(onFinish)
  const onChangeRef = useRef(onChange)
  const finishedRef = useRef(false)

  onFinishRef.current = onFinish
  onChangeRef.current = onChange

  useEffect(() => {
    finishedRef.current = false

    const tick = () => {
      const diff = Math.max(0, value - Date.now())
      setRemaining(diff)
      onChangeRef.current?.(diff)

      if (diff <= 0 && !finishedRef.current) {
        finishedRef.current = true
        onFinishRef.current?.()
      }
    }

    tick()

    const intervalMs = format.includes('SSS') ? 33 : 1000
    const id = setInterval(tick, intervalMs)

    return () => clearInterval(id)
  }, [value, format])

  const displayValue = formatCountdown(remaining, format)

  return (
    <div
      className={mergeSemanticClassName(className, classNames?.root)}
      style={mergeSemanticStyle({}, styles?.root, style)}
    >
      {title != null && (
        <div className={classNames?.title} style={mergeSemanticStyle(baseTitleStyle, styles?.title)}>
          {title}
        </div>
      )}
      <div className={classNames?.content} style={mergeSemanticStyle(baseContentStyle, styles?.content)}>
        {prefix != null && (
          <span className={classNames?.prefix} style={mergeSemanticStyle(basePrefixStyle, styles?.prefix)}>
            {prefix}
          </span>
        )}
        <span>{displayValue}</span>
        {suffix != null && (
          <span className={classNames?.suffix} style={mergeSemanticStyle(baseSuffixStyle, styles?.suffix)}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

// ─── Compound Export ────────────────────────────────────────────────────────────

export const Statistic = Object.assign(StatisticComponent, {
  Countdown: StatisticCountdown,
})
