import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ConfigProvider, useConfig, defaultConfig } from '../ConfigProvider'
import { en_US } from '../locales'
import { es_ES } from '../locales'
import type { ConfigContextValue } from '../ConfigProvider'

// ============================================================================
// Helpers
// ============================================================================

/**
 * Returns a Capture component and a `ref` object.
 * After render(), ref.ctx holds the value returned by useConfig().
 * Using a ref (not destructured getter) so the value is read lazily after render.
 */
function makeCapture() {
  const ref = { ctx: undefined as unknown as ConfigContextValue }
  const Capture = () => { ref.ctx = useConfig(); return null }
  return { Capture, ref }
}

// ============================================================================
// Tests
// ============================================================================

describe('ConfigProvider', () => {
  // ── Rendering ─────────────────────────────────────────────────────────

  describe('rendering', () => {
    it('renders children without adding DOM elements', () => {
      const { container } = render(
        <ConfigProvider componentSize="small">
          <span data-testid="child">hello</span>
        </ConfigProvider>,
      )
      expect(container.querySelector('[data-testid="child"]')?.textContent).toBe('hello')
    })

    it('renders multiple children', () => {
      const { container } = render(
        <ConfigProvider>
          <span data-testid="a">A</span>
          <span data-testid="b">B</span>
        </ConfigProvider>,
      )
      expect(container.querySelector('[data-testid="a"]')).not.toBeNull()
      expect(container.querySelector('[data-testid="b"]')).not.toBeNull()
    })
  })

  // ── useConfig outside provider ────────────────────────────────────────

  describe('useConfig outside any ConfigProvider', () => {
    it('never throws', () => {
      const { Capture } = makeCapture()
      expect(() => render(<Capture />)).not.toThrow()
    })

    it('returns en_US as default locale', () => {
      const { Capture, ref } = makeCapture()
      render(<Capture />)
      expect(ref.ctx.locale.locale).toBe('en_US')
    })

    it('returns undefined for componentSize', () => {
      const { Capture, ref } = makeCapture()
      render(<Capture />)
      expect(ref.ctx.componentSize).toBeUndefined()
    })

    it('returns undefined for componentDisabled', () => {
      const { Capture, ref } = makeCapture()
      render(<Capture />)
      expect(ref.ctx.componentDisabled).toBeUndefined()
    })

    it('returns the same object as defaultConfig', () => {
      const { Capture, ref } = makeCapture()
      render(<Capture />)
      expect(ref.ctx).toBe(defaultConfig)
    })
  })

  // ── useConfig inside provider ─────────────────────────────────────────

  describe('useConfig inside ConfigProvider', () => {
    it('componentSize small is accessible', () => {
      const { Capture, ref } = makeCapture()
      render(<ConfigProvider componentSize="small"><Capture /></ConfigProvider>)
      expect(ref.ctx.componentSize).toBe('small')
    })

    it('componentSize large is accessible', () => {
      const { Capture, ref } = makeCapture()
      render(<ConfigProvider componentSize="large"><Capture /></ConfigProvider>)
      expect(ref.ctx.componentSize).toBe('large')
    })

    it('componentDisabled=true is accessible', () => {
      const { Capture, ref } = makeCapture()
      render(<ConfigProvider componentDisabled><Capture /></ConfigProvider>)
      expect(ref.ctx.componentDisabled).toBe(true)
    })

    it('componentDisabled=false is accessible', () => {
      const { Capture, ref } = makeCapture()
      render(<ConfigProvider componentDisabled={false}><Capture /></ConfigProvider>)
      expect(ref.ctx.componentDisabled).toBe(false)
    })

    it('locale is accessible', () => {
      const { Capture, ref } = makeCapture()
      render(<ConfigProvider locale={es_ES}><Capture /></ConfigProvider>)
      expect(ref.ctx.locale.locale).toBe('es_ES')
    })

    it('locale defaults to en_US when not provided', () => {
      const { Capture, ref } = makeCapture()
      render(<ConfigProvider><Capture /></ConfigProvider>)
      expect(ref.ctx.locale.locale).toBe('en_US')
    })

    it('componentSize is undefined when not provided', () => {
      const { Capture, ref } = makeCapture()
      render(<ConfigProvider><Capture /></ConfigProvider>)
      expect(ref.ctx.componentSize).toBeUndefined()
    })

    it('componentDisabled is undefined when not provided', () => {
      const { Capture, ref } = makeCapture()
      render(<ConfigProvider><Capture /></ConfigProvider>)
      expect(ref.ctx.componentDisabled).toBeUndefined()
    })

    it('context is provided to deeply nested components', () => {
      const { Capture, ref } = makeCapture()
      render(
        <ConfigProvider componentSize="middle">
          <div><div><Capture /></div></div>
        </ConfigProvider>,
      )
      expect(ref.ctx.componentSize).toBe('middle')
    })
  })

  // ── Nesting: inheritance ──────────────────────────────────────────────

  describe('nesting — inheritance from parent', () => {
    it('child inherits parent componentSize when not set on child', () => {
      const { Capture, ref } = makeCapture()
      render(
        <ConfigProvider componentSize="large">
          <ConfigProvider>
            <Capture />
          </ConfigProvider>
        </ConfigProvider>,
      )
      expect(ref.ctx.componentSize).toBe('large')
    })

    it('child inherits parent componentDisabled when not set on child', () => {
      const { Capture, ref } = makeCapture()
      render(
        <ConfigProvider componentDisabled>
          <ConfigProvider>
            <Capture />
          </ConfigProvider>
        </ConfigProvider>,
      )
      expect(ref.ctx.componentDisabled).toBe(true)
    })

    it('child inherits parent locale when not set on child', () => {
      const { Capture, ref } = makeCapture()
      render(
        <ConfigProvider locale={es_ES}>
          <ConfigProvider>
            <Capture />
          </ConfigProvider>
        </ConfigProvider>,
      )
      expect(ref.ctx.locale.locale).toBe('es_ES')
    })
  })

  // ── Nesting: override ─────────────────────────────────────────────────

  describe('nesting — child overrides parent', () => {
    it('child overrides parent componentSize', () => {
      const { Capture, ref } = makeCapture()
      render(
        <ConfigProvider componentSize="large">
          <ConfigProvider componentSize="small">
            <Capture />
          </ConfigProvider>
        </ConfigProvider>,
      )
      expect(ref.ctx.componentSize).toBe('small')
    })

    it('child overrides parent componentDisabled', () => {
      const { Capture, ref } = makeCapture()
      render(
        <ConfigProvider componentDisabled>
          <ConfigProvider componentDisabled={false}>
            <Capture />
          </ConfigProvider>
        </ConfigProvider>,
      )
      expect(ref.ctx.componentDisabled).toBe(false)
    })

    it('child overrides parent locale', () => {
      const { Capture, ref } = makeCapture()
      render(
        <ConfigProvider locale={es_ES}>
          <ConfigProvider locale={en_US}>
            <Capture />
          </ConfigProvider>
        </ConfigProvider>,
      )
      expect(ref.ctx.locale.locale).toBe('en_US')
    })

    it('parent and child can set different keys independently', () => {
      const { Capture, ref } = makeCapture()
      render(
        <ConfigProvider componentSize="large">
          <ConfigProvider componentDisabled>
            <Capture />
          </ConfigProvider>
        </ConfigProvider>,
      )
      expect(ref.ctx.componentSize).toBe('large')
      expect(ref.ctx.componentDisabled).toBe(true)
    })
  })

  // ── defaultConfig ─────────────────────────────────────────────────────

  describe('defaultConfig', () => {
    it('locale is en_US', () => {
      expect(defaultConfig.locale.locale).toBe('en_US')
    })

    it('componentSize is undefined', () => {
      expect(defaultConfig.componentSize).toBeUndefined()
    })

    it('componentDisabled is undefined', () => {
      expect(defaultConfig.componentDisabled).toBeUndefined()
    })

    it('locale has DatePicker strings', () => {
      expect(defaultConfig.locale.DatePicker?.today).toBe('Today')
    })

    it('locale has Pagination strings', () => {
      expect(defaultConfig.locale.Pagination?.jumpTo).toBe('Go to')
    })

    it('locale has Form strings', () => {
      expect(defaultConfig.locale.Form?.defaultRequiredMessage).toBe('This field is required')
    })
  })

  // ── ConfigProvider.useConfig static method ────────────────────────────

  describe('ConfigProvider.useConfig static method', () => {
    it('ConfigProvider.useConfig is the same function as exported useConfig', () => {
      expect(ConfigProvider.useConfig).toBe(useConfig)
    })

    it('ConfigProvider.useConfig works inside ConfigProvider', () => {
      const ref = { ctx: undefined as unknown as ConfigContextValue }
      const Capture = () => { ref.ctx = ConfigProvider.useConfig(); return null }
      render(<ConfigProvider componentSize="small"><Capture /></ConfigProvider>)
      expect(ref.ctx.componentSize).toBe('small')
    })

    it('ConfigProvider.useConfig returns defaultConfig outside provider', () => {
      const ref = { ctx: undefined as unknown as ConfigContextValue }
      const Capture = () => { ref.ctx = ConfigProvider.useConfig(); return null }
      render(<Capture />)
      expect(ref.ctx).toBe(defaultConfig)
    })
  })

  // ── Built-in locales ──────────────────────────────────────────────────

  describe('built-in locales', () => {
    it('en_US locale code is en_US', () => {
      expect(en_US.locale).toBe('en_US')
    })

    it('es_ES locale code is es_ES', () => {
      expect(es_ES.locale).toBe('es_ES')
    })

    it('en_US DatePicker.today is "Today"', () => {
      expect(en_US.DatePicker?.today).toBe('Today')
    })

    it('es_ES DatePicker.today is "Hoy"', () => {
      expect(es_ES.DatePicker?.today).toBe('Hoy')
    })

    it('en_US Pagination.jumpTo is "Go to"', () => {
      expect(en_US.Pagination?.jumpTo).toBe('Go to')
    })

    it('es_ES Pagination.jumpTo is "Ir a"', () => {
      expect(es_ES.Pagination?.jumpTo).toBe('Ir a')
    })

    it('en_US Form.defaultRequiredMessage matches expected text', () => {
      expect(en_US.Form?.defaultRequiredMessage).toBe('This field is required')
    })

    it('es_ES Form.defaultRequiredMessage matches expected text', () => {
      expect(es_ES.Form?.defaultRequiredMessage).toBe('Este campo es obligatorio')
    })
  })
})
