import { useState, type CSSProperties } from 'react'
import { Button, Divider, Space, Text, tokens } from '../../index'
import { Section } from './shared'

export function SpaceSection() {
  const [size, setSize] = useState<'small' | 'middle' | 'large'>('small')

  const demoBoxStyle: CSSProperties = {
    padding: '8px 16px',
    backgroundColor: tokens.colorPrimary,
    color: '#fff',
    borderRadius: 4,
  }

  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Space</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Espaciado entre elementos inline con control de tamaño, dirección y separadores.
      </Text>

      <Section title="Básico">
        <Space>
          <Button>Botón 1</Button>
          <Button variant="outline">Botón 2</Button>
          <Button variant="dashed">Botón 3</Button>
        </Space>
      </Section>

      <Section title="Tamaños">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>small (8px)</Text>
            <Space size="small">
              <div style={demoBoxStyle}>1</div>
              <div style={demoBoxStyle}>2</div>
              <div style={demoBoxStyle}>3</div>
            </Space>
          </div>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>middle (16px)</Text>
            <Space size="middle">
              <div style={demoBoxStyle}>1</div>
              <div style={demoBoxStyle}>2</div>
              <div style={demoBoxStyle}>3</div>
            </Space>
          </div>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>large (24px)</Text>
            <Space size="large">
              <div style={demoBoxStyle}>1</div>
              <div style={demoBoxStyle}>2</div>
              <div style={demoBoxStyle}>3</div>
            </Space>
          </div>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>custom (48px)</Text>
            <Space size={48}>
              <div style={demoBoxStyle}>1</div>
              <div style={demoBoxStyle}>2</div>
              <div style={demoBoxStyle}>3</div>
            </Space>
          </div>
        </div>
      </Section>

      <Section title="Tamaño dinámico">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Space>
            {(['small', 'middle', 'large'] as const).map((s) => (
              <Button key={s} variant={size === s ? 'primary' : 'outline'} onClick={() => setSize(s)}>{s}</Button>
            ))}
          </Space>
          <Space size={size}>
            <Button>Botón 1</Button>
            <Button>Botón 2</Button>
            <Button>Botón 3</Button>
          </Space>
        </div>
      </Section>

      <Section title="Vertical">
        <Space direction="vertical" size="middle">
          <Button style={{ width: 200 }}>Opción 1</Button>
          <Button style={{ width: 200 }} variant="outline">Opción 2</Button>
          <Button style={{ width: 200 }} variant="dashed">Opción 3</Button>
        </Space>
      </Section>

      <Section title="Alineación">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          {(['start', 'center', 'end', 'baseline'] as const).map((a) => (
            <div key={a}>
              <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>{a}</Text>
              <Space align={a} size="middle" style={{ padding: 8, border: `1px dashed ${tokens.colorBorder}`, borderRadius: 4 }}>
                <div style={{ ...demoBoxStyle, padding: '4px 8px', fontSize: 12 }}>Small</div>
                <div style={{ ...demoBoxStyle, padding: '16px 24px', fontSize: 18 }}>Large</div>
                <div style={{ ...demoBoxStyle, padding: '8px 16px' }}>Medium</div>
              </Space>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Wrap">
        <Space wrap size="middle" style={{ width: 300, padding: 8, border: `1px dashed ${tokens.colorBorder}`, borderRadius: 4 }}>
          {Array.from({ length: 10 }, (_, i) => (
            <Button key={i} size="sm">Item {i + 1}</Button>
          ))}
        </Space>
      </Section>

      <Section title="Con separador">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Space split={<Divider type="vertical" />} size="middle">
            <Text>Enlace 1</Text>
            <Text>Enlace 2</Text>
            <Text>Enlace 3</Text>
          </Space>
          <Space split={<span style={{ color: tokens.colorTextMuted }}>|</span>}>
            <Text size="sm">Inicio</Text>
            <Text size="sm">Productos</Text>
            <Text size="sm">Contacto</Text>
          </Space>
          <Space split={<span style={{ color: tokens.colorTextMuted }}>·</span>} size="small">
            <Text size="sm" type="secondary">2024</Text>
            <Text size="sm" type="secondary">Mi Empresa</Text>
            <Text size="sm" type="secondary">Términos</Text>
            <Text size="sm" type="secondary">Privacidad</Text>
          </Space>
        </div>
      </Section>

      <Section title="Tamaño [horizontal, vertical]">
        <Space wrap size={[8, 24]} style={{ width: 350, padding: 8, border: `1px dashed ${tokens.colorBorder}`, borderRadius: 4 }}>
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} style={demoBoxStyle}>Item {i + 1}</div>
          ))}
        </Space>
      </Section>

      <Section title="Compact: botones">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Space.Compact>
            <Button variant="outline">Anterior</Button>
            <Button variant="outline">Medio</Button>
            <Button variant="outline">Siguiente</Button>
          </Space.Compact>
          <Space.Compact>
            <Button>Primary</Button>
            <Button>Group</Button>
            <Button>Buttons</Button>
          </Space.Compact>
          <Space.Compact>
            <Button variant="dashed">Dashed</Button>
            <Button variant="dashed">Group</Button>
            <Button variant="dashed">Buttons</Button>
          </Space.Compact>
          <Space.Compact>
            <Button variant="outline">L</Button>
            <Button>Center</Button>
            <Button variant="outline">R</Button>
          </Space.Compact>
        </div>
      </Section>

      <Section title="Compact: vertical">
        <Space size="large">
          <Space.Compact direction="vertical">
            <Button variant="outline">Opción A</Button>
            <Button variant="outline">Opción B</Button>
            <Button variant="outline">Opción C</Button>
          </Space.Compact>
          <Space.Compact direction="vertical">
            <Button>Top</Button>
            <Button variant="dashed">Middle</Button>
            <Button variant="outline">Bottom</Button>
          </Space.Compact>
        </Space>
      </Section>

      <Section title="Compact: formulario">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Space.Compact block>
            <input
              type="text"
              placeholder="Buscar..."
              style={{
                flex: 1,
                padding: '10px 12px',
                border: `1px solid ${tokens.colorBorder}`,
                borderRadius: '8px 0 0 8px',
                outline: 'none',
                fontSize: 14,
                fontFamily: 'inherit',
                backgroundColor: tokens.colorBg,
                color: tokens.colorText,
              }}
            />
            <Button style={{ borderRadius: '0 8px 8px 0' }}>Buscar</Button>
          </Space.Compact>
          <Space.Compact>
            <input
              type="text"
              placeholder="URL"
              style={{
                width: 200,
                padding: '10px 12px',
                border: `1px solid ${tokens.colorBorder}`,
                borderRadius: '8px 0 0 8px',
                outline: 'none',
                fontSize: 14,
                fontFamily: 'inherit',
                backgroundColor: tokens.colorBg,
                color: tokens.colorText,
              }}
            />
            <Button variant="outline" style={{ borderRadius: 0 }}>Copiar</Button>
            <Button style={{ borderRadius: '0 8px 8px 0' }}>Ir</Button>
          </Space.Compact>
        </div>
      </Section>

      <Section title="Semantic DOM Styling (classNames / styles)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block' }}>
            Slots disponibles: <Text code>root</Text>, <Text code>item</Text>, <Text code>separator</Text>
          </Text>
          <Space
            split={<Divider type="vertical" />}
            size="middle"
            styles={{
              root: { backgroundColor: '#faf5ff', padding: 12, borderRadius: 8, border: '1px solid #e9d5ff' },
              item: { backgroundColor: '#ede9fe', padding: '4px 12px', borderRadius: 6 },
              separator: { margin: '0 4px' },
            }}
          >
            <Text weight="semibold" style={{ color: '#7c3aed' }}>Inicio</Text>
            <Text weight="semibold" style={{ color: '#7c3aed' }}>Productos</Text>
            <Text weight="semibold" style={{ color: '#7c3aed' }}>Contacto</Text>
          </Space>
        </div>
      </Section>

    </div>
  )
}
