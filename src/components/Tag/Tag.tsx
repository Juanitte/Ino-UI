import { type ReactNode, type CSSProperties, useRef, useState, useCallback } from 'react'
import { tokens } from '../../theme/tokens'
import type { SemanticClassNames, SemanticStyles } from '../../utils/semanticDom'
import { mergeSemanticStyle, mergeSemanticClassName } from '../../utils/semanticDom'

// ─── Types ──────────────────────────────────────────────────────────────────────

export type TagPresetColor =
  | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
  | 'pink' | 'red' | 'yellow' | 'orange' | 'cyan' | 'green'
  | 'blue' | 'purple' | 'geekblue' | 'magenta' | 'volcano' | 'gold' | 'lime'

export type TagVariant = 'outlined' | 'filled' | 'solid'

export type TagSemanticSlot = 'root' | 'icon' | 'content' | 'closeIcon'
export type TagClassNames = SemanticClassNames<TagSemanticSlot>
export type TagStyles = SemanticStyles<TagSemanticSlot>

export interface TagProps {
  children?: ReactNode
  color?: TagPresetColor | (string & {})
  variant?: TagVariant
  closable?: boolean
  closeIcon?: ReactNode
  onClose?: (e: React.MouseEvent) => void
  icon?: ReactNode
  bordered?: boolean
  href?: string
  target?: string
  disabled?: boolean
  onClick?: (e: React.MouseEvent) => void
  className?: string
  style?: CSSProperties
  classNames?: TagClassNames
  styles?: TagStyles
}

export type CheckableTagSemanticSlot = 'root' | 'content'
export type CheckableTagClassNames = SemanticClassNames<CheckableTagSemanticSlot>
export type CheckableTagStyles = SemanticStyles<CheckableTagSemanticSlot>

export interface CheckableTagProps {
  children?: ReactNode
  checked?: boolean
  onChange?: (checked: boolean) => void
  color?: TagPresetColor | (string & {})
  disabled?: boolean
  className?: string
  style?: CSSProperties
  classNames?: CheckableTagClassNames
  styles?: CheckableTagStyles
}

// ─── Color Resolution ───────────────────────────────────────────────────────────

interface ResolvedColor {
  bg: string
  border: string
  text: string
  solid: string
}

const STATUS_PRESETS: Record<string, ResolvedColor> = {
  primary:   { bg: tokens.colorPrimaryLight,   border: tokens.colorPrimaryBorder,   text: tokens.colorPrimary,   solid: tokens.colorPrimary },
  secondary: { bg: tokens.colorSecondaryLight,  border: tokens.colorSecondaryBorder, text: tokens.colorSecondary, solid: tokens.colorSecondary },
  success:   { bg: tokens.colorSuccessLight,    border: tokens.colorSuccessBorder,   text: tokens.colorSuccess,   solid: tokens.colorSuccess },
  warning:   { bg: tokens.colorWarningLight,    border: tokens.colorWarningBorder,   text: tokens.colorWarning,   solid: tokens.colorWarning },
  error:     { bg: tokens.colorErrorLight,      border: tokens.colorErrorBorder,     text: tokens.colorError,     solid: tokens.colorError },
  info:      { bg: tokens.colorInfoLight,       border: tokens.colorInfoBorder,      text: tokens.colorInfo,      solid: tokens.colorInfo },
}

const DECORATIVE_PRESETS: Record<string, string> = {
  pink:     '#eb2f96',
  magenta:  '#eb2f96',
  red:      '#f5222d',
  volcano:  '#fa541c',
  orange:   '#fa8c16',
  gold:     '#faad14',
  yellow:   '#fadb14',
  lime:     '#a0d911',
  green:    '#52c41a',
  cyan:     '#13c2c2',
  blue:     '#1677ff',
  geekblue: '#2f54eb',
  purple:   '#722ed1',
}

function resolveColorForVariant(
  color: string | undefined,
  variant: TagVariant,
): { backgroundColor: string; borderColor: string; color: string } {
  // No color → default tag
  if (!color) {
    if (variant === 'solid') {
      return { backgroundColor: tokens.colorTextMuted, borderColor: tokens.colorTextMuted, color: '#fff' }
    }
    if (variant === 'filled') {
      return { backgroundColor: tokens.colorBgMuted, borderColor: 'transparent', color: tokens.colorText }
    }
    // outlined
    return { backgroundColor: 'transparent', borderColor: tokens.colorBorder, color: tokens.colorText }
  }

  // Status preset
  const status = STATUS_PRESETS[color]
  if (status) {
    if (variant === 'solid') {
      return { backgroundColor: status.solid, borderColor: status.solid, color: '#fff' }
    }
    if (variant === 'filled') {
      return {
        backgroundColor: `color-mix(in srgb, ${status.solid} 25%, transparent)`,
        borderColor: 'transparent',
        color: status.text,
      }
    }
    // outlined
    return { backgroundColor: 'transparent', borderColor: status.border, color: status.text }
  }

  // Decorative preset or custom hex/rgb
  const hex = DECORATIVE_PRESETS[color] ?? color
  if (variant === 'solid') {
    return { backgroundColor: hex, borderColor: hex, color: '#fff' }
  }
  if (variant === 'filled') {
    return {
      backgroundColor: `color-mix(in srgb, ${hex} 25%, transparent)`,
      borderColor: 'transparent',
      color: hex,
    }
  }
  // outlined
  return {
    backgroundColor: 'transparent',
    borderColor: `color-mix(in srgb, ${hex} 45%, transparent)`,
    color: hex,
  }
}

// ─── Animations ─────────────────────────────────────────────────────────────────

const TAG_KEYFRAMES = `
@keyframes j-tag-enter {
  from { opacity: 0; transform: scale(0.8); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes j-tag-exit {
  from { opacity: 1; transform: scale(1); }
  to   { opacity: 0; transform: scale(0.8); }
}
@keyframes j-tag-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}`

let tagStylesInjected = false
function injectTagStyles() {
  if (tagStylesInjected || typeof document === 'undefined') return
  const style = document.createElement('style')
  style.textContent = TAG_KEYFRAMES
  document.head.appendChild(style)
  tagStylesInjected = true
}

// ─── Icons ──────────────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg viewBox="0 0 1024 1024" width="10" height="10" fill="currentColor" aria-hidden="true">
      <path d="M563.8 512l262.5-312.9c4.4-5.2 0.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L512 442.2 295.9 191.7c-3-3.6-7.5-5.7-12.3-5.7H203.8c-6.8 0-10.5 7.9-6.1 13.1L460.2 512 197.7 824.9c-4.4 5.2-0.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7L512 581.8l216.1 250.5c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor" aria-hidden="true"
      style={{ animation: 'j-tag-spin 1s linear infinite' }}
    >
      <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.3 199.3 0 19.9-16.1 36-36 36z" />
    </svg>
  )
}

// ─── Tag Component ──────────────────────────────────────────────────────────────

function TagComponent({
  children,
  color,
  variant = 'outlined',
  closable = false,
  closeIcon,
  onClose,
  icon,
  bordered = true,
  href,
  target,
  disabled = false,
  onClick,
  className,
  style,
  classNames,
  styles,
}: TagProps) {
  injectTagStyles()

  const tagRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(true)
  const [closing, setClosing] = useState(false)

  const resolved = resolveColorForVariant(color, variant)

  const hasCustomColors = !!(styles?.root && (
    'backgroundColor' in styles.root ||
    'borderColor' in styles.root ||
    'border' in styles.root
  ))

  // ── Hover (ref-based) ──

  const handleMouseEnter = useCallback(() => {
    if (disabled || !tagRef.current) return
    if (hasCustomColors) {
      tagRef.current.style.filter = 'brightness(1.15)'
    } else if (variant === 'solid' || (color && variant === 'filled')) {
      tagRef.current.style.filter = 'brightness(1.1)'
    } else {
      // outlined or default filled — add subtle bg
      const hoverBg = color
        ? (STATUS_PRESETS[color]
          ? STATUS_PRESETS[color].bg
          : `color-mix(in srgb, ${DECORATIVE_PRESETS[color] ?? color} 12%, transparent)`)
        : tokens.colorBgMuted
      tagRef.current.style.backgroundColor = hoverBg
    }
  }, [disabled, hasCustomColors, variant, color])

  const handleMouseLeave = useCallback(() => {
    if (disabled || !tagRef.current) return
    if (hasCustomColors) {
      tagRef.current.style.filter = ''
    } else if (variant === 'solid' || (color && variant === 'filled')) {
      tagRef.current.style.filter = ''
    } else {
      tagRef.current.style.backgroundColor = resolved.backgroundColor
    }
  }, [disabled, hasCustomColors, variant, color, resolved.backgroundColor])

  // ── Close ──

  const handleClose = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    onClose?.(e)
    if (e.defaultPrevented) return
    setClosing(true)
    setTimeout(() => setVisible(false), 200)
  }, [onClose])

  // ── Render ──

  if (!visible) return null

  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0 0.4375rem',
    height: '1.375rem',
    fontSize: '0.75rem',
    lineHeight: '1.25rem',
    borderRadius: '0.25rem',
    border: bordered ? `1px solid ${resolved.borderColor}` : '1px solid transparent',
    backgroundColor: resolved.backgroundColor,
    color: resolved.color,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.65 : 1,
    transition: 'all 0.2s ease',
    animation: closing ? 'j-tag-exit 0.2s ease forwards' : 'j-tag-enter 0.2s ease',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    userSelect: 'none',
  }

  const iconStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '0.75rem',
  }

  const contentStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
  }

  const closeIconStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    marginLeft: '0.125rem',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: 0.65,
    transition: 'opacity 0.15s ease',
    fontSize: '0.625rem',
  }

  const Wrapper = (href && !disabled ? 'a' : 'span') as React.ElementType

  const wrapperProps: Record<string, unknown> = {}
  if (href && !disabled) {
    wrapperProps.href = href
    wrapperProps.target = target
  }

  return (
    <Wrapper
      ref={tagRef}
      {...wrapperProps}
      className={mergeSemanticClassName(className, classNames?.root)}
      style={mergeSemanticStyle(baseStyle, styles?.root, style)}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {icon && (
        <span className={classNames?.icon} style={mergeSemanticStyle(iconStyle, styles?.icon)}>
          {icon}
        </span>
      )}
      <span className={classNames?.content} style={mergeSemanticStyle(contentStyle, styles?.content)}>
        {children}
      </span>
      {closable && (
        <span
          className={classNames?.closeIcon}
          style={mergeSemanticStyle(closeIconStyle, styles?.closeIcon)}
          onClick={handleClose}
          role="img"
          aria-label="close"
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.65' }}
        >
          {closeIcon || <CloseIcon />}
        </span>
      )}
    </Wrapper>
  )
}

// ─── CheckableTag Component ─────────────────────────────────────────────────────

function CheckableTagComponent({
  children,
  checked = false,
  onChange,
  color,
  disabled = false,
  className,
  style,
  classNames,
  styles,
}: CheckableTagProps) {
  const tagRef = useRef<HTMLSpanElement>(null)

  // Resolve checked color
  const checkedColor = color || 'primary'
  const statusPreset = STATUS_PRESETS[checkedColor]
  const hex = statusPreset ? statusPreset.solid : (DECORATIVE_PRESETS[checkedColor] ?? checkedColor)

  const hasCustomColors = !!(styles?.root && (
    'backgroundColor' in styles.root ||
    'borderColor' in styles.root ||
    'border' in styles.root
  ))

  const checkedBg = hex
  const checkedBorder = hex
  const checkedText = '#fff'

  const uncheckedBg = 'transparent'
  const uncheckedBorder = tokens.colorBorder
  const uncheckedText = tokens.colorText

  const handleMouseEnter = useCallback(() => {
    if (disabled || !tagRef.current) return
    if (hasCustomColors) {
      tagRef.current.style.filter = 'brightness(1.15)'
    } else if (checked) {
      tagRef.current.style.filter = 'brightness(1.1)'
    } else {
      tagRef.current.style.backgroundColor = tokens.colorBgMuted
    }
  }, [disabled, hasCustomColors, checked])

  const handleMouseLeave = useCallback(() => {
    if (disabled || !tagRef.current) return
    if (hasCustomColors) {
      tagRef.current.style.filter = ''
    } else if (checked) {
      tagRef.current.style.filter = ''
    } else {
      tagRef.current.style.backgroundColor = uncheckedBg
    }
  }, [disabled, hasCustomColors, checked, uncheckedBg])

  const handleClick = useCallback(() => {
    if (disabled) return
    onChange?.(!checked)
  }, [disabled, onChange, checked])

  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0 0.4375rem',
    height: '1.375rem',
    fontSize: '0.75rem',
    lineHeight: '1.25rem',
    borderRadius: '0.25rem',
    border: `1px solid ${checked ? checkedBorder : uncheckedBorder}`,
    backgroundColor: checked ? checkedBg : uncheckedBg,
    color: checked ? checkedText : uncheckedText,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.65 : 1,
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    userSelect: 'none',
  }

  return (
    <span
      ref={tagRef}
      className={mergeSemanticClassName(className, classNames?.root)}
      style={mergeSemanticStyle(baseStyle, styles?.root, style)}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={classNames?.content} style={mergeSemanticStyle({}, styles?.content)}>
        {children}
      </span>
    </span>
  )
}

// ─── Compound Export ────────────────────────────────────────────────────────────

export const Tag = Object.assign(TagComponent, {
  CheckableTag: CheckableTagComponent,
  SpinnerIcon,
})
