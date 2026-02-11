import { render, screen } from '@testing-library/react'
import { Badge } from '../Badge'

describe('Badge', () => {
  it('renders children text', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('renders as a span element', () => {
    const { container } = render(<Badge>Tag</Badge>)
    expect(container.firstChild?.nodeName).toBe('SPAN')
  })

  it('renders icon when provided', () => {
    render(<Badge icon={<span data-testid="icon">★</span>}>Badge</Badge>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('does not render icon wrapper when icon is not provided', () => {
    const { container } = render(<Badge>No Icon</Badge>)
    // Only the root span, no icon span wrapper
    const spans = container.querySelectorAll('span')
    expect(spans.length).toBe(1) // Just the root span
  })

  it('applies custom bgColor and color', () => {
    const { container } = render(<Badge bgColor="red" color="white">Custom</Badge>)
    const badge = container.firstChild as HTMLElement
    expect(badge.style.backgroundColor).toBe('red')
    expect(badge.style.color).toBe('white')
  })

  it('applies border when bordered=true (default)', () => {
    const { container } = render(<Badge>Bordered</Badge>)
    const badge = container.firstChild as HTMLElement
    expect(badge.style.border).toContain('1px solid')
  })

  it('removes border when bordered=false', () => {
    const { container } = render(<Badge bordered={false}>No Border</Badge>)
    const badge = container.firstChild as HTMLElement
    // jsdom normalizes 'none' to shorthand components
    expect(badge.style.borderStyle).toBe('none')
  })

  it('applies different border radius based on radius prop', () => {
    const { container: c1 } = render(<Badge radius="none">R</Badge>)
    const { container: c2 } = render(<Badge radius="full">R</Badge>)
    // borderRadius: 0 (number) is stored as '0' without px unit
    expect((c1.firstChild as HTMLElement).style.borderRadius).toBe('0')
    expect((c2.firstChild as HTMLElement).style.borderRadius).toBe('9999px')
  })

  it('applies custom className', () => {
    const { container } = render(<Badge className="custom">C</Badge>)
    expect(container.firstChild).toHaveClass('custom')
  })

  it('applies custom style', () => {
    const { container } = render(<Badge style={{ margin: 10 }}>S</Badge>)
    expect((container.firstChild as HTMLElement).style.margin).toBe('10px')
  })

  it('wraps content in a span when classNames.content is provided', () => {
    const { container } = render(
      <Badge classNames={{ content: 'content-class' }}>Wrapped</Badge>
    )
    const contentSpan = container.querySelector('.content-class')
    expect(contentSpan).toBeInTheDocument()
    expect(contentSpan?.textContent).toBe('Wrapped')
  })
})
