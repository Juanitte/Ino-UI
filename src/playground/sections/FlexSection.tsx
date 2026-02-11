import { Button, Flex, Text, tokens } from '../../index'
import { Section } from './shared'

export function FlexSection() {
  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Flex</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Contenedor flex para layouts flexibles.
      </Text>

      <Section title="Básico (horizontal)">
        <Flex gap="middle" style={{ width: '100%', padding: 16, backgroundColor: tokens.colorBgMuted, borderRadius: 8 }}>
          <div style={{ padding: '16px 24px', backgroundColor: tokens.colorPrimary, color: tokens.colorPrimaryContrast, borderRadius: 4 }}>Item 1</div>
          <div style={{ padding: '16px 24px', backgroundColor: tokens.colorPrimary, color: tokens.colorPrimaryContrast, borderRadius: 4 }}>Item 2</div>
          <div style={{ padding: '16px 24px', backgroundColor: tokens.colorPrimary, color: tokens.colorPrimaryContrast, borderRadius: 4 }}>Item 3</div>
        </Flex>
      </Section>

      <Section title="Vertical">
        <Flex vertical gap="middle" style={{ padding: 16, backgroundColor: tokens.colorBgMuted, borderRadius: 8 }}>
          <div style={{ padding: '16px 24px', backgroundColor: tokens.colorSecondary, color: tokens.colorSecondaryContrast, borderRadius: 4 }}>Item 1</div>
          <div style={{ padding: '16px 24px', backgroundColor: tokens.colorSecondary, color: tokens.colorSecondaryContrast, borderRadius: 4 }}>Item 2</div>
          <div style={{ padding: '16px 24px', backgroundColor: tokens.colorSecondary, color: tokens.colorSecondaryContrast, borderRadius: 4 }}>Item 3</div>
        </Flex>
      </Section>

      <Section title="Gap presets">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>small (8px)</Text>
            <Flex gap="small" style={{ padding: 16, backgroundColor: tokens.colorBgMuted, borderRadius: 8 }}>
              <div style={{ padding: 12, backgroundColor: tokens.colorSuccess, color: tokens.colorSuccessContrast, borderRadius: 4 }}>A</div>
              <div style={{ padding: 12, backgroundColor: tokens.colorSuccess, color: tokens.colorSuccessContrast, borderRadius: 4 }}>B</div>
              <div style={{ padding: 12, backgroundColor: tokens.colorSuccess, color: tokens.colorSuccessContrast, borderRadius: 4 }}>C</div>
            </Flex>
          </div>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>middle (16px)</Text>
            <Flex gap="middle" style={{ padding: 16, backgroundColor: tokens.colorBgMuted, borderRadius: 8 }}>
              <div style={{ padding: 12, backgroundColor: tokens.colorSuccess, color: tokens.colorSuccessContrast, borderRadius: 4 }}>A</div>
              <div style={{ padding: 12, backgroundColor: tokens.colorSuccess, color: tokens.colorSuccessContrast, borderRadius: 4 }}>B</div>
              <div style={{ padding: 12, backgroundColor: tokens.colorSuccess, color: tokens.colorSuccessContrast, borderRadius: 4 }}>C</div>
            </Flex>
          </div>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>large (24px)</Text>
            <Flex gap="large" style={{ padding: 16, backgroundColor: tokens.colorBgMuted, borderRadius: 8 }}>
              <div style={{ padding: 12, backgroundColor: tokens.colorSuccess, color: tokens.colorSuccessContrast, borderRadius: 4 }}>A</div>
              <div style={{ padding: 12, backgroundColor: tokens.colorSuccess, color: tokens.colorSuccessContrast, borderRadius: 4 }}>B</div>
              <div style={{ padding: 12, backgroundColor: tokens.colorSuccess, color: tokens.colorSuccessContrast, borderRadius: 4 }}>C</div>
            </Flex>
          </div>
        </div>
      </Section>

      <Section title="Gap numérico personalizado">
        <Flex gap={32} style={{ padding: 16, backgroundColor: tokens.colorBgMuted, borderRadius: 8 }}>
          <div style={{ padding: 12, backgroundColor: tokens.colorWarning, color: tokens.colorWarningContrast, borderRadius: 4 }}>32px</div>
          <div style={{ padding: 12, backgroundColor: tokens.colorWarning, color: tokens.colorWarningContrast, borderRadius: 4 }}>gap</div>
          <div style={{ padding: 12, backgroundColor: tokens.colorWarning, color: tokens.colorWarningContrast, borderRadius: 4 }}>items</div>
        </Flex>
      </Section>

      <Section title="Justify content">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
          {(['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'] as const).map((justify) => (
            <div key={justify}>
              <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>{justify}</Text>
              <Flex justify={justify} style={{ padding: 12, backgroundColor: tokens.colorBgMuted, borderRadius: 8 }}>
                <div style={{ padding: 8, backgroundColor: tokens.colorInfo, color: tokens.colorInfoContrast, borderRadius: 4 }}>A</div>
                <div style={{ padding: 8, backgroundColor: tokens.colorInfo, color: tokens.colorInfoContrast, borderRadius: 4 }}>B</div>
                <div style={{ padding: 8, backgroundColor: tokens.colorInfo, color: tokens.colorInfoContrast, borderRadius: 4 }}>C</div>
              </Flex>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Align items">
        <div style={{ display: 'flex', gap: 16, width: '100%' }}>
          {(['flex-start', 'center', 'flex-end', 'stretch'] as const).map((align) => (
            <div key={align} style={{ flex: 1 }}>
              <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>{align}</Text>
              <Flex align={align} gap="small" style={{ height: 100, padding: 12, backgroundColor: tokens.colorBgMuted, borderRadius: 8 }}>
                <div style={{ padding: 8, backgroundColor: tokens.colorError, color: tokens.colorErrorContrast, borderRadius: 4 }}>A</div>
                <div style={{ padding: '16px 8px', backgroundColor: tokens.colorError, color: tokens.colorErrorContrast, borderRadius: 4 }}>B</div>
              </Flex>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Wrap">
        <div style={{ width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>wrap={`{true}`} o wrap="wrap"</Text>
          <Flex wrap gap="small" style={{ maxWidth: 300, padding: 16, backgroundColor: tokens.colorBgMuted, borderRadius: 8 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ padding: '8px 16px', backgroundColor: tokens.colorPrimary, color: tokens.colorPrimaryContrast, borderRadius: 4 }}>
                Item {i + 1}
              </div>
            ))}
          </Flex>
        </div>
      </Section>

      <Section title="Gap diferente horizontal/vertical">
        <div style={{ width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>gap={`{[8, 24]}`} - 8px horizontal, 24px vertical</Text>
          <Flex wrap gap={[8, 24]} style={{ maxWidth: 280, padding: 16, backgroundColor: tokens.colorBgMuted, borderRadius: 8 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ padding: '8px 16px', backgroundColor: tokens.colorSecondary, color: tokens.colorSecondaryContrast, borderRadius: 4 }}>
                Item {i + 1}
              </div>
            ))}
          </Flex>
        </div>
      </Section>

      <Section title="Componente personalizado">
        <Flex component="section" gap="middle" style={{ padding: 16, backgroundColor: tokens.colorBgMuted, borderRadius: 8 }}>
          <Text>Renderizado como</Text>
          <Text code>{'<section>'}</Text>
          <Text>en lugar de div</Text>
        </Flex>
      </Section>

      <Section title="Combinación: layout de tarjetas">
        <Flex wrap gap="middle" justify="center" style={{ width: '100%' }}>
          {['Card 1', 'Card 2', 'Card 3', 'Card 4'].map((card) => (
            <Flex
              key={card}
              vertical
              gap="small"
              style={{
                width: 150,
                padding: 16,
                backgroundColor: tokens.colorBgMuted,
                borderRadius: 8,
                border: `1px solid ${tokens.colorBorder}`,
              }}
            >
              <div style={{ height: 60, backgroundColor: tokens.colorPrimaryLight, borderRadius: 4 }} />
              <Text weight="semibold">{card}</Text>
              <Text size="sm" type="secondary">Descripción breve</Text>
            </Flex>
          ))}
        </Flex>
      </Section>

      <Section title="Combinación: header layout">
        <Flex
          justify="space-between"
          align="center"
          style={{
            width: '100%',
            padding: 16,
            backgroundColor: tokens.colorBgMuted,
            borderRadius: 8,
            border: `1px solid ${tokens.colorBorder}`,
          }}
        >
          <Text weight="bold" size="lg">Logo</Text>
          <Flex gap="middle">
            <Button variant="ghost">Inicio</Button>
            <Button variant="ghost">Productos</Button>
            <Button variant="ghost">Contacto</Button>
          </Flex>
          <Button>Login</Button>
        </Flex>
      </Section>
    </div>
  )
}
