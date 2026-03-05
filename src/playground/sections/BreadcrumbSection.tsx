import { Breadcrumb, Text, tokens } from '../../index'
import { Section } from './shared'

const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const FolderIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
)

const FileIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
)

export function BreadcrumbSection() {
  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Breadcrumb</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Navegación jerárquica que muestra la ubicación actual.
      </Text>

      <Section title="Básico">
        <Breadcrumb
          items={[
            { title: 'Inicio' },
            { title: 'Categoría' },
            { title: 'Página actual' },
          ]}
        />
      </Section>

      <Section title="Con enlaces">
        <Breadcrumb
          items={[
            { title: 'Inicio', href: '#' },
            { title: 'Productos', href: '#' },
            { title: 'Electrónica', href: '#' },
            { title: 'Laptops' },
          ]}
        />
      </Section>

      <Section title="Con iconos">
        <Breadcrumb
          items={[
            { title: 'Inicio', href: '#', icon: <HomeIcon /> },
            { title: 'Documentos', href: '#', icon: <FolderIcon /> },
            { title: 'Archivo.tsx', icon: <FileIcon /> },
          ]}
        />
      </Section>

      <Section title="Solo icono (sin título)">
        <Breadcrumb
          items={[
            { icon: <HomeIcon />, href: '#' },
            { title: 'Configuración', href: '#' },
            { title: 'Perfil' },
          ]}
        />
      </Section>

      <Section title="Separador personalizado">
        <Breadcrumb
          separator=">"
          items={[
            { title: 'Inicio', href: '#' },
            { title: 'Componentes', href: '#' },
            { title: 'Breadcrumb' },
          ]}
        />
        <Breadcrumb
          separator="→"
          items={[
            { title: 'Paso 1', href: '#' },
            { title: 'Paso 2', href: '#' },
            { title: 'Paso 3' },
          ]}
        />
        <Breadcrumb
          separator={
            <span style={{ color: tokens.colorPrimary, fontWeight: 'bold' }}>•</span>
          }
          items={[
            { title: 'Home', href: '#' },
            { title: 'Docs', href: '#' },
            { title: 'API' },
          ]}
        />
      </Section>

      <Section title="Con dropdown menu">
        <Breadcrumb
          items={[
            { title: 'Inicio', href: '#' },
            {
              title: 'Componentes',
              href: '#',
              menu: {
                items: [
                  { key: '1', title: 'Button', href: '#' },
                  { key: '2', title: 'Badge', href: '#' },
                  { key: '3', title: 'Tooltip', href: '#' },
                  { key: '4', title: 'Text', href: '#' },
                ],
              },
            },
            { title: 'Breadcrumb' },
          ]}
        />
      </Section>

      <Section title="Con itemRender personalizado">
        <Breadcrumb
          items={[
            { title: 'Ino-UI', path: '' },
            { title: 'Componentes', path: 'components' },
            { title: 'Navegación', path: 'navigation' },
            { title: 'Breadcrumb', path: 'breadcrumb' },
          ]}
          itemRender={(item, _params, items, paths) => {
            const isLast = items.indexOf(item) === items.length - 1
            return isLast ? (
              <span style={{ color: tokens.colorText, fontWeight: 500 }}>{item.title}</span>
            ) : (
              <a
                href={`#/${paths[items.indexOf(item)]}`}
                style={{ color: tokens.colorPrimary, textDecoration: 'none' }}
              >
                {item.title}
              </a>
            )
          }}
        />
      </Section>

      <Section title="Con onClick">
        <Breadcrumb
          items={[
            { title: 'Inicio', onClick: () => alert('Inicio') },
            { title: 'Sección', onClick: () => alert('Sección') },
            { title: 'Actual' },
          ]}
        />
      </Section>

      <Section title="Semantic DOM Styling (classNames / styles)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block' }}>
            Slots disponibles: <Text code>root</Text>, <Text code>list</Text>, <Text code>item</Text>, <Text code>separator</Text>, <Text code>link</Text>, <Text code>overlay</Text>
          </Text>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <Breadcrumb
              items={[
                { title: 'Inicio', href: '#', icon: <HomeIcon /> },
                { title: 'Docs', href: '#' },
                { title: 'API' },
              ]}
              styles={{
                root: { backgroundColor: '#f3f0ff', padding: '8px 16px', borderRadius: 8, border: '1px solid #c4b5fd', color: '#000' },
                separator: { color: '#8b5cf6', fontWeight: 700 },
                link: { color: '#7c3aed' },
              }}
            />
            <Breadcrumb
              separator="/"
              items={[
                { title: 'Home', href: '#' },
                { title: 'Products', href: '#' },
                { title: 'Detail' },
              ]}
              styles={{
                root: { backgroundColor: '#ecfdf5', padding: '8px 16px', borderRadius: 20, border: '1px solid #a7f3d0', color: '#000' },
                item: { fontSize: 13 },
                separator: { color: '#059669' },
                link: { color: '#047857' },
              }}
            />
          </div>
        </div>
      </Section>
    </div>
  )
}
