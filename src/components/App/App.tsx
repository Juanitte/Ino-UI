import {
  type ReactNode,
  type CSSProperties,
  createContext,
  useContext,
  useMemo,
} from 'react'
import { useModal } from '../Modal'
import { usePopAlert } from '../PopAlert'
import type { ModalHookApi } from '../Modal'
import type { PopAlertApi, PopAlertHookConfig } from '../PopAlert'

// ============================================================================
// Types
// ============================================================================

export interface AppContextValue {
  /** Imperative modal API: confirm, info, success, warning, error, destroyAll */
  modal: ModalHookApi
  /** Imperative notification/toast API: open, success, error, info, warning, loading, destroy */
  notification: PopAlertApi
}

export interface AppProps {
  /** Configuration for the notification (PopAlert) system */
  notification?: PopAlertHookConfig
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

// ============================================================================
// Context
// ============================================================================

const AppContext = createContext<AppContextValue | null>(null)

// ============================================================================
// Hook
// ============================================================================

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within an <App> component')
  return ctx
}

// ============================================================================
// App Component
// ============================================================================

function AppRoot({ notification: notifConfig, children, className, style }: AppProps) {
  const [modal, modalContextHolder] = useModal()
  const [notification, notifContextHolder] = usePopAlert(notifConfig)

  const value = useMemo(
    () => ({ modal, notification }),
    [modal, notification],
  )

  return (
    <AppContext.Provider value={value}>
      {modalContextHolder}
      {notifContextHolder}
      <div className={className} style={style}>
        {children}
      </div>
    </AppContext.Provider>
  )
}

export const App = Object.assign(AppRoot, { useApp })
