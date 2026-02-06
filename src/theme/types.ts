export type ThemeMode = 'light' | 'dark'

export interface ThemeColors {
  primary?: string
  secondary?: string
  success?: string
  warning?: string
  error?: string
  info?: string
}

export interface ThemeConfig {
  colors?: ThemeColors
  defaultMode?: ThemeMode
}

export interface ThemeContextValue {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  toggleMode: () => void
}
