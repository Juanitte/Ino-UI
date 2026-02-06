import { useState, useRef, useEffect, type ReactNode } from 'react'
import { tokens } from '../../theme/tokens'

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  /** Contenido del tooltip */
  content: ReactNode
  /** Elemento que activa el tooltip */
  children: ReactNode
  /** Posición del tooltip */
  position?: TooltipPosition
  /** Delay antes de mostrar (ms) */
  delay?: number
  /** Desactivar tooltip */
  disabled?: boolean
}

export function Tooltip({
  content,
  children,
  position = 'top',
  delay = 200,
  disabled = false,
}: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  const showTooltip = () => {
    if (disabled) return
    timeoutRef.current = window.setTimeout(() => {
      setVisible(true)
      // Pequeño delay para que el navegador procese el visible=true antes de animar
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true)
        })
      })
    }, delay)
  }

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsAnimating(false)
    setTimeout(() => setVisible(false), 150)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // Posición base + animación de entrada (empieza desplazado, termina en 0)
  const getTransform = (): string => {
    const offset = isAnimating ? 0 : 6
    switch (position) {
      case 'top':
        return `translateX(-50%) translateY(${offset}px)`
      case 'bottom':
        return `translateX(-50%) translateY(${-offset}px)`
      case 'left':
        return `translateY(-50%) translateX(${offset}px)`
      case 'right':
        return `translateY(-50%) translateX(${-offset}px)`
    }
  }

  const positionStyles: Record<TooltipPosition, React.CSSProperties> = {
    top: {
      bottom: '100%',
      left: '50%',
      marginBottom: 8,
    },
    bottom: {
      top: '100%',
      left: '50%',
      marginTop: 8,
    },
    left: {
      right: '100%',
      top: '50%',
      marginRight: 8,
    },
    right: {
      left: '100%',
      top: '50%',
      marginLeft: 8,
    },
  }

  // Flecha: rotación correcta para apuntar hacia el elemento trigger
  const arrowStyles: Record<TooltipPosition, React.CSSProperties> = {
    top: {
      bottom: -4,
      left: '50%',
      transform: 'translateX(-50%) rotate(45deg)',
      borderRight: `1px solid ${tokens.colorBorder}`,
      borderBottom: `1px solid ${tokens.colorBorder}`,
    },
    bottom: {
      top: -4,
      left: '50%',
      transform: 'translateX(-50%) rotate(-135deg)',
      borderRight: `1px solid ${tokens.colorBorder}`,
      borderBottom: `1px solid ${tokens.colorBorder}`,
    },
    left: {
      right: -4,
      top: '50%',
      transform: 'translateY(-50%) rotate(-45deg)',
      borderRight: `1px solid ${tokens.colorBorder}`,
      borderBottom: `1px solid ${tokens.colorBorder}`,
    },
    right: {
      left: -4,
      top: '50%',
      transform: 'translateY(-50%) rotate(135deg)',
      borderRight: `1px solid ${tokens.colorBorder}`,
      borderBottom: `1px solid ${tokens.colorBorder}`,
    },
  }

  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: 1000,
    padding: '8px 12px',
    borderRadius: 6,
    backgroundColor: tokens.colorBgMuted,
    color: tokens.colorText,
    fontSize: 13,
    fontWeight: 500,
    whiteSpace: 'nowrap',
    boxShadow: tokens.shadowMd,
    border: `1px solid ${tokens.colorBorder}`,
    opacity: isAnimating ? 1 : 0,
    transform: getTransform(),
    transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
    pointerEvents: 'none',
    ...positionStyles[position],
  }

  const arrowStyle: React.CSSProperties = {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: tokens.colorBgMuted,
    ...arrowStyles[position],
  }

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {visible && (
        <div style={tooltipStyle} role="tooltip">
          {content}
          <div style={arrowStyle} />
        </div>
      )}
    </div>
  )
}
