import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Toggle } from '../Toggle'

// ============================================================================
// ResizeObserver mock (jsdom has no ResizeObserver)
// ============================================================================

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
})

// ============================================================================
// Helpers
// ============================================================================

function getRoot(container: HTMLElement) {
  return container.firstElementChild as HTMLElement
}

function getItems(container: HTMLElement) {
  return Array.from(getRoot(container).querySelectorAll('[role="radio"]')) as HTMLElement[]
}

function getThumb(container: HTMLElement) {
  // Thumb is the first child of root (before the radio items), has no role attribute
  const root = getRoot(container)
  return Array.from(root.children).find(
    (el) => !el.getAttribute('role'),
  ) as HTMLElement | null
}

function getRadioInputs(container: HTMLElement) {
  return Array.from(getRoot(container).querySelectorAll('input[type="radio"]')) as HTMLInputElement[]
}

// ============================================================================
// Basic rendering
// ============================================================================

describe('Toggle', () => {
  describe('basic rendering', () => {
    it('renders root element', () => {
      const { container } = render(<Toggle options={['A', 'B', 'C']} />)
      const root = getRoot(container)
      expect(root).toBeTruthy()
      expect(root.tagName).toBe('DIV')
    })

    it('root has radiogroup role', () => {
      const { container } = render(<Toggle options={['A', 'B', 'C']} />)
      expect(getRoot(container).getAttribute('role')).toBe('radiogroup')
    })

    it('renders correct number of items', () => {
      const { container } = render(<Toggle options={['A', 'B', 'C']} />)
      expect(getItems(container)).toHaveLength(3)
    })

    it('items have radio role', () => {
      const { container } = render(<Toggle options={['A', 'B']} />)
      const items = getItems(container)
      items.forEach((item) => {
        expect(item.getAttribute('role')).toBe('radio')
      })
    })

    it('renders thumb element', () => {
      const { container } = render(<Toggle options={['A', 'B']} />)
      expect(getThumb(container)).toBeTruthy()
    })

    it('root has inline-flex display by default', () => {
      const { container } = render(<Toggle options={['A', 'B']} />)
      expect(getRoot(container).style.display).toBe('inline-flex')
    })

    it('root has relative position', () => {
      const { container } = render(<Toggle options={['A', 'B']} />)
      expect(getRoot(container).style.position).toBe('relative')
    })
  })

  // ============================================================================
  // Options normalization
  // ============================================================================

  describe('options normalization', () => {
    it('renders string options as labels', () => {
      render(<Toggle options={['Foo', 'Bar']} />)
      expect(screen.getByText('Foo')).toBeTruthy()
      expect(screen.getByText('Bar')).toBeTruthy()
    })

    it('renders number options as labels', () => {
      render(<Toggle options={[1, 2, 3]} />)
      expect(screen.getByText('1')).toBeTruthy()
      expect(screen.getByText('2')).toBeTruthy()
      expect(screen.getByText('3')).toBeTruthy()
    })

    it('renders object options with label', () => {
      render(
        <Toggle options={[{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Beta' }]} />,
      )
      expect(screen.getByText('Alpha')).toBeTruthy()
      expect(screen.getByText('Beta')).toBeTruthy()
    })

    it('renders object options with value as label fallback', () => {
      render(<Toggle options={[{ value: 'fallback' }]} />)
      expect(screen.getByText('fallback')).toBeTruthy()
    })

    it('renders icon in option', () => {
      const icon = <span data-testid="my-icon">★</span>
      render(<Toggle options={[{ value: 'a', icon, label: 'Star' }]} />)
      expect(screen.getByTestId('my-icon')).toBeTruthy()
    })

    it('icon-only option does not render value as label', () => {
      const icon = <span data-testid="icon-only">★</span>
      const { container } = render(<Toggle options={[{ value: 'x', icon }]} />)
      const items = getItems(container)
      // Should have icon but no span with text "x"
      expect(items[0].querySelector('[data-testid="icon-only"]')).toBeTruthy()
      expect(screen.queryByText('x')).toBeNull()
    })

    it('applies item className from option', () => {
      const { container } = render(
        <Toggle options={[{ value: 'a', label: 'A', className: 'custom-item' }]} />,
      )
      const items = getItems(container)
      expect(items[0].className).toContain('custom-item')
    })
  })

  // ============================================================================
  // Controlled mode
  // ============================================================================

  describe('controlled mode', () => {
    it('selects the controlled value', () => {
      const { container } = render(<Toggle options={['A', 'B', 'C']} value="B" />)
      const items = getItems(container)
      expect(items[1].getAttribute('aria-checked')).toBe('true')
    })

    it('non-selected items have aria-checked false', () => {
      const { container } = render(<Toggle options={['A', 'B', 'C']} value="B" />)
      const items = getItems(container)
      expect(items[0].getAttribute('aria-checked')).toBe('false')
      expect(items[2].getAttribute('aria-checked')).toBe('false')
    })

    it('calls onChange when item is clicked', () => {
      const onChange = vi.fn()
      render(<Toggle options={['A', 'B', 'C']} value="A" onChange={onChange} />)
      fireEvent.click(screen.getByText('B'))
      expect(onChange).toHaveBeenCalledWith('B')
    })

    it('does not call onChange when clicking already selected', () => {
      const onChange = vi.fn()
      render(<Toggle options={['A', 'B']} value="A" onChange={onChange} />)
      fireEvent.click(screen.getByText('A'))
      expect(onChange).not.toHaveBeenCalled()
    })

    it('selected item has tabIndex 0', () => {
      const { container } = render(<Toggle options={['A', 'B']} value="A" />)
      const items = getItems(container)
      expect(items[0].tabIndex).toBe(0)
    })

    it('non-selected items have tabIndex -1', () => {
      const { container } = render(<Toggle options={['A', 'B']} value="A" />)
      const items = getItems(container)
      expect(items[1].tabIndex).toBe(-1)
    })
  })

  // ============================================================================
  // Uncontrolled mode
  // ============================================================================

  describe('uncontrolled mode', () => {
    it('selects first option by default', () => {
      const { container } = render(<Toggle options={['A', 'B', 'C']} />)
      const items = getItems(container)
      expect(items[0].getAttribute('aria-checked')).toBe('true')
    })

    it('uses defaultValue when provided', () => {
      const { container } = render(<Toggle options={['A', 'B', 'C']} defaultValue="C" />)
      const items = getItems(container)
      expect(items[2].getAttribute('aria-checked')).toBe('true')
    })

    it('updates selection on click', () => {
      const { container } = render(<Toggle options={['A', 'B', 'C']} />)
      fireEvent.click(screen.getByText('B'))
      const items = getItems(container)
      expect(items[1].getAttribute('aria-checked')).toBe('true')
      expect(items[0].getAttribute('aria-checked')).toBe('false')
    })

    it('calls onChange in uncontrolled mode', () => {
      const onChange = vi.fn()
      render(<Toggle options={['A', 'B']} onChange={onChange} />)
      fireEvent.click(screen.getByText('B'))
      expect(onChange).toHaveBeenCalledWith('B')
    })
  })

  // ============================================================================
  // Size variants
  // ============================================================================

  describe('size variants', () => {
    it('middle size by default', () => {
      const { container } = render(<Toggle options={['A', 'B']} />)
      const item = getItems(container)[0]
      expect(item.style.fontSize).toBe('0.875rem')
    })

    it('small size', () => {
      const { container } = render(<Toggle options={['A', 'B']} size="small" />)
      const item = getItems(container)[0]
      expect(item.style.fontSize).toBe('0.75rem')
    })

    it('large size', () => {
      const { container } = render(<Toggle options={['A', 'B']} size="large" />)
      const item = getItems(container)[0]
      expect(item.style.fontSize).toBe('1rem')
    })

    it('small root has smaller border radius', () => {
      const { container } = render(<Toggle options={['A', 'B']} size="small" />)
      expect(getRoot(container).style.borderRadius).toBe('0.375rem')
    })

    it('large root has standard border radius', () => {
      const { container } = render(<Toggle options={['A', 'B']} size="large" />)
      expect(getRoot(container).style.borderRadius).toBe('0.5rem')
    })
  })

  // ============================================================================
  // Block mode
  // ============================================================================

  describe('block mode', () => {
    it('root has flex display when block', () => {
      const { container } = render(<Toggle options={['A', 'B']} block />)
      expect(getRoot(container).style.display).toBe('flex')
    })

    it('root has 100% width when block', () => {
      const { container } = render(<Toggle options={['A', 'B']} block />)
      expect(getRoot(container).style.width).toBe('100%')
    })

    it('items have flex 1 in block mode', () => {
      const { container } = render(<Toggle options={['A', 'B']} block />)
      const items = getItems(container)
      items.forEach((item) => {
        expect(item.style.flex).toContain('1')
      })
    })
  })

  // ============================================================================
  // Vertical mode
  // ============================================================================

  describe('vertical mode', () => {
    it('root has column flex direction', () => {
      const { container } = render(<Toggle options={['A', 'B']} vertical />)
      expect(getRoot(container).style.flexDirection).toBe('column')
    })

    it('root has 100% width when vertical', () => {
      const { container } = render(<Toggle options={['A', 'B']} vertical />)
      expect(getRoot(container).style.width).toBe('100%')
    })

    it('root has flex display when vertical', () => {
      const { container } = render(<Toggle options={['A', 'B']} vertical />)
      expect(getRoot(container).style.display).toBe('flex')
    })
  })

  // ============================================================================
  // Disabled
  // ============================================================================

  describe('disabled', () => {
    it('root has reduced opacity when disabled', () => {
      const { container } = render(<Toggle options={['A', 'B']} disabled />)
      expect(getRoot(container).style.opacity).toBe('0.5')
    })

    it('root has not-allowed cursor when disabled', () => {
      const { container } = render(<Toggle options={['A', 'B']} disabled />)
      expect(getRoot(container).style.cursor).toBe('not-allowed')
    })

    it('does not call onChange when globally disabled', () => {
      const onChange = vi.fn()
      render(<Toggle options={['A', 'B']} disabled onChange={onChange} />)
      fireEvent.click(screen.getByText('B'))
      expect(onChange).not.toHaveBeenCalled()
    })

    it('items have aria-disabled when globally disabled', () => {
      const { container } = render(<Toggle options={['A', 'B']} disabled />)
      const items = getItems(container)
      items.forEach((item) => {
        expect(item.getAttribute('aria-disabled')).toBe('true')
      })
    })

    it('per-item disabled prevents click', () => {
      const onChange = vi.fn()
      render(
        <Toggle
          options={[
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B', disabled: true },
          ]}
          onChange={onChange}
        />,
      )
      fireEvent.click(screen.getByText('B'))
      expect(onChange).not.toHaveBeenCalled()
    })

    it('per-item disabled has aria-disabled', () => {
      const { container } = render(
        <Toggle
          options={[
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B', disabled: true },
          ]}
        />,
      )
      const items = getItems(container)
      expect(items[0].getAttribute('aria-disabled')).toBeNull()
      expect(items[1].getAttribute('aria-disabled')).toBe('true')
    })

    it('per-item disabled has reduced opacity', () => {
      const { container } = render(
        <Toggle
          options={[
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B', disabled: true },
          ]}
        />,
      )
      const items = getItems(container)
      expect(items[1].style.opacity).toBe('0.5')
    })

    it('per-item disabled has not-allowed cursor', () => {
      const { container } = render(
        <Toggle
          options={[
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B', disabled: true },
          ]}
        />,
      )
      const items = getItems(container)
      expect(items[1].style.cursor).toBe('not-allowed')
    })
  })

  // ============================================================================
  // Name / form integration
  // ============================================================================

  describe('name / form integration', () => {
    it('renders hidden radio inputs when name is provided', () => {
      const { container } = render(<Toggle options={['A', 'B']} name="toggle-field" />)
      const inputs = getRadioInputs(container)
      expect(inputs).toHaveLength(2)
    })

    it('radio inputs have the correct name', () => {
      const { container } = render(<Toggle options={['A', 'B']} name="field" />)
      const inputs = getRadioInputs(container)
      inputs.forEach((input) => {
        expect(input.name).toBe('field')
      })
    })

    it('selected radio input is checked', () => {
      const { container } = render(<Toggle options={['A', 'B']} name="field" value="B" />)
      const inputs = getRadioInputs(container)
      expect(inputs[0].checked).toBe(false)
      expect(inputs[1].checked).toBe(true)
    })

    it('radio inputs have correct values', () => {
      const { container } = render(<Toggle options={['A', 'B']} name="field" />)
      const inputs = getRadioInputs(container)
      expect(inputs[0].value).toBe('A')
      expect(inputs[1].value).toBe('B')
    })

    it('no radio inputs without name prop', () => {
      const { container } = render(<Toggle options={['A', 'B']} />)
      expect(getRadioInputs(container)).toHaveLength(0)
    })

    it('radio inputs are visually hidden', () => {
      const { container } = render(<Toggle options={['A', 'B']} name="field" />)
      const input = getRadioInputs(container)[0]
      expect(input.style.position).toBe('absolute')
      expect(input.style.opacity).toBe('0')
    })

    it('disabled item has disabled radio input', () => {
      const { container } = render(
        <Toggle
          options={[
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B', disabled: true },
          ]}
          name="field"
        />,
      )
      const inputs = getRadioInputs(container)
      expect(inputs[0].disabled).toBe(false)
      expect(inputs[1].disabled).toBe(true)
    })
  })

  // ============================================================================
  // Arrow key navigation
  // ============================================================================

  describe('arrow key navigation', () => {
    it('ArrowRight moves to next item', () => {
      const onChange = vi.fn()
      const { container } = render(<Toggle options={['A', 'B', 'C']} onChange={onChange} />)
      const items = getItems(container)
      fireEvent.keyDown(items[0], { key: 'ArrowRight' })
      expect(onChange).toHaveBeenCalledWith('B')
    })

    it('ArrowLeft moves to previous item', () => {
      const onChange = vi.fn()
      const { container } = render(<Toggle options={['A', 'B', 'C']} value="B" onChange={onChange} />)
      const items = getItems(container)
      fireEvent.keyDown(items[1], { key: 'ArrowLeft' })
      expect(onChange).toHaveBeenCalledWith('A')
    })

    it('ArrowRight wraps from last to first', () => {
      const onChange = vi.fn()
      const { container } = render(<Toggle options={['A', 'B', 'C']} value="C" onChange={onChange} />)
      const items = getItems(container)
      fireEvent.keyDown(items[2], { key: 'ArrowRight' })
      expect(onChange).toHaveBeenCalledWith('A')
    })

    it('ArrowLeft wraps from first to last', () => {
      const onChange = vi.fn()
      const { container } = render(<Toggle options={['A', 'B', 'C']} value="A" onChange={onChange} />)
      const items = getItems(container)
      fireEvent.keyDown(items[0], { key: 'ArrowLeft' })
      expect(onChange).toHaveBeenCalledWith('C')
    })

    it('ArrowDown moves to next in vertical mode', () => {
      const onChange = vi.fn()
      const { container } = render(<Toggle options={['A', 'B', 'C']} vertical onChange={onChange} />)
      const items = getItems(container)
      fireEvent.keyDown(items[0], { key: 'ArrowDown' })
      expect(onChange).toHaveBeenCalledWith('B')
    })

    it('ArrowUp moves to previous in vertical mode', () => {
      const onChange = vi.fn()
      const { container } = render(<Toggle options={['A', 'B', 'C']} value="B" vertical onChange={onChange} />)
      const items = getItems(container)
      fireEvent.keyDown(items[1], { key: 'ArrowUp' })
      expect(onChange).toHaveBeenCalledWith('A')
    })

    it('skips disabled items when navigating', () => {
      const onChange = vi.fn()
      const { container } = render(
        <Toggle
          options={[
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B', disabled: true },
            { value: 'c', label: 'C' },
          ]}
          value="a"
          onChange={onChange}
        />,
      )
      const items = getItems(container)
      fireEvent.keyDown(items[0], { key: 'ArrowRight' })
      expect(onChange).toHaveBeenCalledWith('c')
    })

    it('ArrowLeft/ArrowRight ignored in vertical mode', () => {
      const onChange = vi.fn()
      const { container } = render(<Toggle options={['A', 'B']} vertical onChange={onChange} />)
      const items = getItems(container)
      fireEvent.keyDown(items[0], { key: 'ArrowRight' })
      expect(onChange).not.toHaveBeenCalled()
    })

    it('ArrowUp/ArrowDown ignored in horizontal mode', () => {
      const onChange = vi.fn()
      const { container } = render(<Toggle options={['A', 'B']} onChange={onChange} />)
      const items = getItems(container)
      fireEvent.keyDown(items[0], { key: 'ArrowDown' })
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  // ============================================================================
  // Keyboard selection
  // ============================================================================

  describe('keyboard selection', () => {
    it('Enter selects an item', () => {
      const onChange = vi.fn()
      const { container } = render(<Toggle options={['A', 'B']} value="A" onChange={onChange} />)
      const items = getItems(container)
      fireEvent.keyDown(items[1], { key: 'Enter' })
      expect(onChange).toHaveBeenCalledWith('B')
    })

    it('Space selects an item', () => {
      const onChange = vi.fn()
      const { container } = render(<Toggle options={['A', 'B']} value="A" onChange={onChange} />)
      const items = getItems(container)
      fireEvent.keyDown(items[1], { key: ' ' })
      expect(onChange).toHaveBeenCalledWith('B')
    })

    it('Enter does not fire for already selected item', () => {
      const onChange = vi.fn()
      const { container } = render(<Toggle options={['A', 'B']} value="A" onChange={onChange} />)
      const items = getItems(container)
      fireEvent.keyDown(items[0], { key: 'Enter' })
      expect(onChange).not.toHaveBeenCalled()
    })

    it('Enter does not fire for disabled item', () => {
      const onChange = vi.fn()
      const { container } = render(
        <Toggle
          options={[
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B', disabled: true },
          ]}
          value="a"
          onChange={onChange}
        />,
      )
      const items = getItems(container)
      fireEvent.keyDown(items[1], { key: 'Enter' })
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  // ============================================================================
  // Hover effects
  // ============================================================================

  describe('hover effects', () => {
    it('mouseEnter on non-selected item changes color', () => {
      const { container } = render(<Toggle options={['A', 'B']} value="A" />)
      const items = getItems(container)
      const nonSelected = items[1]
      fireEvent.mouseEnter(nonSelected)
      expect(nonSelected.style.color).toBeTruthy()
    })

    it('mouseLeave on non-selected item resets color', () => {
      const { container } = render(<Toggle options={['A', 'B']} value="A" />)
      const items = getItems(container)
      const nonSelected = items[1]
      fireEvent.mouseEnter(nonSelected)
      fireEvent.mouseLeave(nonSelected)
      // After leave, color reverts to muted
      expect(nonSelected.style.color).toBeTruthy()
    })

    it('mouseEnter on selected item does not change style', () => {
      const { container } = render(<Toggle options={['A', 'B']} value="A" />)
      const items = getItems(container)
      const selected = items[0]
      const colorBefore = selected.style.color
      fireEvent.mouseEnter(selected)
      expect(selected.style.color).toBe(colorBefore)
    })

    it('mouseEnter on disabled item does not change style', () => {
      const { container } = render(
        <Toggle
          options={[
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B', disabled: true },
          ]}
        />,
      )
      const items = getItems(container)
      const disabledItem = items[1]
      const colorBefore = disabledItem.style.color
      fireEvent.mouseEnter(disabledItem)
      expect(disabledItem.style.color).toBe(colorBefore)
    })

    it('custom item colors use brightness filter on hover', () => {
      const { container } = render(
        <Toggle
          options={['A', 'B']}
          value="A"
          styles={{ item: { backgroundColor: 'navy' } }}
        />,
      )
      const items = getItems(container)
      fireEvent.mouseEnter(items[1])
      expect(items[1].style.filter).toBe('brightness(1.15)')
    })

    it('custom item colors reset filter on leave', () => {
      const { container } = render(
        <Toggle
          options={['A', 'B']}
          value="A"
          styles={{ item: { backgroundColor: 'navy' } }}
        />,
      )
      const items = getItems(container)
      fireEvent.mouseEnter(items[1])
      fireEvent.mouseLeave(items[1])
      expect(items[1].style.filter).toBe('')
    })
  })

  // ============================================================================
  // Thumb element
  // ============================================================================

  describe('thumb', () => {
    it('renders a thumb div', () => {
      const { container } = render(<Toggle options={['A', 'B']} />)
      const thumb = getThumb(container)
      expect(thumb).toBeTruthy()
      expect(thumb!.tagName).toBe('DIV')
    })

    it('thumb has pointer-events none', () => {
      const { container } = render(<Toggle options={['A', 'B']} />)
      const thumb = getThumb(container)!
      // Thumb style is set via state — in jsdom without real layout
      // offsetLeft/offsetWidth = 0, so thumb still gets position set
      expect(thumb.style.pointerEvents).toBe('none')
    })
  })

  // ============================================================================
  // Semantic classNames
  // ============================================================================

  describe('semantic classNames', () => {
    it('applies classNames.root', () => {
      const { container } = render(
        <Toggle options={['A', 'B']} classNames={{ root: 'toggle-root' }} />,
      )
      expect(getRoot(container).className).toContain('toggle-root')
    })

    it('applies classNames.item to all items', () => {
      const { container } = render(
        <Toggle options={['A', 'B']} classNames={{ item: 'toggle-item' }} />,
      )
      const items = getItems(container)
      items.forEach((item) => {
        expect(item.className).toContain('toggle-item')
      })
    })

    it('applies classNames.thumb', () => {
      const { container } = render(
        <Toggle options={['A', 'B']} classNames={{ thumb: 'toggle-thumb' }} />,
      )
      expect(getThumb(container)!.className).toContain('toggle-thumb')
    })
  })

  // ============================================================================
  // Semantic styles
  // ============================================================================

  describe('semantic styles', () => {
    it('applies styles.root', () => {
      const { container } = render(
        <Toggle options={['A', 'B']} styles={{ root: { margin: '1rem' } }} />,
      )
      expect(getRoot(container).style.margin).toBe('1rem')
    })

    it('applies styles.item', () => {
      const { container } = render(
        <Toggle options={['A', 'B']} styles={{ item: { letterSpacing: '2px' } }} />,
      )
      const items = getItems(container)
      items.forEach((item) => {
        expect(item.style.letterSpacing).toBe('2px')
      })
    })

    it('applies styles.thumb', () => {
      const { container } = render(
        <Toggle options={['A', 'B']} styles={{ thumb: { boxShadow: '0 0 5px red' } }} />,
      )
      expect(getThumb(container)!.style.boxShadow).toBe('0 0 5px red')
    })
  })

  // ============================================================================
  // className / style
  // ============================================================================

  describe('className / style', () => {
    it('applies className to root', () => {
      const { container } = render(<Toggle options={['A', 'B']} className="my-toggle" />)
      expect(getRoot(container).className).toContain('my-toggle')
    })

    it('applies style to root', () => {
      const { container } = render(
        <Toggle options={['A', 'B']} style={{ maxWidth: '300px' }} />,
      )
      expect(getRoot(container).style.maxWidth).toBe('300px')
    })
  })

  // ============================================================================
  // Selected item styling
  // ============================================================================

  describe('selected item styling', () => {
    it('selected item has font-weight 600', () => {
      const { container } = render(<Toggle options={['A', 'B']} value="A" />)
      const items = getItems(container)
      expect(items[0].style.fontWeight).toBe('600')
    })

    it('non-selected item has font-weight 400', () => {
      const { container } = render(<Toggle options={['A', 'B']} value="A" />)
      const items = getItems(container)
      expect(items[1].style.fontWeight).toBe('400')
    })

    it('items have pointer cursor when not disabled', () => {
      const { container } = render(<Toggle options={['A', 'B']} />)
      const items = getItems(container)
      items.forEach((item) => {
        expect(item.style.cursor).toBe('pointer')
      })
    })

    it('items have nowrap white-space', () => {
      const { container } = render(<Toggle options={['A', 'B']} />)
      const items = getItems(container)
      items.forEach((item) => {
        expect(item.style.whiteSpace).toBe('nowrap')
      })
    })
  })

  // ============================================================================
  // Edge cases
  // ============================================================================

  describe('edge cases', () => {
    it('renders with single option', () => {
      const { container } = render(<Toggle options={['Only']} />)
      expect(getItems(container)).toHaveLength(1)
    })

    it('renders with number values', () => {
      const onChange = vi.fn()
      render(<Toggle options={[1, 2, 3]} value={1} onChange={onChange} />)
      fireEvent.click(screen.getByText('2'))
      expect(onChange).toHaveBeenCalledWith(2)
    })

    it('mixed string and object options', () => {
      render(
        <Toggle options={['A', { value: 'b', label: 'Beta' }, 'C']} />,
      )
      expect(screen.getByText('A')).toBeTruthy()
      expect(screen.getByText('Beta')).toBeTruthy()
      expect(screen.getByText('C')).toBeTruthy()
    })

    it('items have inline-flex display', () => {
      const { container } = render(<Toggle options={['A', 'B']} />)
      const items = getItems(container)
      items.forEach((item) => {
        expect(item.style.display).toBe('inline-flex')
      })
    })

    it('items have center alignment', () => {
      const { container } = render(<Toggle options={['A', 'B']} />)
      const items = getItems(container)
      items.forEach((item) => {
        expect(item.style.alignItems).toBe('center')
        expect(item.style.justifyContent).toBe('center')
      })
    })

    it('block + vertical does not duplicate width', () => {
      const { container } = render(<Toggle options={['A', 'B']} block vertical />)
      expect(getRoot(container).style.width).toBe('100%')
    })
  })
})
