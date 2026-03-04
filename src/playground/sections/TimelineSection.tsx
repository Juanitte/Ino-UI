import { Text, Timeline, tokens } from '../../index'
import type { TimelineItemType } from '../../index'
import { Section } from './shared'

// ─── Icons ───────────────────────────────────────────────────────────────────────

const ClockIcon = () => (
  <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
    <path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z" />
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" />
  </svg>
)

const ExclamationIcon = () => (
  <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" />
  </svg>
)

// ─── 1. Basic ────────────────────────────────────────────────────────────────────

function BasicDemo() {
  const items: TimelineItemType[] = [
    { children: 'Create a services site 2015-09-01' },
    { children: 'Solve initial network problems 2015-09-01' },
    { children: 'Technical testing 2015-09-01' },
    { children: 'Network problems being solved 2015-09-01' },
  ]

  return <Timeline items={items} />
}

// ─── 2. Colors ───────────────────────────────────────────────────────────────────

function ColorsDemo() {
  const items: TimelineItemType[] = [
    { children: 'Success — task completed', color: 'green' },
    { children: 'In progress — working on it', color: 'blue' },
    { children: 'Warning — needs attention', color: 'warning' },
    { children: 'Error — something went wrong', color: 'red' },
    { children: 'Info — additional details', color: 'info' },
    { children: 'Inactive — not started yet', color: 'gray' },
  ]

  return <Timeline items={items} />
}

// ─── 3. Variant ──────────────────────────────────────────────────────────────────

function VariantDemo() {
  const items: TimelineItemType[] = [
    { children: 'Create a services site', color: 'blue' },
    { children: 'Solve network problems', color: 'green' },
    { children: 'Technical testing', color: 'red' },
    { children: 'Deploy to production', color: 'gray' },
  ]

  return (
    <div style={{ display: 'flex', gap: 64 }}>
      <div>
        <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 12 }}>Outlined (default)</Text>
        <Timeline items={items} variant="outlined" />
      </div>
      <div>
        <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 12 }}>Solid</Text>
        <Timeline items={items} variant="solid" />
      </div>
    </div>
  )
}

// ─── 4. Pending ──────────────────────────────────────────────────────────────────

function PendingDemo() {
  const items: TimelineItemType[] = [
    { children: 'Create a services site 2015-09-01' },
    { children: 'Solve initial network problems 2015-09-01' },
    { children: 'Technical testing 2015-09-01' },
  ]

  return <Timeline items={items} pending="Recording..." />
}

// ─── 5. Custom Dot ───────────────────────────────────────────────────────────────

function CustomDotDemo() {
  const items: TimelineItemType[] = [
    { children: 'Create a services site 2015-09-01', dot: <ClockIcon />, color: 'primary' },
    { children: 'Solve initial network problems 2015-09-01' },
    { children: 'Successfully completed', dot: <CheckIcon />, color: 'green' },
    { children: 'Issue detected — investigating', dot: <ExclamationIcon />, color: 'red' },
  ]

  return <Timeline items={items} />
}

// ─── 6. Alternate Mode ──────────────────────────────────────────────────────────

function AlternateDemo() {
  const items: TimelineItemType[] = [
    { children: 'Create a services site 2015-09-01' },
    { children: 'Solve initial network problems 2015-09-01', color: 'green' },
    { children: 'Technical testing 2015-09-01', dot: <ClockIcon />, color: 'primary' },
    { children: 'Network problems being solved 2015-09-01', color: 'red' },
    { children: 'Deployment completed 2015-09-01', color: 'green' },
  ]

  return <Timeline items={items} mode="alternate" />
}

// ─── 7. Right Mode ──────────────────────────────────────────────────────────────

function RightModeDemo() {
  const items: TimelineItemType[] = [
    { children: 'Create a services site 2015-09-01' },
    { children: 'Solve initial network problems 2015-09-01', color: 'green' },
    { children: 'Technical testing 2015-09-01' },
    { children: 'Network problems being solved 2015-09-01', color: 'red' },
  ]

  return <Timeline items={items} mode="right" />
}

// ─── 8. Horizontal ──────────────────────────────────────────────────────────────

function HorizontalDemo() {
  const items: TimelineItemType[] = [
    { children: 'Step 1', label: '2015-09-01' },
    { children: 'Step 2', label: '2015-09-01', color: 'green' },
    { children: 'Step 3', label: '2015-09-01' },
    { children: 'Step 4', label: '2015-09-01', color: 'red' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 12 }}>Default</Text>
        <Timeline items={items} horizontal />
      </div>
      <div>
        <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 12 }}>Alternate</Text>
        <Timeline items={items} horizontal mode="alternate" />
      </div>
    </div>
  )
}

// ─── 9. Labels ──────────────────────────────────────────────────────────────────

function LabelsDemo() {
  const items: TimelineItemType[] = [
    { children: 'Create a services site', label: '2015-09-01' },
    { children: 'Solve initial network problems', label: '2015-09-01 09:12:11', color: 'green' },
    { children: 'Technical testing', label: '2015-09-01 09:12:11' },
    { children: 'Network problems being solved', label: '2015-09-01 09:12:11', color: 'red' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 12 }}>Left mode with labels</Text>
        <Timeline items={items} />
      </div>
      <div>
        <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 12 }}>Alternate mode with labels</Text>
        <Timeline items={items} mode="alternate" />
      </div>
    </div>
  )
}

// ─── 10. Title Offset ───────────────────────────────────────────────────────────

function TitleOffsetDemo() {
  const items: TimelineItemType[] = [
    { children: 'Create a services site', label: '2015-09-01' },
    { children: 'Solve initial network problems', label: '2015-09-01', color: 'green' },
    { children: 'Technical testing', label: '2015-09-01' },
    { children: 'Network problems being solved', label: '2015-09-01', color: 'red' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 12 }}>titleSpan=4 (narrow labels)</Text>
        <Timeline items={items} titleSpan={4} />
      </div>
      <div>
        <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 12 }}>titleSpan=8 (wider labels)</Text>
        <Timeline items={items} titleSpan={8} />
      </div>
    </div>
  )
}

// ─── 11. Reverse ────────────────────────────────────────────────────────────────

function ReverseDemo() {
  const items: TimelineItemType[] = [
    { children: 'Step 1 — Initial setup', color: 'green' },
    { children: 'Step 2 — Development', color: 'green' },
    { children: 'Step 3 — Testing', color: 'blue' },
  ]

  return <Timeline items={items} pending="In progress..." reverse />
}

// ─── 12. Custom Colors ──────────────────────────────────────────────────────────

function CustomColorsDemo() {
  const items: TimelineItemType[] = [
    { children: 'Custom #f50 dot color', color: '#f50' },
    { children: 'Custom #2db7f5 dot color', color: '#2db7f5' },
    { children: 'Custom #87d068 dot color', color: '#87d068' },
    { children: 'Custom #108ee9 dot color', color: '#108ee9' },
  ]

  return <Timeline items={items} />
}

// ─── 13. Semantic Styling ───────────────────────────────────────────────────────

function SemanticDemo() {
  const items: TimelineItemType[] = [
    { children: 'Design system created', label: 'Jan 2024', color: 'green' },
    { children: 'Component library started', label: 'Mar 2024' },
    { children: 'First release published', label: 'Jun 2024', color: 'success' },
    { children: 'Production deployment', label: 'Sep 2024', color: 'primary' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 12 }}>Custom styles via semantic slots</Text>
        <Timeline
          items={items}
          mode="alternate"
          variant="solid"
          styles={{
            root: { padding: '1rem', backgroundColor: tokens.colorBgSubtle, borderRadius: '0.5rem' },
            content: { fontSize: '0.9375rem', fontWeight: 500 },
            label: { fontSize: '0.75rem', fontStyle: 'italic' },
            tail: { backgroundColor: tokens.colorPrimary, opacity: 0.3 },
            dot: { boxShadow: '0 0 0 3px rgba(22, 119, 255, 0.15)' },
          }}
        />
      </div>
      <div>
        <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 12 }}>Card-style items</Text>
        <Timeline
          items={[
            { children: <div style={{ padding: '0.5rem 0.75rem', backgroundColor: tokens.colorBgMuted, borderRadius: '0.375rem', border: `1px solid ${tokens.colorBorder}` }}>Refactored authentication module</div>, label: '10:30 AM' },
            { children: <div style={{ padding: '0.5rem 0.75rem', backgroundColor: tokens.colorBgMuted, borderRadius: '0.375rem', border: `1px solid ${tokens.colorBorder}` }}>Deployed v2.1.0 to staging</div>, label: '2:15 PM', color: 'green' },
            { children: <div style={{ padding: '0.5rem 0.75rem', backgroundColor: tokens.colorBgMuted, borderRadius: '0.375rem', border: `1px solid ${tokens.colorBorder}` }}>Merged PR #142 into main</div>, label: '4:45 PM', color: 'success' },
          ]}
          titleSpan={4}
        />
      </div>
    </div>
  )
}

// ─── Main Section ────────────────────────────────────────────────────────────────

export function TimelineSection() {
  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Timeline</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Vertical display timeline. Used for activity feeds, changelogs, and process tracking.
      </Text>

      <Section title="Basic">
        <BasicDemo />
      </Section>

      <Section title="Colors">
        <ColorsDemo />
      </Section>

      <Section title="Variant">
        <VariantDemo />
      </Section>

      <Section title="Pending">
        <PendingDemo />
      </Section>

      <Section title="Custom Dot">
        <CustomDotDemo />
      </Section>

      <Section title="Alternate Mode">
        <AlternateDemo />
      </Section>

      <Section title="Right Mode">
        <RightModeDemo />
      </Section>

      <Section title="Horizontal">
        <HorizontalDemo />
      </Section>

      <Section title="Labels">
        <LabelsDemo />
      </Section>

      <Section title="Title Offset (titleSpan)">
        <TitleOffsetDemo />
      </Section>

      <Section title="Reverse">
        <ReverseDemo />
      </Section>

      <Section title="Custom Colors">
        <CustomColorsDemo />
      </Section>

      <Section title="Semantic Styling">
        <SemanticDemo />
      </Section>
    </div>
  )
}
