import { Button, Divider, Text, tokens } from '../../index'
import { Section } from './shared'

export function DividerSection() {
  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Divider</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Línea separadora para dividir contenido.
      </Text>

      <Section title="Básico">
        <div style={{ width: '100%' }}>
          <Text>Contenido arriba</Text>
          <Divider />
          <Text>Contenido abajo</Text>
        </div>
      </Section>

      <Section title="Con texto">
        <div style={{ width: '100%' }}>
          <Divider>Texto en el centro</Divider>
          <Divider orientation="left">Texto a la izquierda</Divider>
          <Divider orientation="right">Texto a la derecha</Divider>
        </div>
      </Section>

      <Section title="Dashed">
        <div style={{ width: '100%' }}>
          <Divider dashed />
          <Divider dashed>Dashed con texto</Divider>
        </div>
      </Section>

      <Section title="Orientation margin">
        <div style={{ width: '100%' }}>
          <Divider orientation="left" orientationMargin={0}>
            Sin margen izquierdo
          </Divider>
          <Divider orientation="left" orientationMargin={50}>
            50px desde la izquierda
          </Divider>
          <Divider orientation="right" orientationMargin={100}>
            100px desde la derecha
          </Divider>
        </div>
      </Section>

      <Section title="Plain (texto simple)">
        <div style={{ width: '100%' }}>
          <Divider>Texto normal</Divider>
          <Divider plain>Texto plain (más pequeño)</Divider>
        </div>
      </Section>

      <Section title="Colores">
        <div style={{ width: '100%' }}>
          <Divider color="default">Default</Divider>
          <Divider color="primary">Primary</Divider>
          <Divider color="secondary">Secondary</Divider>
          <Divider color="success">Success</Divider>
          <Divider color="warning">Warning</Divider>
          <Divider color="error">Error</Divider>
          <Divider color="info">Info</Divider>
        </div>
      </Section>

      <Section title="Colores + Dashed">
        <div style={{ width: '100%' }}>
          <Divider color="primary" dashed>Primary dashed</Divider>
          <Divider color="success" dashed>Success dashed</Divider>
          <Divider color="error" dashed>Error dashed</Divider>
        </div>
      </Section>

      <Section title="Grosor (thickness)">
        <div style={{ width: '100%' }}>
          <Divider thickness="thin">thin (1px)</Divider>
          <Divider thickness="normal">normal (1px)</Divider>
          <Divider thickness="medium">medium (2px)</Divider>
          <Divider thickness="thick">thick (3px)</Divider>
          <Divider thickness={5}>5px personalizado</Divider>
        </div>
      </Section>

      <Section title="Grosor + Color">
        <div style={{ width: '100%' }}>
          <Divider thickness="medium" color="primary">Primary medium</Divider>
          <Divider thickness="thick" color="success">Success thick</Divider>
          <Divider thickness={4} color="error" dashed>Error 4px dashed</Divider>
        </div>
      </Section>

      <Section title="Vertical">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Text>Texto</Text>
          <Divider type="vertical" />
          <Text>Texto</Text>
          <Divider type="vertical" />
          <Text>Texto</Text>
        </div>
      </Section>

      <Section title="Vertical dashed">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="link">Editar</Button>
          <Divider type="vertical" dashed />
          <Button variant="link">Eliminar</Button>
          <Divider type="vertical" dashed />
          <Button variant="link">Ver más</Button>
        </div>
      </Section>

      <Section title="Vertical con colores">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Text>Default</Text>
          <Divider type="vertical" color="primary" />
          <Text type="success">Success</Text>
          <Divider type="vertical" color="success" />
          <Text type="error">Error</Text>
          <Divider type="vertical" color="error" />
          <Text type="warning">Warning</Text>
        </div>
      </Section>

      <Section title="Vertical con grosor">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Text>thin</Text>
          <Divider type="vertical" thickness="thin" />
          <Text>medium</Text>
          <Divider type="vertical" thickness="medium" color="primary" />
          <Text>thick</Text>
          <Divider type="vertical" thickness="thick" color="success" />
          <Text>4px</Text>
          <Divider type="vertical" thickness={4} color="error" />
          <Text>fin</Text>
        </div>
      </Section>

      <Section title="Uso en lista">
        <div style={{ width: 300, border: `1px solid ${tokens.colorBorder}`, borderRadius: 8, padding: 16 }}>
          <Text weight="semibold">Configuración</Text>
          <Divider style={{ margin: '12px 0' }} />
          <Text type="secondary" size="sm">Perfil</Text>
          <Divider style={{ margin: '8px 0' }} dashed />
          <Text type="secondary" size="sm">Notificaciones</Text>
          <Divider style={{ margin: '8px 0' }} dashed />
          <Text type="secondary" size="sm">Privacidad</Text>
          <Divider style={{ margin: '12px 0' }} />
          <Text type="error" size="sm">Cerrar sesión</Text>
        </div>
      </Section>

      <Section title="Semantic DOM Styling (classNames / styles)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block' }}>
            Slots disponibles: <Text code>root</Text>, <Text code>line</Text>, <Text code>text</Text>
          </Text>
          <div style={{ width: '100%' }}>
            <Divider
              styles={{
                line: { borderColor: '#8b5cf6', borderWidth: 2 },
                text: { color: '#8b5cf6', fontWeight: 700, fontSize: 16 },
              }}
            >
              Texto violeta
            </Divider>
            <Divider
              styles={{
                root: { margin: '24px 0' },
                line: { borderColor: '#ec4899' },
                text: { backgroundColor: '#fdf2f8', color: '#ec4899', padding: '2px 16px', borderRadius: 12 },
              }}
            >
              Pill rosa
            </Divider>
          </div>
        </div>
      </Section>
    </div>
  )
}
