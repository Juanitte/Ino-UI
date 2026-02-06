import { createContext, useContext, useState, useEffect, type ReactNode, type CSSProperties } from 'react'
import { tokens } from '../../theme/tokens'

// ============================================================================
// Types
// ============================================================================

export type SiderTheme = 'light' | 'dark'
export type SiderBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export interface LayoutProps {
  /** Contenido del layout */
  children?: ReactNode
  /** Tiene Sider como hijo directo */
  hasSider?: boolean
  /** Clase CSS adicional */
  className?: string
  /** Estilos inline adicionales */
  style?: CSSProperties
}

export interface HeaderProps {
  /** Contenido del header */
  children?: ReactNode
  /** Clase CSS adicional */
  className?: string
  /** Estilos inline adicionales */
  style?: CSSProperties
}

export interface FooterProps {
  /** Contenido del footer */
  children?: ReactNode
  /** Clase CSS adicional */
  className?: string
  /** Estilos inline adicionales */
  style?: CSSProperties
}

export interface ContentProps {
  /** Contenido principal */
  children?: ReactNode
  /** Clase CSS adicional */
  className?: string
  /** Estilos inline adicionales */
  style?: CSSProperties
}

export interface SiderProps {
  /** Contenido del sider */
  children?: ReactNode
  /** Ancho del sider en px */
  width?: number | string
  /** Ancho cuando está colapsado */
  collapsedWidth?: number
  /** Puede colapsarse */
  collapsible?: boolean
  /** Estado colapsado (controlado) */
  collapsed?: boolean
  /** Estado colapsado inicial */
  defaultCollapsed?: boolean
  /** Invertir dirección de la flecha del trigger */
  reverseArrow?: boolean
  /** Breakpoint para colapsar automáticamente */
  breakpoint?: SiderBreakpoint
  /** Tema del sider */
  theme?: SiderTheme
  /** Trigger personalizado, null para ocultar */
  trigger?: ReactNode | null
  /** Callback cuando cambia el estado */
  onCollapse?: (collapsed: boolean, type: 'clickTrigger' | 'responsive') => void
  /** Callback cuando se activa el breakpoint */
  onBreakpoint?: (broken: boolean) => void
  /** Clase CSS adicional */
  className?: string
  /** Estilos inline adicionales */
  style?: CSSProperties
}

// ============================================================================
// Constants
// ============================================================================

const breakpointValues: Record<SiderBreakpoint, number> = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
}

// ============================================================================
// Context
// ============================================================================

interface SiderContextValue {
  siderCollapsed: boolean
}

const SiderContext = createContext<SiderContextValue>({ siderCollapsed: false })

// ============================================================================
// Layout Component
// ============================================================================

function LayoutComponent({
  children,
  hasSider,
  className,
  style,
}: LayoutProps) {
  const layoutStyles: CSSProperties = {
    display: 'flex',
    flex: 'auto',
    flexDirection: hasSider ? 'row' : 'column',
    minHeight: 0,
    backgroundColor: tokens.colorBgSubtle,
    ...style,
  }

  return (
    <div style={layoutStyles} className={className}>
      {children}
    </div>
  )
}

// ============================================================================
// Header Component
// ============================================================================

function Header({
  children,
  className,
  style,
}: HeaderProps) {
  const headerStyles: CSSProperties = {
    flex: '0 0 auto',
    height: 64,
    padding: '0 24px',
    backgroundColor: tokens.colorBgMuted,
    display: 'flex',
    alignItems: 'center',
    ...style,
  }

  return (
    <header style={headerStyles} className={className}>
      {children}
    </header>
  )
}

// ============================================================================
// Footer Component
// ============================================================================

function Footer({
  children,
  className,
  style,
}: FooterProps) {
  const footerStyles: CSSProperties = {
    flex: '0 0 auto',
    padding: '24px 50px',
    backgroundColor: tokens.colorBgMuted,
    ...style,
  }

  return (
    <footer style={footerStyles} className={className}>
      {children}
    </footer>
  )
}

// ============================================================================
// Content Component
// ============================================================================

function Content({
  children,
  className,
  style,
}: ContentProps) {
  const contentStyles: CSSProperties = {
    flex: 'auto',
    minHeight: 0,
    padding: 24,
    ...style,
  }

  return (
    <main style={contentStyles} className={className}>
      {children}
    </main>
  )
}

// ============================================================================
// Sider Component
// ============================================================================

function Sider({
  children,
  width = 200,
  collapsedWidth = 80,
  collapsible = false,
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  reverseArrow = false,
  breakpoint,
  theme = 'dark',
  trigger,
  onCollapse,
  onBreakpoint,
  className,
  style,
}: SiderProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed)
  const [broken, setBroken] = useState(false)

  // Determinar si es controlado o no
  const isControlled = controlledCollapsed !== undefined
  const collapsed = isControlled ? controlledCollapsed : internalCollapsed

  // Manejar responsive breakpoint
  useEffect(() => {
    if (!breakpoint || typeof window === 'undefined') return

    const handleResize = () => {
      const shouldBreak = window.innerWidth < breakpointValues[breakpoint]

      if (shouldBreak !== broken) {
        setBroken(shouldBreak)
        onBreakpoint?.(shouldBreak)

        if (shouldBreak && !collapsed) {
          if (!isControlled) {
            setInternalCollapsed(true)
          }
          onCollapse?.(true, 'responsive')
        } else if (!shouldBreak && collapsed && broken) {
          if (!isControlled) {
            setInternalCollapsed(false)
          }
          onCollapse?.(false, 'responsive')
        }
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [breakpoint, broken, collapsed, isControlled, onBreakpoint, onCollapse])

  const handleTriggerClick = () => {
    const newCollapsed = !collapsed
    if (!isControlled) {
      setInternalCollapsed(newCollapsed)
    }
    onCollapse?.(newCollapsed, 'clickTrigger')
  }

  const currentWidth = collapsed ? collapsedWidth : (typeof width === 'number' ? width : parseInt(width))

  const siderStyles: CSSProperties = {
    flex: `0 0 ${currentWidth}px`,
    maxWidth: currentWidth,
    minWidth: currentWidth,
    width: currentWidth,
    backgroundColor: theme === 'dark' ? '#1f1f1f' : tokens.colorBg,
    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.85)' : tokens.colorText,
    transition: 'all 0.2s ease',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    ...style,
  }

  const contentWrapperStyles: CSSProperties = {
    flex: 1,
    overflow: 'hidden',
  }

  // Renderizar trigger
  const renderTrigger = () => {
    if (!collapsible) return null
    if (trigger === null) return null

    const triggerStyles: CSSProperties = {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 48,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.25)' : tokens.colorBgMuted,
      transition: 'background-color 0.2s',
    }

    // Si collapsedWidth es 0, mostrar trigger especial fuera del sider
    if (collapsedWidth === 0 && collapsed) {
      const zeroWidthTriggerStyles: CSSProperties = {
        position: 'absolute',
        bottom: 48,
        right: -36,
        width: 36,
        height: 42,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backgroundColor: theme === 'dark' ? '#2a2a2a' : tokens.colorBgMuted,
        borderRadius: '0 4px 4px 0',
        boxShadow: tokens.shadowMd,
      }

      return (
        <div style={zeroWidthTriggerStyles} onClick={handleTriggerClick}>
          {trigger || <DefaultTriggerIcon collapsed={collapsed} reverseArrow={reverseArrow} />}
        </div>
      )
    }

    return (
      <div style={triggerStyles} onClick={handleTriggerClick}>
        {trigger || <DefaultTriggerIcon collapsed={collapsed} reverseArrow={reverseArrow} />}
      </div>
    )
  }

  return (
    <SiderContext.Provider value={{ siderCollapsed: collapsed }}>
      <aside style={siderStyles} className={className}>
        <div style={contentWrapperStyles}>
          {children}
        </div>
        {renderTrigger()}
      </aside>
    </SiderContext.Provider>
  )
}

// ============================================================================
// Default Trigger Icon
// ============================================================================

function DefaultTriggerIcon({ collapsed, reverseArrow }: { collapsed: boolean; reverseArrow: boolean }) {
  const shouldPointRight = reverseArrow ? collapsed : !collapsed

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: shouldPointRight ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s',
      }}
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

// ============================================================================
// Hook para usar contexto del Sider
// ============================================================================

export function useSider() {
  return useContext(SiderContext)
}

// ============================================================================
// Layout namespace
// ============================================================================

export const Layout = Object.assign(LayoutComponent, {
  Header,
  Footer,
  Content,
  Sider,
})

// También exportar individualmente para flexibilidad
export { Header, Footer, Content, Sider }
