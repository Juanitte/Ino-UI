import { useState } from 'react'
import { Menu, Text } from '../../index'
import type { MenuItemType } from '../../index'
import { Section } from './shared'

// ============================================================================
// Icons
// ============================================================================

const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const SettingsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const FileIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
)

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)

// ============================================================================
// Items data
// ============================================================================

const basicItems: MenuItemType[] = [
  { key: 'home', label: 'Inicio', icon: <HomeIcon /> },
  { key: 'files', label: 'Archivos', icon: <FileIcon /> },
  { key: 'mail', label: 'Correo', icon: <MailIcon /> },
  { key: 'settings', label: 'Configuración', icon: <SettingsIcon /> },
]

const submenuItems: MenuItemType[] = [
  { key: 'home', label: 'Inicio', icon: <HomeIcon /> },
  {
    key: 'users',
    label: 'Usuarios',
    icon: <UserIcon />,
    children: [
      { key: 'list', label: 'Lista de usuarios' },
      { key: 'add', label: 'Añadir usuario' },
      { key: 'roles', label: 'Roles y permisos' },
    ],
  },
  {
    key: 'settings',
    label: 'Configuración',
    icon: <SettingsIcon />,
    children: [
      { key: 'general', label: 'General' },
      { key: 'security', label: 'Seguridad' },
      {
        key: 'advanced',
        label: 'Avanzado',
        children: [
          { key: 'logs', label: 'Logs' },
          { key: 'debug', label: 'Debug' },
        ],
      },
    ],
  },
]

const groupItems: MenuItemType[] = [
  {
    key: 'g1',
    type: 'group',
    label: 'Navegación',
    children: [
      { key: 'home', label: 'Inicio', icon: <HomeIcon /> },
      { key: 'files', label: 'Archivos', icon: <FileIcon /> },
    ],
  },
  { key: 'd1', type: 'divider' },
  {
    key: 'g2',
    type: 'group',
    label: 'Administración',
    children: [
      { key: 'users', label: 'Usuarios', icon: <UserIcon /> },
      { key: 'settings', label: 'Configuración', icon: <SettingsIcon /> },
    ],
  },
]

const dangerItems: MenuItemType[] = [
  { key: 'home', label: 'Inicio', icon: <HomeIcon /> },
  { key: 'disabled', label: 'Deshabilitado', icon: <FileIcon />, disabled: true },
  { key: 'd1', type: 'divider' },
  { key: 'delete', label: 'Eliminar todo', icon: <TrashIcon />, danger: true },
]

const dividerDashedItems: MenuItemType[] = [
  { key: 'home', label: 'Inicio' },
  { key: 'd1', type: 'divider' },
  { key: 'files', label: 'Archivos' },
  { key: 'd2', type: 'divider', dashed: true },
  { key: 'settings', label: 'Configuración' },
]

// ============================================================================
// MenuSection
// ============================================================================

export function MenuSection() {
  const [selectedVertical, setSelectedVertical] = useState(['home'])
  const [selectedHorizontal, setSelectedHorizontal] = useState(['home'])
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Menu</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Menú de navegación con soporte para vertical, horizontal e inline. Los colores se adaptan automáticamente al tema.
      </Text>

      <Section title="Vertical (default)" align="start">
        <div style={{ width: 256 }}>
          <Menu
            items={basicItems}
            selectedKeys={selectedVertical}
            onSelect={({ selectedKeys }) => setSelectedVertical(selectedKeys)}
          />
        </div>
      </Section>

      <Section title="Horizontal" align="start">
        <div style={{ width: '100%' }}>
          <Menu
            items={basicItems}
            mode="horizontal"
            selectedKeys={selectedHorizontal}
            onSelect={({ selectedKeys }) => setSelectedHorizontal(selectedKeys)}
          />
        </div>
      </Section>

      <Section title="Inline con submenús" align="start">
        <div style={{ width: 256 }}>
          <Menu
            items={submenuItems}
            mode="inline"
            defaultOpenKeys={['users']}
            defaultSelectedKeys={['list']}
          />
        </div>
      </Section>

      <Section title="Vertical con submenús (popup)" align="start">
        <div style={{ width: 256 }}>
          <Menu
            items={submenuItems}
            mode="vertical"
            defaultSelectedKeys={['home']}
          />
        </div>
      </Section>

      <Section title="Horizontal con submenús" align="start">
        <div style={{ width: '100%' }}>
          <Menu
            items={submenuItems}
            mode="horizontal"
            defaultSelectedKeys={['home']}
          />
        </div>
      </Section>

      <Section title="Grupos y dividers" align="start">
        <div style={{ width: 256 }}>
          <Menu
            items={groupItems}
            defaultSelectedKeys={['home']}
          />
        </div>
      </Section>

      <Section title="Dividers (solid y dashed)" align="start">
        <div style={{ width: 256 }}>
          <Menu
            items={dividerDashedItems}
            defaultSelectedKeys={['home']}
          />
        </div>
      </Section>

      <Section title="Items danger / disabled" align="start">
        <div style={{ width: 256 }}>
          <Menu
            items={dangerItems}
            defaultSelectedKeys={['home']}
          />
        </div>
      </Section>

      <Section title="Selección múltiple" align="start">
        <div style={{ width: 256 }}>
          <Menu
            items={basicItems}
            multiple
            defaultSelectedKeys={['home', 'mail']}
          />
        </div>
      </Section>

      <Section title="triggerSubMenuAction: click" align="start">
        <div style={{ width: 256 }}>
          <Menu
            items={submenuItems}
            mode="inline"
            triggerSubMenuAction="click"
            defaultSelectedKeys={['home']}
          />
        </div>
      </Section>

      <Section title="Inline collapsed" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              padding: '6px 12px',
              border: '1px solid #ccc',
              borderRadius: 4,
              cursor: 'pointer',
              backgroundColor: 'transparent',
              color: 'inherit',
              width: 'fit-content',
            }}
          >
            {collapsed ? 'Expandir' : 'Colapsar'}
          </button>
          <div style={{ width: collapsed ? 48 : 256, transition: 'width 0.2s' }}>
            <Menu
              items={basicItems}
              mode="inline"
              inlineCollapsed={collapsed}
              defaultSelectedKeys={['home']}
            />
          </div>
        </div>
      </Section>

      <Section title="onClick global" align="start">
        <div style={{ width: 256 }}>
          <Menu
            items={basicItems}
            defaultSelectedKeys={['home']}
            onClick={({ key }) => alert(`Clicked: ${key}`)}
          />
        </div>
      </Section>

      <Section title="Semantic DOM Styling (classNames / styles)" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block' }}>
            Slots disponibles: <Text code>root</Text>, <Text code>item</Text>, <Text code>submenu</Text>, <Text code>group</Text>, <Text code>groupTitle</Text>, <Text code>divider</Text>
          </Text>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ width: 256 }}>
              <Menu
                items={groupItems}
                defaultSelectedKeys={['home']}
                styles={{
                  root: { backgroundColor: '#1e1b4b', borderColor: '#4338ca', borderRadius: 12, color: '#e0e7ff' },
                  item: { color: '#e0e7ff', backgroundColor: '#312e81' },
                  groupTitle: { color: '#818cf8' },
                  divider: { borderColor: '#4338ca' },
                }}
              />
            </div>
            <div style={{ width: 256 }}>
              <Menu
                items={basicItems}
                defaultSelectedKeys={['files']}
                styles={{
                  root: { backgroundColor: '#ecfdf5', borderColor: '#a7f3d0', borderRadius: 12, color: '#065f46' },
                  item: { color: '#065f46' },
                }}
              />
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
