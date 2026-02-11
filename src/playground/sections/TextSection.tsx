import { Text } from '../../index'
import { Section } from './shared'

export function TextSection() {
  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Text</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Componente de texto con estilos y utilidades.
      </Text>

      <Section title="Tipos (colores)">
        <Text>Default text</Text>
        <Text type="secondary">Secondary text</Text>
        <Text type="success">Success text</Text>
        <Text type="warning">Warning text</Text>
        <Text type="error">Error text</Text>
        <Text type="info">Info text</Text>
      </Section>

      <Section title="Tamaños">
        <Text size="xs">Extra small</Text>
        <Text size="sm">Small</Text>
        <Text size="md">Medium (default)</Text>
        <Text size="lg">Large</Text>
        <Text size="xl">Extra large</Text>
      </Section>

      <Section title="Pesos (weights)">
        <Text weight="thin">Thin (100)</Text>
        <Text weight="light">Light (300)</Text>
        <Text weight="normal">Normal (400)</Text>
        <Text weight="medium">Medium (500)</Text>
        <Text weight="semibold">Semibold (600)</Text>
        <Text weight="bold">Bold (700)</Text>
        <Text weight="extrabold">Extrabold (800)</Text>
        <Text weight="black">Black (900)</Text>
      </Section>

      <Section title="Interlineado (line-height)" align="start">
        <div style={{ width: 140 }}>
          <Text size="sm" weight="semibold" style={{ display: 'block', marginBottom: 4 }}>none (1)</Text>
          <Text lineHeight="none" style={{ display: 'block' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </div>
        <div style={{ width: 140 }}>
          <Text size="sm" weight="semibold" style={{ display: 'block', marginBottom: 4 }}>tight (1.25)</Text>
          <Text lineHeight="tight" style={{ display: 'block' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </div>
        <div style={{ width: 140 }}>
          <Text size="sm" weight="semibold" style={{ display: 'block', marginBottom: 4 }}>snug (1.375)</Text>
          <Text lineHeight="snug" style={{ display: 'block' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </div>
        <div style={{ width: 140 }}>
          <Text size="sm" weight="semibold" style={{ display: 'block', marginBottom: 4 }}>normal (1.5)</Text>
          <Text lineHeight="normal" style={{ display: 'block' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </div>
        <div style={{ width: 140 }}>
          <Text size="sm" weight="semibold" style={{ display: 'block', marginBottom: 4 }}>relaxed (1.625)</Text>
          <Text lineHeight="relaxed" style={{ display: 'block' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </div>
        <div style={{ width: 140 }}>
          <Text size="sm" weight="semibold" style={{ display: 'block', marginBottom: 4 }}>loose (2)</Text>
          <Text lineHeight="loose" style={{ display: 'block' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </div>
      </Section>

      <Section title="Estilos de texto">
        <Text italic>Italic</Text>
        <Text underline>Underline</Text>
        <Text delete>Deleted (strikethrough)</Text>
        <Text weight="bold" italic>Bold + Italic</Text>
      </Section>

      <Section title="Mark (highlight)">
        <Text>Texto normal con <Text mark>parte resaltada</Text> en medio.</Text>
      </Section>

      <Section title="Code">
        <Text>Usa el comando <Text code>npm install j-ui</Text> para instalar.</Text>
      </Section>

      <Section title="Keyboard">
        <Text>Presiona <Text keyboard>Ctrl</Text> + <Text keyboard>C</Text> para copiar.</Text>
      </Section>

      <Section title="Disabled">
        <Text disabled>Este texto está deshabilitado</Text>
        <Text disabled type="success">Success deshabilitado</Text>
      </Section>

      <Section title="Copyable">
        <Text copyable>Click en el icono para copiar este texto</Text>
        <Text copyable={{ text: 'Texto personalizado para copiar' }}>
          Copia un texto diferente al visible
        </Text>
        <Text code copyable>npm install j-ui</Text>
      </Section>

      <Section title="Combinaciones">
        <Text type="success" weight="semibold" size="lg">Operación exitosa!</Text>
        <Text type="error" italic>Error: algo salió mal</Text>
        <Text type="warning" mark>Advertencia importante</Text>
        <Text type="info" underline copyable>Información copiable</Text>
      </Section>

      <Section title="Ellipsis (una línea)">
        <div style={{ width: 200 }}>
          <Text ellipsis>
            Este es un texto muy largo que será truncado con puntos suspensivos cuando exceda el ancho del contenedor.
          </Text>
        </div>
      </Section>

      <Section title="Ellipsis (múltiples líneas)">
        <div style={{ width: 300 }}>
          <Text ellipsis={{ rows: 2 }}>
            Este es un texto largo que se mostrará en máximo 2 líneas. Si el contenido es mayor, se truncará con puntos suspensivos. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </div>
        <div style={{ width: 300 }}>
          <Text ellipsis={{ rows: 3 }}>
            Este texto se mostrará en máximo 3 líneas antes de truncarse. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </Text>
        </div>
      </Section>

      <Section title="Ellipsis expandible">
        <div style={{ width: 300 }}>
          <Text ellipsis={{ rows: 2, expandable: true }}>
            Este texto puede expandirse y colapsarse. Haz clic en "más" para ver todo el contenido. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </div>
        <div style={{ width: 300 }}>
          <Text ellipsis={{ rows: 1, expandable: true }} type="secondary">
            Texto secundario con ellipsis expandible. Este es un ejemplo de texto largo que puede expandirse al hacer clic.
          </Text>
        </div>
      </Section>

      <Section title="Semantic DOM Styling (classNames / styles)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block' }}>
            Slots disponibles: <Text code>root</Text>, <Text code>content</Text>, <Text code>copyButton</Text>, <Text code>expandButton</Text>
          </Text>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <Text
              copyable
              styles={{
                root: { backgroundColor: '#f0fdf4', padding: '8px 12px', borderRadius: 8, border: '1px solid #bbf7d0', color: '#000' },
                copyButton: { color: '#16a34a', transform: 'scale(1.3)' },
              }}
            >
              Texto con botón de copiar estilizado
            </Text>
            <div style={{ width: 280 }}>
              <Text
                ellipsis={{ rows: 2, expandable: true }}
                styles={{
                  root: { backgroundColor: '#eff6ff', padding: 12, borderRadius: 8, display: 'block', color: '#000' },
                  expandButton: { color: '#8b5cf6', fontWeight: 700 },
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.
              </Text>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
