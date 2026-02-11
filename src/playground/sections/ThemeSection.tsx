import { Text, tokens } from '../../index'

export function ThemeSection() {
  const colors = ['primary', 'secondary', 'success', 'warning', 'error', 'info'] as const

  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Theme</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Sistema de temas con generación automática de variantes.
      </Text>

      {colors.map((color) => (
        <div key={color} style={{ marginBottom: 24 }}>
          <Text size="lg" style={{ display: 'block', marginBottom: 8, textTransform: 'capitalize' }}>{color}</Text>
          <div style={{ display: 'flex', gap: 4 }}>
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((level) => (
              <div
                key={level}
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: `var(--j-${color}-${level})`,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  color: level >= 500 ? '#fff' : '#000',
                }}
              >
                {level}
              </div>
            ))}
          </div>
        </div>
      ))}

      <Text size="lg" style={{ display: 'block', marginTop: 32, marginBottom: 16 }}>Neutros</Text>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {['bg', 'bgSubtle', 'bgMuted', 'border', 'text', 'textMuted', 'textSubtle'].map((name) => (
          <div
            key={name}
            style={{
              padding: 12,
              backgroundColor: name.startsWith('text') ? tokens.colorBgMuted : `var(--j-${name})`,
              border: `1px solid ${tokens.colorBorder}`,
              borderRadius: 4,
              fontSize: 12,
              color: name.startsWith('text') ? `var(--j-${name})` : tokens.colorText,
            }}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  )
}
