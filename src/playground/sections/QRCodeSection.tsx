import { useState, useRef } from 'react'
import { Button, QRCode, Text, tokens } from '../../index'
import { Section } from './shared'

// ─── 1. Basic ───────────────────────────────────────────────────────────────

function BasicDemo() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <QRCode value="https://github.com" />
      <QRCode value="https://inoelec.com" />
    </div>
  )
}

// ─── 2. With Icon ───────────────────────────────────────────────────────────

const DEMO_ICON = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="#8c75d1"/><text x="50" y="72" text-anchor="middle" font-size="60" font-weight="bold" fill="white" font-family="system-ui">J</text></svg>')}`

function WithIconDemo() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <QRCode
        value="https://github.com"
        icon={DEMO_ICON}
        errorLevel="H"
      />
    </div>
  )
}

// ─── 3. Render Type ─────────────────────────────────────────────────────────

function RenderTypeDemo() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <div style={{ textAlign: 'center' }}>
        <QRCode value="https://example.com" type="canvas" />
        <Text size="sm" type="secondary" style={{ display: 'block', marginTop: 8 }}>Canvas</Text>
      </div>
      <div style={{ textAlign: 'center' }}>
        <QRCode value="https://example.com" type="svg" />
        <Text size="sm" type="secondary" style={{ display: 'block', marginTop: 8 }}>SVG</Text>
      </div>
    </div>
  )
}

// ─── 4. Custom Size ─────────────────────────────────────────────────────────

function CustomSizeDemo() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {[80, 120, 160, 200].map(s => (
        <div key={s} style={{ textAlign: 'center' }}>
          <QRCode value="https://example.com" size={s} />
          <Text size="sm" type="secondary" style={{ display: 'block', marginTop: 8 }}>{s}px</Text>
        </div>
      ))}
    </div>
  )
}

// ─── 5. Custom Color ────────────────────────────────────────────────────────

function CustomColorDemo() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <QRCode value="https://example.com" color={tokens.colorPrimary} />
      <QRCode value="https://example.com" color="#52c41a" bgColor="#f6ffed" />
      <QRCode value="https://example.com" color="#ffffff" bgColor="#000000" />
    </div>
  )
}

// ─── 6. Error Level ─────────────────────────────────────────────────────────

function ErrorLevelDemo() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {(['L', 'M', 'Q', 'H'] as const).map(level => (
        <div key={level} style={{ textAlign: 'center' }}>
          <QRCode value="https://example.com/error-level" errorLevel={level} size={120} />
          <Text size="sm" type="secondary" style={{ display: 'block', marginTop: 8 }}>Level {level}</Text>
        </div>
      ))}
    </div>
  )
}

// ─── 7. Bordered ────────────────────────────────────────────────────────────

function BorderedDemo() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <QRCode value="https://example.com" bordered />
        <Text size="sm" type="secondary" style={{ display: 'block', marginTop: 8 }}>Bordered</Text>
      </div>
      <div style={{ textAlign: 'center' }}>
        <QRCode value="https://example.com" bordered={false} />
        <Text size="sm" type="secondary" style={{ display: 'block', marginTop: 8 }}>No border</Text>
      </div>
    </div>
  )
}

// ─── 8. Status ──────────────────────────────────────────────────────────────

function StatusDemo() {
  const [status, setStatus] = useState<'active' | 'expired' | 'loading' | 'scanned'>('active')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {(['active', 'expired', 'loading', 'scanned'] as const).map(s => (
          <Button
            key={s}
            size="sm"
            variant={status === s ? 'primary' : 'outline'}
            onClick={() => setStatus(s)}
          >
            {s}
          </Button>
        ))}
      </div>
      <QRCode
        value="https://example.com"
        status={status}
        onRefresh={() => {
          setStatus('loading')
          setTimeout(() => setStatus('active'), 1000)
        }}
      />
    </div>
  )
}

// ─── 9. Download ────────────────────────────────────────────────────────────

function DownloadDemo() {
  const canvasWrapRef = useRef<HTMLDivElement>(null)
  const svgWrapRef = useRef<HTMLDivElement>(null)

  const downloadCanvas = () => {
    const canvas = canvasWrapRef.current?.querySelector('canvas')
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = 'qrcode.png'
    a.click()
  }

  const downloadSvg = () => {
    const svg = svgWrapRef.current?.querySelector('svg')
    if (!svg) return
    const serializer = new XMLSerializer()
    const svgStr = serializer.serializeToString(svg)
    const blob = new Blob([svgStr], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'qrcode.svg'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-end' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div ref={canvasWrapRef}>
          <QRCode value="https://example.com/download" />
        </div>
        <Button size="sm" variant="outline" onClick={downloadCanvas}>Download PNG</Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div ref={svgWrapRef}>
          <QRCode value="https://example.com/download" type="svg" />
        </div>
        <Button size="sm" variant="outline" onClick={downloadSvg}>Download SVG</Button>
      </div>
    </div>
  )
}

// ─── 10. Semantic Styles ────────────────────────────────────────────────────

function SemanticStylesDemo() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <QRCode
        value="https://example.com"
        styles={{
          root: { backgroundColor: '#1e1b4b', borderColor: '#4338ca' },
        }}
        color="#a5b4fc"
        bgColor="#1e1b4b"
      />
      <QRCode
        value="https://example.com"
        styles={{
          root: { borderRadius: '1rem', boxShadow: tokens.shadowLg },
        }}
      />
    </div>
  )
}

// ─── Main Section ───────────────────────────────────────────────────────────

export function QRCodeSection() {
  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>QRCode</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Component to convert text or URLs into scannable QR codes with customizable colors, sizes, and error correction.
      </Text>

      <Section title="Basic">
        <BasicDemo />
      </Section>

      <Section title="With Icon">
        <WithIconDemo />
      </Section>

      <Section title="Render Type">
        <RenderTypeDemo />
      </Section>

      <Section title="Custom Size">
        <CustomSizeDemo />
      </Section>

      <Section title="Custom Color">
        <CustomColorDemo />
      </Section>

      <Section title="Error Level">
        <ErrorLevelDemo />
      </Section>

      <Section title="Bordered">
        <BorderedDemo />
      </Section>

      <Section title="Status">
        <StatusDemo />
      </Section>

      <Section title="Download">
        <DownloadDemo />
      </Section>

      <Section title="Semantic Styles">
        <SemanticStylesDemo />
      </Section>
    </div>
  )
}
