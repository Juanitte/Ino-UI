import { useState } from 'react'
import { Tag, Text, tokens } from '../../index'
import { Section } from './shared'

// ─── 1. Basic ────────────────────────────────────────────────────────────────────

function BasicDemo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <Tag>Default</Tag>
      <Tag color="primary">Primary</Tag>
      <Tag color="success">Success</Tag>
      <Tag color="warning">Warning</Tag>
      <Tag color="error">Error</Tag>
      <Tag color="info">Info</Tag>
      <Tag color="secondary">Secondary</Tag>
    </div>
  )
}

// ─── 2. Variants ─────────────────────────────────────────────────────────────────

function VariantsDemo() {
  const colors = ['primary', 'success', 'error'] as const
  const variants = ['outlined', 'filled', 'solid'] as const

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {variants.map(v => (
        <div key={v} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <Text size="sm" type="secondary" style={{ width: 70 }}>{v}</Text>
          {colors.map(c => (
            <Tag key={c} color={c} variant={v}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </Tag>
          ))}
          <Tag variant={v}>Default</Tag>
        </div>
      ))}
    </div>
  )
}

// ─── 3. Closable (Animate) ───────────────────────────────────────────────────────

function ClosableDemo() {
  const [extraTags, setExtraTags] = useState<string[]>([])

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <Tag color="primary" closable>Tag 1</Tag>
      <Tag color="success" closable>Tag 2</Tag>
      <Tag color="warning" closable>Tag 3</Tag>
      <Tag closable onClose={(e) => e.preventDefault()}>Prevent Close</Tag>
      {extraTags.map(tag => (
        <Tag key={tag} color="info" closable>{tag}</Tag>
      ))}
      <Tag
        style={{ borderStyle: 'dashed', cursor: 'pointer' }}
        onClick={() => setExtraTags(prev => [...prev, `New ${Date.now() % 1000}`])}
      >
        + New Tag
      </Tag>
    </div>
  )
}

// ─── 4. With Icon (+ Spinner) ────────────────────────────────────────────────────

const CheckCircleIcon = () => (
  <svg viewBox="0 0 1024 1024" width="12" height="12" fill="currentColor">
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" />
  </svg>
)

const ExclamationIcon = () => (
  <svg viewBox="0 0 1024 1024" width="12" height="12" fill="currentColor">
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" />
  </svg>
)

function WithIconDemo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <Tag color="success" icon={<CheckCircleIcon />}>Completed</Tag>
      <Tag color="info" icon={<Tag.SpinnerIcon />}>Processing</Tag>
      <Tag color="warning" icon={<ExclamationIcon />}>Waiting</Tag>
      <Tag color="error" icon={<ExclamationIcon />}>Error</Tag>
    </div>
  )
}

// ─── 5. Preset Colors ────────────────────────────────────────────────────────────

function PresetColorsDemo() {
  const statusColors = ['primary', 'secondary', 'success', 'warning', 'error', 'info'] as const
  const decorativeColors = [
    'pink', 'magenta', 'red', 'volcano', 'orange', 'gold', 'yellow',
    'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple',
  ] as const

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Text size="sm" type="secondary">Status presets (theme-aware)</Text>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {statusColors.map(c => <Tag key={c} color={c}>{c}</Tag>)}
      </div>
      <Text size="sm" type="secondary">Decorative presets</Text>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {decorativeColors.map(c => <Tag key={c} color={c}>{c}</Tag>)}
      </div>
    </div>
  )
}

// ─── 6. Custom Colors ────────────────────────────────────────────────────────────

function CustomColorsDemo() {
  const custom = ['#f50', '#2db7f5', '#87d068', '#108ee9']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['outlined', 'filled', 'solid'] as const).map(v => (
        <div key={v} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <Text size="sm" type="secondary" style={{ width: 70 }}>{v}</Text>
          {custom.map(c => <Tag key={c} color={c} variant={v}>{c}</Tag>)}
        </div>
      ))}
    </div>
  )
}

// ─── 7. Checkable ────────────────────────────────────────────────────────────────

function CheckableDemo() {
  const categories = ['Movies', 'Books', 'Music', 'Sports', 'Travel']
  const [selected, setSelected] = useState<string[]>(['Movies', 'Music'])

  const toggle = (cat: string) => {
    setSelected(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat],
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {categories.map(cat => (
          <Tag.CheckableTag
            key={cat}
            checked={selected.includes(cat)}
            onChange={() => toggle(cat)}
          >
            {cat}
          </Tag.CheckableTag>
        ))}
      </div>
      <Text size="sm" type="secondary">
        Selected: {selected.length > 0 ? selected.join(', ') : 'None'}
      </Text>
    </div>
  )
}

// ─── 8. Checkable with Colors ────────────────────────────────────────────────────

function CheckableColorsDemo() {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)
  const [c, setC] = useState(true)
  const [d, setD] = useState(false)

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Tag.CheckableTag checked={a} onChange={setA} color="success">Success</Tag.CheckableTag>
      <Tag.CheckableTag checked={b} onChange={setB} color="error">Error</Tag.CheckableTag>
      <Tag.CheckableTag checked={c} onChange={setC} color="purple">Purple</Tag.CheckableTag>
      <Tag.CheckableTag checked={d} onChange={setD} color="#f50">#f50</Tag.CheckableTag>
    </div>
  )
}

// ─── 9. Borderless ───────────────────────────────────────────────────────────────

function BorderlessDemo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', padding: 12, backgroundColor: tokens.colorBgSubtle, borderRadius: 8 }}>
      <Tag bordered={false}>Default</Tag>
      <Tag color="primary" bordered={false}>Primary</Tag>
      <Tag color="success" bordered={false}>Success</Tag>
      <Tag color="error" bordered={false}>Error</Tag>
      <Tag color="purple" bordered={false}>Purple</Tag>
    </div>
  )
}

// ─── 10. Link Tags ───────────────────────────────────────────────────────────────

function LinkDemo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <Tag color="primary" href="https://github.com" target="_blank">GitHub</Tag>
      <Tag color="geekblue" href="https://react.dev" target="_blank">React</Tag>
      <Tag color="purple" href="https://vitejs.dev" target="_blank">Vite</Tag>
    </div>
  )
}

// ─── 11. Disabled ────────────────────────────────────────────────────────────────

function DisabledDemo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <Tag disabled>Disabled</Tag>
      <Tag color="primary" disabled>Primary</Tag>
      <Tag color="success" variant="filled" disabled>Filled</Tag>
      <Tag color="error" variant="solid" disabled>Solid</Tag>
      <Tag closable disabled>Closable</Tag>
      <Tag.CheckableTag checked disabled>Checked</Tag.CheckableTag>
    </div>
  )
}

// ─── Main Section ────────────────────────────────────────────────────────────────

export function TagSection() {
  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Tag</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Tag for categorizing or markup. Supports preset colors, custom colors, variants, closable, checkable, and links.
      </Text>

      <Section title="Basic">
        <BasicDemo />
      </Section>

      <Section title="Variants">
        <VariantsDemo />
      </Section>

      <Section title="Closable (Animated)">
        <ClosableDemo />
      </Section>

      <Section title="With Icon (+ Spinner)">
        <WithIconDemo />
      </Section>

      <Section title="Preset Colors">
        <PresetColorsDemo />
      </Section>

      <Section title="Custom Colors">
        <CustomColorsDemo />
      </Section>

      <Section title="Checkable">
        <CheckableDemo />
      </Section>

      <Section title="Checkable with Colors">
        <CheckableColorsDemo />
      </Section>

      <Section title="Borderless">
        <BorderlessDemo />
      </Section>

      <Section title="Link Tags">
        <LinkDemo />
      </Section>

      <Section title="Disabled">
        <DisabledDemo />
      </Section>
    </div>
  )
}
