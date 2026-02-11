import type { ReactNode } from 'react'
import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Breadcrumb } from '../Breadcrumb'

describe('Breadcrumb', () => {
  const items = [
    { title: 'Home', href: '/home' },
    { title: 'Category', href: '/category' },
    { title: 'Current Page' },
  ]

  // ---------- Basic rendering ----------

  it('renders a nav element with aria-label', () => {
    render(<Breadcrumb items={items} />)
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'breadcrumb')
  })

  it('renders all item titles', () => {
    render(<Breadcrumb items={items} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Category')).toBeInTheDocument()
    expect(screen.getByText('Current Page')).toBeInTheDocument()
  })

  it('renders items inside an ol list', () => {
    const { container } = render(<Breadcrumb items={items} />)
    const ol = container.querySelector('ol')
    expect(ol).toBeInTheDocument()
    expect(ol!.style.listStyle).toBe('none')
  })

  it('renders with empty items array', () => {
    const { container } = render(<Breadcrumb items={[]} />)
    expect(container.querySelector('nav')).toBeInTheDocument()
  })

  // ---------- Separators ----------

  it('renders default "/" separators between items', () => {
    render(<Breadcrumb items={items} />)
    const separators = screen.getAllByText('/')
    // N-1 separators for N items
    expect(separators).toHaveLength(2)
  })

  it('renders custom separator', () => {
    render(<Breadcrumb items={items} separator=">" />)
    const separators = screen.getAllByText('>')
    expect(separators).toHaveLength(2)
  })

  it('does not render separator after the last item', () => {
    const { container } = render(<Breadcrumb items={items} />)
    const lis = container.querySelectorAll('li')
    const lastLi = lis[lis.length - 1]
    // Last li should be an item, not a separator
    expect(lastLi.getAttribute('aria-hidden')).toBeNull()
  })

  it('separator li has aria-hidden=true', () => {
    const { container } = render(<Breadcrumb items={items} />)
    const hiddenLis = container.querySelectorAll('li[aria-hidden="true"]')
    expect(hiddenLis).toHaveLength(2)
  })

  // ---------- Links & last item ----------

  it('renders items with href as <a> elements', () => {
    render(<Breadcrumb items={items} />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
    expect(links[0]).toHaveAttribute('href', '/home')
    expect(links[1]).toHaveAttribute('href', '/category')
  })

  it('renders last item as a span (not a link)', () => {
    render(<Breadcrumb items={items} />)
    const lastItem = screen.getByText('Current Page')
    expect(lastItem.tagName).toBe('SPAN')
    expect(lastItem).not.toHaveAttribute('href')
  })

  it('applies aria-current="page" to last item li', () => {
    const { container } = render(<Breadcrumb items={items} />)
    const currentLi = container.querySelector('li[aria-current="page"]')
    expect(currentLi).toBeInTheDocument()
    expect(currentLi!.textContent).toContain('Current Page')
  })

  it('last item has fontWeight 500', () => {
    render(<Breadcrumb items={items} />)
    const lastItem = screen.getByText('Current Page')
    expect(lastItem.style.fontWeight).toBe('500')
  })

  // ---------- Icons ----------

  it('renders icon before title', () => {
    const iconItems = [
      { title: 'Home', href: '/', icon: <span data-testid="home-icon">🏠</span> },
      { title: 'Page' },
    ]
    render(<Breadcrumb items={iconItems} />)
    expect(screen.getByTestId('home-icon')).toBeInTheDocument()
  })

  // ---------- onClick ----------

  it('calls item onClick when clicked', () => {
    const handleClick = vi.fn()
    const clickItems = [
      { title: 'Clickable', onClick: handleClick },
      { title: 'Last' },
    ]
    render(<Breadcrumb items={clickItems} />)
    fireEvent.click(screen.getByText('Clickable'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders item with onClick as a span with cursor pointer', () => {
    const clickItems = [
      { title: 'Clickable', onClick: vi.fn() },
      { title: 'Last' },
    ]
    render(<Breadcrumb items={clickItems} />)
    const el = screen.getByText('Clickable')
    expect(el.tagName).toBe('SPAN')
    expect(el.style.cursor).toBe('pointer')
  })

  // ---------- Dropdown menu ----------

  it('renders chevron icon for items with menu', () => {
    const menuItems = [
      {
        title: 'With Menu',
        menu: { items: [{ key: '1', title: 'Option 1' }] },
      },
      { title: 'Last' },
    ]
    const { container } = render(<Breadcrumb items={menuItems} />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('shows dropdown overlay on mouseEnter and hides on mouseLeave', () => {
    const menuItems = [
      {
        title: 'Hover Me',
        menu: {
          items: [
            { key: '1', title: 'Option A' },
            { key: '2', title: 'Option B' },
          ],
        },
      },
      { title: 'Last' },
    ]
    const { container } = render(<Breadcrumb items={menuItems} />)

    // Overlay not visible initially
    expect(screen.queryByText('Option A')).not.toBeInTheDocument()

    // Hover to show
    const li = screen.getByText('Hover Me').closest('li')!
    fireEvent.mouseEnter(li)
    expect(screen.getByText('Option A')).toBeInTheDocument()
    expect(screen.getByText('Option B')).toBeInTheDocument()

    // Leave to hide
    fireEvent.mouseLeave(li)
    expect(screen.queryByText('Option A')).not.toBeInTheDocument()
  })

  it('renders menu items with href as <a> elements', () => {
    const menuItems = [
      {
        title: 'Parent',
        menu: {
          items: [{ key: '1', title: 'Link Option', href: '/option' }],
        },
      },
      { title: 'Last' },
    ]
    render(<Breadcrumb items={menuItems} />)

    // Open overlay
    const li = screen.getByText('Parent').closest('li')!
    fireEvent.mouseEnter(li)

    const link = screen.getByText('Link Option').closest('a')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/option')
  })

  it('renders menu items without href as <span> elements', () => {
    const menuItems = [
      {
        title: 'Parent',
        menu: {
          items: [{ key: '1', title: 'Span Option' }],
        },
      },
      { title: 'Last' },
    ]
    render(<Breadcrumb items={menuItems} />)

    const li = screen.getByText('Parent').closest('li')!
    fireEvent.mouseEnter(li)

    const option = screen.getByText('Span Option')
    expect(option.closest('a')).toBeNull()
    expect(option.closest('span')).toBeInTheDocument()
  })

  it('calls menu item onClick when clicked', () => {
    const handleMenuClick = vi.fn()
    const menuItems = [
      {
        title: 'Parent',
        menu: {
          items: [{ key: '1', title: 'Click Me', onClick: handleMenuClick }],
        },
      },
      { title: 'Last' },
    ]
    render(<Breadcrumb items={menuItems} />)

    const li = screen.getByText('Parent').closest('li')!
    fireEvent.mouseEnter(li)
    fireEvent.click(screen.getByText('Click Me'))
    expect(handleMenuClick).toHaveBeenCalledTimes(1)
  })

  // ---------- itemRender ----------

  it('uses custom itemRender when provided', () => {
    const customRender = vi.fn(
      (item: { title?: ReactNode; href?: string }) =>
        <a href={item.href} data-testid="custom">{item.title}</a>
    )
    render(<Breadcrumb items={items} itemRender={customRender} />)
    const customLinks = screen.getAllByTestId('custom')
    expect(customLinks).toHaveLength(3)
    expect(customRender).toHaveBeenCalledTimes(3)
  })

  it('passes params and accumulated paths to itemRender', () => {
    const pathItems = [
      { title: 'Home', path: 'home' },
      { title: 'Users', path: 'users' },
      { title: 'Detail', path: ':id' },
    ]
    const myParams = { id: '42' }
    const customRender = vi.fn(
      (item: { title?: ReactNode }) => <span>{item.title}</span>
    )
    render(
      <Breadcrumb items={pathItems} params={myParams} itemRender={customRender} />
    )

    const fullPaths = ['home', 'home/users', 'home/users/:id']

    // All calls receive the same full accumulated paths array
    expect(customRender).toHaveBeenCalledWith(
      pathItems[0], myParams, pathItems, fullPaths
    )
    expect(customRender).toHaveBeenCalledWith(
      pathItems[1], myParams, pathItems, fullPaths
    )
    expect(customRender).toHaveBeenCalledWith(
      pathItems[2], myParams, pathItems, fullPaths
    )
  })

  // ---------- className & style ----------

  it('applies custom className to nav', () => {
    const { container } = render(<Breadcrumb items={items} className="my-bc" />)
    expect(container.querySelector('nav')).toHaveClass('my-bc')
  })

  it('applies custom style to nav', () => {
    const { container } = render(
      <Breadcrumb items={items} style={{ margin: 10 }} />
    )
    expect((container.querySelector('nav') as HTMLElement).style.margin).toBe('10px')
  })

  // ---------- Semantic classNames ----------

  it('applies classNames.list to the ol', () => {
    const { container } = render(
      <Breadcrumb items={items} classNames={{ list: 'my-list' }} />
    )
    expect(container.querySelector('ol')).toHaveClass('my-list')
  })

  it('applies classNames.separator to separator lis', () => {
    const { container } = render(
      <Breadcrumb items={items} classNames={{ separator: 'my-sep' }} />
    )
    const seps = container.querySelectorAll('.my-sep')
    expect(seps).toHaveLength(2)
  })

  it('applies classNames.item to item lis', () => {
    const { container } = render(
      <Breadcrumb items={items} classNames={{ item: 'my-item' }} />
    )
    const itemLis = container.querySelectorAll('.my-item')
    expect(itemLis).toHaveLength(3)
  })

  it('applies item-level className', () => {
    const styledItems = [
      { title: 'Styled', href: '/', className: 'item-custom' },
      { title: 'Last' },
    ]
    render(<Breadcrumb items={styledItems} />)
    const link = screen.getByText('Styled')
    expect(link).toHaveClass('item-custom')
  })
})
