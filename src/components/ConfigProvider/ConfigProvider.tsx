import {
  type ReactNode,
  createContext,
  useContext,
  useMemo,
} from 'react'
import { en_US } from './locales'

// ============================================================================
// Types
// ============================================================================

export interface DatePickerLocale {
  placeholder: string
  yearPlaceholder: string
  quarterPlaceholder: string
  monthPlaceholder: string
  weekPlaceholder: string
  dateTimePlaceholder: string
  rangeStartPlaceholder: string
  rangeEndPlaceholder: string
  rangeStartTimePlaceholder: string
  rangeEndTimePlaceholder: string
  today: string
  now: string
  ok: string
}

export interface PaginationLocale {
  /** Suffix shown after page size number, e.g. "/ page" → "10 / page" */
  itemsPerPage: string
  /** Prefix for the quick jumper input, e.g. "Go to" */
  jumpTo: string
}

export interface FormLocale {
  defaultRequiredMessage: string
  defaultPatternMessage: string
}

export interface Locale {
  /** BCP 47 locale code, e.g. 'en_US', 'es_ES' */
  locale: string
  DatePicker?: Partial<DatePickerLocale>
  Pagination?: Partial<PaginationLocale>
  Form?: Partial<FormLocale>
}

export type ConfigSize = 'small' | 'middle' | 'large'

export interface ConfigContextValue {
  componentSize?: ConfigSize
  componentDisabled?: boolean
  locale: Locale
}

export interface ConfigProviderProps {
  /** Default size for all size-aware components */
  componentSize?: ConfigSize
  /** Globally disable all interactive components */
  componentDisabled?: boolean
  /** Localization strings for built-in component text */
  locale?: Locale
  children: ReactNode
}

// ============================================================================
// Context
// ============================================================================

const ConfigContext = createContext<ConfigContextValue | null>(null)

// ============================================================================
// Default config (used when outside any ConfigProvider)
// ============================================================================

export const defaultConfig: ConfigContextValue = {
  locale: en_US,
}

// ============================================================================
// Hook
// ============================================================================

/** Returns the nearest ConfigProvider value, or defaultConfig when outside any provider. Never throws. */
export function useConfig(): ConfigContextValue {
  return useContext(ConfigContext) ?? defaultConfig
}

// ============================================================================
// ConfigProvider Component
// ============================================================================

function ConfigProviderRoot({
  componentSize,
  componentDisabled,
  locale,
  children,
}: ConfigProviderProps) {
  const parent = useContext(ConfigContext)

  const value = useMemo<ConfigContextValue>(
    () => ({
      componentSize: componentSize ?? parent?.componentSize,
      componentDisabled: componentDisabled ?? parent?.componentDisabled,
      locale: locale ?? parent?.locale ?? en_US,
    }),
    [componentSize, componentDisabled, locale, parent],
  )

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  )
}

export const ConfigProvider = Object.assign(ConfigProviderRoot, { useConfig })
