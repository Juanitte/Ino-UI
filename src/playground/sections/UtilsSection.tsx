import { useState, useRef, useCallback } from 'react'
import {
  getScrollBarSize,
  canUseDom,
  scrollTo,
  classNames,
  omit,
  useWindowWidth,
  useBreakpoint,
  useMergedState,
  useEvent,
  BREAKPOINT_VALUES,
} from '../../index'
import type { Breakpoint } from '../../index'
import { Button, Text, Input, Toggle } from '../../index'
import { Section } from './shared'
import { tokens } from '../../theme'

// ─── 1. DOM Utilities ─────────────────────────────────────────────────────────

function GetScrollBarSizeDemo() {
  const [result, setResult] = useState<number | null>(null)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Button variant="outline" onClick={() => setResult(getScrollBarSize(true))}>
        Measure scrollbar width
      </Button>
      {result !== null && (
        <Text>
          Scrollbar width: <strong>{result}px</strong>
        </Text>
      )}
    </div>
  )
}

function CanUseDomDemo() {
  const value = canUseDom()
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '4px 12px',
          borderRadius: 9999,
          fontSize: 13,
          fontWeight: 600,
          backgroundColor: value ? tokens.colorSuccess100 : tokens.colorError100,
          color: value ? tokens.colorSuccess700 : tokens.colorError700,
          border: `1px solid ${value ? tokens.colorSuccess300 : tokens.colorError300}`,
        }}
      >
        {value ? '✓' : '✗'} canUseDom() = {String(value)}
      </span>
      <Text size="sm" style={{ color: tokens.colorTextMuted }}>
        {value ? 'DOM is available (browser environment)' : 'DOM not available (SSR/Node)'}
      </Text>
    </div>
  )
}

function ScrollToDemo() {
  const boxRef = useRef<HTMLDivElement>(null)

  const scrollBox = (top: number) => {
    if (boxRef.current) {
      scrollTo(top, { container: boxRef.current, duration: 600 })
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="outline" size="sm" onClick={() => scrollBox(0)}>
          Scroll to top
        </Button>
        <Button variant="outline" size="sm" onClick={() => scrollBox(9999)}>
          Scroll to bottom
        </Button>
      </div>
      <div
        ref={boxRef}
        style={{
          height: 160,
          overflowY: 'auto',
          border: `1px solid ${tokens.colorBorder}`,
          borderRadius: 8,
          padding: '12px 16px',
        }}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} style={{ padding: '6px 0', borderBottom: `1px solid ${tokens.colorBorder}`, color: tokens.colorTextMuted, fontSize: 13 }}>
            Line {i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── 2. Object Utilities ───────────────────────────────────────────────────────

function ClassNamesDemo() {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)
  const [c, setC] = useState(true)

  const result = classNames(
    'base-class',
    { 'class-a': a, 'class-b': b, 'class-c': c },
    ['always-included'],
  )

  const checkStyle = (active: boolean) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '4px 12px',
    borderRadius: 6,
    border: `1px solid ${active ? tokens.colorPrimary : tokens.colorBorder}`,
    backgroundColor: active ? tokens.colorPrimary100 : 'transparent',
    color: active ? tokens.colorPrimary700 : tokens.colorTextMuted,
    cursor: 'pointer',
    fontSize: 13,
    userSelect: 'none' as const,
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
        <span style={checkStyle(a)} onClick={() => setA(!a)}>class-a</span>
        <span style={checkStyle(b)} onClick={() => setB(!b)}>class-b</span>
        <span style={checkStyle(c)} onClick={() => setC(!c)}>class-c</span>
      </div>
      <div
        style={{
          fontFamily: 'monospace',
          fontSize: 13,
          padding: '8px 12px',
          backgroundColor: tokens.colorBgMuted,
          borderRadius: 6,
          border: `1px solid ${tokens.colorBorder}`,
          color: tokens.colorText,
        }}
      >
        classNames(...) → <strong>"{result}"</strong>
      </div>
    </div>
  )
}

function OmitDemo() {
  const source = { id: 1, name: 'Alice', role: 'admin', password: 'secret' }
  const result = omit(source, ['password', 'role'])

  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' as const }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <Text size="sm" weight="semibold" style={{ marginBottom: 6 }}>Input object</Text>
        <pre
          style={{
            margin: 0,
            padding: '10px 14px',
            backgroundColor: tokens.colorBgMuted,
            borderRadius: 6,
            border: `1px solid ${tokens.colorBorder}`,
            fontSize: 12,
            color: tokens.colorText,
          }}
        >
          {JSON.stringify(source, null, 2)}
        </pre>
      </div>
      <div style={{ flex: 1, minWidth: 200 }}>
        <Text size="sm" weight="semibold" style={{ marginBottom: 6 }}>omit(obj, ['password', 'role'])</Text>
        <pre
          style={{
            margin: 0,
            padding: '10px 14px',
            backgroundColor: tokens.colorBgMuted,
            borderRadius: 6,
            border: `1px solid ${tokens.colorSuccess300}`,
            fontSize: 12,
            color: tokens.colorText,
          }}
        >
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  )
}

// ─── 3. Hooks — State ─────────────────────────────────────────────────────────

function UseMergedStateDemo() {
  const [mode, setMode] = useState<'uncontrolled' | 'controlled'>('uncontrolled')

  // Controlled external value
  const [controlledVal, setControlledVal] = useState('Controlled value')

  // useMergedState in uncontrolled mode
  const [uncontrolledState, setUncontrolledState] = useMergedState('Default text')

  // useMergedState in controlled mode
  const [controlledState] = useMergedState('', {
    value: controlledVal,
    onChange: (v) => setControlledVal(v),
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Toggle
        options={['uncontrolled', 'controlled']}
        value={mode}
        onChange={(v) => setMode(v as typeof mode)}
        size="small"
        style={{ alignSelf: 'flex-start' }}
      />
      {mode === 'uncontrolled' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Text size="sm" style={{ color: tokens.colorTextMuted }}>
            Internal state — no external value prop. Changes are stored internally.
          </Text>
          <Input
            value={uncontrolledState}
            onChange={(e) => setUncontrolledState(e.target.value)}
            placeholder="Type here..."
            style={{ maxWidth: 320 }}
          />
          <Text size="sm">Current state: <strong>"{uncontrolledState}"</strong></Text>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Text size="sm" style={{ color: tokens.colorTextMuted }}>
            Controlled by external <code>value</code> prop. useMergedState reflects the external value.
          </Text>
          <Input
            value={controlledState}
            onChange={(e) => setControlledVal(e.target.value)}
            placeholder="Type here..."
            style={{ maxWidth: 320 }}
          />
          <Text size="sm">External value: <strong>"{controlledVal}"</strong></Text>
        </div>
      )}
    </div>
  )
}

function UseEventDemo() {
  const [count, setCount] = useState(0)
  const [log, setLog] = useState<string[]>([])

  // useEvent: stable reference that always reads the latest `count`
  const handleClick = useEvent(() => {
    setLog((prev) => [...prev.slice(-4), `Clicked — count was ${count}`])
    setCount((c) => c + 1)
  })

  // Memoized child — only re-renders if its props change
  const StableButton = useCallback(
    () => (
      <Button variant="outline" onClick={handleClick}>
        Stable callback click (count: {count})
      </Button>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handleClick, count],
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Text size="sm" style={{ color: tokens.colorTextMuted }}>
        <code>useEvent</code> returns a stable function reference that always sees the latest closure values.
      </Text>
      <div style={{ display: 'flex', gap: 8 }}>
        <StableButton />
        <Button variant="ghost" size="sm" onClick={() => { setCount(0); setLog([]) }}>Reset</Button>
      </div>
      {log.length > 0 && (
        <div
          style={{
            padding: '8px 12px',
            backgroundColor: tokens.colorBgMuted,
            borderRadius: 6,
            border: `1px solid ${tokens.colorBorder}`,
            fontSize: 12,
            fontFamily: 'monospace',
            color: tokens.colorTextMuted,
          }}
        >
          {log.map((line, i) => <div key={i}>{line}</div>)}
        </div>
      )}
    </div>
  )
}

// ─── 4. Hooks — Responsive ────────────────────────────────────────────────────

const BP_ORDER: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']

function UseWindowWidthDemo() {
  const width = useWindowWidth()
  const maxBp = BREAKPOINT_VALUES.xxl

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Text>
        Window width: <strong>{width}px</strong>
      </Text>
      <div
        style={{
          height: 12,
          borderRadius: 9999,
          backgroundColor: tokens.colorBgMuted,
          border: `1px solid ${tokens.colorBorder}`,
          overflow: 'hidden',
          maxWidth: 400,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${Math.min((width / maxBp) * 100, 100)}%`,
            backgroundColor: tokens.colorPrimary,
            borderRadius: 9999,
            transition: 'width 150ms',
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const }}>
        {BP_ORDER.map((bp) => (
          <span
            key={bp}
            style={{
              padding: '2px 8px',
              borderRadius: 4,
              fontSize: 12,
              fontFamily: 'monospace',
              backgroundColor: tokens.colorBgMuted,
              border: `1px solid ${tokens.colorBorder}`,
              color: tokens.colorTextMuted,
            }}
          >
            {bp}: {BREAKPOINT_VALUES[bp]}px
          </span>
        ))}
      </div>
    </div>
  )
}

function UseBreakpointDemo() {
  const bp = useBreakpoint()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Text size="sm" style={{ color: tokens.colorTextMuted }}>
        Resize the window to see active breakpoints update in real time.
      </Text>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
        {BP_ORDER.map((name) => (
          <span
            key={name}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 600,
              transition: 'all 150ms',
              backgroundColor: bp[name] ? tokens.colorPrimary : tokens.colorBgMuted,
              color: bp[name] ? '#fff' : tokens.colorTextMuted,
              border: `1px solid ${bp[name] ? tokens.colorPrimary : tokens.colorBorder}`,
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function UtilsSection() {
  return (
    <>
      <Text size="xl" weight="bold" style={{ marginBottom: 24 }}>Utils</Text>

      <Section title="DOM — getScrollBarSize">
        <GetScrollBarSizeDemo />
      </Section>

      <Section title="DOM — canUseDom">
        <CanUseDomDemo />
      </Section>

      <Section title="DOM — scrollTo">
        <ScrollToDemo />
      </Section>

      <Section title="Object — classNames">
        <ClassNamesDemo />
      </Section>

      <Section title="Object — omit">
        <OmitDemo />
      </Section>

      <Section title="Hook — useMergedState">
        <UseMergedStateDemo />
      </Section>

      <Section title="Hook — useEvent">
        <UseEventDemo />
      </Section>

      <Section title="Hook — useWindowWidth">
        <UseWindowWidthDemo />
      </Section>

      <Section title="Hook — useBreakpoint">
        <UseBreakpointDemo />
      </Section>
    </>
  )
}
