import { useState } from 'react'
import { Button, Text, Toggle, tokens } from '../../index'
import type { ToggleItemType } from '../../index'
import { Section } from './shared'

// ─── Icons ───────────────────────────────────────────────────────────────────

function ListIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  )
}

function KanbanIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="5" height="18" rx="1" /><rect x="10" y="3" width="5" height="12" rx="1" /><rect x="17" y="3" width="5" height="15" rx="1" />
    </svg>
  )
}

// ─── 1. Basic ───────────────────────────────────────────────────────────────

function BasicDemo() {
  return (
    <Toggle options={['Daily', 'Weekly', 'Monthly']} defaultValue="Weekly" />
  )
}

// ─── 2. Sizes ───────────────────────────────────────────────────────────────

function SizesDemo() {
  const options = ['Small', 'Medium', 'Large']
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <Toggle options={options} defaultValue="Medium" size="small" />
      <Toggle options={options} defaultValue="Medium" size="middle" />
      <Toggle options={options} defaultValue="Medium" size="large" />
    </div>
  )
}

// ─── 3. Block ───────────────────────────────────────────────────────────────

function BlockDemo() {
  return (
    <Toggle options={['Day', 'Week', 'Month', 'Year']} defaultValue="Week" block />
  )
}

// ─── 4. Vertical ────────────────────────────────────────────────────────────

function VerticalDemo() {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <div style={{ width: 160 }}>
        <Toggle options={['Top', 'Middle', 'Bottom']} defaultValue="Middle" vertical />
      </div>
      <div style={{ width: 160 }}>
        <Toggle
          options={[
            { value: 'list', label: 'List', icon: <ListIcon /> },
            { value: 'grid', label: 'Grid', icon: <GridIcon /> },
            { value: 'kanban', label: 'Kanban', icon: <KanbanIcon /> },
          ]}
          defaultValue="list"
          vertical
        />
      </div>
    </div>
  )
}

// ─── 5. Round Shape ─────────────────────────────────────────────────────────

function RoundShapeDemo() {
  return (
    <Toggle
      options={['Spring', 'Summer', 'Autumn', 'Winter']}
      defaultValue="Summer"
      styles={{
        root: { borderRadius: '2rem' },
        thumb: { borderRadius: '2rem' },
        item: { borderRadius: '2rem' },
      }}
    />
  )
}

// ─── 6. Custom Render ───────────────────────────────────────────────────────

function CustomRenderDemo() {
  const options: ToggleItemType[] = [
    {
      value: 'user1',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: tokens.colorPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700 }}>A</div>
          <span>Alice</span>
        </div>
      ),
    },
    {
      value: 'user2',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: tokens.colorSuccess, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700 }}>B</div>
          <span>Bob</span>
        </div>
      ),
    },
    {
      value: 'user3',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: tokens.colorWarning, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 700 }}>C</div>
          <span>Charlie</span>
        </div>
      ),
    },
  ]

  return <Toggle options={options} defaultValue="user1" />
}

// ─── 7. Dynamic ─────────────────────────────────────────────────────────────

function DynamicDemo() {
  const [more, setMore] = useState(false)
  const base = ['Map', 'Transit', 'Satellite']
  const extra = [...base, 'Terrain', 'Hybrid']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <Toggle options={more ? extra : base} defaultValue="Map" />
      <Button size="sm" variant="outline" onClick={() => setMore(m => !m)}>
        {more ? 'Fewer options' : 'More options'}
      </Button>
    </div>
  )
}

// ─── 8. Disabled ────────────────────────────────────────────────────────────

function DisabledDemo() {
  const optionsWithDisabled: ToggleItemType[] = [
    { value: 'active', label: 'Active' },
    { value: 'paused', label: 'Paused' },
    { value: 'archived', label: 'Archived', disabled: true },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Text size="sm" type="secondary">All disabled</Text>
        <Toggle options={['One', 'Two', 'Three']} defaultValue="One" disabled />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Text size="sm" type="secondary">Individual disabled</Text>
        <Toggle options={optionsWithDisabled} defaultValue="active" />
      </div>
    </div>
  )
}

// ─── 9. With Icons ──────────────────────────────────────────────────────────

function WithIconsDemo() {
  const options: ToggleItemType[] = [
    { value: 'list', label: 'List', icon: <ListIcon /> },
    { value: 'grid', label: 'Grid', icon: <GridIcon /> },
    { value: 'kanban', label: 'Kanban', icon: <KanbanIcon /> },
  ]

  return <Toggle options={options} defaultValue="list" />
}

// ─── 10. Icon Only ──────────────────────────────────────────────────────────

function IconOnlyDemo() {
  const options: ToggleItemType[] = [
    { value: 'list', icon: <ListIcon /> },
    { value: 'grid', icon: <GridIcon /> },
    { value: 'kanban', icon: <KanbanIcon /> },
  ]

  return <Toggle options={options} defaultValue="grid" />
}

// ─── 11. With Name ──────────────────────────────────────────────────────────

function WithNameDemo() {
  const [value, setValue] = useState<string | number>('email')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <Text size="sm" type="secondary">Use arrow keys to navigate after focusing</Text>
      <Toggle
        options={['email', 'phone', 'address']}
        value={value}
        onChange={setValue}
        name="contact-method"
      />
      <Text size="sm" type="secondary">Selected: {String(value)}</Text>
    </div>
  )
}

// ─── 12. Controlled ─────────────────────────────────────────────────────────

function ControlledDemo() {
  const [value, setValue] = useState<string | number>('react')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <Toggle
        options={['react', 'vue', 'angular', 'svelte']}
        value={value}
        onChange={setValue}
      />
      <div style={{ display: 'flex', gap: 8 }}>
        <Button size="sm" variant="outline" onClick={() => setValue('react')}>React</Button>
        <Button size="sm" variant="outline" onClick={() => setValue('svelte')}>Svelte</Button>
      </div>
      <Text size="sm" type="secondary">Selected: {String(value)}</Text>
    </div>
  )
}

// ─── 13. Custom Styles ──────────────────────────────────────────────────────

function CustomStylesDemo() {
  return (
    <Toggle
      options={['Light', 'Dark', 'System']}
      defaultValue="Dark"
      styles={{
        root: { backgroundColor: tokens.colorPrimary100 },
        thumb: { backgroundColor: tokens.colorPrimary, boxShadow: 'none' },
        item: { color: tokens.colorPrimary900 },
      }}
    />
  )
}

// ─── Main Section ───────────────────────────────────────────────────────────

export function ToggleSection() {
  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Toggle</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Segmented control for switching between a small set of options with a sliding indicator.
      </Text>

      <Section title="Basic">
        <BasicDemo />
      </Section>

      <Section title="Sizes">
        <SizesDemo />
      </Section>

      <Section title="Block">
        <BlockDemo />
      </Section>

      <Section title="Vertical">
        <VerticalDemo />
      </Section>

      <Section title="Round Shape">
        <RoundShapeDemo />
      </Section>

      <Section title="Custom Render">
        <CustomRenderDemo />
      </Section>

      <Section title="Dynamic">
        <DynamicDemo />
      </Section>

      <Section title="Disabled">
        <DisabledDemo />
      </Section>

      <Section title="With Icons">
        <WithIconsDemo />
      </Section>

      <Section title="Icon Only">
        <IconOnlyDemo />
      </Section>

      <Section title="With Name">
        <WithNameDemo />
      </Section>

      <Section title="Controlled">
        <ControlledDemo />
      </Section>

      <Section title="Custom Styles">
        <CustomStylesDemo />
      </Section>
    </div>
  )
}
