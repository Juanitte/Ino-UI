import type { ReactNode } from 'react'
import { tokens } from '../../theme/tokens'

export type BadgeRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'

export interface BadgeProps {
  /** Contenido del badge */
  children: ReactNode
  /** Color de fondo (CSS color o variable del tema) */
  bgColor?: string
  /** Color del texto y borde (CSS color o variable del tema) */
  color?: string
  /** Radio del borde */
  radius?: BadgeRadius
  /** Icono opcional a la izquierda */
  icon?: ReactNode
  /** Mostrar borde */
  bordered?: boolean
}

export function Badge({
  children,
  bgColor = tokens.colorPrimaryLight,
  color = tokens.colorPrimary,
  radius = 'md',
  icon,
  bordered = true,
}: BadgeProps) {
  const radiusValues: Record<BadgeRadius, number | string> = {
    none: 0,
    sm: 4,
    md: 6,
    lg: 12,
    full: 9999,
  }

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '4px 10px',
    fontSize: 13,
    fontWeight: 500,
    borderRadius: radiusValues[radius],
    backgroundColor: bgColor,
    color: color,
    border: bordered ? `1px solid ${color}` : 'none',
    whiteSpace: 'nowrap',
  }

  return (
    <span style={style}>
      {icon && <span style={{ display: 'inline-flex', fontSize: 14 }}>{icon}</span>}
      {children}
    </span>
  )
}
