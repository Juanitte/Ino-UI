import { vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from '../ThemeProvider'

// Helper component to test useTheme hook
function ThemeConsumer() {
  const { mode, toggleMode, setMode } = useTheme()
  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <button onClick={toggleMode}>Toggle</button>
      <button onClick={() => setMode('dark')}>Set Dark</button>
    </div>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    // Clean up any injected styles
    const style = document.getElementById('j-ui-theme-vars')
    if (style) style.remove()
  })

  it('renders children', () => {
    render(
      <ThemeProvider>
        <div>Child Content</div>
      </ThemeProvider>
    )
    expect(screen.getByText('Child Content')).toBeInTheDocument()
  })

  it('defaults to light mode', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId('mode')).toHaveTextContent('light')
  })

  it('uses defaultMode from config', () => {
    render(
      <ThemeProvider config={{ defaultMode: 'dark' }}>
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId('mode')).toHaveTextContent('dark')
  })

  it('toggles mode', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId('mode')).toHaveTextContent('light')

    act(() => {
      screen.getByText('Toggle').click()
    })
    expect(screen.getByTestId('mode')).toHaveTextContent('dark')

    act(() => {
      screen.getByText('Toggle').click()
    })
    expect(screen.getByTestId('mode')).toHaveTextContent('light')
  })

  it('sets mode directly', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )
    act(() => {
      screen.getByText('Set Dark').click()
    })
    expect(screen.getByTestId('mode')).toHaveTextContent('dark')
  })

  it('persists theme to localStorage', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )
    act(() => {
      screen.getByText('Toggle').click()
    })
    expect(localStorage.getItem('j-ui-theme')).toBe('dark')
  })

  it('reads theme from localStorage', () => {
    localStorage.setItem('j-ui-theme', 'dark')
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId('mode')).toHaveTextContent('dark')
  })

  it('injects CSS variables into document head', () => {
    render(
      <ThemeProvider>
        <div>Child</div>
      </ThemeProvider>
    )
    const styleEl = document.getElementById('j-ui-theme-vars')
    expect(styleEl).toBeInTheDocument()
    expect(styleEl?.textContent).toContain('--j-primary')
  })
})

describe('useTheme', () => {
  it('throws error when used outside ThemeProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<ThemeConsumer />)).toThrow(
      'useTheme must be used within ThemeProvider'
    )
    spy.mockRestore()
  })
})
