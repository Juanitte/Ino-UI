import { useState } from 'react'
import { Text, Checkbox, tokens } from '../../index'
import { Section } from './shared'

const plainOptions = ['Apple', 'Pear', 'Orange']

const optionsWithDisabled = [
  { label: 'Apple', value: 'apple' },
  { label: 'Pear', value: 'pear' },
  { label: 'Orange', value: 'orange', disabled: true },
]

// ---- Check All demo ----

function CheckAllDemo() {
  const allValues = ['apple', 'pear', 'orange']
  const [checkedList, setCheckedList] = useState<(string | number)[]>(['apple'])

  const checkAll = allValues.length === checkedList.length
  const indeterminate = checkedList.length > 0 && checkedList.length < allValues.length

  const onCheckAllChange = () => {
    setCheckedList(checkAll ? [] : allValues)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox
        indeterminate={indeterminate}
        checked={checkAll}
        onChange={onCheckAllChange}
      >
        Check all
      </Checkbox>
      <div style={{ height: 1, backgroundColor: tokens.colorBorder }} />
      <Checkbox.Group
        options={optionsWithDisabled.map(o => ({ ...o, disabled: false }))}
        value={checkedList}
        onChange={setCheckedList}
      />
    </div>
  )
}

// ---- Controlled demo ----

function ControlledDemo() {
  const [checked, setChecked] = useState(true)
  const [disabled, setDisabled] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox
        checked={checked}
        disabled={disabled}
        onChange={(e) => setChecked(e.target.checked)}
      >
        {`${checked ? 'Checked' : 'Unchecked'} - ${disabled ? 'Disabled' : 'Enabled'}`}
      </Checkbox>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => setChecked(!checked)}
          style={{
            padding: '4px 12px',
            border: `1px solid ${tokens.colorBorder}`,
            borderRadius: 4,
            backgroundColor: tokens.colorBgMuted,
            color: tokens.colorText,
            cursor: 'pointer',
            fontSize: 13,
          }}
        >
          {checked ? 'Uncheck' : 'Check'}
        </button>
        <button
          onClick={() => setDisabled(!disabled)}
          style={{
            padding: '4px 12px',
            border: `1px solid ${tokens.colorBorder}`,
            borderRadius: 4,
            backgroundColor: tokens.colorBgMuted,
            color: tokens.colorText,
            cursor: 'pointer',
            fontSize: 13,
          }}
        >
          {disabled ? 'Enable' : 'Disable'}
        </button>
      </div>
    </div>
  )
}

// ---- Group controlled demo ----

function GroupControlledDemo() {
  const [value, setValue] = useState<(string | number)[]>(['Pear'])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Checkbox.Group
        options={plainOptions}
        value={value}
        onChange={setValue}
      />
      <Text size="sm" type="secondary">
        Seleccionados: {value.length > 0 ? value.join(', ') : 'ninguno'}
      </Text>
    </div>
  )
}

// ============================================================================
// Main Section
// ============================================================================

export function CheckboxSection() {
  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block', marginBottom: 24 }}>
        Checkbox
      </Text>

      <Section title="Basic">
        <Checkbox>Checkbox</Checkbox>
      </Section>

      <Section title="Disabled">
        <Checkbox disabled>Disabled</Checkbox>
        <Checkbox disabled checked>Disabled checked</Checkbox>
      </Section>

      <Section title="Controlled" align="start">
        <ControlledDemo />
      </Section>

      <Section title="Indeterminate (Check all)" align="start">
        <CheckAllDemo />
      </Section>

      <Section title="Checkbox.Group con options" align="start">
        <GroupControlledDemo />
      </Section>

      <Section title="Checkbox.Group con options (con disabled)" align="start">
        <Checkbox.Group
          options={optionsWithDisabled}
          defaultValue={['apple', 'pear']}
        />
      </Section>

      <Section title="Checkbox.Group con children" align="start">
        <Checkbox.Group
          defaultValue={['A']}
          styles={{
            root: {
              gap: 16,
              padding: '12px 16px',
              border: `1px solid ${tokens.colorBorder}`,
              borderRadius: 8,
              backgroundColor: tokens.colorBgSubtle,
            },
          }}
        >
          <Checkbox value="A" styles={{ label: { fontWeight: 600 } }}>A</Checkbox>
          <Checkbox value="B" styles={{ label: { fontWeight: 600 } }}>B</Checkbox>
          <Checkbox value="C" styles={{ label: { fontWeight: 600 } }}>C</Checkbox>
          <Checkbox value="D" disabled styles={{ label: { fontWeight: 600 } }}>D (disabled)</Checkbox>
        </Checkbox.Group>
      </Section>

      <Section title="Semantic styles" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Text size="sm" type="secondary" style={{ display: 'block' }}>
            Slots: <Text code>root</Text>, <Text code>checkbox</Text>, <Text code>indicator</Text>, <Text code>label</Text>
          </Text>
          <Checkbox
            defaultChecked
            styles={{
              checkbox: {
                borderRadius: '50%',
                width: 20,
                height: 20,
              },
              label: {
                fontWeight: 600,
                color: tokens.colorPrimary,
              },
            }}
          >
            Custom styled
          </Checkbox>
          <Checkbox
            defaultChecked
            styles={{
              checkbox: {
                border: `2px solid ${tokens.colorSuccess}`,
                backgroundColor: tokens.colorSuccess,
              },
              label: {
                fontStyle: 'italic',
                color: tokens.colorSuccess,
              },
            }}
          >
            Green checkbox + italic
          </Checkbox>
        </div>
      </Section>
    </div>
  )
}
