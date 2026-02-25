import { useState } from 'react'
import { Button, Popover, Text, tokens } from '../../index'
import { Section } from './shared'

// ─── 1. Basic ───────────────────────────────────────────────────────────────

function BasicDemo() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Popover title="Title" content="Content of the popover.">
        <Button variant="outline">Hover me</Button>
      </Popover>
      <Popover
        title="Rich Content"
        content={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Text size="sm">This popover has rich content.</Text>
            <Button size="sm" variant="primary">Action</Button>
          </div>
        }
      >
        <Button variant="outline">Rich content</Button>
      </Popover>
    </div>
  )
}

// ─── 2. Trigger ─────────────────────────────────────────────────────────────

function TriggerDemo() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Popover title="Hover" content="Triggered by hover." trigger="hover">
        <Button variant="outline">Hover</Button>
      </Popover>
      <Popover title="Click" content="Triggered by click." trigger="click">
        <Button variant="outline">Click</Button>
      </Popover>
      <Popover title="Focus" content="Triggered by focus." trigger="focus">
        <Button variant="outline">Focus</Button>
      </Popover>
      <Popover title="Context Menu" content="Triggered by right-click." trigger="contextMenu">
        <Button variant="outline">Right-click</Button>
      </Popover>
    </div>
  )
}

// ─── 3. Placement ───────────────────────────────────────────────────────────

function PlacementDemo() {
  const btnStyle: React.CSSProperties = { width: '5.25rem', textAlign: 'center' as const }
  const popContent = <Text size="sm">Popover content</Text>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', padding: '2rem 0' }}>
      {/* Top row */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <Popover title="topLeft" content={popContent} placement="topLeft">
          <Button variant="outline" style={btnStyle}>TL</Button>
        </Popover>
        <Popover title="top" content={popContent} placement="top">
          <Button variant="outline" style={btnStyle}>Top</Button>
        </Popover>
        <Popover title="topRight" content={popContent} placement="topRight">
          <Button variant="outline" style={btnStyle}>TR</Button>
        </Popover>
      </div>

      {/* Middle rows */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '20.75rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Popover title="leftTop" content={popContent} placement="leftTop">
            <Button variant="outline" style={btnStyle}>LT</Button>
          </Popover>
          <Popover title="left" content={popContent} placement="left">
            <Button variant="outline" style={btnStyle}>Left</Button>
          </Popover>
          <Popover title="leftBottom" content={popContent} placement="leftBottom">
            <Button variant="outline" style={btnStyle}>LB</Button>
          </Popover>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Popover title="rightTop" content={popContent} placement="rightTop">
            <Button variant="outline" style={btnStyle}>RT</Button>
          </Popover>
          <Popover title="right" content={popContent} placement="right">
            <Button variant="outline" style={btnStyle}>Right</Button>
          </Popover>
          <Popover title="rightBottom" content={popContent} placement="rightBottom">
            <Button variant="outline" style={btnStyle}>RB</Button>
          </Popover>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <Popover title="bottomLeft" content={popContent} placement="bottomLeft">
          <Button variant="outline" style={btnStyle}>BL</Button>
        </Popover>
        <Popover title="bottom" content={popContent} placement="bottom">
          <Button variant="outline" style={btnStyle}>Bottom</Button>
        </Popover>
        <Popover title="bottomRight" content={popContent} placement="bottomRight">
          <Button variant="outline" style={btnStyle}>BR</Button>
        </Popover>
      </div>
    </div>
  )
}

// ─── 4. Arrow ───────────────────────────────────────────────────────────────

function ArrowDemo() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Popover title="With arrow" content="This popover has an arrow." placement="bottom">
        <Button variant="outline">With arrow</Button>
      </Popover>
      <Popover title="No arrow" content="This popover has no arrow." placement="bottom" arrow={false}>
        <Button variant="outline">Without arrow</Button>
      </Popover>
    </div>
  )
}

// ─── 5. Controlled ──────────────────────────────────────────────────────────

function ControlledDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Popover
        title="Controlled"
        content={
          <div>
            <Text size="sm" style={{ display: 'block', marginBottom: 8 }}>Click the button below to close.</Text>
            <Button size="sm" variant="primary" onClick={() => setOpen(false)}>Close</Button>
          </div>
        }
        trigger="click"
        open={open}
        onOpenChange={setOpen}
        placement="bottom"
      >
        <Button variant="outline">Click me</Button>
      </Popover>
      <Text size="sm" type="secondary">open: {String(open)}</Text>
    </div>
  )
}

// ─── 6. Hover with Click ────────────────────────────────────────────────────

function HoverWithClickDemo() {
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)

  const hide = () => {
    setClicked(false)
    setHovered(false)
  }

  const handleHoverChange = (open: boolean) => {
    setHovered(open)
    setClicked(false)
  }

  const handleClickChange = (open: boolean) => {
    setHovered(false)
    setClicked(open)
  }

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Popover
        content={<Text size="sm">This is hover content.</Text>}
        title="Hover title"
        trigger="hover"
        open={hovered}
        onOpenChange={handleHoverChange}
        placement="bottom"
      >
        <Popover
          content={
            <div>
              <Text size="sm" style={{ display: 'block', marginBottom: 8 }}>This is click content.</Text>
              <Button size="sm" variant="link" onClick={hide}>Close</Button>
            </div>
          }
          title="Click title"
          trigger="click"
          open={clicked}
          onOpenChange={handleClickChange}
          placement="bottom"
        >
          <Button variant="outline">Hover and click</Button>
        </Popover>
      </Popover>
      <Text size="sm" type="secondary">hovered: {String(hovered)} · clicked: {String(clicked)}</Text>
    </div>
  )
}

// ─── 7. Semantic Styles ─────────────────────────────────────────────────────

function SemanticStylesDemo() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Popover
        title="Custom Styled"
        content="This popover has custom styles."
        placement="bottom"
        styles={{
          popup: { backgroundColor: '#1e1b4b', borderColor: '#4338ca', color: '#e0e7ff' },
          title: { color: '#a5b4fc', borderBottomColor: '#4338ca' },
          content: { color: '#c7d2fe' },
          arrow: { backgroundColor: '#1e1b4b', borderColor: '#4338ca' },
        }}
      >
        <Button variant="outline">Indigo theme</Button>
      </Popover>
      <Popover
        title="Rounded"
        content="This popover uses larger border radius."
        placement="bottom"
        styles={{
          popup: { borderRadius: '1rem', boxShadow: tokens.shadowLg },
        }}
      >
        <Button variant="outline">Rounded popup</Button>
      </Popover>
    </div>
  )
}

// ─── Main Section ───────────────────────────────────────────────────────────

export function PopoverSection() {
  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Popover</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Floating card that pops up on hover or click, supporting rich content with title and body.
      </Text>

      <Section title="Basic">
        <BasicDemo />
      </Section>

      <Section title="Trigger">
        <TriggerDemo />
      </Section>

      <Section title="Placement">
        <PlacementDemo />
      </Section>

      <Section title="Arrow">
        <ArrowDemo />
      </Section>

      <Section title="Controlled">
        <ControlledDemo />
      </Section>

      <Section title="Hover with Click">
        <HoverWithClickDemo />
      </Section>

      <Section title="Semantic Styles">
        <SemanticStylesDemo />
      </Section>
    </div>
  )
}
