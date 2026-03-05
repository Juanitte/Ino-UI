import { describe, it, expect, vi, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { App, useApp } from '../App'
import type { AppContextValue } from '../App'

// ============================================================================
// Setup
// ============================================================================

afterEach(() => {
  vi.restoreAllMocks()
})

// ============================================================================
// Helpers
// ============================================================================

/**
 * The main <div> rendered by App.
 * modalContextHolder = empty Fragment (no modals) → no DOM nodes.
 * notifContextHolder = PopAlertContainer → returns null when instances.length=0.
 * So firstElementChild is always the App's content div.
 */
function getMainDiv(container: HTMLElement): HTMLElement {
  return container.firstElementChild as HTMLElement
}

// ============================================================================
// Tests
// ============================================================================

describe('App', () => {
  // ── Rendering ─────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<App />)
    })

    it('renders main div', () => {
      const { container } = render(<App />)
      expect(getMainDiv(container)).toBeTruthy()
    })

    it('renders children inside main div', () => {
      const { container } = render(
        <App>
          <span data-testid="child">hello</span>
        </App>,
      )
      expect(
        getMainDiv(container).querySelector('[data-testid="child"]')?.textContent,
      ).toBe('hello')
    })

    it('className applied to main div', () => {
      const { container } = render(<App className="my-app" />)
      expect(getMainDiv(container).classList.contains('my-app')).toBe(true)
    })

    it('style applied to main div', () => {
      const { container } = render(<App style={{ color: 'red' }} />)
      expect(getMainDiv(container).style.color).toBe('red')
    })

    it('renders without children (empty main div)', () => {
      const { container } = render(<App />)
      expect(getMainDiv(container).childElementCount).toBe(0)
    })
  })

  // ── useApp hook ───────────────────────────────────────────────────────

  describe('useApp hook', () => {
    it('throws when used outside App', () => {
      vi.spyOn(console, 'error').mockImplementation(() => {})
      const Thrower = () => { useApp(); return null }
      expect(() => render(<Thrower />)).toThrow(
        'useApp must be used within an <App> component',
      )
    })

    it('does not throw when used inside App', () => {
      const Comp = () => { useApp(); return null }
      expect(() => render(<App><Comp /></App>)).not.toThrow()
    })

    it('returns modal API with all required methods', () => {
      let ctx!: AppContextValue
      const Capture = () => { ctx = useApp(); return null }
      render(<App><Capture /></App>)
      expect(typeof ctx.modal.confirm).toBe('function')
      expect(typeof ctx.modal.info).toBe('function')
      expect(typeof ctx.modal.success).toBe('function')
      expect(typeof ctx.modal.warning).toBe('function')
      expect(typeof ctx.modal.error).toBe('function')
      expect(typeof ctx.modal.destroyAll).toBe('function')
    })

    it('returns notification API with all required methods', () => {
      let ctx!: AppContextValue
      const Capture = () => { ctx = useApp(); return null }
      render(<App><Capture /></App>)
      expect(typeof ctx.notification.success).toBe('function')
      expect(typeof ctx.notification.error).toBe('function')
      expect(typeof ctx.notification.info).toBe('function')
      expect(typeof ctx.notification.warning).toBe('function')
      expect(typeof ctx.notification.loading).toBe('function')
      expect(typeof ctx.notification.open).toBe('function')
      expect(typeof ctx.notification.destroy).toBe('function')
    })

    it('modal and notification are separate objects', () => {
      let ctx!: AppContextValue
      const Capture = () => { ctx = useApp(); return null }
      render(<App><Capture /></App>)
      expect(ctx.modal).not.toBe(ctx.notification)
    })

    it('provides context to deeply nested components', () => {
      let ctx!: AppContextValue
      const Deep = () => { ctx = useApp(); return null }
      render(
        <App>
          <div><div><Deep /></div></div>
        </App>,
      )
      expect(ctx.modal).toBeDefined()
      expect(ctx.notification).toBeDefined()
    })

    it('context value is an object with modal and notification keys', () => {
      let ctx!: AppContextValue
      const Capture = () => { ctx = useApp(); return null }
      render(<App><Capture /></App>)
      expect(Object.keys(ctx)).toEqual(expect.arrayContaining(['modal', 'notification']))
    })
  })

  // ── App.useApp static method ──────────────────────────────────────────

  describe('App.useApp static method', () => {
    it('App.useApp is the same function as the exported useApp', () => {
      expect(App.useApp).toBe(useApp)
    })

    it('App.useApp throws when used outside App', () => {
      vi.spyOn(console, 'error').mockImplementation(() => {})
      const Thrower = () => { App.useApp(); return null }
      expect(() => render(<Thrower />)).toThrow(
        'useApp must be used within an <App> component',
      )
    })

    it('App.useApp works inside App', () => {
      let ctx!: AppContextValue
      const Capture = () => { ctx = App.useApp(); return null }
      render(<App><Capture /></App>)
      expect(ctx.modal).toBeDefined()
    })
  })

  // ── notification config ───────────────────────────────────────────────

  describe('notification config', () => {
    it('accepts placement config without crashing', () => {
      expect(() => render(<App notification={{ placement: 'bottom' }} />)).not.toThrow()
    })

    it('accepts maxCount config without crashing', () => {
      expect(() => render(<App notification={{ maxCount: 3 }} />)).not.toThrow()
    })

    it('accepts full notification config without crashing', () => {
      expect(() =>
        render(
          <App notification={{ placement: 'top-right', maxCount: 5, duration: 5, offset: '1rem' }} />,
        ),
      ).not.toThrow()
    })
  })
})
