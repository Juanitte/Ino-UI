import { useState } from 'react'
import { Text, DatePicker, tokens } from '../../index'
import type { DatePickerPreset, RangePickerPreset, CellRenderInfo, DatePickerMode } from '../../index'
import { Section } from './shared'

// ---- Helpers ----

function daysFromNow(n: number): Date {
  const d = new Date()
  d.setDate(d.getDate() + n)
  d.setHours(0, 0, 0, 0)
  return d
}

const today = () => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

// ---- Controlled demo ----

function ControlledDemo() {
  const [value, setValue] = useState<Date | null>(null)
  const [dateStr, setDateStr] = useState('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <DatePicker
        value={value}
        onChange={(d, s) => { setValue(d); setDateStr(s) }}
      />
      <Text size="sm" type="secondary">
        Value: {dateStr || '(none)'}
      </Text>
    </div>
  )
}

// ---- Controlled Range demo ----

function ControlledRangeDemo() {
  const [dates, setDates] = useState<[Date | null, Date | null] | null>(null)
  const [strs, setStrs] = useState<[string, string]>(['', ''])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <DatePicker.RangePicker
        value={dates}
        onChange={(d, s) => { setDates(d); setStrs(s) }}
      />
      <Text size="sm" type="secondary">
        Range: {strs[0] || '?'} → {strs[1] || '?'}
      </Text>
    </div>
  )
}

// ---- Switchable picker demo ----

function SwitchablePickerDemo() {
  const [picker, setPicker] = useState<DatePickerMode>('date')
  const modes: DatePickerMode[] = ['date', 'week', 'month', 'quarter', 'year']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 4 }}>
        {modes.map(m => (
          <button
            key={m}
            type="button"
            onClick={() => setPicker(m)}
            style={{
              padding: '4px 10px', border: `1px solid ${m === picker ? tokens.colorPrimary : tokens.colorBorder}`,
              borderRadius: 4, backgroundColor: m === picker ? tokens.colorPrimaryBg : 'transparent',
              color: m === picker ? tokens.colorPrimary : tokens.colorText,
              cursor: 'pointer', fontSize: 12, fontFamily: 'inherit',
            }}
          >
            {m}
          </button>
        ))}
      </div>
      <DatePicker picker={picker} placeholder={`Select ${picker}`} />
    </div>
  )
}

// ---- Multiple demo ----

function MultipleDemo() {
  return (
    <DatePicker
      multiple
      placeholder="Select multiple dates"
    />
  )
}

// ---- Presets ----

const datePresets: DatePickerPreset<Date>[] = [
  { label: 'Hoy', value: today },
  { label: 'Hace 7 días', value: () => daysFromNow(-7) },
  { label: 'Hace 30 días', value: () => daysFromNow(-30) },
]

const rangePresets: RangePickerPreset<Date>[] = [
  { label: 'Última semana', value: () => [daysFromNow(-7), today()] },
  { label: 'Último mes', value: () => [daysFromNow(-30), today()] },
  { label: 'Próxima semana', value: () => [today(), daysFromNow(7)] },
]

// ============================================================================
// Main Section
// ============================================================================

export function DatePickerSection() {
  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block', marginBottom: 24 }}>
        DatePicker
      </Text>

      {/* Basic */}
      <Section title="Basic" align="start">
        <DatePicker />
        <DatePicker defaultValue={today()} />
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <DatePicker size="sm" placeholder="Small" />
        <DatePicker size="md" placeholder="Medium" />
        <DatePicker size="lg" placeholder="Large" />
      </Section>

      {/* Variants */}
      <Section title="Variants">
        <DatePicker variant="outlined" placeholder="Outlined" />
        <DatePicker variant="filled" placeholder="Filled" />
        <DatePicker variant="borderless" placeholder="Borderless" />
      </Section>

      {/* Status */}
      <Section title="Status">
        <DatePicker status="warning" placeholder="Warning" />
        <DatePicker status="error" placeholder="Error" />
      </Section>

      {/* Disabled */}
      <Section title="Disabled">
        <DatePicker disabled defaultValue={today()} />
      </Section>

      {/* Picker modes */}
      <Section title="Picker modes" align="start">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <DatePicker picker="date" placeholder="Date" />
          <DatePicker picker="week" placeholder="Week" />
          <DatePicker picker="month" placeholder="Month" />
          <DatePicker picker="quarter" placeholder="Quarter" />
          <DatePicker picker="year" placeholder="Year" />
        </div>
      </Section>

      {/* Switchable picker */}
      <Section title="Switchable picker" align="start">
        <SwitchablePickerDemo />
      </Section>

      {/* Controlled */}
      <Section title="Controlled" align="start">
        <ControlledDemo />
      </Section>

      {/* Multiple */}
      <Section title="Multiple selection" align="start">
        <MultipleDemo />
      </Section>

      {/* Need Confirm */}
      <Section title="Need Confirm" align="start">
        <DatePicker needConfirm placeholder="Must click OK" />
      </Section>

      {/* showTime */}
      <Section title="DateTime (showTime)" align="start">
        <DatePicker showTime placeholder="Select date & time" />
      </Section>

      {/* showTime with config */}
      <Section title="showTime with 12h format" align="start">
        <DatePicker
          showTime={{ use12Hours: true, showSecond: false }}
          format="YYYY/MM/DD hh:mm A"
          placeholder="12h format"
        />
      </Section>

      {/* Mask format */}
      <Section title="Mask format" align="start">
        <DatePicker mask placeholder="YYYY-MM-DD" />
        <DatePicker mask format="DD/MM/YYYY" placeholder="DD/MM/YYYY" />
      </Section>

      {/* Presets */}
      <Section title="Presets" align="start">
        <DatePicker presets={datePresets} placeholder="With presets" />
      </Section>

      {/* Disabled dates */}
      <Section title="Disabled dates (weekends)" align="start">
        <DatePicker
          disabledDate={(d: Date) => {
            const day = d.getDay()
            return day === 0 || day === 6
          }}
          placeholder="No weekends"
        />
      </Section>

      {/* minDate / maxDate */}
      <Section title="Min/Max date" align="start">
        <DatePicker
          minDate={daysFromNow(-15)}
          maxDate={daysFromNow(15)}
          placeholder="±15 days"
        />
      </Section>

      {/* Allow clear */}
      <Section title="Allow clear" align="start">
        <DatePicker defaultValue={today()} allowClear />
      </Section>

      {/* Read only input */}
      <Section title="Read only input" align="start">
        <DatePicker inputReadOnly placeholder="Click only" />
      </Section>

      {/* Custom format */}
      <Section title="Custom format" align="start">
        <DatePicker format="DD/MM/YYYY" placeholder="DD/MM/YYYY" />
      </Section>

      {/* Prefix and Suffix */}
      <Section title="Prefix and Suffix">
        <DatePicker prefix={<span style={{ fontSize: 12 }}>Date:</span>} placeholder="With prefix" />
        <DatePicker suffix={<span style={{ fontSize: 14 }}>📅</span>} placeholder="Custom suffix" />
        <DatePicker suffix={null} placeholder="No suffix" />
      </Section>

      {/* Placement */}
      <Section title="Placement">
        <DatePicker placement="bottomLeft" size="sm" placeholder="bottomLeft" />
        <DatePicker placement="bottomRight" size="sm" placeholder="bottomRight" />
        <DatePicker placement="topLeft" size="sm" placeholder="topLeft" />
        <DatePicker placement="topRight" size="sm" placeholder="topRight" />
      </Section>

      {/* cellRender */}
      <Section title="Custom cellRender" align="start">
        <DatePicker
          cellRender={(current: Date, info: CellRenderInfo) => {
            if (info.type === 'date') {
              const day = current.getDate()
              const isSpecial = day === 14 || day === 25
              return (
                <div style={{
                  width: '100%', height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderBottom: isSpecial ? `2px solid ${tokens.colorPrimary}` : undefined,
                }}>
                  {day}
                </div>
              )
            }
            return info.originNode
          }}
          placeholder="Custom cells"
        />
      </Section>

      {/* renderExtraFooter */}
      <Section title="Extra footer" align="start">
        <DatePicker
          renderExtraFooter={() => (
            <div style={{ textAlign: 'center', fontSize: 12, color: tokens.colorTextSubtle }}>
              Custom footer content
            </div>
          )}
          placeholder="With extra footer"
        />
      </Section>

      {/* panelRender (Customize Panel) */}
      <Section title="Customize panel (panelRender)" align="start">
        <DatePicker
          panelRender={(panel) => (
            <div>
              <div style={{
                padding: '6px 12px',
                borderBottom: `1px solid ${tokens.colorBorder}`,
                fontSize: 13, fontWeight: 600, color: tokens.colorText,
              }}>
                Elige una fecha
              </div>
              {panel}
            </div>
          )}
          placeholder="Custom panel"
        />
      </Section>

      {/* External use panel */}
      <Section title="External use panel" align="start">
        <DatePicker
          panelRender={(panel) => (
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{
                display: 'flex', flexDirection: 'column', gap: 4, padding: '8px 0',
                borderRight: `1px solid ${tokens.colorBorder}`, paddingRight: 12,
              }}>
                {['Hoy', 'Ayer', 'Hace 7 días', 'Hace 30 días'].map(label => (
                  <button
                    key={label}
                    type="button"
                    style={{
                      padding: '4px 12px', border: 'none', borderRadius: 4,
                      backgroundColor: 'transparent', cursor: 'pointer',
                      fontSize: 12, fontFamily: 'inherit', color: tokens.colorText,
                      textAlign: 'left', whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = tokens.colorBgMuted }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {panel}
            </div>
          )}
          placeholder="With side menu"
          styles={{ popup: { padding: '0 8px' } }}
        />
      </Section>

      {/* Semantic styles */}
      <Section title="Semantic styles" align="start">
        <DatePicker
          placeholder="Styled"
          styles={{
            input: { borderRadius: 20 },
            popup: { borderRadius: 16, border: `2px solid ${tokens.colorPrimary}` },
          }}
        />
      </Section>

      {/* ---- RangePicker ---- */}
      <Text size="lg" weight="bold" style={{ display: 'block', marginTop: 40, marginBottom: 24 }}>
        RangePicker
      </Text>

      {/* RangePicker basic */}
      <Section title="Basic" align="start">
        <DatePicker.RangePicker />
      </Section>

      {/* RangePicker sizes */}
      <Section title="Sizes">
        <DatePicker.RangePicker size="sm" />
        <DatePicker.RangePicker size="md" />
        <DatePicker.RangePicker size="lg" />
      </Section>

      {/* RangePicker controlled */}
      <Section title="Controlled" align="start">
        <ControlledRangeDemo />
      </Section>

      {/* RangePicker with presets */}
      <Section title="Presets" align="start">
        <DatePicker.RangePicker presets={rangePresets} />
      </Section>

      {/* RangePicker with showTime */}
      <Section title="showTime" align="start">
        <DatePicker.RangePicker showTime />
      </Section>

      {/* RangePicker picker modes */}
      <Section title="Picker modes" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <DatePicker.RangePicker picker="week" />
          <DatePicker.RangePicker picker="month" />
          <DatePicker.RangePicker picker="quarter" />
          <DatePicker.RangePicker picker="year" />
        </div>
      </Section>

      {/* RangePicker independent panels */}
      <Section title="Independent panels (linkedPanels=false)" align="start">
        <DatePicker.RangePicker linkedPanels={false} />
      </Section>

      {/* RangePicker allow empty */}
      <Section title="Allow empty (keep 'to date')" align="start">
        <DatePicker.RangePicker allowEmpty={[true, true]} />
      </Section>

      {/* RangePicker disabled */}
      <Section title="Disabled" align="start">
        <DatePicker.RangePicker
          disabled
          defaultValue={[daysFromNow(-7), today()]}
        />
      </Section>
    </div>
  )
}
