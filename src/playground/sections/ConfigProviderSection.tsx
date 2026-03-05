import { useState } from 'react'
import {
  ConfigProvider, Button, Input, Select, DatePicker, Pagination, Form,
  Text, Toggle, en_US, es_ES,
} from '../../index'
import type { ConfigSize, Locale } from '../../index'
import { Section } from './shared'

// ─── 1. Component Size ────────────────────────────────────────────────────────

const SIZES: ConfigSize[] = ['small', 'middle', 'large']

function SizeDemo() {
  const [size, setSize] = useState<ConfigSize>('middle')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Toggle
        options={SIZES}
        value={size}
        onChange={(v) => setSize(v as ConfigSize)}
        size="small"
        style={{ alignSelf: 'flex-start' }}
      />
      <ConfigProvider componentSize={size}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
          <Button variant="primary">Button</Button>
          <Button variant="outline">Button</Button>
          <Input placeholder="Input" style={{ width: 160 }} />
          <Select
            options={[
              { label: 'Option A', value: 'a' },
              { label: 'Option B', value: 'b' },
            ]}
            placeholder="Select"
            style={{ width: 160 }}
          />
          <DatePicker style={{ width: 180 }} />
        </div>
      </ConfigProvider>
    </div>
  )
}

// ─── 2. Component Disabled ────────────────────────────────────────────────────

function DisabledDemo() {
  const [disabled, setDisabled] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input
          type="checkbox"
          id="global-disabled"
          checked={disabled}
          onChange={(e) => setDisabled(e.target.checked)}
        />
        <label htmlFor="global-disabled" style={{ cursor: 'pointer', userSelect: 'none' }}>
          <Text size="sm">componentDisabled</Text>
        </label>
      </div>
      <ConfigProvider componentDisabled={disabled}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
          <Button variant="primary">Submit</Button>
          <Button variant="outline">Cancel</Button>
          <Input placeholder="Your name" style={{ width: 160 }} />
          <Select
            options={[
              { label: 'Option A', value: 'a' },
              { label: 'Option B', value: 'b' },
            ]}
            placeholder="Select role"
            style={{ width: 160 }}
          />
          <DatePicker style={{ width: 180 }} />
        </div>
      </ConfigProvider>
    </div>
  )
}

// ─── 3. Locale ────────────────────────────────────────────────────────────────

const LOCALES: { label: string; value: Locale }[] = [
  { label: 'en_US', value: en_US },
  { label: 'es_ES', value: es_ES },
]

function LocaleContent() {
  const [form] = Form.useForm()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
        <DatePicker style={{ width: 200 }} showToday />
        <DatePicker.RangePicker style={{ width: 280 }} />
        <Pagination total={200} showSizeChanger showQuickJumper />
      </div>
      <Form form={form} layout="inline" style={{ alignItems: 'flex-start' }}>
        <Form.Item
          name="email"
          rules={[{ required: true }, { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }]}
        >
          <Input placeholder="Email" style={{ width: 200 }} />
        </Form.Item>
        <Form.Item>
          <Button variant="primary" onClick={() => form.validateFields().catch(() => {})}>
            Validate
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

function LocaleDemo() {
  const [locale, setLocale] = useState<Locale>(en_US)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Toggle
        options={LOCALES.map((l) => l.label)}
        value={locale.locale}
        onChange={(v) => setLocale(LOCALES.find((l) => l.label === v)!.value)}
        size="small"
        style={{ alignSelf: 'flex-start' }}
      />
      <ConfigProvider locale={locale}>
        <LocaleContent />
      </ConfigProvider>
    </div>
  )
}

// ─── 4. Nested ConfigProvider ─────────────────────────────────────────────────

function NestingDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <Text type="secondary" size="sm">
        Outer: <code>size=large</code> · Inner: <code>size=small</code>
      </Text>
      <ConfigProvider componentSize="large">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Text type="secondary" size="sm">Outer (large):</Text>
            <Button variant="outline">Large Button</Button>
            <Input placeholder="Large input" style={{ width: 160 }} />
          </div>
          <ConfigProvider componentSize="small">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Text type="secondary" size="sm">Inner (small):</Text>
              <Button variant="outline">Small Button</Button>
              <Input placeholder="Small input" style={{ width: 160 }} />
            </div>
          </ConfigProvider>
        </div>
      </ConfigProvider>
    </div>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function ConfigProviderSection() {
  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block', marginBottom: 24 }}>ConfigProvider</Text>

      <Section title="Component Size" align="start">
        <SizeDemo />
      </Section>

      <Section title="Component Disabled" align="start">
        <DisabledDemo />
      </Section>

      <Section title="Locale" align="start">
        <LocaleDemo />
      </Section>

      <Section title="Nested ConfigProvider" align="start">
        <NestingDemo />
      </Section>
    </div>
  )
}
