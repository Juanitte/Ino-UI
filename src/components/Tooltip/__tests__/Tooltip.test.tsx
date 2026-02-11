import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Tooltip } from '../Tooltip'

describe('Tooltip', () => {
  it('renders children', () => {
    render(
      <Tooltip content="Hint">
        <button>Hover me</button>
      </Tooltip>
    )
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('does not show tooltip content initially', () => {
    render(
      <Tooltip content="Hint">
        <button>Hover me</button>
      </Tooltip>
    )
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows tooltip on mouse enter after delay', async () => {
    render(
      <Tooltip content="Hint" delay={0}>
        <button>Hover me</button>
      </Tooltip>
    )

    const wrapper = screen.getByText('Hover me').parentElement!
    fireEvent.mouseEnter(wrapper)

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toHaveTextContent('Hint')
    })
  })

  it('hides tooltip on mouse leave', async () => {
    render(
      <Tooltip content="Hint" delay={0}>
        <button>Hover me</button>
      </Tooltip>
    )

    const wrapper = screen.getByText('Hover me').parentElement!
    fireEvent.mouseEnter(wrapper)

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument()
    })

    fireEvent.mouseLeave(wrapper)

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })
  })

  it('does not show tooltip when disabled', async () => {
    render(
      <Tooltip content="Hint" disabled delay={0}>
        <button>Hover me</button>
      </Tooltip>
    )

    const wrapper = screen.getByText('Hover me').parentElement!
    fireEvent.mouseEnter(wrapper)

    // Give enough time for the setTimeout(delay=0) to fire
    await new Promise((r) => setTimeout(r, 50))
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('renders with inline-flex display', () => {
    const { container } = render(
      <Tooltip content="Hint">
        <span>Target</span>
      </Tooltip>
    )
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.style.display).toBe('inline-flex')
  })

  it('applies custom className', () => {
    const { container } = render(
      <Tooltip content="Hint" className="my-tooltip">
        <span>Target</span>
      </Tooltip>
    )
    expect(container.firstChild).toHaveClass('my-tooltip')
  })
})
