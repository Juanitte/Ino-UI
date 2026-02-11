import { Button, Tooltip, Text, tokens } from '../../index'
import { Section } from './shared'

export function TooltipSection() {
  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Tooltip</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Tooltips con animación y posicionamiento.
      </Text>

      <Section title="Posiciones">
        <Tooltip content="Tooltip arriba" position="top">
          <Button variant="outline">Top</Button>
        </Tooltip>
        <Tooltip content="Tooltip abajo" position="bottom">
          <Button variant="outline">Bottom</Button>
        </Tooltip>
        <Tooltip content="Tooltip izquierda" position="left">
          <Button variant="outline">Left</Button>
        </Tooltip>
        <Tooltip content="Tooltip derecha" position="right">
          <Button variant="outline">Right</Button>
        </Tooltip>
      </Section>

      <Section title="Con diferentes elementos">
        <Tooltip content="Botón primary">
          <Button>Hover me</Button>
        </Tooltip>
        <Tooltip content="Texto informativo">
          <span style={{ textDecoration: 'underline', cursor: 'help' }}>
            Texto con tooltip
          </span>
        </Tooltip>
        <Tooltip content="Icono de ayuda">
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
            borderRadius: '50%',
            backgroundColor: tokens.colorBgMuted,
            cursor: 'help',
            fontSize: 14,
          }}>
            ?
          </span>
        </Tooltip>
      </Section>

      <Section title="Delay personalizado">
        <Tooltip content="Delay 0ms" delay={0}>
          <Button variant="secondary">Inmediato</Button>
        </Tooltip>
        <Tooltip content="Delay 500ms" delay={500}>
          <Button variant="secondary">500ms</Button>
        </Tooltip>
        <Tooltip content="Delay 1000ms" delay={1000}>
          <Button variant="secondary">1 segundo</Button>
        </Tooltip>
      </Section>

      <Section title="Desactivado">
        <Tooltip content="No debería verse" disabled>
          <Button variant="ghost">Tooltip desactivado</Button>
        </Tooltip>
      </Section>

      <Section title="Semantic DOM Styling (classNames / styles)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block' }}>
            Slots disponibles: <Text code>root</Text>, <Text code>popup</Text>, <Text code>arrow</Text>
          </Text>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Tooltip
              content="Popup personalizado"
              styles={{
                popup: { backgroundColor: '#8b5cf6', color: '#fff', borderColor: '#7c3aed', borderRadius: 12, fontWeight: 600 },
                arrow: { backgroundColor: '#8b5cf6', borderColor: '#7c3aed' },
              }}
            >
              <Button variant="outline">Popup violeta</Button>
            </Tooltip>
            <Tooltip
              content="Con gradiente"
              styles={{
                popup: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff', border: 'none', boxShadow: '0 8px 24px rgba(102,126,234,0.4)' },
                arrow: { background: '#667eea', borderColor: 'transparent' },
              }}
            >
              <Button variant="outline">Popup gradiente</Button>
            </Tooltip>
          </div>
        </div>
      </Section>
    </div>
  )
}
