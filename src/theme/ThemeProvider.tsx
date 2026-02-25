import {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
  useMemo,
  type ReactNode,
} from 'react'
import { generateVariants } from './colors'
import type { ThemeMode, ThemeConfig, ThemeContextValue } from './types'

const ThemeContext = createContext<ThemeContextValue | null>(null)

// Colores por defecto
const defaultColors = {
  primary: '#8c75d1',
  secondary: '#78808bff',
  success: '#79bc58',
  warning: '#d5ac59',
  error: '#d7595b',
  info: '#6591c7',
}

// Colores neutros para fondos y textos
const neutralLight = {
  bg: '#ffffff',
  bgSubtle: '#f8fafc',
  bgMuted: '#f1f5f9',
  border: '#e2e8f0',
  borderHover: '#cbd5e1',
  text: '#0f172a',
  textMuted: '#868686',
  textSubtle: '#686868',
  shadowSm: '0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.15)',
  shadowMd: '0 4px 8px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.15)',
  shadowLg: '0 8px 16px rgba(0,0,0,0.25), 0 4px 8px rgba(0,0,0,0.15)',
}

const neutralDark = {
  bg: '#282828',
  bgSubtle: '#232323',
  bgMuted: '#1f1f1f',
  border: '#404040',
  borderHover: '#505050',
  text: '#f8fafc',
  textMuted: '#8f8f8f',
  textSubtle: '#b4b4b4',
  shadowSm: '0 1px 3px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
  shadowMd: '0 4px 8px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
  shadowLg: '0 8px 16px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
}

function generateCssVariables(config: ThemeConfig, mode: ThemeMode): string {
  const colors = { ...defaultColors, ...config.colors }
  const neutral = mode === 'light' ? neutralLight : neutralDark

  let css = ''

  // Generar variantes para cada color semántico
  for (const [name, color] of Object.entries(colors)) {
    const variants = generateVariants(color)
    for (const [level, value] of Object.entries(variants)) {
      css += `--j-${name}-${level}: ${value};`
    }
    // Alias convenientes
    css += `--j-${name}: ${variants[500]};`
    css += `--j-${name}-light: ${variants[100]};`
    css += `--j-${name}-dark: ${variants[900]};`
    // Para hover en modo claro usamos 600, en oscuro 400
    css += `--j-${name}-hover: ${mode === 'light' ? variants[600] : variants[400]};`
    // Borde: en modo claro oscuro, en modo oscuro claro
    css += `--j-${name}-border: ${mode === 'light' ? variants[700] : variants[300]};`
    // Texto sobre el color (blanco para colores oscuros, oscuro para claros)
    css += `--j-${name}-contrast: #ffffff;`
  }

  // Colores neutros
  for (const [name, value] of Object.entries(neutral)) {
    css += `--j-${name}: ${value};`
  }

  return css
}

interface ThemeProviderProps {
  children: ReactNode
  config?: ThemeConfig
}

export function ThemeProvider({ children, config = {} }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (config.defaultMode) return config.defaultMode
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('j-ui-theme')
      if (stored === 'light' || stored === 'dark') return stored
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
    }
    return 'light'
  })

  const toggleMode = () => setMode((m) => (m === 'light' ? 'dark' : 'light'))

  // Persistir preferencia
  useEffect(() => {
    localStorage.setItem('j-ui-theme', mode)
  }, [mode])

  // Inyectar CSS variables (useLayoutEffect to update before child useEffects read them)
  useLayoutEffect(() => {
    const css = generateCssVariables(config, mode)
    const styleId = 'j-ui-theme-vars'
    let style = document.getElementById(styleId) as HTMLStyleElement | null

    if (!style) {
      style = document.createElement('style')
      style.id = styleId
      document.head.appendChild(style)
    }

    style.textContent = `:root { ${css} }`
  }, [config, mode])

  const value = useMemo(
    () => ({ mode, setMode, toggleMode }),
    [mode]
  )

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}

/** Returns current theme mode or null when outside ThemeProvider (never throws) */
export function useThemeMode(): ThemeMode | null {
  return useContext(ThemeContext)?.mode ?? null
}
