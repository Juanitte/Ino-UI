import { useState, useRef } from 'react'
import { Statistic, Text, tokens } from '../../index'
import { Section } from './shared'

// ─── Icons ───────────────────────────────────────────────────────────────────

function ArrowUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  )
}

function ArrowDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  )
}

function LikeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  )
}

// ─── 1. Basic ────────────────────────────────────────────────────────────────

function BasicDemo() {
  return (
    <div style={{ display: 'flex', gap: '3rem' }}>
      <Statistic title="Active Users" value={112893} />
      <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
      <Statistic title="Active Projects" value={93} />
    </div>
  )
}

// ─── 2. Prefix & Suffix ─────────────────────────────────────────────────────

function PrefixSuffixDemo() {
  return (
    <div style={{ display: 'flex', gap: '3rem' }}>
      <Statistic
        title="Feedback"
        value={1128}
        prefix={<LikeIcon />}
      />
      <Statistic
        title="Growth"
        value={11.28}
        precision={2}
        prefix={<ArrowUpIcon />}
        suffix="%"
        styles={{ content: { color: tokens.colorSuccess } }}
      />
      <Statistic
        title="Idle"
        value={9.3}
        precision={2}
        prefix={<ArrowDownIcon />}
        suffix="%"
        styles={{ content: { color: tokens.colorError } }}
      />
      <Statistic title="Revenue" value={12345.67} precision={2} prefix="$" />
    </div>
  )
}

// ─── 3. Formatter ────────────────────────────────────────────────────────────

function FormatterDemo() {
  return (
    <div style={{ display: 'flex', gap: '3rem' }}>
      <Statistic
        title="Custom Score"
        value={99.9}
        formatter={(val) => (
          <span style={{ color: tokens.colorPrimary }}>{Number(val).toFixed(1)} points</span>
        )}
      />
      <Statistic
        title="Locale String"
        value={1234567}
        formatter={(val) => Number(val).toLocaleString('en-US')}
      />
    </div>
  )
}

// ─── 4. Group & Decimal Separators ───────────────────────────────────────────

function SeparatorsDemo() {
  return (
    <div style={{ display: 'flex', gap: '3rem' }}>
      <Statistic title="US Format" value={1234567.89} precision={2} />
      <Statistic
        title="European Format"
        value={1234567.89}
        precision={2}
        groupSeparator="."
        decimalSeparator=","
      />
      <Statistic title="Space Separator" value={1234567} groupSeparator=" " />
    </div>
  )
}

// ─── 5. Loading ──────────────────────────────────────────────────────────────

function LoadingDemo() {
  const [loading, setLoading] = useState(true)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: '3rem' }}>
        <Statistic title="Active Users" value={112893} loading={loading} />
        <Statistic title="Unmerged" value={93} suffix="/ 100" loading={loading} loadingWidth="3rem" />
      </div>
      <button
        onClick={() => setLoading(l => !l)}
        style={{
          padding: '0.25rem 0.75rem',
          border: `1px solid ${tokens.colorBorder}`,
          borderRadius: '0.25rem',
          backgroundColor: tokens.colorBg,
          color: tokens.colorText,
          cursor: 'pointer',
          fontSize: '0.8125rem',
        }}
      >
        Toggle Loading
      </button>
    </div>
  )
}

// ─── 6. Countdown ────────────────────────────────────────────────────────────

function CountdownDemo() {
  const deadline = useRef(Date.now() + 1000 * 60 * 60 * 48).current
  const short = useRef(Date.now() + 1000 * 60 * 5).current

  return (
    <div style={{ display: 'flex', gap: '3rem' }}>
      <Statistic.Countdown title="Countdown" value={deadline} />
      <Statistic.Countdown title="Day Level" value={deadline} format="D [day|days] HH:mm:ss" />
      <Statistic.Countdown title="Millisecond" value={short} format="mm:ss:SSS" />
    </div>
  )
}

// ─── 7. Countdown i18n ───────────────────────────────────────────────────────

function CountdownI18nDemo() {
  const singleDay = useRef(Date.now() + 1000 * 60 * 60 * 25).current   // ~1 day
  const multiDay = useRef(Date.now() + 1000 * 60 * 60 * 72).current    // ~3 days

  return (
    <div style={{ display: 'flex', gap: '3rem' }}>
      <Statistic.Countdown
        title="English (singular)"
        value={singleDay}
        format="D [day|days], H [hour|hours]"
      />
      <Statistic.Countdown
        title="English (plural)"
        value={multiDay}
        format="D [day|days], H [hour|hours]"
      />
      <Statistic.Countdown
        title="Español"
        value={multiDay}
        format="D [día|días], H [hora|horas]"
      />
    </div>
  )
}

// ─── 8. Countdown with onFinish ──────────────────────────────────────────────

function CountdownFinishDemo() {
  const [finished, setFinished] = useState(false)
  const target = useRef(Date.now() + 1000 * 10).current

  return (
    <div>
      {finished ? (
        <Text type="success" weight="bold">Time's up!</Text>
      ) : (
        <Statistic.Countdown
          title="10 Second Countdown"
          value={target}
          onFinish={() => setFinished(true)}
          styles={{ content: { color: tokens.colorError } }}
        />
      )}
    </div>
  )
}

// ─── 8. Semantic Styles ──────────────────────────────────────────────────────

function SemanticStylesDemo() {
  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <Statistic
        title="Custom Styled"
        value={42}
        styles={{
          root: { padding: '1rem', border: `1px solid ${tokens.colorBorder}`, borderRadius: '0.5rem' },
          title: { color: tokens.colorPrimary, fontWeight: 600 },
          content: { color: tokens.colorSuccess, fontSize: '2rem' },
        }}
      />
      <Statistic
        title="Card Style"
        value={9876}
        prefix="$"
        styles={{
          root: {
            padding: '1.5rem',
            backgroundColor: tokens.colorBgSubtle,
            borderRadius: '0.5rem',
            minWidth: '10rem',
          },
          content: { fontSize: '2rem' },
        }}
      />
    </div>
  )
}

// ─── Main Section ────────────────────────────────────────────────────────────

export function StatisticSection() {
  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Statistic</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Display statistic number with title, formatting, prefix/suffix, and countdown timer.
      </Text>

      <Section title="Basic">
        <BasicDemo />
      </Section>

      <Section title="Prefix & Suffix">
        <PrefixSuffixDemo />
      </Section>

      <Section title="Formatter">
        <FormatterDemo />
      </Section>

      <Section title="Group & Decimal Separators">
        <SeparatorsDemo />
      </Section>

      <Section title="Loading" align="start">
        <LoadingDemo />
      </Section>

      <Section title="Countdown">
        <CountdownDemo />
      </Section>

      <Section title="Countdown i18n / Singular-Plural">
        <CountdownI18nDemo />
      </Section>

      <Section title="Countdown with onFinish" align="start">
        <CountdownFinishDemo />
      </Section>

      <Section title="Semantic Styles">
        <SemanticStylesDemo />
      </Section>
    </div>
  )
}
