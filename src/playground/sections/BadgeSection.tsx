import { Badge, Text, tokens } from '../../index'
import { Section } from './shared'

export function BadgeSection() {
  const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )

  const CloseIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )

  const InfoIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  )

  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Badge</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Badges para mostrar estados, etiquetas o contadores.
      </Text>

      <Section title="Usando tokens del tema">
        <Badge bgColor={tokens.colorSuccessBg} color={tokens.colorSuccess300} icon={<CheckIcon />}>
          Activo
        </Badge>
        <Badge bgColor={tokens.colorErrorBg} color={tokens.colorError300} icon={<CloseIcon />}>
          Inactivo
        </Badge>
        <Badge bgColor={tokens.colorWarningBg} color={tokens.colorWarning300}>
          Pendiente
        </Badge>
        <Badge bgColor={tokens.colorInfoBg} color={tokens.colorInfo300} icon={<InfoIcon />}>
          Info
        </Badge>
        <Badge bgColor={tokens.colorPrimaryBg} color={tokens.colorPrimary300}>
          Primary
        </Badge>
      </Section>

      <Section title="Border radius">
        <Badge radius="none" bgColor={tokens.colorPrimaryBg} color={tokens.colorPrimary300}>none</Badge>
        <Badge radius="sm" bgColor={tokens.colorPrimaryBg} color={tokens.colorPrimary300}>sm</Badge>
        <Badge radius="md" bgColor={tokens.colorPrimaryBg} color={tokens.colorPrimary300}>md</Badge>
        <Badge radius="lg" bgColor={tokens.colorPrimaryBg} color={tokens.colorPrimary300}>lg</Badge>
        <Badge radius="full" bgColor={tokens.colorPrimaryBg} color={tokens.colorPrimary300}>full</Badge>
      </Section>

      <Section title="Sin borde">
        <Badge bordered={false} bgColor={tokens.colorSuccessBg} color={tokens.colorSuccess300}>Sin borde</Badge>
        <Badge bordered={false} bgColor={tokens.colorErrorBg} color={tokens.colorError300}>Sin borde</Badge>
        <Badge bordered={false} bgColor={tokens.colorWarningBg} color={tokens.colorWarning300}>Sin borde</Badge>
      </Section>

      <Section title="Colores personalizados">
        <Badge bgColor="#fce7f3" color="#db2777">Rosa</Badge>
        <Badge bgColor="#dbeafe" color="#2563eb">Azul</Badge>
        <Badge bgColor="#d1fae5" color="#059669">Verde</Badge>
        <Badge bgColor="#1f1f1f" color="#ffffff">Oscuro</Badge>
      </Section>

      <Section title="Semantic DOM Styling (classNames / styles)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block' }}>
            Slots disponibles: <Text code>root</Text>, <Text code>icon</Text>, <Text code>content</Text>
          </Text>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Badge
              bgColor={tokens.colorPrimaryBg}
              color={tokens.colorPrimary300}
              icon={<CheckIcon />}
              styles={{
                root: { borderRadius: 4, paddingLeft: 12, paddingRight: 12 },
                icon: { backgroundColor: tokens.colorPrimary, color: '#fff', borderRadius: '50%', padding: 2 },
                content: { fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 },
              }}
            >
              Styled
            </Badge>
            <Badge
              bgColor="#fef3c7"
              color="#d97706"
              icon={<InfoIcon />}
              styles={{
                root: { boxShadow: '0 2px 8px rgba(217,119,6,0.2)' },
                icon: { transform: 'scale(1.2)' },
              }}
            >
              Con sombra
            </Badge>
          </div>
        </div>
      </Section>
    </div>
  )
}
