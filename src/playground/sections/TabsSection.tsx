import { useState } from 'react'
import { Tabs, Text, tokens } from '../../index'
import type { TabItem, TabsPosition } from '../../index'
import { Section } from './shared'

// ============================================================================
// Icons
// ============================================================================

const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

// ============================================================================
// Data
// ============================================================================

const basicItems: TabItem[] = [
  { key: '1', label: 'Tab 1', children: 'Contenido de Tab 1' },
  { key: '2', label: 'Tab 2', children: 'Contenido de Tab 2' },
  { key: '3', label: 'Tab 3', children: 'Contenido de Tab 3' },
]

const iconItems: TabItem[] = [
  { key: 'home', label: 'Inicio', icon: <HomeIcon />, children: 'Contenido de Inicio' },
  { key: 'profile', label: 'Perfil', icon: <UserIcon />, children: 'Contenido de Perfil' },
  { key: 'settings', label: 'Ajustes', icon: <SettingsIcon />, children: 'Contenido de Ajustes' },
]

const disabledItems: TabItem[] = [
  { key: '1', label: 'Activa', children: 'Esta pestaña funciona normalmente.' },
  { key: '2', label: 'Deshabilitada', disabled: true, children: 'No deberías ver esto.' },
  { key: '3', label: 'Otra activa', children: 'Esta también funciona.' },
]

const generateManyItems = (count: number): TabItem[] =>
  Array.from({ length: count }, (_, i) => ({
    key: `tab-${i + 1}`,
    label: `Tab ${i + 1}`,
    children: `Contenido del tab ${i + 1}. Este es un ejemplo con muchos tabs para demostrar el overflow y scroll.`,
  }))

// ============================================================================
// TabsSection
// ============================================================================

export function TabsSection() {
  const [position, setPosition] = useState<TabsPosition>('top')

  // Editable card state
  const [editableItems, setEditableItems] = useState<TabItem[]>([
    { key: '1', label: 'Tab 1', children: 'Contenido editable del Tab 1' },
    { key: '2', label: 'Tab 2', children: 'Contenido editable del Tab 2' },
    { key: '3', label: 'Tab 3', children: 'Contenido editable del Tab 3', closable: false },
  ])
  const [editableActiveKey, setEditableActiveKey] = useState('1')
  const editCounterRef = { current: 3 }

  const handleEdit = (
    key: string | React.MouseEvent,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      editCounterRef.current += 1
      const newKey = `new-${editCounterRef.current}`
      setEditableItems((prev) => [
        ...prev,
        {
          key: newKey,
          label: `Tab ${editCounterRef.current}`,
          children: `Contenido nuevo del Tab ${editCounterRef.current}`,
        },
      ])
      setEditableActiveKey(newKey)
    } else {
      const removeKey = key as string
      setEditableItems((prev) => {
        const filtered = prev.filter((i) => i.key !== removeKey)
        if (editableActiveKey === removeKey && filtered.length > 0) {
          const removedIdx = prev.findIndex((i) => i.key === removeKey)
          const newActive =
            filtered[Math.min(removedIdx, filtered.length - 1)]
          setEditableActiveKey(newActive.key)
        }
        return filtered
      })
    }
  }

  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Tabs</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Navegación por pestañas. Soporta line, card y editable-card, 4 posiciones, ink bar animado, scroll overflow, y contenido editable. Los colores se adaptan automáticamente al tema.
      </Text>

      <Section title="Básico" align="start">
        <div style={{ width: '100%' }}>
          <Tabs items={basicItems} />
        </div>
      </Section>

      <Section title="Card type" align="start">
        <div style={{ width: '100%' }}>
          <Tabs items={basicItems} type="card" />
        </div>
      </Section>

      <Section title="Editable card" align="start">
        <div style={{ width: '100%' }}>
          <Tabs
            items={editableItems}
            type="editable-card"
            activeKey={editableActiveKey}
            onChange={setEditableActiveKey}
            onEdit={handleEdit}
          />
          <Text size="sm" type="secondary" style={{ display: 'block', marginTop: 8 }}>
            Haz click en + para añadir o en × para eliminar. El Tab 3 tiene <Text code>closable: false</Text>.
          </Text>
        </div>
      </Section>

      <Section title="Posiciones" align="start">
        <div style={{ width: '100%' }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {(['top', 'bottom', 'left', 'right'] as TabsPosition[]).map((pos) => (
              <button
                key={pos}
                onClick={() => setPosition(pos)}
                style={{
                  padding: '4px 12px',
                  border: `1px solid ${position === pos ? tokens.colorPrimary : tokens.colorBorder}`,
                  borderRadius: 4,
                  backgroundColor: position === pos ? tokens.colorPrimary : 'transparent',
                  color: position === pos ? tokens.colorPrimaryContrast : tokens.colorText,
                  cursor: 'pointer',
                  fontSize: 13,
                }}
              >
                {pos}
              </button>
            ))}
          </div>
          <div style={{ minHeight: 200 }}>
            <Tabs
              items={basicItems}
              tabPosition={position}
            />
          </div>
        </div>
      </Section>

      <Section title="Tamaños" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>large</Text>
            <Tabs items={basicItems} size="large" />
          </div>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>middle (default)</Text>
            <Tabs items={basicItems} size="middle" />
          </div>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>small</Text>
            <Tabs items={basicItems} size="small" />
          </div>
        </div>
      </Section>

      <Section title="Centrado" align="start">
        <div style={{ width: '100%' }}>
          <Tabs items={basicItems} centered />
        </div>
      </Section>

      <Section title="Con iconos" align="start">
        <div style={{ width: '100%' }}>
          <Tabs items={iconItems} />
        </div>
      </Section>

      <Section title="Tabs deshabilitados" align="start">
        <div style={{ width: '100%' }}>
          <Tabs items={disabledItems} />
        </div>
      </Section>

      <Section title="Contenido extra" align="start">
        <div style={{ width: '100%' }}>
          <Tabs
            items={basicItems}
            tabBarExtraContent={{
              left: (
                <span style={{ marginRight: 16, fontSize: 13, color: tokens.colorTextMuted }}>
                  Extra izquierda
                </span>
              ),
              right: (
                <button
                  style={{
                    marginLeft: 16,
                    padding: '4px 12px',
                    border: `1px solid ${tokens.colorBorder}`,
                    borderRadius: 4,
                    backgroundColor: 'transparent',
                    color: tokens.colorText,
                    cursor: 'pointer',
                    fontSize: 13,
                  }}
                >
                  Acción
                </button>
              ),
            }}
          />
        </div>
      </Section>

      <Section title="Muchos tabs (scroll)" align="start">
        <div style={{ width: '100%' }}>
          <Tabs items={generateManyItems(30)} />
        </div>
      </Section>

      <Section title="Indicator personalizado" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block' }}>
            <Text code>indicator={'{{ size: 20, align: "center" }}'}</Text>
          </Text>
          <Tabs
            items={basicItems}
            indicator={{ size: 20, align: 'center' }}
          />
        </div>
      </Section>

      <Section title="Semantic DOM Styling (styles)" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block' }}>
            Slots disponibles: <Text code>root</Text>, <Text code>tabBar</Text>, <Text code>tab</Text>, <Text code>content</Text>, <Text code>inkBar</Text>
          </Text>
          <Tabs
            items={basicItems}
            styles={{
              root: { backgroundColor: '#1e1b4b', borderRadius: 12, overflow: 'hidden' },
              tabBar: { backgroundColor: '#312e81', borderColor: '#4338ca' },
              tab: { color: '#c7d2fe' },
              content: { color: '#e0e7ff' },
              inkBar: { backgroundColor: '#818cf8' },
            }}
          />
        </div>
      </Section>
    </div>
  )
}
