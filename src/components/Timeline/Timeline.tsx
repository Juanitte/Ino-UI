import { type ReactNode, type CSSProperties, useMemo } from 'react'
import { tokens } from '../../theme/tokens'
import type { SemanticClassNames, SemanticStyles } from '../../utils/semanticDom'
import { mergeSemanticStyle, mergeSemanticClassName } from '../../utils/semanticDom'

// ─── Types ──────────────────────────────────────────────────────────────────────

export type TimelineMode = 'left' | 'right' | 'alternate'
export type TimelineVariant = 'outlined' | 'solid'

export interface TimelineItemType {
  children?: ReactNode
  color?: string
  dot?: ReactNode
  label?: ReactNode
  position?: 'left' | 'right'
}

export type TimelineSemanticSlot = 'root' | 'item' | 'dot' | 'tail' | 'content' | 'label'
export type TimelineClassNames = SemanticClassNames<TimelineSemanticSlot>
export type TimelineStyles = SemanticStyles<TimelineSemanticSlot>

export interface TimelineProps {
  items?: TimelineItemType[]
  mode?: TimelineMode
  variant?: TimelineVariant
  horizontal?: boolean
  titleSpan?: number
  pending?: boolean | ReactNode
  pendingDot?: ReactNode
  reverse?: boolean
  className?: string
  style?: CSSProperties
  classNames?: TimelineClassNames
  styles?: TimelineStyles
}

// ─── Color Resolution ───────────────────────────────────────────────────────────

const DOT_COLORS: Record<string, string> = {
  blue:      tokens.colorPrimary,
  red:       tokens.colorError,
  green:     tokens.colorSuccess,
  gray:      tokens.colorTextMuted,
  primary:   tokens.colorPrimary,
  secondary: tokens.colorSecondary,
  success:   tokens.colorSuccess,
  warning:   tokens.colorWarning,
  error:     tokens.colorError,
  info:      tokens.colorInfo,
}

function resolveDotColor(color?: string): string {
  if (!color) return tokens.colorPrimary
  return DOT_COLORS[color] ?? color
}

// ─── Spinner ────────────────────────────────────────────────────────────────────

const TIMELINE_KEYFRAMES = `
@keyframes j-timeline-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}`

let timelineStylesInjected = false
function injectTimelineStyles() {
  if (timelineStylesInjected || typeof document === 'undefined') return
  const style = document.createElement('style')
  style.textContent = TIMELINE_KEYFRAMES
  document.head.appendChild(style)
  timelineStylesInjected = true
}

function SpinnerDot() {
  return (
    <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor" aria-hidden="true"
      style={{ animation: 'j-timeline-spin 1s linear infinite', color: tokens.colorPrimary }}
    >
      <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.3 199.3 0 19.9-16.1 36-36 36z" />
    </svg>
  )
}

// ─── Internal Types ─────────────────────────────────────────────────────────────

interface InternalItem extends TimelineItemType {
  _pending?: boolean
}

// ─── Dot Rendering Helper ───────────────────────────────────────────────────────

function renderDot(
  item: InternalItem,
  variant: TimelineVariant,
  dotColor: string,
  horizontal: boolean,
  classNames?: TimelineClassNames,
  styles?: TimelineStyles,
) {
  if (item.dot) {
    return (
      <div
        className={classNames?.dot}
        style={mergeSemanticStyle({
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: dotColor,
          flexShrink: 0,
          marginTop: horizontal ? 0 : '0.1875rem',
          position: 'relative',
          zIndex: 1,
        }, styles?.dot)}
      >
        {item.dot}
      </div>
    )
  }

  const isSolid = variant === 'solid'
  return (
    <div
      className={classNames?.dot}
      style={mergeSemanticStyle({
        width: '0.625rem',
        height: '0.625rem',
        borderRadius: '50%',
        ...(isSolid
          ? { backgroundColor: dotColor }
          : { border: `2px solid ${dotColor}`, backgroundColor: tokens.colorBg }),
        boxSizing: 'border-box',
        flexShrink: 0,
        marginTop: horizontal ? 0 : '0.3125rem',
        position: 'relative',
        zIndex: 1,
      }, styles?.dot)}
    />
  )
}

// ─── Timeline Component ─────────────────────────────────────────────────────────

export function Timeline({
  items = [],
  mode = 'left',
  variant = 'outlined',
  horizontal = false,
  titleSpan,
  pending,
  pendingDot,
  reverse = false,
  className,
  style,
  classNames,
  styles,
}: TimelineProps) {
  if (pending) injectTimelineStyles()

  const finalItems = useMemo(() => {
    const list: InternalItem[] = [...items]
    if (pending) {
      list.push({
        children: typeof pending === 'boolean' ? undefined : pending,
        dot: pendingDot ?? <SpinnerDot />,
        _pending: true,
      })
    }
    if (reverse) list.reverse()
    return list
  }, [items, pending, pendingDot, reverse])

  const hasLabels = useMemo(
    () => finalItems.some(item => item.label != null),
    [finalItems],
  )

  const useThreeColumns = !horizontal && (mode === 'alternate' || hasLabels)

  const rootStyle: CSSProperties = {
    display: 'flex',
    flexDirection: horizontal ? 'row' : 'column',
    margin: 0,
    padding: 0,
    listStyle: 'none',
    fontSize: '0.875rem',
    lineHeight: 1.5,
    color: tokens.colorText,
  }

  return (
    <div
      className={mergeSemanticClassName(className, classNames?.root)}
      style={mergeSemanticStyle(rootStyle, styles?.root, style)}
    >
      {finalItems.map((item, index) => {
        const isLast = index === finalItems.length - 1
        const isFirst = index === 0

        let contentSide: 'left' | 'right' = mode === 'right' ? 'left' : 'right'
        if (mode === 'alternate') {
          contentSide = index % 2 === 0 ? 'right' : 'left'
        }
        if (item.position) contentSide = item.position

        const commonProps = {
          item,
          isLast,
          isFirst,
          contentSide,
          variant,
          dotColor: resolveDotColor(item.color),
          classNames,
          styles,
        }

        if (horizontal) {
          return <HorizontalItem key={index} {...commonProps} />
        }

        return (
          <VerticalItem
            key={index}
            {...commonProps}
            useThreeColumns={useThreeColumns}
            titleSpan={titleSpan}
          />
        )
      })}
    </div>
  )
}

// ─── Vertical Item ──────────────────────────────────────────────────────────────

interface VerticalItemProps {
  item: InternalItem
  isLast: boolean
  isFirst: boolean
  contentSide: 'left' | 'right'
  useThreeColumns: boolean
  variant: TimelineVariant
  titleSpan?: number
  dotColor: string
  classNames?: TimelineClassNames
  styles?: TimelineStyles
}

function VerticalItem({
  item,
  isLast,
  contentSide,
  useThreeColumns,
  variant,
  titleSpan,
  dotColor,
  classNames,
  styles,
}: VerticalItemProps) {
  // Spacing on content/label cells (NOT on the item!) so the dot column stretches fully
  const spacingPb = isLast ? 0 : '1.25rem'

  // CSS Grid template — keeps dot column perfectly centered
  let gridColumns: string
  if (useThreeColumns) {
    if (titleSpan) {
      const labelW = `${(titleSpan / 24) * 100}%`
      gridColumns = contentSide === 'right' ? `${labelW} 1.5rem 1fr` : `1fr 1.5rem ${labelW}`
    } else {
      gridColumns = '1fr 1.5rem 1fr'
    }
  } else {
    gridColumns = contentSide === 'right' ? '0px 1.5rem 1fr' : '1fr 1.5rem 0px'
  }

  const itemStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: gridColumns,
  }

  // ── Content node ──
  const contentPad: CSSProperties = contentSide === 'right'
    ? { paddingLeft: '0.75rem' }
    : { paddingRight: '0.75rem', textAlign: 'right' }

  const contentNode = (
    <div
      className={classNames?.content}
      style={mergeSemanticStyle({
        paddingBottom: spacingPb,
        lineHeight: 1.5,
        ...contentPad,
      }, styles?.content)}
    >
      {item.children}
    </div>
  )

  // ── Label node (or empty spacer) ──
  const labelPad: CSSProperties = contentSide === 'right'
    ? { paddingRight: '0.75rem', textAlign: 'right' }
    : { paddingLeft: '0.75rem' }

  const labelNode = item.label != null ? (
    <div
      className={classNames?.label}
      style={mergeSemanticStyle({
        paddingBottom: spacingPb,
        lineHeight: 1.5,
        color: tokens.colorTextMuted,
        fontSize: '0.875rem',
        ...labelPad,
      }, styles?.label)}
    >
      {item.label}
    </div>
  ) : (
    <div style={{ paddingBottom: spacingPb }} />
  )

  // ── Arrange left / right children ──
  let leftChild: ReactNode
  let rightChild: ReactNode

  if (contentSide === 'right') {
    leftChild = useThreeColumns ? labelNode : <div />
    rightChild = contentNode
  } else {
    leftChild = contentNode
    rightChild = useThreeColumns ? labelNode : <div />
  }

  return (
    <div
      className={classNames?.item}
      style={mergeSemanticStyle(itemStyle, styles?.item)}
    >
      {leftChild}

      {/* Dot + Tail column */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {renderDot(item, variant, dotColor, false, classNames, styles)}
        {!isLast && (
          <div style={{ flex: 1, position: 'relative' }}>
            <div
              className={classNames?.tail}
              style={mergeSemanticStyle({
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                top: 0,
                bottom: '-0.3125rem',
                width: 2,
                backgroundColor: tokens.colorBorder,
                transition: 'background-color 0.3s',
              }, styles?.tail)}
            />
          </div>
        )}
      </div>

      {rightChild}
    </div>
  )
}

// ─── Horizontal Item ────────────────────────────────────────────────────────────

interface HorizontalItemProps {
  item: InternalItem
  isLast: boolean
  isFirst: boolean
  contentSide: 'left' | 'right'
  variant: TimelineVariant
  dotColor: string
  classNames?: TimelineClassNames
  styles?: TimelineStyles
}

function HorizontalItem({
  item,
  isLast,
  isFirst,
  contentSide,
  variant,
  dotColor,
  classNames,
  styles,
}: HorizontalItemProps) {
  // contentSide 'right' → content on top, 'left' → content on bottom
  const contentOnTop = contentSide === 'right'

  const areaStyle: CSSProperties = {
    textAlign: 'center',
    padding: '0.5rem 0.25rem',
    lineHeight: 1.5,
    minHeight: '1.5rem',
  }

  const labelAreaStyle: CSSProperties = {
    ...areaStyle,
    color: tokens.colorTextMuted,
    fontSize: '0.875rem',
  }

  const contentArea = (
    <div
      className={classNames?.content}
      style={mergeSemanticStyle(areaStyle, styles?.content)}
    >
      {item.children}
    </div>
  )

  const labelArea = item.label != null ? (
    <div
      className={classNames?.label}
      style={mergeSemanticStyle(labelAreaStyle, styles?.label)}
    >
      {item.label}
    </div>
  ) : (
    <div style={{ minHeight: '1.5rem' }} />
  )

  return (
    <div
      className={classNames?.item}
      style={mergeSemanticStyle({
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
      }, styles?.item)}
    >
      {contentOnTop ? contentArea : labelArea}

      {/* Dot row */}
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '0.25rem 0' }}>
        <div
          className={!isFirst ? classNames?.tail : undefined}
          style={!isFirst
            ? mergeSemanticStyle({ flex: 1, height: 2, backgroundColor: tokens.colorBorder, transition: 'background-color 0.3s' }, styles?.tail)
            : { flex: 1 }
          }
        />
        {renderDot(item, variant, dotColor, true, classNames, styles)}
        <div
          className={!isLast ? classNames?.tail : undefined}
          style={!isLast
            ? mergeSemanticStyle({ flex: 1, height: 2, backgroundColor: tokens.colorBorder, transition: 'background-color 0.3s' }, styles?.tail)
            : { flex: 1 }
          }
        />
      </div>

      {contentOnTop ? labelArea : contentArea}
    </div>
  )
}
