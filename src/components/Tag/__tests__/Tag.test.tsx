import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Tag } from '../Tag'

// ============================================================================
// Helpers
// ============================================================================

function getRoot(container: HTMLElement) {
  return container.firstElementChild as HTMLElement
}

function getIconSlot(container: HTMLElement) {
  const root = getRoot(container)
  const children = Array.from(root.children) as HTMLElement[]
  // Icon slot is the first span child that is NOT the content span and NOT the close icon
  return children.find(
    (el) => el.style.fontSize === '0.75rem' && !el.getAttribute('aria-label'),
  ) ?? null
}

function getContentSlot(container: HTMLElement) {
  const root = getRoot(container)
  return (Array.from(root.children).find(
    (el) => (el as HTMLElement).style.display === 'inline-flex' && !(el as HTMLElement).getAttribute('aria-label') && (el as HTMLElement).style.fontSize !== '0.75rem',
  ) as HTMLElement | undefined) ?? null
}

function getCloseIcon(container: HTMLElement) {
  const root = getRoot(container)
  return root.querySelector('[aria-label="close"]') as HTMLElement | null
}

// ============================================================================
// Tag
// ============================================================================

describe('Tag', () => {
  // ============================================================================
  // Basic rendering
  // ============================================================================

  describe('basic rendering', () => {
    it('renders root element', () => {
      const { container } = render(<Tag>Hello</Tag>)
      const root = getRoot(container)
      expect(root).toBeTruthy()
      expect(root.tagName).toBe('SPAN')
    })

    it('renders children text', () => {
      render(<Tag>Hello Tag</Tag>)
      expect(screen.getByText('Hello Tag')).toBeTruthy()
    })

    it('root has inline-flex display', () => {
      const { container } = render(<Tag>Test</Tag>)
      expect(getRoot(container).style.display).toBe('inline-flex')
    })

    it('root has center alignment', () => {
      const { container } = render(<Tag>Test</Tag>)
      expect(getRoot(container).style.alignItems).toBe('center')
    })

    it('root has border-radius', () => {
      const { container } = render(<Tag>Test</Tag>)
      expect(getRoot(container).style.borderRadius).toBe('0.25rem')
    })

    it('root has 0.75rem font size', () => {
      const { container } = render(<Tag>Test</Tag>)
      expect(getRoot(container).style.fontSize).toBe('0.75rem')
    })

    it('root has pointer cursor', () => {
      const { container } = render(<Tag>Test</Tag>)
      expect(getRoot(container).style.cursor).toBe('pointer')
    })

    it('root has nowrap white-space', () => {
      const { container } = render(<Tag>Test</Tag>)
      expect(getRoot(container).style.whiteSpace).toBe('nowrap')
    })
  })

  // ============================================================================
  // Variants
  // ============================================================================

  describe('variants', () => {
    it('outlined is default (transparent bg)', () => {
      const { container } = render(<Tag>Outlined</Tag>)
      expect(getRoot(container).style.backgroundColor).toBe('transparent')
    })

    it('outlined has border', () => {
      const { container } = render(<Tag>Outlined</Tag>)
      expect(getRoot(container).style.border).toContain('1px solid')
    })

    it('filled has non-transparent background', () => {
      const { container } = render(<Tag variant="filled">Filled</Tag>)
      expect(getRoot(container).style.backgroundColor).toBeTruthy()
      expect(getRoot(container).style.backgroundColor).not.toBe('transparent')
    })

    it('filled has transparent border', () => {
      const { container } = render(<Tag variant="filled">Filled</Tag>)
      expect(getRoot(container).style.border).toContain('transparent')
    })

    it('solid has background color', () => {
      const { container } = render(<Tag variant="solid">Solid</Tag>)
      expect(getRoot(container).style.backgroundColor).toBeTruthy()
      expect(getRoot(container).style.backgroundColor).not.toBe('transparent')
    })

    it('solid has white text', () => {
      const { container } = render(<Tag variant="solid">Solid</Tag>)
      expect(getRoot(container).style.color).toBe('rgb(255, 255, 255)')
    })
  })

  // ============================================================================
  // Color presets
  // ============================================================================

  describe('color presets', () => {
    it('status color "success" outlined has color text', () => {
      const { container } = render(<Tag color="success">OK</Tag>)
      expect(getRoot(container).style.color).toBeTruthy()
    })

    it('status color "error" solid has white text', () => {
      const { container } = render(<Tag color="error" variant="solid">Err</Tag>)
      expect(getRoot(container).style.color).toBe('rgb(255, 255, 255)')
    })

    it('decorative color "blue" applies color', () => {
      const { container } = render(<Tag color="blue">Blue</Tag>)
      // Outlined with decorative color → text color is the hex
      expect(getRoot(container).style.color).toBe('rgb(22, 119, 255)')
    })

    it('decorative color "green" applies color', () => {
      const { container } = render(<Tag color="green">Green</Tag>)
      expect(getRoot(container).style.color).toBe('rgb(82, 196, 26)')
    })

    it('custom hex color applies', () => {
      const { container } = render(<Tag color="#ff6600">Custom</Tag>)
      expect(getRoot(container).style.color).toBe('rgb(255, 102, 0)')
    })

    it('filled variant with color has non-transparent bg', () => {
      const { container } = render(<Tag color="primary" variant="filled">Fill</Tag>)
      expect(getRoot(container).style.backgroundColor).not.toBe('transparent')
    })

    it('solid variant with decorative color has white text', () => {
      const { container } = render(<Tag color="purple" variant="solid">Purple</Tag>)
      expect(getRoot(container).style.color).toBe('rgb(255, 255, 255)')
    })
  })

  // ============================================================================
  // Closable
  // ============================================================================

  describe('closable', () => {
    beforeEach(() => {
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    })
    afterEach(() => {
      vi.useRealTimers()
    })

    it('shows close icon when closable', () => {
      const { container } = render(<Tag closable>Close me</Tag>)
      expect(getCloseIcon(container)).toBeTruthy()
    })

    it('no close icon by default', () => {
      const { container } = render(<Tag>No close</Tag>)
      expect(getCloseIcon(container)).toBeNull()
    })

    it('close icon has aria-label "close"', () => {
      const { container } = render(<Tag closable>X</Tag>)
      const icon = getCloseIcon(container)!
      expect(icon.getAttribute('aria-label')).toBe('close')
    })

    it('calls onClose when close icon clicked', () => {
      const onClose = vi.fn()
      const { container } = render(<Tag closable onClose={onClose}>X</Tag>)
      fireEvent.click(getCloseIcon(container)!)
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('tag disappears after close animation', () => {
      const { container } = render(<Tag closable>Bye</Tag>)
      fireEvent.click(getCloseIcon(container)!)
      // Still visible during animation
      expect(getRoot(container)).toBeTruthy()
      act(() => {
        vi.advanceTimersByTime(200)
      })
      // Gone after 200ms
      expect(container.firstElementChild).toBeNull()
    })

    it('close animation plays exit keyframes', () => {
      const { container } = render(<Tag closable>Anim</Tag>)
      fireEvent.click(getCloseIcon(container)!)
      expect(getRoot(container).style.animation).toContain('j-tag-exit')
    })

    it('preventDefault in onClose prevents removal', () => {
      const { container } = render(
        <Tag closable onClose={(e) => e.preventDefault()}>Stay</Tag>,
      )
      fireEvent.click(getCloseIcon(container)!)
      act(() => {
        vi.advanceTimersByTime(300)
      })
      // Still visible because preventDefault
      expect(getRoot(container)).toBeTruthy()
    })

    it('custom close icon', () => {
      const { container } = render(
        <Tag closable closeIcon={<span data-testid="custom-close">×</span>}>X</Tag>,
      )
      expect(screen.getByTestId('custom-close')).toBeTruthy()
    })

    it('close icon opacity is 0.65', () => {
      const { container } = render(<Tag closable>X</Tag>)
      expect(getCloseIcon(container)!.style.opacity).toBe('0.65')
    })

    it('close icon hover sets opacity to 1', () => {
      const { container } = render(<Tag closable>X</Tag>)
      const icon = getCloseIcon(container)!
      fireEvent.mouseEnter(icon)
      expect(icon.style.opacity).toBe('1')
    })

    it('close icon mouse leave resets opacity', () => {
      const { container } = render(<Tag closable>X</Tag>)
      const icon = getCloseIcon(container)!
      fireEvent.mouseEnter(icon)
      fireEvent.mouseLeave(icon)
      expect(icon.style.opacity).toBe('0.65')
    })
  })

  // ============================================================================
  // Icon
  // ============================================================================

  describe('icon', () => {
    it('renders icon slot', () => {
      render(<Tag icon={<span data-testid="tag-icon">★</span>}>Star</Tag>)
      expect(screen.getByTestId('tag-icon')).toBeTruthy()
    })

    it('no icon slot when not provided', () => {
      const { container } = render(<Tag>No Icon</Tag>)
      expect(getIconSlot(container)).toBeNull()
    })
  })

  // ============================================================================
  // Bordered
  // ============================================================================

  describe('bordered', () => {
    it('has visible border by default', () => {
      const { container } = render(<Tag>Bordered</Tag>)
      expect(getRoot(container).style.border).toContain('1px solid')
      expect(getRoot(container).style.border).not.toContain('transparent')
    })

    it('bordered=false has transparent border', () => {
      const { container } = render(<Tag bordered={false}>No border</Tag>)
      expect(getRoot(container).style.border).toContain('transparent')
    })
  })

  // ============================================================================
  // Disabled
  // ============================================================================

  describe('disabled', () => {
    it('has not-allowed cursor when disabled', () => {
      const { container } = render(<Tag disabled>Disabled</Tag>)
      expect(getRoot(container).style.cursor).toBe('not-allowed')
    })

    it('has reduced opacity when disabled', () => {
      const { container } = render(<Tag disabled>Disabled</Tag>)
      expect(getRoot(container).style.opacity).toBe('0.65')
    })

    it('onClick is not called when disabled', () => {
      const onClick = vi.fn()
      const { container } = render(<Tag disabled onClick={onClick}>No click</Tag>)
      fireEvent.click(getRoot(container))
      expect(onClick).not.toHaveBeenCalled()
    })

    it('hover does not change style when disabled', () => {
      const { container } = render(<Tag disabled>No hover</Tag>)
      const root = getRoot(container)
      const bgBefore = root.style.backgroundColor
      fireEvent.mouseEnter(root)
      expect(root.style.backgroundColor).toBe(bgBefore)
    })
  })

  // ============================================================================
  // Link mode
  // ============================================================================

  describe('link mode', () => {
    it('renders as <a> when href is provided', () => {
      const { container } = render(<Tag href="https://example.com">Link</Tag>)
      expect(getRoot(container).tagName).toBe('A')
    })

    it('sets href attribute', () => {
      const { container } = render(<Tag href="https://example.com">Link</Tag>)
      expect(getRoot(container).getAttribute('href')).toBe('https://example.com')
    })

    it('sets target attribute', () => {
      const { container } = render(<Tag href="https://example.com" target="_blank">Link</Tag>)
      expect(getRoot(container).getAttribute('target')).toBe('_blank')
    })

    it('renders as <span> when disabled with href', () => {
      const { container } = render(<Tag href="https://example.com" disabled>No link</Tag>)
      expect(getRoot(container).tagName).toBe('SPAN')
    })

    it('renders as <span> without href', () => {
      const { container } = render(<Tag>Span</Tag>)
      expect(getRoot(container).tagName).toBe('SPAN')
    })
  })

  // ============================================================================
  // onClick
  // ============================================================================

  describe('onClick', () => {
    it('calls onClick on click', () => {
      const onClick = vi.fn()
      const { container } = render(<Tag onClick={onClick}>Click</Tag>)
      fireEvent.click(getRoot(container))
      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('onClick receives mouse event', () => {
      const onClick = vi.fn()
      const { container } = render(<Tag onClick={onClick}>Click</Tag>)
      fireEvent.click(getRoot(container))
      expect(onClick.mock.calls[0][0]).toBeTruthy()
    })
  })

  // ============================================================================
  // Hover effects
  // ============================================================================

  describe('hover effects', () => {
    it('outlined tag changes background on hover', () => {
      const { container } = render(<Tag>Hover</Tag>)
      const root = getRoot(container)
      fireEvent.mouseEnter(root)
      expect(root.style.backgroundColor).toBeTruthy()
    })

    it('outlined tag resets background on leave', () => {
      const { container } = render(<Tag>Hover</Tag>)
      const root = getRoot(container)
      fireEvent.mouseEnter(root)
      fireEvent.mouseLeave(root)
      expect(root.style.backgroundColor).toBe('transparent')
    })

    it('solid tag uses brightness filter on hover', () => {
      const { container } = render(<Tag variant="solid">Solid</Tag>)
      const root = getRoot(container)
      fireEvent.mouseEnter(root)
      expect(root.style.filter).toBe('brightness(1.1)')
    })

    it('solid tag resets filter on leave', () => {
      const { container } = render(<Tag variant="solid">Solid</Tag>)
      const root = getRoot(container)
      fireEvent.mouseEnter(root)
      fireEvent.mouseLeave(root)
      expect(root.style.filter).toBe('')
    })

    it('filled with color uses brightness filter on hover', () => {
      const { container } = render(<Tag variant="filled" color="primary">Fill</Tag>)
      const root = getRoot(container)
      fireEvent.mouseEnter(root)
      expect(root.style.filter).toBe('brightness(1.1)')
    })

    it('custom root styles use brightness(1.15) on hover', () => {
      const { container } = render(
        <Tag styles={{ root: { backgroundColor: 'navy' } }}>Custom</Tag>,
      )
      const root = getRoot(container)
      fireEvent.mouseEnter(root)
      expect(root.style.filter).toBe('brightness(1.15)')
    })
  })

  // ============================================================================
  // Semantic classNames
  // ============================================================================

  describe('semantic classNames', () => {
    it('applies classNames.root', () => {
      const { container } = render(
        <Tag classNames={{ root: 'tag-root' }}>X</Tag>,
      )
      expect(getRoot(container).className).toContain('tag-root')
    })

    it('applies classNames.icon', () => {
      render(
        <Tag icon={<span>★</span>} classNames={{ icon: 'tag-icon' }}>X</Tag>,
      )
      const iconSlot = screen.getByText('★').parentElement!
      expect(iconSlot.className).toContain('tag-icon')
    })

    it('applies classNames.content', () => {
      render(<Tag classNames={{ content: 'tag-content' }}>Text</Tag>)
      const content = screen.getByText('Text').closest('span')!
      expect(content.className).toContain('tag-content')
    })

    it('applies classNames.closeIcon', () => {
      const { container } = render(
        <Tag closable classNames={{ closeIcon: 'tag-close' }}>X</Tag>,
      )
      expect(getCloseIcon(container)!.className).toContain('tag-close')
    })
  })

  // ============================================================================
  // Semantic styles
  // ============================================================================

  describe('semantic styles', () => {
    it('applies styles.root', () => {
      const { container } = render(
        <Tag styles={{ root: { margin: '4px' } }}>X</Tag>,
      )
      expect(getRoot(container).style.margin).toBe('4px')
    })

    it('applies styles.icon', () => {
      render(
        <Tag icon={<span>★</span>} styles={{ icon: { color: 'red' } }}>X</Tag>,
      )
      const iconSlot = screen.getByText('★').parentElement!
      expect(iconSlot.style.color).toBe('red')
    })

    it('applies styles.content', () => {
      render(<Tag styles={{ content: { letterSpacing: '1px' } }}>Txt</Tag>)
      const content = screen.getByText('Txt').closest('span')!
      expect(content.style.letterSpacing).toBe('1px')
    })

    it('applies styles.closeIcon', () => {
      const { container } = render(
        <Tag closable styles={{ closeIcon: { color: 'red' } }}>X</Tag>,
      )
      expect(getCloseIcon(container)!.style.color).toBe('red')
    })
  })

  // ============================================================================
  // className / style
  // ============================================================================

  describe('className / style', () => {
    it('applies className to root', () => {
      const { container } = render(<Tag className="my-tag">X</Tag>)
      expect(getRoot(container).className).toContain('my-tag')
    })

    it('applies style to root', () => {
      const { container } = render(<Tag style={{ maxWidth: '100px' }}>X</Tag>)
      expect(getRoot(container).style.maxWidth).toBe('100px')
    })
  })

  // ============================================================================
  // Enter animation
  // ============================================================================

  describe('animation', () => {
    it('tag has enter animation on mount', () => {
      const { container } = render(<Tag>Animated</Tag>)
      expect(getRoot(container).style.animation).toContain('j-tag-enter')
    })
  })

  // ============================================================================
  // Compound export
  // ============================================================================

  describe('compound export', () => {
    it('Tag.CheckableTag is defined', () => {
      expect(Tag.CheckableTag).toBeDefined()
      expect(typeof Tag.CheckableTag).toBe('function')
    })

    it('Tag.SpinnerIcon is defined', () => {
      expect(Tag.SpinnerIcon).toBeDefined()
      expect(typeof Tag.SpinnerIcon).toBe('function')
    })
  })

  // ============================================================================
  // Edge cases
  // ============================================================================

  describe('edge cases', () => {
    it('renders with no children', () => {
      const { container } = render(<Tag />)
      expect(getRoot(container)).toBeTruthy()
    })

    it('renders ReactNode as children', () => {
      render(<Tag><strong data-testid="strong-child">Bold</strong></Tag>)
      expect(screen.getByTestId('strong-child')).toBeTruthy()
    })

    it('close click stopPropagation does not trigger tag onClick', () => {
      const onClick = vi.fn()
      const { container } = render(<Tag closable onClick={onClick}>X</Tag>)
      fireEvent.click(getCloseIcon(container)!)
      expect(onClick).not.toHaveBeenCalled()
    })

    it('user-select is none', () => {
      const { container } = render(<Tag>Test</Tag>)
      expect(getRoot(container).style.userSelect).toBe('none')
    })

    it('text-decoration is none', () => {
      const { container } = render(<Tag>Test</Tag>)
      expect(getRoot(container).style.textDecoration).toBe('none')
    })
  })
})

// ============================================================================
// Tag.CheckableTag
// ============================================================================

describe('Tag.CheckableTag', () => {
  // ============================================================================
  // Basic rendering
  // ============================================================================

  describe('basic rendering', () => {
    it('renders root element', () => {
      const { container } = render(<Tag.CheckableTag>Check</Tag.CheckableTag>)
      const root = getRoot(container)
      expect(root).toBeTruthy()
      expect(root.tagName).toBe('SPAN')
    })

    it('renders children text', () => {
      render(<Tag.CheckableTag>Label</Tag.CheckableTag>)
      expect(screen.getByText('Label')).toBeTruthy()
    })

    it('root has inline-flex display', () => {
      const { container } = render(<Tag.CheckableTag>X</Tag.CheckableTag>)
      expect(getRoot(container).style.display).toBe('inline-flex')
    })

    it('root has 0.75rem font size', () => {
      const { container } = render(<Tag.CheckableTag>X</Tag.CheckableTag>)
      expect(getRoot(container).style.fontSize).toBe('0.75rem')
    })

    it('root has pointer cursor', () => {
      const { container } = render(<Tag.CheckableTag>X</Tag.CheckableTag>)
      expect(getRoot(container).style.cursor).toBe('pointer')
    })
  })

  // ============================================================================
  // Checked / unchecked
  // ============================================================================

  describe('checked / unchecked', () => {
    it('unchecked has transparent background', () => {
      const { container } = render(<Tag.CheckableTag>Off</Tag.CheckableTag>)
      expect(getRoot(container).style.backgroundColor).toBe('transparent')
    })

    it('checked has non-transparent background', () => {
      const { container } = render(<Tag.CheckableTag checked>On</Tag.CheckableTag>)
      expect(getRoot(container).style.backgroundColor).not.toBe('transparent')
      expect(getRoot(container).style.backgroundColor).toBeTruthy()
    })

    it('checked has white text', () => {
      const { container } = render(<Tag.CheckableTag checked>On</Tag.CheckableTag>)
      expect(getRoot(container).style.color).toBe('rgb(255, 255, 255)')
    })

    it('unchecked has default text color', () => {
      const { container } = render(<Tag.CheckableTag>Off</Tag.CheckableTag>)
      expect(getRoot(container).style.color).toBeTruthy()
      expect(getRoot(container).style.color).not.toBe('rgb(255, 255, 255)')
    })
  })

  // ============================================================================
  // onChange
  // ============================================================================

  describe('onChange', () => {
    it('calls onChange with true when clicking unchecked', () => {
      const onChange = vi.fn()
      const { container } = render(
        <Tag.CheckableTag onChange={onChange}>Toggle</Tag.CheckableTag>,
      )
      fireEvent.click(getRoot(container))
      expect(onChange).toHaveBeenCalledWith(true)
    })

    it('calls onChange with false when clicking checked', () => {
      const onChange = vi.fn()
      const { container } = render(
        <Tag.CheckableTag checked onChange={onChange}>Toggle</Tag.CheckableTag>,
      )
      fireEvent.click(getRoot(container))
      expect(onChange).toHaveBeenCalledWith(false)
    })
  })

  // ============================================================================
  // Disabled
  // ============================================================================

  describe('disabled', () => {
    it('has not-allowed cursor when disabled', () => {
      const { container } = render(
        <Tag.CheckableTag disabled>Disabled</Tag.CheckableTag>,
      )
      expect(getRoot(container).style.cursor).toBe('not-allowed')
    })

    it('has reduced opacity when disabled', () => {
      const { container } = render(
        <Tag.CheckableTag disabled>Disabled</Tag.CheckableTag>,
      )
      expect(getRoot(container).style.opacity).toBe('0.65')
    })

    it('does not call onChange when disabled', () => {
      const onChange = vi.fn()
      const { container } = render(
        <Tag.CheckableTag disabled onChange={onChange}>No</Tag.CheckableTag>,
      )
      fireEvent.click(getRoot(container))
      expect(onChange).not.toHaveBeenCalled()
    })

    it('hover does not change style when disabled', () => {
      const { container } = render(
        <Tag.CheckableTag disabled>No hover</Tag.CheckableTag>,
      )
      const root = getRoot(container)
      const bgBefore = root.style.backgroundColor
      fireEvent.mouseEnter(root)
      expect(root.style.backgroundColor).toBe(bgBefore)
    })
  })

  // ============================================================================
  // CheckableTag color
  // ============================================================================

  describe('color', () => {
    it('checked with custom color applies that color as bg', () => {
      const { container } = render(
        <Tag.CheckableTag checked color="success">Ok</Tag.CheckableTag>,
      )
      expect(getRoot(container).style.backgroundColor).toBeTruthy()
      expect(getRoot(container).style.backgroundColor).not.toBe('transparent')
    })

    it('checked with decorative color', () => {
      const { container } = render(
        <Tag.CheckableTag checked color="blue">Blue</Tag.CheckableTag>,
      )
      expect(getRoot(container).style.backgroundColor).toBe('rgb(22, 119, 255)')
    })

    it('unchecked ignores color for background', () => {
      const { container } = render(
        <Tag.CheckableTag color="success">Off</Tag.CheckableTag>,
      )
      expect(getRoot(container).style.backgroundColor).toBe('transparent')
    })
  })

  // ============================================================================
  // CheckableTag hover
  // ============================================================================

  describe('hover', () => {
    it('unchecked hover changes background', () => {
      const { container } = render(<Tag.CheckableTag>Hover</Tag.CheckableTag>)
      const root = getRoot(container)
      fireEvent.mouseEnter(root)
      expect(root.style.backgroundColor).toBeTruthy()
    })

    it('checked hover uses brightness filter', () => {
      const { container } = render(
        <Tag.CheckableTag checked>Hover</Tag.CheckableTag>,
      )
      const root = getRoot(container)
      fireEvent.mouseEnter(root)
      expect(root.style.filter).toBe('brightness(1.1)')
    })

    it('checked hover resets filter on leave', () => {
      const { container } = render(
        <Tag.CheckableTag checked>Hover</Tag.CheckableTag>,
      )
      const root = getRoot(container)
      fireEvent.mouseEnter(root)
      fireEvent.mouseLeave(root)
      expect(root.style.filter).toBe('')
    })

    it('unchecked hover resets bg on leave', () => {
      const { container } = render(<Tag.CheckableTag>Hover</Tag.CheckableTag>)
      const root = getRoot(container)
      fireEvent.mouseEnter(root)
      fireEvent.mouseLeave(root)
      expect(root.style.backgroundColor).toBe('transparent')
    })

    it('custom root styles use brightness(1.15) on hover', () => {
      const { container } = render(
        <Tag.CheckableTag styles={{ root: { backgroundColor: 'navy' } }}>Custom</Tag.CheckableTag>,
      )
      const root = getRoot(container)
      fireEvent.mouseEnter(root)
      expect(root.style.filter).toBe('brightness(1.15)')
    })
  })

  // ============================================================================
  // CheckableTag semantic classNames
  // ============================================================================

  describe('semantic classNames', () => {
    it('applies classNames.root', () => {
      const { container } = render(
        <Tag.CheckableTag classNames={{ root: 'ct-root' }}>X</Tag.CheckableTag>,
      )
      expect(getRoot(container).className).toContain('ct-root')
    })

    it('applies classNames.content', () => {
      render(
        <Tag.CheckableTag classNames={{ content: 'ct-content' }}>Text</Tag.CheckableTag>,
      )
      const content = screen.getByText('Text').closest('span')!
      expect(content.className).toContain('ct-content')
    })
  })

  // ============================================================================
  // CheckableTag semantic styles
  // ============================================================================

  describe('semantic styles', () => {
    it('applies styles.root', () => {
      const { container } = render(
        <Tag.CheckableTag styles={{ root: { margin: '2px' } }}>X</Tag.CheckableTag>,
      )
      expect(getRoot(container).style.margin).toBe('2px')
    })

    it('applies styles.content', () => {
      render(
        <Tag.CheckableTag styles={{ content: { fontWeight: '700' } }}>Txt</Tag.CheckableTag>,
      )
      const content = screen.getByText('Txt').closest('span')!
      expect(content.style.fontWeight).toBe('700')
    })
  })

  // ============================================================================
  // CheckableTag className / style
  // ============================================================================

  describe('className / style', () => {
    it('applies className', () => {
      const { container } = render(
        <Tag.CheckableTag className="my-ct">X</Tag.CheckableTag>,
      )
      expect(getRoot(container).className).toContain('my-ct')
    })

    it('applies style', () => {
      const { container } = render(
        <Tag.CheckableTag style={{ maxWidth: '80px' }}>X</Tag.CheckableTag>,
      )
      expect(getRoot(container).style.maxWidth).toBe('80px')
    })
  })

  // ============================================================================
  // CheckableTag edge cases
  // ============================================================================

  describe('edge cases', () => {
    it('renders with no children', () => {
      const { container } = render(<Tag.CheckableTag />)
      expect(getRoot(container)).toBeTruthy()
    })

    it('user-select is none', () => {
      const { container } = render(<Tag.CheckableTag>X</Tag.CheckableTag>)
      expect(getRoot(container).style.userSelect).toBe('none')
    })

    it('has border-radius 0.25rem', () => {
      const { container } = render(<Tag.CheckableTag>X</Tag.CheckableTag>)
      expect(getRoot(container).style.borderRadius).toBe('0.25rem')
    })
  })
})
