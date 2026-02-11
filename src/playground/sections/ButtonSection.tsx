import { useState } from 'react'
import { Button, Text } from '../../index'
import { Section } from './shared'

export function ButtonSection() {
  const [loading, setLoading] = useState(false)

  const PlusIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )

  const ArrowIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )

  const SearchIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )

  const handleLoadingClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Button</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Componente de botón con variantes, tamaños, colores y estados.
      </Text>

      <Section title="Variantes">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="dashed">Dashed</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </Section>

      <Section title="Colores">
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="error">Error</Button>
        <Button color="info">Info</Button>
      </Section>

      <Section title="Colores + Outline">
        <Button variant="outline" color="primary">Primary</Button>
        <Button variant="outline" color="success">Success</Button>
        <Button variant="outline" color="warning">Warning</Button>
        <Button variant="outline" color="error">Error</Button>
      </Section>

      <Section title="Colores + Dashed">
        <Button variant="dashed" color="primary">Primary</Button>
        <Button variant="dashed" color="secondary">Secondary</Button>
        <Button variant="dashed" color="success">Success</Button>
        <Button variant="dashed" color="warning">Warning</Button>
        <Button variant="dashed" color="error">Error</Button>
        <Button variant="dashed" color="info">Info</Button>
      </Section>

      <Section title="Tamaños">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </Section>

      <Section title="Block (ancho completo)">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Button block>Block Button</Button>
          <Button block variant="outline">Block Outline</Button>
          <Button block gradient="success">Block Gradient</Button>
        </div>
      </Section>

      <Section title="Estados">
        <Button disabled>Disabled</Button>
        <Button loading={loading} onClick={handleLoadingClick}>
          {loading ? 'Cargando...' : 'Click para cargar'}
        </Button>
      </Section>

      <Section title="Con iconos">
        <Button icon={<PlusIcon />}>Añadir</Button>
        <Button icon={<ArrowIcon />} iconPlacement="end" variant="outline">
          Siguiente
        </Button>
        <Button icon={<SearchIcon />} variant="secondary">
          Buscar
        </Button>
        <Button icon={<PlusIcon />} color="success" />
      </Section>

      <Section title="Sombras">
        <Button shadow="sm">Shadow SM</Button>
        <Button shadow="md">Shadow MD</Button>
        <Button shadow="lg">Shadow LG</Button>
        <Button shadow>Shadow (default)</Button>
      </Section>

      <Section title="Click Animations">
        <Button clickAnimation="pulse">Pulse</Button>
        <Button clickAnimation="ripple">Ripple</Button>
        <Button clickAnimation="shake">Shake</Button>
        <Button clickAnimation="firecracker">Firecracker</Button>
        <Button clickAnimation="confetti">Confetti</Button>
      </Section>

      <Section title="Click Animations + Colores">
        <Button clickAnimation="firecracker" color="success">Success</Button>
        <Button clickAnimation="firecracker" color="error">Error</Button>
        <Button clickAnimation="confetti" color="warning">Warning</Button>
        <Button clickAnimation="pulse" variant="outline" color="info">Info Pulse</Button>
      </Section>

      <Section title="Hover Animations">
        <Button hoverAnimation="pulse" variant="outline">Hover Pulse</Button>
        <Button hoverAnimation="shake" variant="secondary">Hover Shake</Button>
        <Button hoverAnimation="firecracker" color="success">Hover Firecracker</Button>
      </Section>

      <Section title="Bordered">
        <Button bordered>Primary bordered</Button>
        <Button bordered variant="secondary">Secondary bordered</Button>
        <Button bordered variant="ghost">Ghost bordered</Button>
      </Section>

      <Section title="Gradientes preconfigurados">
        <Button gradient="primary">Primary</Button>
        <Button gradient="secondary">Secondary</Button>
        <Button gradient="success">Success</Button>
        <Button gradient="warning">Warning</Button>
        <Button gradient="error">Error</Button>
        <Button gradient="info">Info</Button>
      </Section>

      <Section title="Gradientes con ángulo">
        <Button gradient="primary" gradientAngle={45}>45°</Button>
        <Button gradient="primary" gradientAngle={90}>90°</Button>
        <Button gradient="primary" gradientAngle={180}>180°</Button>
        <Button gradient="success" gradientAngle={0}>0°</Button>
      </Section>

      <Section title="Gradientes CSS personalizados">
        <Button gradientCss="linear-gradient(45deg, #667eea, #764ba2)">Violeta</Button>
        <Button gradientCss="linear-gradient(135deg, #f093fb, #f5576c)">Rosa</Button>
        <Button gradientCss="linear-gradient(90deg, #4facfe, #00f2fe)">Cyan</Button>
        <Button gradientCss="linear-gradient(135deg, #fa709a, #fee140)">Sunset</Button>
      </Section>

      <Section title="Combinaciones">
        <Button shadow clickAnimation="pulse">Shadow + Pulse</Button>
        <Button shadow="lg" bordered variant="secondary">Shadow + Bordered</Button>
        <Button clickAnimation="confetti" bordered color="success" variant="ghost">Todo junto</Button>
        <Button gradient="primary" shadow clickAnimation="confetti">Gradient + Shadow + Confetti</Button>
      </Section>

      <Section title="Semantic DOM Styling (classNames / styles)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block' }}>
            Slots disponibles: <Text code>root</Text>, <Text code>icon</Text>, <Text code>spinner</Text>, <Text code>content</Text>
          </Text>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <Button
              icon={<PlusIcon />}
              styles={{
                root: { borderRadius: 20, paddingLeft: 20, paddingRight: 20 },
                icon: { color: '#fbbf24', fontSize: 18 },
                content: { fontStyle: 'italic', letterSpacing: 1 },
              }}
            >
              Styled slots
            </Button>
            <Button
              icon={<SearchIcon />}
              variant="outline"
              styles={{
                root: { borderColor: '#8b5cf6', color: '#8b5cf6' },
                icon: { backgroundColor: '#8b5cf620', borderRadius: 4, padding: 2 },
              }}
            >
              Custom icon bg
            </Button>
            <Button
              loading
              styles={{
                spinner: { color: '#ef4444' },
                root: { backgroundColor: '#fef2f2', color: '#ef4444', borderColor: '#fecaca' },
              }}
            >
              Red spinner
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
