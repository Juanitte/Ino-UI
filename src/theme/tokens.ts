/**
 * Tokens del tema - referencias tipadas a las CSS variables
 * Uso: import { tokens } from 'ino-ui'
 *
 * Ejemplo:
 * <div style={{ backgroundColor: tokens.colorPrimaryBg, color: tokens.colorPrimary }}>
 */

// Colores semánticos
const colorTokens = {
  // Primary
  colorPrimary: 'var(--j-primary)',
  colorPrimaryHover: 'var(--j-primary-hover)',
  colorPrimaryLight: 'var(--j-primary-light)',
  colorPrimaryDark: 'var(--j-primary-dark)',
  colorPrimaryBg: 'var(--j-primary-dark)', // Alias for backwards compatibility
  colorPrimaryBorder: 'var(--j-primary-border)',
  colorPrimaryContrast: 'var(--j-primary-contrast)',
  colorPrimary50: 'var(--j-primary-50)',
  colorPrimary100: 'var(--j-primary-100)',
  colorPrimary200: 'var(--j-primary-200)',
  colorPrimary300: 'var(--j-primary-300)',
  colorPrimary400: 'var(--j-primary-400)',
  colorPrimary500: 'var(--j-primary-500)',
  colorPrimary600: 'var(--j-primary-600)',
  colorPrimary700: 'var(--j-primary-700)',
  colorPrimary800: 'var(--j-primary-800)',
  colorPrimary900: 'var(--j-primary-900)',

  // Secondary
  colorSecondary: 'var(--j-secondary)',
  colorSecondaryHover: 'var(--j-secondary-hover)',
  colorSecondaryLight: 'var(--j-secondary-light)',
  colorSecondaryDark: 'var(--j-secondary-dark)',
  colorSecondaryBg: 'var(--j-secondary-dark)', // Alias for backwards compatibility
  colorSecondaryBorder: 'var(--j-secondary-border)',
  colorSecondaryContrast: 'var(--j-secondary-contrast)',
  colorSecondary50: 'var(--j-secondary-50)',
  colorSecondary100: 'var(--j-secondary-100)',
  colorSecondary200: 'var(--j-secondary-200)',
  colorSecondary300: 'var(--j-secondary-300)',
  colorSecondary400: 'var(--j-secondary-400)',
  colorSecondary500: 'var(--j-secondary-500)',
  colorSecondary600: 'var(--j-secondary-600)',
  colorSecondary700: 'var(--j-secondary-700)',
  colorSecondary800: 'var(--j-secondary-800)',
  colorSecondary900: 'var(--j-secondary-900)',

  // Success
  colorSuccess: 'var(--j-success)',
  colorSuccessHover: 'var(--j-success-hover)',
  colorSuccessLight: 'var(--j-success-light)',
  colorSuccessDark: 'var(--j-success-dark)',
  colorSuccessBg: 'var(--j-success-dark)', // Alias for backwards compatibility
  colorSuccessBorder: 'var(--j-success-border)',
  colorSuccessContrast: 'var(--j-success-contrast)',
  colorSuccess50: 'var(--j-success-50)',
  colorSuccess100: 'var(--j-success-100)',
  colorSuccess200: 'var(--j-success-200)',
  colorSuccess300: 'var(--j-success-300)',
  colorSuccess400: 'var(--j-success-400)',
  colorSuccess500: 'var(--j-success-500)',
  colorSuccess600: 'var(--j-success-600)',
  colorSuccess700: 'var(--j-success-700)',
  colorSuccess800: 'var(--j-success-800)',
  colorSuccess900: 'var(--j-success-900)',

  // Warning
  colorWarning: 'var(--j-warning)',
  colorWarningHover: 'var(--j-warning-hover)',
  colorWarningLight: 'var(--j-warning-light)',
  colorWarningDark: 'var(--j-warning-dark)',
  colorWarningBg: 'var(--j-warning-dark)', // Alias for backwards compatibility
  colorWarningBorder: 'var(--j-warning-border)',
  colorWarningContrast: 'var(--j-warning-contrast)',
  colorWarning50: 'var(--j-warning-50)',
  colorWarning100: 'var(--j-warning-100)',
  colorWarning200: 'var(--j-warning-200)',
  colorWarning300: 'var(--j-warning-300)',
  colorWarning400: 'var(--j-warning-400)',
  colorWarning500: 'var(--j-warning-500)',
  colorWarning600: 'var(--j-warning-600)',
  colorWarning700: 'var(--j-warning-700)',
  colorWarning800: 'var(--j-warning-800)',
  colorWarning900: 'var(--j-warning-900)',

  // Error
  colorError: 'var(--j-error)',
  colorErrorHover: 'var(--j-error-hover)',
  colorErrorLight: 'var(--j-error-light)',
  colorErrorDark: 'var(--j-error-dark)',
  colorErrorBg: 'var(--j-error-dark)', // Alias for backwards compatibility
  colorErrorBorder: 'var(--j-error-border)',
  colorErrorContrast: 'var(--j-error-contrast)',
  colorError50: 'var(--j-error-50)',
  colorError100: 'var(--j-error-100)',
  colorError200: 'var(--j-error-200)',
  colorError300: 'var(--j-error-300)',
  colorError400: 'var(--j-error-400)',
  colorError500: 'var(--j-error-500)',
  colorError600: 'var(--j-error-600)',
  colorError700: 'var(--j-error-700)',
  colorError800: 'var(--j-error-800)',
  colorError900: 'var(--j-error-900)',

  // Info
  colorInfo: 'var(--j-info)',
  colorInfoHover: 'var(--j-info-hover)',
  colorInfoLight: 'var(--j-info-light)',
  colorInfoDark: 'var(--j-info-dark)',
  colorInfoBg: 'var(--j-info-dark)', // Alias for backwards compatibility
  colorInfoBorder: 'var(--j-info-border)',
  colorInfoContrast: 'var(--j-info-contrast)',
  colorInfo50: 'var(--j-info-50)',
  colorInfo100: 'var(--j-info-100)',
  colorInfo200: 'var(--j-info-200)',
  colorInfo300: 'var(--j-info-300)',
  colorInfo400: 'var(--j-info-400)',
  colorInfo500: 'var(--j-info-500)',
  colorInfo600: 'var(--j-info-600)',
  colorInfo700: 'var(--j-info-700)',
  colorInfo800: 'var(--j-info-800)',
  colorInfo900: 'var(--j-info-900)',
} as const

// Colores neutros
const neutralTokens = {
  colorBg: 'var(--j-bg)',
  colorBgSubtle: 'var(--j-bgSubtle)',
  colorBgMuted: 'var(--j-bgMuted)',
  colorBorder: 'var(--j-border)',
  colorBorderHover: 'var(--j-borderHover)',
  colorText: 'var(--j-text)',
  colorTextMuted: 'var(--j-textMuted)',
  colorTextSubtle: 'var(--j-textSubtle)',
} as const

// Sombras
const shadowTokens = {
  shadowSm: 'var(--j-shadowSm)',
  shadowMd: 'var(--j-shadowMd)',
  shadowLg: 'var(--j-shadowLg)',
} as const

export const tokens = {
  ...colorTokens,
  ...neutralTokens,
  ...shadowTokens,
} as const

export type Tokens = typeof tokens
