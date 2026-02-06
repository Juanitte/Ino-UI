import { useState } from 'react'
import { Button, Tooltip, Badge, Bubble, BackToTopIcon, ChatIcon, BellIcon, CloseIcon, Text, Divider, Flex, Row, Col, Layout, Waterfall, ThemeProvider, useTheme, tokens } from '../index'

export function Playground() {
  return (
    <ThemeProvider>
      <PlaygroundContent />
    </ThemeProvider>
  )
}

function PlaygroundContent() {
  const [activeSection, setActiveSection] = useState<string>('button')
  const { mode, toggleMode } = useTheme()

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: tokens.colorBg,
        color: tokens.colorText,
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          borderRight: `1px solid ${tokens.colorBorder}`,
          padding: 16,
          backgroundColor: tokens.colorBgSubtle,
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Text size="lg" weight="semibold">J-UI</Text>
          <button
            onClick={toggleMode}
            style={{
              padding: '4px 8px',
              border: `1px solid ${tokens.colorBorder}`,
              borderRadius: 4,
              backgroundColor: tokens.colorBgMuted,
              color: tokens.colorText,
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            {mode === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <NavItem
              label="Theme"
              active={activeSection === 'theme'}
              onClick={() => setActiveSection('theme')}
            />
            <NavItem
              label="Button"
              active={activeSection === 'button'}
              onClick={() => setActiveSection('button')}
            />
            <NavItem
              label="Tooltip"
              active={activeSection === 'tooltip'}
              onClick={() => setActiveSection('tooltip')}
            />
            <NavItem
              label="Badge"
              active={activeSection === 'badge'}
              onClick={() => setActiveSection('badge')}
            />
            <NavItem
              label="Bubble"
              active={activeSection === 'bubble'}
              onClick={() => setActiveSection('bubble')}
            />
            <NavItem
              label="Text"
              active={activeSection === 'text'}
              onClick={() => setActiveSection('text')}
            />
            <NavItem
              label="Divider"
              active={activeSection === 'divider'}
              onClick={() => setActiveSection('divider')}
            />
            <NavItem
              label="Flex"
              active={activeSection === 'flex'}
              onClick={() => setActiveSection('flex')}
            />
            <NavItem
              label="Grid"
              active={activeSection === 'grid'}
              onClick={() => setActiveSection('grid')}
            />
            <NavItem
              label="Layout"
              active={activeSection === 'layout'}
              onClick={() => setActiveSection('layout')}
            />
            <NavItem
              label="Waterfall"
              active={activeSection === 'waterfall'}
              onClick={() => setActiveSection('waterfall')}
            />
          </ul>
        </nav>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, padding: 32 }}>
        {activeSection === 'button' && <ButtonSection />}
        {activeSection === 'tooltip' && <TooltipSection />}
        {activeSection === 'badge' && <BadgeSection />}
        {activeSection === 'bubble' && <BubbleSection />}
        {activeSection === 'text' && <TextSection />}
        {activeSection === 'divider' && <DividerSection />}
        {activeSection === 'flex' && <FlexSection />}
        {activeSection === 'grid' && <GridSection />}
        {activeSection === 'layout' && <LayoutSection />}
        {activeSection === 'waterfall' && <WaterfallSection />}
        {activeSection === 'theme' && <ThemeSection />}
      </main>
    </div>
  )
}

function NavItem({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <li>
      <button
        onClick={onClick}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: 'none',
          borderRadius: 4,
          backgroundColor: active ? tokens.colorPrimary : 'transparent',
          color: active ? tokens.colorPrimaryContrast : tokens.colorText,
          textAlign: 'left',
          cursor: 'pointer',
          fontSize: 14,
        }}
      >
        {label}
      </button>
    </li>
  )
}

function ButtonSection() {
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
    </div>
  )
}

function TooltipSection() {
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
    </div>
  )
}

function BadgeSection() {
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
    </div>
  )
}

function BubbleSection() {
  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Bubble</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Botón flotante con posición fija en la pantalla. Ideal para acciones rápidas como chat, notificaciones o volver arriba.
      </Text>

      <Section title="Posiciones">
        <div style={{ position: 'relative', width: '100%', height: 200, backgroundColor: tokens.colorBgMuted, borderRadius: 8, border: `1px dashed ${tokens.colorBorder}` }}>
          <Bubble position="top-left" icon={<ChatIcon />} tooltip="Top Left" style={{ position: 'absolute' }} offsetX={16} offsetY={16} />
          <Bubble position="top-right" icon={<BellIcon />} tooltip="Top Right" style={{ position: 'absolute' }} offsetX={16} offsetY={16} />
          <Bubble position="bottom-left" icon={<ChatIcon />} tooltip="Bottom Left" style={{ position: 'absolute' }} offsetX={16} offsetY={16} />
          <Bubble position="bottom-right" icon={<BellIcon />} tooltip="Bottom Right" style={{ position: 'absolute' }} offsetX={16} offsetY={16} />
        </div>
        <Text size="sm" type="secondary" style={{ display: 'block', marginTop: 8 }}>
          Nota: Los bubbles en el demo usan position: absolute. En uso real serán position: fixed.
        </Text>
      </Section>

      <Section title="Colores">
        <Bubble color="primary" icon={<ChatIcon />} style={{ position: 'relative' }} />
        <Bubble color="secondary" icon={<ChatIcon />} style={{ position: 'relative' }} />
        <Bubble color="success" icon={<ChatIcon />} style={{ position: 'relative' }} />
        <Bubble color="warning" icon={<ChatIcon />} style={{ position: 'relative' }} />
        <Bubble color="error" icon={<ChatIcon />} style={{ position: 'relative' }} />
        <Bubble color="info" icon={<ChatIcon />} style={{ position: 'relative' }} />
      </Section>

      <Section title="Tamaños">
        <Bubble size="sm" icon={<ChatIcon />} style={{ position: 'relative' }} tooltip="Small" />
        <Bubble size="md" icon={<ChatIcon />} style={{ position: 'relative' }} tooltip="Medium" />
        <Bubble size="lg" icon={<ChatIcon />} style={{ position: 'relative' }} tooltip="Large" />
      </Section>

      <Section title="Formas">
        <Bubble shape="circle" icon={<ChatIcon />} style={{ position: 'relative' }} tooltip="Circle" />
        <Bubble shape="square" icon={<ChatIcon />} style={{ position: 'relative' }} tooltip="Square" />
      </Section>

      <Section title="Con Badge">
        <Bubble icon={<BellIcon />} badge={5} style={{ position: 'relative' }} tooltip="5 notificaciones" />
        <Bubble icon={<BellIcon />} badge={99} style={{ position: 'relative' }} tooltip="99 notificaciones" />
        <Bubble icon={<BellIcon />} badge={150} style={{ position: 'relative' }} tooltip="99+ notificaciones" />
        <Bubble icon={<ChatIcon />} badge style={{ position: 'relative' }} tooltip="Nuevo mensaje" />
      </Section>

      <Section title="Badge con diferentes colores">
        <Bubble icon={<BellIcon />} badge={3} badgeColor="error" style={{ position: 'relative' }} />
        <Bubble icon={<BellIcon />} badge={3} badgeColor="success" style={{ position: 'relative' }} />
        <Bubble icon={<BellIcon />} badge={3} badgeColor="warning" style={{ position: 'relative' }} />
        <Bubble icon={<BellIcon />} badge={3} badgeColor="info" style={{ position: 'relative' }} />
      </Section>

      <Section title="Sin sombra">
        <Bubble icon={<ChatIcon />} shadow={false} style={{ position: 'relative' }} tooltip="Sin sombra" />
        <Bubble icon={<ChatIcon />} shadow="sm" style={{ position: 'relative' }} tooltip="Shadow SM" />
        <Bubble icon={<ChatIcon />} shadow="md" style={{ position: 'relative' }} tooltip="Shadow MD" />
        <Bubble icon={<ChatIcon />} shadow="lg" style={{ position: 'relative' }} tooltip="Shadow LG" />
      </Section>

      <Section title="Con texto">
        <Bubble description="?" style={{ position: 'relative' }} tooltip="Ayuda" />
        <Bubble description="+" style={{ position: 'relative' }} tooltip="Añadir" color="success" />
        <Bubble description="!" style={{ position: 'relative' }} tooltip="Alerta" color="warning" />
      </Section>

      <Section title="Back to Top">
        <Bubble
          icon={<BackToTopIcon />}
          style={{ position: 'relative' }}
          tooltip="Volver arriba"
          color="secondary"
          onBackToTop={() => {}}
        />
        <Text size="sm" type="secondary" style={{ display: 'block' }}>
          Usa <Text code>onBackToTop</Text> para ejecutar scroll al inicio. Combina con <Text code>visibleOnScroll</Text> para mostrar solo tras hacer scroll.
        </Text>
      </Section>

      <Section title="Disabled">
        <Bubble icon={<ChatIcon />} disabled style={{ position: 'relative' }} tooltip="Deshabilitado" />
      </Section>

      <Section title="Tooltip en diferentes posiciones">
        <Bubble icon={<ChatIcon />} tooltip="Arriba" tooltipPosition="top" style={{ position: 'relative' }} />
        <Bubble icon={<ChatIcon />} tooltip="Abajo" tooltipPosition="bottom" style={{ position: 'relative' }} />
        <Bubble icon={<ChatIcon />} tooltip="Izquierda" tooltipPosition="left" style={{ position: 'relative' }} />
        <Bubble icon={<ChatIcon />} tooltip="Derecha" tooltipPosition="right" style={{ position: 'relative' }} />
      </Section>

      <Section title="Bubble.Group (Compacto)">
        <div style={{ position: 'relative', width: '100%', height: 280, backgroundColor: tokens.colorBgMuted, borderRadius: 8, border: `1px dashed ${tokens.colorBorder}` }}>
          <Bubble.Group
            position="bottom-right"
            style={{ position: 'absolute' }}
            offsetX={16}
            offsetY={16}
          >
            <Bubble icon={<HelpIcon />} tooltip="Ayuda" color="secondary" />
            <Bubble icon={<EditIcon />} tooltip="Editar" color="secondary" />
            <Bubble icon={<ShareIcon />} tooltip="Compartir" color="secondary" />
            <Bubble icon={<BackToTopIcon />} tooltip="Arriba" color="secondary" />
          </Bubble.Group>

          <Bubble.Group
            position="bottom-left"
            style={{ position: 'absolute' }}
            offsetX={16}
            offsetY={16}
          >
            <Bubble icon={<ChatIcon />} tooltip="Chat" />
            <Bubble icon={<BellIcon />} tooltip="Notificaciones" badge={3} />
          </Bubble.Group>
        </div>
        <Text size="sm" type="secondary" style={{ display: 'block', marginTop: 8 }}>
          Grupo compacto. Los bubbles están pegados formando un bloque.
        </Text>
      </Section>

      <Section title="Bubble.Menu (Direcciones)">
        <div style={{
          width: '100%',
          height: 550,
          backgroundColor: tokens.colorBgMuted,
          borderRadius: 8,
          border: `1px dashed ${tokens.colorBorder}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Grid 3x3 centrado para formar cruz compacta tipo D-pad */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto auto auto',
            gridTemplateRows: 'auto auto auto',
            gap: 8,
            alignItems: 'center',
            justifyItems: 'center',
          }}>
            {/* Fila 1: vacío - TOP - vacío */}
            <div />
            <MenuWrapper direction="top" icon={<ArrowUpIcon />} />
            <div />

            {/* Fila 2: LEFT - vacío - RIGHT */}
            <MenuWrapper direction="left" icon={<ArrowLeftIcon />} />
            <div style={{ width: 48, height: 48 }} /> {/* Espacio central */}
            <MenuWrapper direction="right" icon={<ArrowRightIcon />} />

            {/* Fila 3: vacío - BOTTOM - vacío */}
            <div />
            <MenuWrapper direction="bottom" icon={<ArrowDownIcon />} />
            <div />
          </div>
        </div>
        <Text size="sm" type="secondary" style={{ display: 'block', marginTop: 8 }}>
          Con icon + openIcon: la flecha cambia a X al abrir. Sin openIcon: el icono rota 45°.
        </Text>
      </Section>

      <Section title="Bubble.Menu (Trigger: hover)">
        <div style={{ position: 'relative', width: '100%', height: 260, backgroundColor: tokens.colorBgMuted, borderRadius: 8, border: `1px dashed ${tokens.colorBorder}` }}>
          <Bubble.Menu
            position="bottom-right"
            trigger="hover"
            tooltip="Hover me"
            style={{ position: 'absolute' }}
            offsetX={16}
            offsetY={16}
          >
            <Bubble icon={<ChatIcon />} tooltip="Chat" />
            <Bubble icon={<BellIcon />} tooltip="Notificaciones" />
            <Bubble icon={<ShareIcon />} tooltip="Compartir" />
          </Bubble.Menu>

          <Bubble.Menu
            position="bottom-left"
            trigger="hover"
            direction="right"
            tooltip="Hover me"
            color="info"
            style={{ position: 'absolute' }}
            offsetX={16}
            offsetY={16}
          >
            <Bubble icon={<EditIcon />} tooltip="Editar" />
            <Bubble icon={<HelpIcon />} tooltip="Ayuda" />
          </Bubble.Menu>
        </div>
        <Text size="sm" type="secondary" style={{ display: 'block', marginTop: 8 }}>
          Se despliega al pasar el ratón por encima y se cierra al salir.
        </Text>
      </Section>
    </div>
  )
}

function TextSection() {
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
    </div>
  )
}

// Iconos adicionales para demos
function HelpIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

function EditIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function ShareIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}

function ArrowUpIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  )
}

function ArrowDownIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function ArrowLeftIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ArrowRightIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

function MenuWrapper({ direction, icon }: { direction: 'top' | 'bottom' | 'left' | 'right'; icon: React.ReactNode }) {
  return (
    <Bubble.Menu
      direction={direction}
      icon={icon}
      openIcon={<CloseIcon />}
      color="secondary"
      style={{ position: 'relative' }}
    >
      <Bubble icon={<ChatIcon />} tooltip="Chat" />
      <Bubble icon={<BellIcon />} tooltip="Notificaciones" />
      <Bubble icon={<ShareIcon />} tooltip="Compartir" />
    </Bubble.Menu>
  )
}

function DividerSection() {
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
    </div>
  )
}

function FlexSection() {
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

function GridSection() {
  const colStyle: React.CSSProperties = {
    backgroundColor: tokens.colorPrimary,
    color: tokens.colorPrimaryContrast,
    padding: '12px 0',
    textAlign: 'center',
    borderRadius: 4,
  }

  const colStyleAlt: React.CSSProperties = {
    ...colStyle,
    backgroundColor: tokens.colorPrimaryHover,
  }

  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Grid</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Sistema de grid de 24 columnas con soporte responsive.
      </Text>

      <Section title="Básico (24 columnas)">
        <div style={{ width: '100%' }}>
          <Row gutter={8}>
            <Col span={24}><div style={colStyle}>col-24</div></Col>
          </Row>
          <div style={{ height: 8 }} />
          <Row gutter={8}>
            <Col span={12}><div style={colStyle}>col-12</div></Col>
            <Col span={12}><div style={colStyleAlt}>col-12</div></Col>
          </Row>
          <div style={{ height: 8 }} />
          <Row gutter={8}>
            <Col span={8}><div style={colStyle}>col-8</div></Col>
            <Col span={8}><div style={colStyleAlt}>col-8</div></Col>
            <Col span={8}><div style={colStyle}>col-8</div></Col>
          </Row>
          <div style={{ height: 8 }} />
          <Row gutter={8}>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyleAlt}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyleAlt}>col-6</div></Col>
          </Row>
        </div>
      </Section>

      <Section title="Gutter (espacio entre columnas)">
        <div style={{ width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>gutter={`{16}`}</Text>
          <Row gutter={16}>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
          </Row>
          <div style={{ height: 16 }} />
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>gutter={`{32}`}</Text>
          <Row gutter={32}>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
          </Row>
        </div>
      </Section>

      <Section title="Gutter vertical y horizontal">
        <div style={{ width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>gutter={`{[16, 24]}`} - 16px horizontal, 24px vertical</Text>
          <Row gutter={[16, 24]}>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
          </Row>
        </div>
      </Section>

      <Section title="Offset (desplazamiento)">
        <div style={{ width: '100%' }}>
          <Row gutter={16}>
            <Col span={8}><div style={colStyle}>col-8</div></Col>
            <Col span={8} offset={8}><div style={colStyle}>col-8 offset-8</div></Col>
          </Row>
          <div style={{ height: 8 }} />
          <Row gutter={16}>
            <Col span={6} offset={6}><div style={colStyle}>col-6 offset-6</div></Col>
            <Col span={6} offset={6}><div style={colStyle}>col-6 offset-6</div></Col>
          </Row>
        </div>
      </Section>

      <Section title="Align (alineación vertical)">
        <div style={{ width: '100%' }}>
          {(['top', 'middle', 'bottom'] as const).map((align) => (
            <div key={align} style={{ marginBottom: 16 }}>
              <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>{align}</Text>
              <Row gutter={16} align={align} style={{ backgroundColor: tokens.colorBgMuted, padding: 8, borderRadius: 8 }}>
                <Col span={4}><div style={{ ...colStyle, padding: '32px 0' }}>col-4</div></Col>
                <Col span={4}><div style={{ ...colStyle, padding: '16px 0' }}>col-4</div></Col>
                <Col span={4}><div style={{ ...colStyle, padding: '48px 0' }}>col-4</div></Col>
                <Col span={4}><div style={{ ...colStyle, padding: '24px 0' }}>col-4</div></Col>
              </Row>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Justify (alineación horizontal)">
        <div style={{ width: '100%' }}>
          {(['start', 'center', 'end', 'space-between', 'space-around'] as const).map((justify) => (
            <div key={justify} style={{ marginBottom: 16 }}>
              <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>{justify}</Text>
              <Row gutter={16} justify={justify} style={{ backgroundColor: tokens.colorBgMuted, padding: 8, borderRadius: 8 }}>
                <Col span={4}><div style={colStyle}>col-4</div></Col>
                <Col span={4}><div style={colStyle}>col-4</div></Col>
                <Col span={4}><div style={colStyle}>col-4</div></Col>
              </Row>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Order (orden flex)">
        <div style={{ width: '100%' }}>
          <Row gutter={16}>
            <Col span={6} order={4}><div style={colStyle}>1 - order: 4</div></Col>
            <Col span={6} order={3}><div style={colStyleAlt}>2 - order: 3</div></Col>
            <Col span={6} order={2}><div style={colStyle}>3 - order: 2</div></Col>
            <Col span={6} order={1}><div style={colStyleAlt}>4 - order: 1</div></Col>
          </Row>
        </div>
      </Section>

      <Section title="Flex">
        <div style={{ width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>flex="auto" + flex="200px"</Text>
          <Row gutter={16}>
            <Col flex="200px"><div style={colStyle}>200px</div></Col>
            <Col flex="auto"><div style={colStyleAlt}>auto</div></Col>
          </Row>
          <div style={{ height: 16 }} />
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>flex="1" + flex="2"</Text>
          <Row gutter={16}>
            <Col flex={1}><div style={colStyle}>flex: 1</div></Col>
            <Col flex={2}><div style={colStyleAlt}>flex: 2</div></Col>
          </Row>
        </div>
      </Section>

      <Section title="Push y Pull">
        <div style={{ width: '100%' }}>
          <Row gutter={16}>
            <Col span={8} push={16}><div style={colStyle}>col-8 push-16</div></Col>
            <Col span={16} pull={8}><div style={colStyleAlt}>col-16 pull-8</div></Col>
          </Row>
        </div>
      </Section>

      <Section title="Responsive">
        <div style={{ width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>
            Redimensiona la ventana para ver el cambio
          </Text>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}><div style={colStyle}>xs:24 sm:12 md:8 lg:6</div></Col>
            <Col xs={24} sm={12} md={8} lg={6}><div style={colStyleAlt}>xs:24 sm:12 md:8 lg:6</div></Col>
            <Col xs={24} sm={12} md={8} lg={6}><div style={colStyle}>xs:24 sm:12 md:8 lg:6</div></Col>
            <Col xs={24} sm={12} md={8} lg={6}><div style={colStyleAlt}>xs:24 sm:12 md:8 lg:6</div></Col>
          </Row>
        </div>
      </Section>

      <Section title="Responsive con objeto">
        <div style={{ width: '100%' }}>
          <Row gutter={[16, 16]}>
            <Col xs={{ span: 24 }} md={{ span: 12, offset: 6 }}>
              <div style={colStyle}>xs:24 md:12+offset:6</div>
            </Col>
          </Row>
        </div>
      </Section>

      <Section title="Ejemplo: Layout de tarjetas">
        <div style={{ width: '100%' }}>
          <Row gutter={[16, 16]}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <Col key={n} xs={24} sm={12} md={8}>
                <div style={{
                  padding: 16,
                  backgroundColor: tokens.colorBgMuted,
                  borderRadius: 8,
                  border: `1px solid ${tokens.colorBorder}`,
                }}>
                  <div style={{ height: 80, backgroundColor: tokens.colorPrimaryLight, borderRadius: 4, marginBottom: 12 }} />
                  <Text weight="semibold" style={{ display: 'block' }}>Tarjeta {n}</Text>
                  <Text size="sm" type="secondary">Descripción de la tarjeta</Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Section>
    </div>
  )
}

function LayoutSection() {
  const [collapsed, setCollapsed] = useState(false)
  const [collapsed2, setCollapsed2] = useState(false)

  const demoBoxStyle: React.CSSProperties = {
    border: `1px solid ${tokens.colorBorder}`,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  }

  // Estilos para las secciones del layout (escala de grises con bordes)
  const headerStyle: React.CSSProperties = {
    backgroundColor: '#3a3a3a',
    color: '#fff',
    borderBottom: '1px solid #555',
  }

  const siderStyle: React.CSSProperties = {
    backgroundColor: '#2a2a2a',
  }

  const contentStyle: React.CSSProperties = {
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const footerStyle: React.CSSProperties = {
    backgroundColor: '#e0e0e0',
    textAlign: 'center',
    borderTop: '1px solid #ccc',
  }

  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Layout</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Componentes de layout para estructurar páginas.
      </Text>

      <Section title="Básico: Header + Content + Footer">
        <div style={{ width: '100%', ...demoBoxStyle, height: 300 }}>
          <Layout style={{ height: '100%' }}>
            <Layout.Header style={headerStyle}>
              <Text style={{ color: '#fff' }} weight="semibold">Header</Text>
            </Layout.Header>
            <Layout.Content style={contentStyle}>
              <Text style={{ color: '#333' }}>Content</Text>
            </Layout.Content>
            <Layout.Footer style={footerStyle}>
              <Text style={{ color: '#555' }}>Footer</Text>
            </Layout.Footer>
          </Layout>
        </div>
      </Section>

      <Section title="Con Sider izquierdo">
        <div style={{ width: '100%', ...demoBoxStyle, height: 350 }}>
          <Layout style={{ height: '100%' }} hasSider>
            <Layout.Sider style={{ ...siderStyle, borderRight: '1px solid #444' }}>
              <div style={{ padding: 16, color: 'rgba(255,255,255,0.85)' }}>
                <Text style={{ color: 'rgba(255,255,255,0.85)' }} weight="semibold">Sider</Text>
                <div style={{ marginTop: 16 }}>
                  <div style={{ padding: '8px 0', color: 'rgba(255,255,255,0.65)' }}>Menu Item 1</div>
                  <div style={{ padding: '8px 0', color: 'rgba(255,255,255,0.65)' }}>Menu Item 2</div>
                  <div style={{ padding: '8px 0', color: 'rgba(255,255,255,0.65)' }}>Menu Item 3</div>
                </div>
              </div>
            </Layout.Sider>
            <Layout>
              <Layout.Header style={headerStyle}>
                <Text style={{ color: '#fff' }} weight="semibold">Header</Text>
              </Layout.Header>
              <Layout.Content style={contentStyle}>
                <Text style={{ color: '#333' }}>Content</Text>
              </Layout.Content>
              <Layout.Footer style={footerStyle}>
                <Text style={{ color: '#555' }}>Footer</Text>
              </Layout.Footer>
            </Layout>
          </Layout>
        </div>
      </Section>

      <Section title="Con Sider derecho">
        <div style={{ width: '100%', ...demoBoxStyle, height: 300 }}>
          <Layout style={{ height: '100%' }} hasSider>
            <Layout>
              <Layout.Header style={headerStyle}>
                <Text style={{ color: '#fff' }} weight="semibold">Header</Text>
              </Layout.Header>
              <Layout.Content style={contentStyle}>
                <Text style={{ color: '#333' }}>Content</Text>
              </Layout.Content>
            </Layout>
            <Layout.Sider width={120} style={{ ...siderStyle, borderLeft: '1px solid #444' }}>
              <div style={{ padding: 16, color: 'rgba(255,255,255,0.85)' }}>
                <Text style={{ color: 'rgba(255,255,255,0.85)' }} size="sm">Sider derecho</Text>
              </div>
            </Layout.Sider>
          </Layout>
        </div>
      </Section>

      <Section title="Sider colapsable">
        <div style={{ width: '100%', ...demoBoxStyle, height: 350 }}>
          <Layout style={{ height: '100%' }} hasSider>
            <Layout.Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(c) => setCollapsed(c)}
              style={{ ...siderStyle, borderRight: '1px solid #444' }}
            >
              <div style={{ padding: 16, color: 'rgba(255,255,255,0.85)' }}>
                {!collapsed && <Text style={{ color: 'rgba(255,255,255,0.85)' }} weight="semibold">Menu</Text>}
                <div style={{ marginTop: collapsed ? 0 : 16 }}>
                  <div style={{ padding: '8px 0', color: 'rgba(255,255,255,0.65)', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    {collapsed ? '📄' : '📄 Documentos'}
                  </div>
                  <div style={{ padding: '8px 0', color: 'rgba(255,255,255,0.65)', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    {collapsed ? '⚙️' : '⚙️ Configuración'}
                  </div>
                  <div style={{ padding: '8px 0', color: 'rgba(255,255,255,0.65)', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    {collapsed ? '👤' : '👤 Perfil'}
                  </div>
                </div>
              </div>
            </Layout.Sider>
            <Layout>
              <Layout.Header style={headerStyle}>
                <Text style={{ color: '#fff' }}>Header - Sider {collapsed ? 'colapsado' : 'expandido'}</Text>
              </Layout.Header>
              <Layout.Content style={contentStyle}>
                <Text style={{ color: '#333' }}>Click en la flecha del Sider para colapsar/expandir</Text>
              </Layout.Content>
            </Layout>
          </Layout>
        </div>
      </Section>

      <Section title="Sider con collapsedWidth=0">
        <div style={{ width: '100%', ...demoBoxStyle, height: 300 }}>
          <Layout style={{ height: '100%' }} hasSider>
            <Layout.Sider
              collapsible
              collapsed={collapsed2}
              collapsedWidth={0}
              onCollapse={(c) => setCollapsed2(c)}
              style={siderStyle}
            >
              <div style={{ padding: 16, color: 'rgba(255,255,255,0.85)' }}>
                <Text style={{ color: 'rgba(255,255,255,0.85)' }} weight="semibold">Sider</Text>
                <div style={{ marginTop: 16 }}>
                  <div style={{ padding: '8px 0', color: 'rgba(255,255,255,0.65)' }}>Item 1</div>
                  <div style={{ padding: '8px 0', color: 'rgba(255,255,255,0.65)' }}>Item 2</div>
                </div>
              </div>
            </Layout.Sider>
            <Layout>
              <Layout.Content style={contentStyle}>
                <Text style={{ color: '#333' }}>Cuando collapsedWidth=0, aparece un trigger especial fuera del sider</Text>
              </Layout.Content>
            </Layout>
          </Layout>
        </div>
      </Section>

      <Section title="Layouts anidados">
        <div style={{ width: '100%', ...demoBoxStyle, height: 350 }}>
          <Layout style={{ height: '100%' }}>
            <Layout.Header style={headerStyle}>
              <Text style={{ color: '#fff' }} weight="semibold">Header principal</Text>
            </Layout.Header>
            <Layout hasSider>
              <Layout.Sider width={160} style={{ ...siderStyle, borderRight: '1px solid #444' }}>
                <div style={{ padding: 16, color: 'rgba(255,255,255,0.85)' }}>
                  <Text style={{ color: 'rgba(255,255,255,0.85)' }} weight="semibold">Nav</Text>
                </div>
              </Layout.Sider>
              <Layout>
                <Layout.Header style={{ backgroundColor: '#4a4a4a', borderBottom: '1px solid #666' }}>
                  <Text style={{ color: '#fff' }} size="sm">Sub-header (layout anidado)</Text>
                </Layout.Header>
                <Layout hasSider>
                  <Layout.Content style={{ ...contentStyle, padding: 16 }}>
                    <Text style={{ color: '#333' }}>Content del layout interno</Text>
                  </Layout.Content>
                  <Layout.Sider width={100} theme="light" style={{ borderLeft: `1px solid ${tokens.colorBorder}` }}>
                    <div style={{ padding: 12 }}>
                      <Text size="sm" type="secondary">Panel lateral</Text>
                    </div>
                  </Layout.Sider>
                </Layout>
                <Layout.Footer style={{ ...footerStyle, padding: '8px 16px' }}>
                  <Text style={{ color: '#555' }} size="sm">Footer interno</Text>
                </Layout.Footer>
              </Layout>
            </Layout>
          </Layout>
        </div>
      </Section>

      <Section title="Layout completo (dashboard)">
        <div style={{ width: '100%', ...demoBoxStyle, height: 400 }}>
          <Layout style={{ height: '100%' }}>
            <Layout.Header style={{ ...headerStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: '#fff' }} weight="bold" size="lg">Dashboard</Text>
              <div style={{ display: 'flex', gap: 16 }}>
                <Text style={{ color: 'rgba(255,255,255,0.65)' }} size="sm">Usuario</Text>
                <Text style={{ color: 'rgba(255,255,255,0.65)' }} size="sm">Salir</Text>
              </div>
            </Layout.Header>
            <Layout hasSider>
              <Layout.Sider width={180} theme="light" style={{ borderRight: `1px solid ${tokens.colorBorder}` }}>
                <div style={{ padding: '16px 0' }}>
                  {['Dashboard', 'Usuarios', 'Productos', 'Pedidos', 'Reportes'].map((item, i) => (
                    <div
                      key={item}
                      style={{
                        padding: '12px 24px',
                        backgroundColor: i === 0 ? '#e8e8e8' : 'transparent',
                        fontWeight: i === 0 ? 600 : 400,
                        cursor: 'pointer',
                      }}
                    >
                      <Text style={{ color: i === 0 ? '#333' : tokens.colorTextMuted }}>{item}</Text>
                    </div>
                  ))}
                </div>
              </Layout.Sider>
              <Layout>
                <Layout.Content style={{ backgroundColor: '#f5f5f5' }}>
                  <div style={{ backgroundColor: '#fff', padding: 24, borderRadius: 8, height: '100%', border: `1px solid ${tokens.colorBorder}` }}>
                    <Text weight="semibold" size="lg" style={{ display: 'block', marginBottom: 16, color: '#333' }}>
                      Bienvenido al Dashboard
                    </Text>
                    <Row gutter={[16, 16]}>
                      {['Ventas', 'Usuarios', 'Pedidos', 'Ingresos'].map((stat) => (
                        <Col key={stat} span={6}>
                          <div style={{ padding: 16, backgroundColor: '#fafafa', borderRadius: 8, textAlign: 'center', border: `1px solid ${tokens.colorBorder}` }}>
                            <Text type="secondary" size="sm" style={{ display: 'block' }}>{stat}</Text>
                            <Text weight="bold" size="xl" style={{ color: '#333' }}>123</Text>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Layout.Content>
                <Layout.Footer style={{ ...footerStyle, padding: '12px 24px' }}>
                  <Text type="secondary" size="sm">© 2024 Mi Empresa</Text>
                </Layout.Footer>
              </Layout>
            </Layout>
          </Layout>
        </div>
      </Section>
    </div>
  )
}

function WaterfallSection() {
  // Datos de ejemplo con alturas variadas
  const sampleItems = [
    { key: 1, height: 150, title: 'Paisaje montañoso', color: tokens.colorPrimary },
    { key: 2, height: 200, title: 'Atardecer en la playa', color: tokens.colorSecondary },
    { key: 3, height: 120, title: 'Ciudad nocturna', color: tokens.colorSuccess },
    { key: 4, height: 180, title: 'Bosque otoñal', color: tokens.colorWarning },
    { key: 5, height: 140, title: 'Lago cristalino', color: tokens.colorError },
    { key: 6, height: 220, title: 'Aurora boreal', color: tokens.colorInfo },
    { key: 7, height: 160, title: 'Desierto al amanecer', color: tokens.colorPrimary },
    { key: 8, height: 130, title: 'Cascada tropical', color: tokens.colorSecondary },
    { key: 9, height: 190, title: 'Montaña nevada', color: tokens.colorSuccess },
    { key: 10, height: 145, title: 'Pradera verde', color: tokens.colorWarning },
    { key: 11, height: 175, title: 'Costa rocosa', color: tokens.colorError },
    { key: 12, height: 135, title: 'Jardín japonés', color: tokens.colorInfo },
  ]

  // Estado para la sección dinámica
  const [dynamicItems, setDynamicItems] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      key: i + 1,
      height: 80 + Math.floor(Math.random() * 100),
    }))
  )
  const [nextKey, setNextKey] = useState(9)

  const handleRemoveItem = (key: number) => {
    setDynamicItems(items => items.filter(item => item.key !== key))
  }

  const handleAddItem = () => {
    const newItem = {
      key: nextKey,
      height: 80 + Math.floor(Math.random() * 100),
    }
    setDynamicItems(items => [...items, newItem])
    setNextKey(prev => prev + 1)
  }

  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Waterfall</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Layout estilo Pinterest para contenido de alturas variables.
      </Text>

      <Section title="Dinámico">
        <div style={{ width: '100%' }}>
          <Waterfall
            columns={4}
            gutter={8}
            items={dynamicItems.map(item => ({
              key: item.key,
              height: item.height,
              children: (
                <div style={{
                  height: item.height,
                  backgroundColor: tokens.colorBgMuted,
                  borderRadius: 8,
                  border: `1px solid ${tokens.colorBorder}`,
                  padding: 12,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}>
                  <Text weight="semibold">{item.key}</Text>
                  <button
                    onClick={() => handleRemoveItem(item.key)}
                    style={{
                      width: 24,
                      height: 24,
                      border: `1px solid ${tokens.colorBorder}`,
                      borderRadius: 4,
                      backgroundColor: 'transparent',
                      color: tokens.colorTextMuted,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      lineHeight: 1,
                    }}
                  >
                    ×
                  </button>
                </div>
              ),
            }))}
          />
          <Button
            variant="outline"
            style={{ width: '100%', marginTop: 8 }}
            onClick={handleAddItem}
          >
            Add Item
          </Button>
        </div>
      </Section>

      <Section title="Básico (3 columnas)">
        <div style={{ width: '100%' }}>
          <Waterfall
            columns={3}
            gutter={16}
            items={sampleItems.map(item => ({
              key: item.key,
              children: (
                <div style={{
                  height: item.height,
                  backgroundColor: item.color,
                  borderRadius: 8,
                  padding: 16,
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}>
                  <Text style={{ color: '#fff' }} weight="semibold">{item.title}</Text>
                  <Text style={{ color: 'rgba(255,255,255,0.7)' }} size="sm">{item.height}px</Text>
                </div>
              ),
            }))}
          />
        </div>
      </Section>

      <Section title="2 columnas">
        <div style={{ width: '100%', maxWidth: 500 }}>
          <Waterfall
            columns={2}
            gutter={12}
            items={sampleItems.slice(0, 6).map(item => ({
              key: item.key,
              children: (
                <div style={{
                  height: item.height,
                  backgroundColor: item.color,
                  borderRadius: 12,
                  padding: 16,
                  color: '#fff',
                }}>
                  <Text style={{ color: '#fff' }} weight="bold">{item.title}</Text>
                </div>
              ),
            }))}
          />
        </div>
      </Section>

      <Section title="Con itemRender">
        <div style={{ width: '100%' }}>
          <Waterfall
            columns={3}
            gutter={16}
            items={sampleItems.map(item => ({
              key: item.key,
              data: item,
            }))}
            itemRender={({ data, assignedColumn }) => (
              <div style={{
                height: (data as typeof sampleItems[0]).height,
                backgroundColor: (data as typeof sampleItems[0]).color,
                borderRadius: 8,
                padding: 16,
                color: '#fff',
              }}>
                <Text style={{ color: '#fff' }} weight="semibold">{(data as typeof sampleItems[0]).title}</Text>
                <Text style={{ color: 'rgba(255,255,255,0.7)' }} size="sm">Columna {assignedColumn + 1}</Text>
              </div>
            )}
          />
        </div>
      </Section>

      <Section title="Responsive (xs:1, sm:2, md:3, lg:4)">
        <div style={{ width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 12 }}>
            Redimensiona la ventana para ver el cambio de columnas
          </Text>
          <Waterfall
            columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            gutter={{ xs: 8, sm: 12, md: 16 }}
            items={sampleItems.slice(0, 8).map(item => ({
              key: item.key,
              children: (
                <div style={{
                  height: item.height,
                  backgroundColor: item.color,
                  borderRadius: 8,
                  padding: 16,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Text style={{ color: '#fff' }} weight="bold">{item.title}</Text>
                </div>
              ),
            }))}
          />
        </div>
      </Section>
    </div>
  )
}

function ThemeSection() {
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

function Section({ title, children, align = 'center' }: { title: string; children: React.ReactNode; align?: 'center' | 'start' | 'end' }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <Text size="md" weight="extrabold" type="secondary" style={{ display: 'block', marginBottom: 12, textTransform: 'uppercase' }}>
        {title}
      </Text>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: align === 'center' ? 'center' : align === 'start' ? 'flex-start' : 'flex-end' }}>
        {children}
      </div>
    </div>
  )
}
