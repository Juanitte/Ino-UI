import type { CSSProperties } from 'react'

/**
 * Tipo genérico para la prop classNames de un componente.
 * T es una unión de nombres de slot semántico.
 */
export type SemanticClassNames<T extends string> = Partial<Record<T, string>>

/**
 * Tipo genérico para la prop styles de un componente.
 * T es una unión de nombres de slot semántico.
 */
export type SemanticStyles<T extends string> = Partial<Record<T, CSSProperties>>

/**
 * Fusiona el className de nivel raíz con classNames.root.
 */
export function mergeSemanticClassName(
  className?: string,
  rootClassName?: string,
): string | undefined {
  if (!className && !rootClassName) return undefined
  return [className, rootClassName].filter(Boolean).join(' ')
}

/**
 * Fusiona estilos internos del componente con styles.root y el style prop directo.
 * Orden de prioridad: base < semantic < prop (el style directo gana).
 */
export function mergeSemanticStyle(
  base: CSSProperties,
  semantic?: CSSProperties,
  prop?: CSSProperties,
): CSSProperties {
  if (!semantic && !prop) return base
  return { ...base, ...semantic, ...prop }
}
