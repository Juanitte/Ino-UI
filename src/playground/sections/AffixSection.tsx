import { useState, useRef } from 'react'
import { Affix, Button, Text, Tag, tokens } from '../../index'
import { Section } from './shared'

// ─── Scrollbar styles ─────────────────────────────────────────────────────────

const SCROLL_STYLES = `
.j-affix-scroll {
  scrollbar-width: thin;
  scrollbar-color: ${tokens.colorBorder} transparent;
}
.j-affix-scroll::-webkit-scrollbar { width: 5px; }
.j-affix-scroll::-webkit-scrollbar-track { background: transparent; }
.j-affix-scroll::-webkit-scrollbar-thumb {
  background: ${tokens.colorBorder};
  border-radius: 3px;
}
.j-affix-scroll::-webkit-scrollbar-thumb:hover { background: ${tokens.colorTextMuted}; }
`

// ─── Shared scroll container style ────────────────────────────────────────────

const scrollBoxStyle = (height: number): React.CSSProperties => ({
  height,
  overflowY: 'auto',
  border: `1px solid ${tokens.colorBorder}`,
  borderRadius: '0.5rem',
  position: 'relative',
})

// ─── Tag with frosted background (visible when affixed over content) ──────────

function StickyTag({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div style={{
      display: 'inline-flex',
      background: `color-mix(in srgb, ${tokens.colorBg} 80%, transparent)`,
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      borderRadius: '0.375rem',
      padding: '3px 4px',
      boxShadow: `0 1px 4px rgba(0,0,0,0.08)`,
    }}>
      <Tag color={color}>{children}</Tag>
    </div>
  )
}

// ─── 1. Basic (offsetTop) ─────────────────────────────────────────────────────

function BasicDemo() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div style={{ width: '100%', maxWidth: 500 }}>
      <style>{SCROLL_STYLES}</style>
      <Text type="secondary" size="sm" style={{ display: 'block', marginBottom: '0.5rem' }}>
        Scroll down — the button sticks at 8px from the top.
      </Text>
      <div ref={scrollRef} className="j-affix-scroll" style={scrollBoxStyle(260)}>
        <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Affix offsetTop={8} target={() => scrollRef.current!}>
            <Button variant="primary" size="sm">Affixed Button</Button>
          </Affix>
          {Array.from({ length: 12 }, (_, i) => (
            <Text key={i} type="secondary">Content row {i + 1} — scroll to see the button stick to the top.</Text>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── 2. offsetBottom ──────────────────────────────────────────────────────────

function OffsetBottomDemo() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div style={{ width: '100%', maxWidth: 500 }}>
      <Text type="secondary" size="sm" style={{ display: 'block', marginBottom: '0.5rem' }}>
        Scroll down to the end — the button sticks at 8px from the bottom.
      </Text>
      <div ref={scrollRef} className="j-affix-scroll" style={scrollBoxStyle(260)}>
        <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {Array.from({ length: 12 }, (_, i) => (
            <Text key={i} type="secondary">Content row {i + 1} — scroll down first, then back up.</Text>
          ))}
          <Affix offsetBottom={8} target={() => scrollRef.current!}>
            <Button variant="primary" size="sm">Affixed to Bottom</Button>
          </Affix>
        </div>
      </div>
    </div>
  )
}

// ─── 3. Custom target ─────────────────────────────────────────────────────────

function CustomTargetDemo() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  return (
    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 220px' }}>
        <Text type="secondary" size="sm" style={{ display: 'block', marginBottom: '0.5rem' }}>offsetTop=16</Text>
        <div ref={leftRef} className="j-affix-scroll" style={scrollBoxStyle(260)}>
          <div style={{ padding: '1rem 1.5rem' }}>
            <Affix offsetTop={16} target={() => leftRef.current!}>
              <StickyTag color="blue">Sticky Tag</StickyTag>
            </Affix>
            {Array.from({ length: 14 }, (_, i) => (
              <div key={i} style={{ padding: '0.4rem 0', borderBottom: `1px solid ${tokens.colorBorder}` }}>
                <Text type="secondary" size="sm">Item {i + 1}</Text>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 220px' }}>
        <Text type="secondary" size="sm" style={{ display: 'block', marginBottom: '0.5rem' }}>offsetBottom=16</Text>
        <div ref={rightRef} className="j-affix-scroll" style={scrollBoxStyle(260)}>
          <div style={{ padding: '1rem 1.5rem' }}>
            {Array.from({ length: 14 }, (_, i) => (
              <div key={i} style={{ padding: '0.4rem 0', borderBottom: `1px solid ${tokens.colorBorder}` }}>
                <Text type="secondary" size="sm">Item {i + 1}</Text>
              </div>
            ))}
            <Affix offsetBottom={16} target={() => rightRef.current!}>
              <StickyTag color="purple">Sticky Tag</StickyTag>
            </Affix>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── 4. onChange callback ─────────────────────────────────────────────────────

function OnChangeDemo() {
  const [affixed, setAffixed] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div style={{ width: '100%', maxWidth: 500 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <Text type="secondary" size="sm">Status:</Text>
        <Tag color={affixed ? 'success' : 'default'}>{affixed ? 'Affixed' : 'Normal'}</Tag>
      </div>
      <div ref={scrollRef} className="j-affix-scroll" style={scrollBoxStyle(260)}>
        <div style={{ padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Affix offsetTop={8} target={() => scrollRef.current!} onChange={setAffixed}>
            <Button variant={affixed ? 'primary' : 'outline'} size="sm">
              {affixed ? 'I am fixed!' : 'Scroll down →'}
            </Button>
          </Affix>
          {Array.from({ length: 12 }, (_, i) => (
            <Text key={i} type="secondary">Row {i + 1}</Text>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function AffixSection() {
  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block', marginBottom: 24 }}>Affix</Text>

      <Section title="Basic (offsetTop)" align="start">
        <BasicDemo />
      </Section>

      <Section title="offsetBottom" align="start">
        <OffsetBottomDemo />
      </Section>

      <Section title="Custom Target" align="start">
        <CustomTargetDemo />
      </Section>

      <Section title="onChange Callback" align="start">
        <OnChangeDemo />
      </Section>
    </div>
  )
}
