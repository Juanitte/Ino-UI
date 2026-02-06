import type { ReactNode } from 'react'
import { tokens } from '../../theme/tokens'

export type DividerType = 'horizontal' | 'vertical'
export type DividerOrientation = 'left' | 'center' | 'right'
export type DividerColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
export type DividerThickness = 'thin' | 'normal' | 'medium' | 'thick' | number

const colorMap: Record<DividerColor, { line: string; text: string }> = {
  default: { line: tokens.colorBorder, text: tokens.colorText },
  primary: { line: tokens.colorPrimary, text: tokens.colorPrimary },
  secondary: { line: tokens.colorSecondary, text: tokens.colorSecondary },
  success: { line: tokens.colorSuccess, text: tokens.colorSuccess },
  warning: { line: tokens.colorWarning, text: tokens.colorWarning },
  error: { line: tokens.colorError, text: tokens.colorError },
  info: { line: tokens.colorInfo, text: tokens.colorInfo },
}

export interface DividerProps {
  /** Tipo de divider */
  type?: DividerType
  /** Línea discontinua (dashed) */
  dashed?: boolean
  /** Posición del texto (solo para horizontal) */
  orientation?: DividerOrientation
  /** Margen entre el texto y la línea más cercana (en px o porcentaje) */
  orientationMargin?: number | string
  /** Texto sin estilo especial (más pequeño y sin negrita) */
  plain?: boolean
  /** Color del divider */
  color?: DividerColor
  /** Grosor de la línea ('thin' | 'normal' | 'medium' | 'thick' o número en px) */
  thickness?: DividerThickness
  /** Texto dentro del divider */
  children?: ReactNode
  /** Clase CSS adicional */
  className?: string
  /** Estilos inline adicionales */
  style?: React.CSSProperties
}

const thicknessMap: Record<Exclude<DividerThickness, number>, number> = {
  thin: 1,
  normal: 1,
  medium: 2,
  thick: 3,
}

export function Divider({
  type = 'horizontal',
  dashed = false,
  orientation = 'center',
  orientationMargin,
  plain = false,
  color = 'default',
  thickness = 'normal',
  children,
  className,
  style,
}: DividerProps) {
  const borderStyle = dashed ? 'dashed' : 'solid'
  const colors = colorMap[color]
  const borderColor = colors.line
  const lineWidth = typeof thickness === 'number' ? thickness : thicknessMap[thickness]

  // Divider vertical
  if (type === 'vertical') {
    const verticalStyles: React.CSSProperties = {
      display: 'inline-block',
      height: '0.9em',
      margin: '0 8px',
      verticalAlign: 'middle',
      borderTop: 0,
      borderInlineStart: `${lineWidth}px ${borderStyle} ${borderColor}`,
      ...style,
    }

    return <span style={verticalStyles} className={className} role="separator" />
  }

  // Divider horizontal sin texto
  if (!children) {
    const horizontalStyles: React.CSSProperties = {
      display: 'flex',
      clear: 'both',
      width: '100%',
      minWidth: '100%',
      margin: '24px 0',
      borderBlockStart: `${lineWidth}px ${borderStyle} ${borderColor}`,
      ...style,
    }

    return <div style={horizontalStyles} className={className} role="separator" />
  }

  // Divider horizontal con texto
  // Calcular el ancho de las líneas según orientation
  const getLineWidths = (): { before: string; after: string } => {
    const margin = orientationMargin !== undefined
      ? typeof orientationMargin === 'number'
        ? `${orientationMargin}px`
        : orientationMargin
      : null

    switch (orientation) {
      case 'left':
        return {
          before: margin || '5%',
          after: '95%',
        }
      case 'right':
        return {
          before: '95%',
          after: margin || '5%',
        }
      case 'center':
      default:
        return {
          before: '50%',
          after: '50%',
        }
    }
  }

  const lineWidths = getLineWidths()

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    clear: 'both',
    width: '100%',
    minWidth: '100%',
    margin: '24px 0',
    ...style,
  }

  const lineBaseStyles: React.CSSProperties = {
    borderBlockStart: `${lineWidth}px ${borderStyle} ${borderColor}`,
    flexGrow: 0,
    flexShrink: 0,
  }

  const beforeLineStyles: React.CSSProperties = {
    ...lineBaseStyles,
    width: lineWidths.before,
  }

  const afterLineStyles: React.CSSProperties = {
    ...lineBaseStyles,
    width: lineWidths.after,
  }

  // Si hay orientationMargin personalizado, ajustar el cálculo
  if (orientationMargin !== undefined && orientation !== 'center') {
    if (orientation === 'left') {
      beforeLineStyles.width = typeof orientationMargin === 'number'
        ? `${orientationMargin}px`
        : orientationMargin
      beforeLineStyles.flexGrow = 0
      afterLineStyles.width = 'auto'
      afterLineStyles.flexGrow = 1
    } else {
      beforeLineStyles.width = 'auto'
      beforeLineStyles.flexGrow = 1
      afterLineStyles.width = typeof orientationMargin === 'number'
        ? `${orientationMargin}px`
        : orientationMargin
      afterLineStyles.flexGrow = 0
    }
  } else if (orientation === 'center') {
    // Para center, ambas líneas crecen igual
    beforeLineStyles.flexGrow = 1
    afterLineStyles.flexGrow = 1
    beforeLineStyles.width = 'auto'
    afterLineStyles.width = 'auto'
  } else {
    // Para left/right sin margin personalizado
    if (orientation === 'left') {
      afterLineStyles.flexGrow = 1
      afterLineStyles.width = 'auto'
    } else {
      beforeLineStyles.flexGrow = 1
      beforeLineStyles.width = 'auto'
    }
  }

  const textStyles: React.CSSProperties = {
    display: 'inline-block',
    padding: '0 16px',
    fontSize: plain ? 14 : 16,
    fontWeight: plain ? 400 : 500,
    color: colors.text,
    whiteSpace: 'nowrap',
  }

  return (
    <div style={containerStyles} className={className} role="separator">
      <span style={beforeLineStyles} />
      <span style={textStyles}>{children}</span>
      <span style={afterLineStyles} />
    </div>
  )
}
