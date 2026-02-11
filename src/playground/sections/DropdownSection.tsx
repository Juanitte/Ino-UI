import { Button, Dropdown, Text } from '../../index'
import type { DropdownMenuItemType } from '../../index'
import { Section } from './shared'

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const basicItems: DropdownMenuItemType[] = [
  { key: '1', label: 'Opción 1' },
  { key: '2', label: 'Opción 2' },
  { key: '3', label: 'Opción 3' },
]

const iconItems: DropdownMenuItemType[] = [
  { key: 'edit', label: 'Editar', icon: <EditIcon /> },
  { key: 'copy', label: 'Copiar', icon: <CopyIcon /> },
  { key: 'download', label: 'Descargar', icon: <DownloadIcon /> },
  { key: 'delete', label: 'Eliminar', icon: <TrashIcon />, danger: true },
]

const disabledItems: DropdownMenuItemType[] = [
  { key: '1', label: 'Activo' },
  { key: '2', label: 'Deshabilitado', disabled: true },
  { key: '3', label: 'Danger', danger: true },
  { key: '4', label: 'Danger disabled', danger: true, disabled: true },
]

const dividerItems: DropdownMenuItemType[] = [
  { key: 'edit', label: 'Editar', icon: <EditIcon /> },
  { key: 'copy', label: 'Copiar', icon: <CopyIcon /> },
  { key: 'd1', type: 'divider' },
  { key: 'download', label: 'Descargar', icon: <DownloadIcon /> },
  { key: 'd2', type: 'divider' },
  { key: 'delete', label: 'Eliminar', icon: <TrashIcon />, danger: true },
]

const groupItems: DropdownMenuItemType[] = [
  {
    key: 'g1',
    type: 'group',
    title: 'Acciones',
    children: [
      { key: 'edit', label: 'Editar', icon: <EditIcon /> },
      { key: 'copy', label: 'Copiar', icon: <CopyIcon /> },
    ],
  },
  { key: 'd1', type: 'divider' },
  {
    key: 'g2',
    type: 'group',
    title: 'Peligrosas',
    children: [
      { key: 'delete', label: 'Eliminar', icon: <TrashIcon />, danger: true },
    ],
  },
]

const submenuItems: DropdownMenuItemType[] = [
  { key: 'edit', label: 'Editar' },
  {
    key: 'export',
    label: 'Exportar como...',
    children: [
      { key: 'pdf', label: 'PDF' },
      { key: 'csv', label: 'CSV' },
      { key: 'xlsx', label: 'Excel' },
    ],
  },
  { key: 'd1', type: 'divider' },
  { key: 'delete', label: 'Eliminar', danger: true },
]

export function DropdownSection() {
  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Dropdown</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Menú contextual desplegable con soporte para hover, click y submenús.
      </Text>

      <Section title="Básico (hover)">
        <Dropdown menu={{ items: basicItems }}>
          <Button variant="outline">Hover me</Button>
        </Dropdown>
      </Section>

      <Section title="Trigger: click">
        <Dropdown menu={{ items: basicItems }} trigger={['click']}>
          <Button variant="outline">Click me</Button>
        </Dropdown>
      </Section>

      <Section title="Placement">
        <Dropdown menu={{ items: basicItems }} placement="bottomLeft">
          <Button variant="secondary">bottomLeft</Button>
        </Dropdown>
        <Dropdown menu={{ items: basicItems }} placement="bottom">
          <Button variant="secondary">bottom</Button>
        </Dropdown>
        <Dropdown menu={{ items: basicItems }} placement="bottomRight">
          <Button variant="secondary">bottomRight</Button>
        </Dropdown>
        <Dropdown menu={{ items: basicItems }} placement="topLeft">
          <Button variant="secondary">topLeft</Button>
        </Dropdown>
        <Dropdown menu={{ items: basicItems }} placement="top">
          <Button variant="secondary">top</Button>
        </Dropdown>
        <Dropdown menu={{ items: basicItems }} placement="topRight">
          <Button variant="secondary">topRight</Button>
        </Dropdown>
      </Section>

      <Section title="Con flecha">
        <Dropdown menu={{ items: basicItems }} arrow placement="bottom">
          <Button variant="outline">Con flecha</Button>
        </Dropdown>
        <Dropdown menu={{ items: basicItems }} arrow placement="bottomLeft">
          <Button variant="outline">bottomLeft + arrow</Button>
        </Dropdown>
      </Section>

      <Section title="Con iconos">
        <Dropdown menu={{ items: iconItems }}>
          <Button variant="outline">Acciones</Button>
        </Dropdown>
      </Section>

      <Section title="Items danger / disabled">
        <Dropdown menu={{ items: disabledItems }}>
          <Button variant="outline">Estados</Button>
        </Dropdown>
      </Section>

      <Section title="Dividers">
        <Dropdown menu={{ items: dividerItems }}>
          <Button variant="outline">Con separadores</Button>
        </Dropdown>
      </Section>

      <Section title="Grupos">
        <Dropdown menu={{ items: groupItems }}>
          <Button variant="outline">Con grupos</Button>
        </Dropdown>
      </Section>

      <Section title="Submenús">
        <Dropdown menu={{ items: submenuItems }}>
          <Button variant="outline">Con submenú</Button>
        </Dropdown>
      </Section>

      <Section title="onClick global">
        <Dropdown
          menu={{
            items: basicItems,
            onClick: ({ key }) => alert(`Clicked: ${key}`),
          }}
        >
          <Button variant="outline">Click y alerta</Button>
        </Dropdown>
      </Section>

      <Section title="Desactivado">
        <Dropdown menu={{ items: basicItems }} disabled>
          <Button variant="outline">Disabled</Button>
        </Dropdown>
      </Section>

      <Section title="Dropdown.Button">
        <Dropdown.Button
          menu={{ items: iconItems, onClick: ({ key }) => alert(`Action: ${key}`) }}
          onClick={() => alert('Main button clicked')}
        >
          Acciones
        </Dropdown.Button>
        <Dropdown.Button
          menu={{ items: basicItems }}
          variant="outline"
          color="success"
        >
          Success
        </Dropdown.Button>
        <Dropdown.Button
          menu={{ items: basicItems }}
          variant="secondary"
          size="sm"
        >
          Small
        </Dropdown.Button>
      </Section>

      <Section title="Dropdown.Button + Trigger click">
        <Dropdown.Button
          menu={{ items: iconItems }}
          trigger={['click']}
          onClick={() => alert('Main click')}
        >
          Click trigger
        </Dropdown.Button>
      </Section>

      <Section title="Semantic DOM Styling (classNames / styles)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block' }}>
            Slots disponibles: <Text code>root</Text>, <Text code>overlay</Text>, <Text code>item</Text>, <Text code>arrow</Text>
          </Text>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Dropdown
              menu={{ items: iconItems }}
              arrow
              placement="bottom"
              styles={{
                overlay: { backgroundColor: '#1e1b4b', borderColor: '#4338ca', borderRadius: 12 },
                item: { color: '#e0e7ff' },
                arrow: { backgroundColor: '#1e1b4b', borderColor: '#4338ca' },
              }}
            >
              <Button variant="outline">Overlay oscuro</Button>
            </Dropdown>
            <Dropdown
              menu={{ items: basicItems }}
              styles={{
                overlay: { backgroundColor: '#ecfdf5', borderColor: '#a7f3d0', boxShadow: '0 8px 24px rgba(5,150,105,0.15)' },
                item: { color: '#065f46' },
              }}
            >
              <Button variant="outline">Overlay verde</Button>
            </Dropdown>
          </div>
        </div>
      </Section>
    </div>
  )
}
