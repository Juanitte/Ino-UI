import { Button, Tooltip, Text, tokens } from '../../index'
import type { TooltipPlacement } from '../../index'
import { Section } from './shared'
import type { CSSProperties } from 'react'

// ─── 1. Basic ────────────────────────────────────────────────────────────────────

function BasicDemo() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Tooltip content="Prompt text">
        <Button variant="outline">Hover me</Button>
      </Tooltip>
      <Tooltip content="Helpful information about this item">
        <span style={{ textDecoration: 'underline', cursor: 'help' }}>
          Underlined text
        </span>
      </Tooltip>
      <Tooltip content="Help icon tooltip">
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 24,
          height: 24,
          borderRadius: '50%',
          backgroundColor: tokens.colorBgMuted,
          cursor: 'help',
          fontSize: 14,
        }}>
          ?
        </span>
      </Tooltip>
    </div>
  )
}

// ─── 2. Placement (12 positions) ────────────────────────────────────────────────

const PLACEMENT_GRID: Array<{ placement: TooltipPlacement; col: number; row: number; label: string }> = [
  { placement: 'topLeft',     col: 2, row: 1, label: 'TL' },
  { placement: 'top',         col: 3, row: 1, label: 'Top' },
  { placement: 'topRight',    col: 4, row: 1, label: 'TR' },
  { placement: 'leftTop',     col: 1, row: 2, label: 'LT' },
  { placement: 'rightTop',    col: 5, row: 2, label: 'RT' },
  { placement: 'left',        col: 1, row: 3, label: 'Left' },
  { placement: 'right',       col: 5, row: 3, label: 'Right' },
  { placement: 'leftBottom',  col: 1, row: 4, label: 'LB' },
  { placement: 'rightBottom', col: 5, row: 4, label: 'RB' },
  { placement: 'bottomLeft',  col: 2, row: 5, label: 'BL' },
  { placement: 'bottom',      col: 3, row: 5, label: 'Bottom' },
  { placement: 'bottomRight', col: 4, row: 5, label: 'BR' },
]

const gridStyle: CSSProperties = {
  display: 'inline-grid',
  gridTemplateColumns: 'repeat(5, 4.5rem)',
  gridTemplateRows: 'repeat(5, auto)',
  gap: '0.5rem',
}

function PlacementDemo() {
  return (
    <div style={gridStyle}>
      {PLACEMENT_GRID.map(({ placement, col, row, label }) => (
        <div key={placement} style={{ gridColumn: col, gridRow: row }}>
          <Tooltip placement={placement} content={`Tooltip on ${placement}`}>
            <Button variant="outline" style={{ width: '100%', fontSize: '0.75rem' }}>{label}</Button>
          </Tooltip>
        </div>
      ))}
    </div>
  )
}

// ─── 3. Arrow ───────────────────────────────────────────────────────────────────

function ArrowDemo() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <Tooltip content="Arrow shown (default)" placement="top" arrow>
        <Button variant="outline">Show Arrow</Button>
      </Tooltip>
      <Tooltip content="Arrow hidden" placement="top" arrow={false}>
        <Button variant="outline">Hide Arrow</Button>
      </Tooltip>
      <Tooltip content="Arrow points at center" placement="topLeft" arrow={{ pointAtCenter: true }}>
        <Button variant="outline">Point at Center (topLeft)</Button>
      </Tooltip>
      <Tooltip content="Default offset arrow" placement="topLeft">
        <Button variant="outline">Default Arrow (topLeft)</Button>
      </Tooltip>
    </div>
  )
}

// ─── 4. Auto Shift ──────────────────────────────────────────────────────────────

function AutoShiftDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Text size="sm" type="secondary" style={{ display: 'block' }}>
        When a tooltip overflows the viewport, it automatically flips to the opposite side.
        Scroll the page so a button is near the edge, then hover to see the tooltip flip.
      </Text>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <Tooltip content="I auto-flip when near edges" placement="top">
          <Button variant="outline">Auto Shift (default)</Button>
        </Tooltip>
        <Tooltip content="I stay even if clipped" placement="top" autoAdjustOverflow={false}>
          <Button variant="outline">No Auto Shift</Button>
        </Tooltip>
      </div>
    </div>
  )
}

// ─── 5. Colorful Tooltip ────────────────────────────────────────────────────────

const PRESET_COLORS = [
  'pink', 'red', 'yellow', 'orange', 'cyan',
  'green', 'blue', 'purple', 'geekblue', 'magenta',
  'volcano', 'gold', 'lime',
]

function ColorfulDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>Presets</Text>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {PRESET_COLORS.map(c => (
            <Tooltip key={c} content={`Tooltip (${c})`} color={c}>
              <Button variant="outline" size="sm">{c}</Button>
            </Tooltip>
          ))}
        </div>
      </div>
      <div>
        <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>Custom colors</Text>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Tooltip content="Custom #f50" color="#f50">
            <Button variant="outline" size="sm">#f50</Button>
          </Tooltip>
          <Tooltip content="Custom #2db7f5" color="#2db7f5">
            <Button variant="outline" size="sm">#2db7f5</Button>
          </Tooltip>
          <Tooltip content="Custom #87d068" color="#87d068">
            <Button variant="outline" size="sm">#87d068</Button>
          </Tooltip>
          <Tooltip content="Custom #108ee9" color="#108ee9">
            <Button variant="outline" size="sm">#108ee9</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

// ─── 6. Delay ───────────────────────────────────────────────────────────────────

function DelayDemo() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Tooltip content="Instant (0ms)" delay={0}>
        <Button variant="secondary">0ms</Button>
      </Tooltip>
      <Tooltip content="Default delay (200ms)">
        <Button variant="secondary">200ms (default)</Button>
      </Tooltip>
      <Tooltip content="Slow (500ms)" delay={500}>
        <Button variant="secondary">500ms</Button>
      </Tooltip>
      <Tooltip content="Very slow (1000ms)" delay={1000}>
        <Button variant="secondary">1000ms</Button>
      </Tooltip>
    </div>
  )
}

// ─── 7. Disabled ────────────────────────────────────────────────────────────────

function DisabledDemo() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <Tooltip content="This tooltip is disabled" disabled>
        <Button variant="ghost">Disabled tooltip</Button>
      </Tooltip>
      <Tooltip content="This one works normally">
        <Button variant="ghost">Enabled tooltip</Button>
      </Tooltip>
    </div>
  )
}

// ─── 8. Semantic Styling ────────────────────────────────────────────────────────

function SemanticDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Text size="sm" type="secondary" style={{ display: 'block' }}>
        Slots: <Text code>root</Text>, <Text code>popup</Text>, <Text code>arrow</Text>
      </Text>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Tooltip
          content="Custom violet popup"
          styles={{
            popup: { backgroundColor: '#8b5cf6', color: '#fff', borderColor: '#7c3aed', borderRadius: 12, fontWeight: 600 },
            arrow: { backgroundColor: '#8b5cf6', borderColor: '#7c3aed' },
          }}
        >
          <Button variant="outline">Violet popup</Button>
        </Tooltip>
        <Tooltip
          content="Gradient tooltip"
          styles={{
            popup: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff', border: 'none', boxShadow: '0 8px 24px rgba(102,126,234,0.4)' },
            arrow: { background: '#667eea', borderColor: 'transparent' },
          }}
        >
          <Button variant="outline">Gradient popup</Button>
        </Tooltip>
        <Tooltip
          content="Large rounded"
          styles={{
            popup: { padding: '0.75rem 1.25rem', borderRadius: '1rem', fontSize: '0.9375rem' },
          }}
        >
          <Button variant="outline">Large rounded</Button>
        </Tooltip>
      </div>
    </div>
  )
}

// ─── Main Section ────────────────────────────────────────────────────────────────

export function TooltipSection() {
  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Tooltip</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Simple text popup tip. Supports 12 placements, colorful presets, arrow configuration, and auto-shift.
      </Text>

      <Section title="Basic">
        <BasicDemo />
      </Section>

      <Section title="Placement">
        <PlacementDemo />
      </Section>

      <Section title="Arrow">
        <ArrowDemo />
      </Section>

      <Section title="Auto Shift">
        <AutoShiftDemo />
      </Section>

      <Section title="Colorful Tooltip">
        <ColorfulDemo />
      </Section>

      <Section title="Delay">
        <DelayDemo />
      </Section>

      <Section title="Disabled">
        <DisabledDemo />
      </Section>

      <Section title="Semantic Styling">
        <SemanticDemo />
      </Section>
    </div>
  )
}
