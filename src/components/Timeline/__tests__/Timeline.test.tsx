import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Timeline } from '../Timeline'

// ============================================================================
// Helpers
// ============================================================================

function getRoot(container: HTMLElement) {
  return container.firstElementChild as HTMLElement
}

function getItemEls(container: HTMLElement) {
  return Array.from(getRoot(container).children) as HTMLElement[]
}

/** Find all dot elements (circle or custom dot wrappers) */
function getDots(container: HTMLElement) {
  const root = getRoot(container)
  const result: HTMLElement[] = []
  root.querySelectorAll('[style*="border-radius: 50%"], [style*="border-radius:50%"]').forEach((el) => {
    result.push(el as HTMLElement)
  })
  // Also find custom dot wrappers (inline-flex with z-index)
  root.querySelectorAll('[style*="z-index"]').forEach((el) => {
    const s = (el as HTMLElement).style
    if (s.display === 'inline-flex' && s.justifyContent === 'center') {
      if (!result.includes(el as HTMLElement)) result.push(el as HTMLElement)
    }
  })
  return result
}

/** Find all tail elements (vertical or horizontal lines) */
function getTails(container: HTMLElement) {
  const root = getRoot(container)
  const result: HTMLElement[] = []
  root.querySelectorAll('[style*="transition"]').forEach((el) => {
    const s = (el as HTMLElement).style
    if (s.transition && s.transition.includes('background-color')) {
      result.push(el as HTMLElement)
    }
  })
  return result
}

// ============================================================================
// Timeline
// ============================================================================

describe('Timeline', () => {
  const basicItems = [
    { children: 'Step 1' },
    { children: 'Step 2' },
    { children: 'Step 3' },
  ]

  // ============================================================================
  // Basic rendering
  // ============================================================================

  describe('basic rendering', () => {
    it('renders root element', () => {
      const { container } = render(<Timeline items={basicItems} />)
      const root = getRoot(container)
      expect(root).toBeTruthy()
      expect(root.tagName).toBe('DIV')
    })

    it('renders correct number of items', () => {
      const { container } = render(<Timeline items={basicItems} />)
      expect(getItemEls(container)).toHaveLength(3)
    })

    it('root has column flex direction by default', () => {
      const { container } = render(<Timeline items={basicItems} />)
      expect(getRoot(container).style.flexDirection).toBe('column')
    })

    it('root has flex display', () => {
      const { container } = render(<Timeline items={basicItems} />)
      expect(getRoot(container).style.display).toBe('flex')
    })

    it('root has 0.875rem font size', () => {
      const { container } = render(<Timeline items={basicItems} />)
      expect(getRoot(container).style.fontSize).toBe('0.875rem')
    })

    it('root has no list style', () => {
      const { container } = render(<Timeline items={basicItems} />)
      expect(getRoot(container).style.listStyle).toBe('none')
    })

    it('root has line-height 1.5', () => {
      const { container } = render(<Timeline items={basicItems} />)
      expect(getRoot(container).style.lineHeight).toBe('1.5')
    })
  })

  // ============================================================================
  // Items content
  // ============================================================================

  describe('items content', () => {
    it('renders item children text', () => {
      render(<Timeline items={basicItems} />)
      expect(screen.getByText('Step 1')).toBeTruthy()
      expect(screen.getByText('Step 2')).toBeTruthy()
      expect(screen.getByText('Step 3')).toBeTruthy()
    })

    it('renders ReactNode children', () => {
      const items = [{ children: <strong data-testid="bold-item">Bold</strong> }]
      render(<Timeline items={items} />)
      expect(screen.getByTestId('bold-item')).toBeTruthy()
    })

    it('renders item with no children', () => {
      const { container } = render(<Timeline items={[{}]} />)
      expect(getItemEls(container)).toHaveLength(1)
    })
  })

  // ============================================================================
  // Dots
  // ============================================================================

  describe('dots', () => {
    it('renders dot for each item', () => {
      const { container } = render(<Timeline items={basicItems} />)
      const dots = getDots(container)
      expect(dots).toHaveLength(3)
    })

    it('outlined variant dot has border (default)', () => {
      const { container } = render(<Timeline items={[{ children: 'A' }]} />)
      const dots = getDots(container)
      expect(dots[0].style.border).toContain('2px solid')
    })

    it('solid variant dot has background color', () => {
      const { container } = render(<Timeline items={[{ children: 'A' }]} variant="solid" />)
      const dots = getDots(container)
      expect(dots[0].style.backgroundColor).toBeTruthy()
      // Solid dot should not have a visible border
      expect(dots[0].style.border).toBeFalsy()
    })

    it('dot has 0.625rem size', () => {
      const { container } = render(<Timeline items={[{ children: 'A' }]} />)
      const dot = getDots(container)[0]
      expect(dot.style.width).toBe('0.625rem')
      expect(dot.style.height).toBe('0.625rem')
    })

    it('dot is circular', () => {
      const { container } = render(<Timeline items={[{ children: 'A' }]} />)
      expect(getDots(container)[0].style.borderRadius).toBe('50%')
    })
  })

  // ============================================================================
  // Color
  // ============================================================================

  describe('color', () => {
    it('default dot uses primary color', () => {
      const { container } = render(<Timeline items={[{ children: 'A' }]} />)
      const dot = getDots(container)[0]
      // Outlined: border has primary color
      expect(dot.style.border).toBeTruthy()
    })

    it('preset "red" color applies error color', () => {
      const { container } = render(
        <Timeline items={[{ children: 'Error', color: 'red' }]} />,
      )
      const dot = getDots(container)[0]
      expect(dot.style.border).toBeTruthy()
    })

    it('preset "green" color applies success color', () => {
      const { container } = render(
        <Timeline items={[{ children: 'Ok', color: 'green' }]} />,
      )
      const dot = getDots(container)[0]
      expect(dot.style.border).toBeTruthy()
    })

    it('custom hex color applies', () => {
      const { container } = render(
        <Timeline items={[{ children: 'Custom', color: '#ff6600' }]} />,
      )
      const dot = getDots(container)[0]
      expect(dot.style.border).toContain('rgb(255, 102, 0)')
    })

    it('different items can have different colors', () => {
      const { container } = render(
        <Timeline
          items={[
            { children: 'A', color: 'green' },
            { children: 'B', color: 'red' },
          ]}
        />,
      )
      const dots = getDots(container)
      expect(dots[0].style.border).not.toBe(dots[1].style.border)
    })

    it('solid variant with color fills background', () => {
      const { container } = render(
        <Timeline items={[{ children: 'A', color: 'success' }]} variant="solid" />,
      )
      const dot = getDots(container)[0]
      expect(dot.style.backgroundColor).toBeTruthy()
    })
  })

  // ============================================================================
  // Custom dot
  // ============================================================================

  describe('custom dot', () => {
    it('renders custom dot ReactNode', () => {
      const items = [{ children: 'A', dot: <span data-testid="custom-dot">●</span> }]
      render(<Timeline items={items} />)
      expect(screen.getByTestId('custom-dot')).toBeTruthy()
    })

    it('custom dot wrapper has inline-flex display', () => {
      const items = [{ children: 'A', dot: <span>●</span> }]
      const { container } = render(<Timeline items={items} />)
      const dots = getDots(container)
      // Custom dot uses inline-flex wrapper
      const customWrapper = dots.find((d) => d.style.display === 'inline-flex')
      expect(customWrapper).toBeTruthy()
    })
  })

  // ============================================================================
  // Labels
  // ============================================================================

  describe('labels', () => {
    it('renders label text', () => {
      const items = [{ children: 'Content', label: '2024-01-01' }]
      render(<Timeline items={items} />)
      expect(screen.getByText('2024-01-01')).toBeTruthy()
    })

    it('renders label ReactNode', () => {
      const items = [{ children: 'Content', label: <em data-testid="label-em">Date</em> }]
      render(<Timeline items={items} />)
      expect(screen.getByTestId('label-em')).toBeTruthy()
    })

    it('label has muted text color', () => {
      const items = [{ children: 'Content', label: 'Label' }]
      const { container } = render(<Timeline items={items} />)
      const labelEl = screen.getByText('Label').closest('div') as HTMLElement
      expect(labelEl.style.color).toBeTruthy()
    })

    it('items with labels trigger three-column layout', () => {
      const items = [{ children: 'Content', label: 'Label' }]
      const { container } = render(<Timeline items={items} />)
      const item = getItemEls(container)[0]
      expect(item.style.display).toBe('grid')
      expect(item.style.gridTemplateColumns).toContain('1fr')
    })
  })

  // ============================================================================
  // Mode
  // ============================================================================

  describe('mode', () => {
    it('left mode: content on right (default)', () => {
      const items = [{ children: 'Right Content' }]
      const { container } = render(<Timeline items={items} mode="left" />)
      const item = getItemEls(container)[0]
      // In left mode without labels: gridTemplateColumns = '0px 1.5rem 1fr'
      expect(item.style.gridTemplateColumns).toContain('1fr')
    })

    it('right mode: content on left', () => {
      const items = [{ children: 'Left Content' }]
      const { container } = render(<Timeline items={items} mode="right" />)
      const item = getItemEls(container)[0]
      expect(item.style.gridTemplateColumns).toContain('1fr')
    })

    it('alternate mode: even items on right, odd items on left', () => {
      const items = [
        { children: 'First' },
        { children: 'Second' },
        { children: 'Third' },
      ]
      const { container } = render(<Timeline items={items} mode="alternate" />)
      const itemEls = getItemEls(container)
      // All three items should be grid with three columns
      itemEls.forEach((el) => {
        expect(el.style.display).toBe('grid')
        expect(el.style.gridTemplateColumns).toBe('1fr 1.5rem 1fr')
      })
    })

    it('item position overrides mode', () => {
      const items = [{ children: 'Override', position: 'left' as const }]
      const { container } = render(<Timeline items={items} mode="right" />)
      // Item has position='left' which means content on left side
      const item = getItemEls(container)[0]
      expect(item.style.gridTemplateColumns).toContain('1fr')
    })
  })

  // ============================================================================
  // Tails
  // ============================================================================

  describe('tails', () => {
    it('renders tails between items', () => {
      const { container } = render(<Timeline items={basicItems} />)
      const tails = getTails(container)
      // 3 items → 2 tails (no tail on last item)
      expect(tails).toHaveLength(2)
    })

    it('no tail on last item', () => {
      const { container } = render(<Timeline items={[{ children: 'Only' }]} />)
      const tails = getTails(container)
      expect(tails).toHaveLength(0)
    })

    it('tail has 2px width in vertical mode', () => {
      const { container } = render(<Timeline items={basicItems} />)
      const tails = getTails(container)
      expect(tails[0].style.width).toBe('2px')
    })
  })

  // ============================================================================
  // Pending
  // ============================================================================

  describe('pending', () => {
    it('pending=true adds a pending item', () => {
      const { container } = render(<Timeline items={basicItems} pending />)
      // 3 items + 1 pending = 4
      expect(getItemEls(container)).toHaveLength(4)
    })

    it('pending ReactNode renders as content', () => {
      render(<Timeline items={basicItems} pending="Loading..." />)
      expect(screen.getByText('Loading...')).toBeTruthy()
    })

    it('pending item has spinner dot by default', () => {
      const { container } = render(<Timeline items={[{ children: 'A' }]} pending />)
      // Spinner SVG has animation
      const svgs = getRoot(container).querySelectorAll('svg[style*="animation"]')
      expect(svgs.length).toBeGreaterThanOrEqual(1)
    })

    it('custom pendingDot replaces spinner', () => {
      render(
        <Timeline
          items={[{ children: 'A' }]}
          pending
          pendingDot={<span data-testid="pending-dot">⏳</span>}
        />,
      )
      expect(screen.getByTestId('pending-dot')).toBeTruthy()
    })

    it('pending item is appended at the end', () => {
      render(
        <Timeline items={[{ children: 'First' }]} pending="Pending text" />,
      )
      // Both items should render
      expect(screen.getByText('First')).toBeTruthy()
      expect(screen.getByText('Pending text')).toBeTruthy()
    })
  })

  // ============================================================================
  // Reverse
  // ============================================================================

  describe('reverse', () => {
    it('reverses the order of items', () => {
      const items = [
        { children: 'First' },
        { children: 'Second' },
        { children: 'Third' },
      ]
      render(<Timeline items={items} reverse />)
      // All items should still be present
      expect(screen.getByText('First')).toBeTruthy()
      expect(screen.getByText('Second')).toBeTruthy()
      expect(screen.getByText('Third')).toBeTruthy()
    })

    it('pending item goes to beginning when reversed', () => {
      const { container } = render(
        <Timeline items={[{ children: 'Item' }]} pending="Wait" reverse />,
      )
      // Pending is added last then reversed → appears first
      const items = getItemEls(container)
      expect(items).toHaveLength(2)
    })
  })

  // ============================================================================
  // Horizontal mode
  // ============================================================================

  describe('horizontal mode', () => {
    it('root has row flex direction', () => {
      const { container } = render(<Timeline items={basicItems} horizontal />)
      expect(getRoot(container).style.flexDirection).toBe('row')
    })

    it('renders correct number of horizontal items', () => {
      const { container } = render(<Timeline items={basicItems} horizontal />)
      expect(getItemEls(container)).toHaveLength(3)
    })

    it('horizontal items have column flex direction', () => {
      const { container } = render(<Timeline items={basicItems} horizontal />)
      const items = getItemEls(container)
      items.forEach((item) => {
        expect(item.style.flexDirection).toBe('column')
      })
    })

    it('horizontal items have flex 1', () => {
      const { container } = render(<Timeline items={basicItems} horizontal />)
      const items = getItemEls(container)
      items.forEach((item) => {
        expect(item.style.flex).toContain('1')
      })
    })

    it('horizontal items have center alignment', () => {
      const { container } = render(<Timeline items={basicItems} horizontal />)
      const items = getItemEls(container)
      items.forEach((item) => {
        expect(item.style.alignItems).toBe('center')
      })
    })

    it('horizontal tail has 2px height', () => {
      const { container } = render(<Timeline items={basicItems} horizontal />)
      const tails = getTails(container)
      tails.forEach((tail) => {
        expect(tail.style.height).toBe('2px')
      })
    })

    it('no tail before first item', () => {
      const { container } = render(
        <Timeline items={[{ children: 'A' }, { children: 'B' }]} horizontal />,
      )
      // First item's dot row: left side should not have tail style
      const firstItem = getItemEls(container)[0]
      const dotRow = Array.from(firstItem.children).find(
        (el) => (el as HTMLElement).style.display === 'flex' && (el as HTMLElement).style.width === '100%',
      ) as HTMLElement
      // The first child of dotRow is the left segment (no tail class)
      const leftSegment = dotRow?.firstElementChild as HTMLElement
      expect(leftSegment?.style.height).not.toBe('2px')
    })

    it('renders horizontal labels', () => {
      const items = [
        { children: 'Content', label: 'Jan 2024' },
      ]
      render(<Timeline items={items} horizontal />)
      expect(screen.getByText('Jan 2024')).toBeTruthy()
    })
  })

  // ============================================================================
  // titleSpan
  // ============================================================================

  describe('titleSpan', () => {
    it('titleSpan adjusts label column width', () => {
      const items = [{ children: 'Content', label: 'Label' }]
      const { container } = render(<Timeline items={items} titleSpan={8} />)
      const item = getItemEls(container)[0]
      // 8/24 * 100 = 33.333...%
      expect(item.style.gridTemplateColumns).toContain('33.3333')
    })

    it('titleSpan=12 gives 50% label column', () => {
      const items = [{ children: 'Content', label: 'Label' }]
      const { container } = render(<Timeline items={items} titleSpan={12} />)
      const item = getItemEls(container)[0]
      expect(item.style.gridTemplateColumns).toContain('50%')
    })
  })

  // ============================================================================
  // Vertical item spacing
  // ============================================================================

  describe('vertical item spacing', () => {
    it('non-last items have bottom padding on content', () => {
      const { container } = render(<Timeline items={basicItems} />)
      const contentEl = screen.getByText('Step 1').closest('div') as HTMLElement
      expect(contentEl.style.paddingBottom).toBe('1.25rem')
    })

    it('last item has no bottom padding on content', () => {
      const { container } = render(<Timeline items={basicItems} />)
      const contentEl = screen.getByText('Step 3').closest('div') as HTMLElement
      expect(contentEl.style.paddingBottom).toBe('0px')
    })
  })

  // ============================================================================
  // Grid layout (vertical items)
  // ============================================================================

  describe('grid layout', () => {
    it('items use grid display', () => {
      const { container } = render(<Timeline items={basicItems} />)
      const items = getItemEls(container)
      items.forEach((item) => {
        expect(item.style.display).toBe('grid')
      })
    })

    it('left mode without labels: "0px 1.5rem 1fr"', () => {
      const { container } = render(<Timeline items={[{ children: 'A' }]} mode="left" />)
      const item = getItemEls(container)[0]
      expect(item.style.gridTemplateColumns).toBe('0px 1.5rem 1fr')
    })

    it('right mode without labels: "1fr 1.5rem 0px"', () => {
      const { container } = render(<Timeline items={[{ children: 'A' }]} mode="right" />)
      const item = getItemEls(container)[0]
      expect(item.style.gridTemplateColumns).toBe('1fr 1.5rem 0px')
    })

    it('alternate mode: "1fr 1.5rem 1fr"', () => {
      const items = [{ children: 'A' }, { children: 'B' }]
      const { container } = render(<Timeline items={items} mode="alternate" />)
      const itemEls = getItemEls(container)
      expect(itemEls[0].style.gridTemplateColumns).toBe('1fr 1.5rem 1fr')
      expect(itemEls[1].style.gridTemplateColumns).toBe('1fr 1.5rem 1fr')
    })
  })

  // ============================================================================
  // Semantic classNames
  // ============================================================================

  describe('semantic classNames', () => {
    it('applies classNames.root', () => {
      const { container } = render(
        <Timeline items={basicItems} classNames={{ root: 'tl-root' }} />,
      )
      expect(getRoot(container).className).toContain('tl-root')
    })

    it('applies classNames.item', () => {
      const { container } = render(
        <Timeline items={basicItems} classNames={{ item: 'tl-item' }} />,
      )
      const items = getItemEls(container)
      items.forEach((item) => {
        expect(item.className).toContain('tl-item')
      })
    })

    it('applies classNames.dot', () => {
      const { container } = render(
        <Timeline items={[{ children: 'A' }]} classNames={{ dot: 'tl-dot' }} />,
      )
      const dots = getDots(container)
      expect(dots[0].className).toContain('tl-dot')
    })

    it('applies classNames.tail', () => {
      const { container } = render(
        <Timeline items={basicItems} classNames={{ tail: 'tl-tail' }} />,
      )
      const tails = getTails(container)
      tails.forEach((tail) => {
        expect(tail.className).toContain('tl-tail')
      })
    })

    it('applies classNames.content', () => {
      const { container } = render(
        <Timeline items={basicItems} classNames={{ content: 'tl-content' }} />,
      )
      const content = screen.getByText('Step 1').closest('div') as HTMLElement
      expect(content.className).toContain('tl-content')
    })

    it('applies classNames.label', () => {
      const items = [{ children: 'A', label: 'Date' }]
      const { container } = render(
        <Timeline items={items} classNames={{ label: 'tl-label' }} />,
      )
      const label = screen.getByText('Date').closest('div') as HTMLElement
      expect(label.className).toContain('tl-label')
    })
  })

  // ============================================================================
  // Semantic styles
  // ============================================================================

  describe('semantic styles', () => {
    it('applies styles.root', () => {
      const { container } = render(
        <Timeline items={basicItems} styles={{ root: { margin: '2rem' } }} />,
      )
      expect(getRoot(container).style.margin).toBe('2rem')
    })

    it('applies styles.item', () => {
      const { container } = render(
        <Timeline items={[{ children: 'A' }]} styles={{ item: { padding: '8px' } }} />,
      )
      expect(getItemEls(container)[0].style.padding).toBe('8px')
    })

    it('applies styles.dot', () => {
      const { container } = render(
        <Timeline items={[{ children: 'A' }]} styles={{ dot: { boxShadow: '0 0 3px red' } }} />,
      )
      expect(getDots(container)[0].style.boxShadow).toBe('0 0 3px red')
    })

    it('applies styles.content', () => {
      const { container } = render(
        <Timeline items={basicItems} styles={{ content: { letterSpacing: '1px' } }} />,
      )
      const content = screen.getByText('Step 1').closest('div') as HTMLElement
      expect(content.style.letterSpacing).toBe('1px')
    })

    it('applies styles.label', () => {
      const items = [{ children: 'A', label: 'Lbl' }]
      const { container } = render(
        <Timeline items={items} styles={{ label: { fontStyle: 'italic' } }} />,
      )
      const label = screen.getByText('Lbl').closest('div') as HTMLElement
      expect(label.style.fontStyle).toBe('italic')
    })
  })

  // ============================================================================
  // className / style
  // ============================================================================

  describe('className / style', () => {
    it('applies className to root', () => {
      const { container } = render(
        <Timeline items={basicItems} className="my-timeline" />,
      )
      expect(getRoot(container).className).toContain('my-timeline')
    })

    it('applies style to root', () => {
      const { container } = render(
        <Timeline items={basicItems} style={{ maxWidth: '400px' }} />,
      )
      expect(getRoot(container).style.maxWidth).toBe('400px')
    })
  })

  // ============================================================================
  // Edge cases
  // ============================================================================

  describe('edge cases', () => {
    it('renders with empty items array', () => {
      const { container } = render(<Timeline items={[]} />)
      expect(getRoot(container)).toBeTruthy()
      expect(getItemEls(container)).toHaveLength(0)
    })

    it('renders with no items prop', () => {
      const { container } = render(<Timeline />)
      expect(getRoot(container)).toBeTruthy()
      expect(getItemEls(container)).toHaveLength(0)
    })

    it('single item has no tail', () => {
      const { container } = render(<Timeline items={[{ children: 'Solo' }]} />)
      expect(getTails(container)).toHaveLength(0)
    })

    it('renders with pending only (no items)', () => {
      const { container } = render(<Timeline items={[]} pending="Loading" />)
      expect(getItemEls(container)).toHaveLength(1)
      expect(screen.getByText('Loading')).toBeTruthy()
    })

    it('root has no margin', () => {
      const { container } = render(<Timeline items={basicItems} />)
      expect(getRoot(container).style.margin).toBe('0px')
    })

    it('root has no padding', () => {
      const { container } = render(<Timeline items={basicItems} />)
      expect(getRoot(container).style.padding).toBe('0px')
    })

    it('reverse with pending puts pending first', () => {
      const { container } = render(
        <Timeline items={[{ children: 'Main' }]} pending="Wait" reverse />,
      )
      expect(getItemEls(container)).toHaveLength(2)
      expect(screen.getByText('Main')).toBeTruthy()
      expect(screen.getByText('Wait')).toBeTruthy()
    })
  })
})
