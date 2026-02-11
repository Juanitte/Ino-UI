import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AutoComplete } from '../AutoComplete'
import type { AutoCompleteOption } from '../AutoComplete'

const options: AutoCompleteOption[] = [
  { value: 'Apple' },
  { value: 'Banana' },
  { value: 'Cherry' },
]

// jsdom does not implement scrollIntoView
beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn()
})

/** Focus the combobox input to open the dropdown */
function focusInput() {
  fireEvent.focus(screen.getByRole('combobox'))
}

describe('AutoComplete', () => {
  // ---------- Basic rendering ----------

  it('renders a combobox input', () => {
    render(<AutoComplete options={options} />)
    const input = screen.getByRole('combobox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('aria-haspopup', 'listbox')
    expect(input).toHaveAttribute('aria-autocomplete', 'list')
  })

  it('renders placeholder', () => {
    render(<AutoComplete options={options} placeholder="Search..." />)
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('does not show dropdown initially', () => {
    render(<AutoComplete options={options} />)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  // ---------- Dropdown open/close ----------

  it('opens dropdown on focus', () => {
    render(<AutoComplete options={options} />)
    focusInput()

    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true')
  })

  it('renders all options in the dropdown', () => {
    render(<AutoComplete options={options} />)
    focusInput()

    const opts = screen.getAllByRole('option')
    expect(opts).toHaveLength(3)
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('Banana')).toBeInTheDocument()
    expect(screen.getByText('Cherry')).toBeInTheDocument()
  })

  it('closes dropdown on Escape', () => {
    render(<AutoComplete options={options} />)
    focusInput()
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' })

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  // ---------- Filtering ----------

  it('filters options by default (case-insensitive)', () => {
    render(<AutoComplete options={options} />)
    const input = screen.getByRole('combobox')
    focusInput()
    fireEvent.change(input, { target: { value: 'ban' } })

    const opts = screen.getAllByRole('option')
    expect(opts).toHaveLength(1)
    expect(screen.getByText('Banana')).toBeInTheDocument()
  })

  it('disables filtering when filterOption=false', () => {
    render(<AutoComplete options={options} filterOption={false} />)
    const input = screen.getByRole('combobox')
    focusInput()
    fireEvent.change(input, { target: { value: 'xyz' } })

    // All options should still be shown
    expect(screen.getAllByRole('option')).toHaveLength(3)
  })

  it('uses custom filterOption function', () => {
    const customFilter = (_input: string, opt: AutoCompleteOption) =>
      opt.value.startsWith('C')

    render(<AutoComplete options={options} filterOption={customFilter} />)
    focusInput()

    expect(screen.getAllByRole('option')).toHaveLength(1)
    expect(screen.getByText('Cherry')).toBeInTheDocument()
  })

  it('filters by label string as well as value', () => {
    const labelOpts: AutoCompleteOption[] = [
      { value: 'opt1', label: 'First Option' },
      { value: 'opt2', label: 'Second Option' },
    ]
    render(<AutoComplete options={labelOpts} />)
    const input = screen.getByRole('combobox')
    focusInput()
    fireEvent.change(input, { target: { value: 'first' } })

    expect(screen.getAllByRole('option')).toHaveLength(1)
    expect(screen.getByText('First Option')).toBeInTheDocument()
  })

  // ---------- Selecting options ----------

  it('selects option on click and closes dropdown', () => {
    const onChange = vi.fn()
    const onSelect = vi.fn()
    render(<AutoComplete options={options} onChange={onChange} onSelect={onSelect} />)
    focusInput()

    fireEvent.click(screen.getByText('Banana'))

    expect(onChange).toHaveBeenCalledWith('Banana')
    expect(onSelect).toHaveBeenCalledWith('Banana', expect.objectContaining({ value: 'Banana' }))
    expect((screen.getByRole('combobox') as HTMLInputElement).value).toBe('Banana')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('does not select disabled options', () => {
    const onSelect = vi.fn()
    const disabledOpts: AutoCompleteOption[] = [
      { value: 'Disabled', disabled: true },
      { value: 'Enabled' },
    ]
    render(<AutoComplete options={disabledOpts} onSelect={onSelect} />)
    focusInput()

    fireEvent.click(screen.getByText('Disabled'))

    expect(onSelect).not.toHaveBeenCalled()
  })

  it('renders disabled options with aria-disabled and opacity', () => {
    const disabledOpts: AutoCompleteOption[] = [
      { value: 'Disabled', disabled: true },
    ]
    render(<AutoComplete options={disabledOpts} />)
    focusInput()

    const opt = screen.getByRole('option')
    expect(opt).toHaveAttribute('aria-disabled', 'true')
    expect(opt.style.opacity).toBe('0.5')
  })

  // ---------- Keyboard navigation ----------

  it('navigates options with ArrowDown/ArrowUp', () => {
    render(<AutoComplete options={options} />)
    const input = screen.getByRole('combobox')
    focusInput()

    // First option is active by default (defaultActiveFirstOption=true)
    expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-selected', 'true')

    // ArrowDown → second option
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(screen.getAllByRole('option')[1]).toHaveAttribute('aria-selected', 'true')

    // ArrowUp → back to first
    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-selected', 'true')
  })

  it('selects active option on Enter', () => {
    const onSelect = vi.fn()
    render(<AutoComplete options={options} onSelect={onSelect} />)
    const input = screen.getByRole('combobox')
    focusInput()

    // ArrowDown to second option
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    // Enter to select
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(onSelect).toHaveBeenCalledWith('Banana', expect.objectContaining({ value: 'Banana' }))
  })

  it('opens dropdown on ArrowDown when closed', () => {
    render(<AutoComplete options={options} />)
    const input = screen.getByRole('combobox')

    // Dropdown is closed initially
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

    fireEvent.keyDown(input, { key: 'ArrowDown' })

    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('does not activate first option when defaultActiveFirstOption=false', () => {
    render(<AutoComplete options={options} defaultActiveFirstOption={false} />)
    focusInput()

    const opts = screen.getAllByRole('option')
    opts.forEach((opt) => {
      expect(opt).toHaveAttribute('aria-selected', 'false')
    })
  })

  // ---------- Backfill ----------

  it('fills input with highlighted option value when backfill=true', () => {
    const onChange = vi.fn()
    render(<AutoComplete options={options} backfill onChange={onChange} />)
    const input = screen.getByRole('combobox')
    focusInput()

    fireEvent.keyDown(input, { key: 'ArrowDown' })

    // Input should be filled with the second option
    expect((input as HTMLInputElement).value).toBe('Banana')
    expect(onChange).toHaveBeenCalledWith('Banana')
  })

  // ---------- Controlled value ----------

  it('respects controlled value prop', () => {
    const { rerender } = render(<AutoComplete options={options} value="test" />)
    expect((screen.getByRole('combobox') as HTMLInputElement).value).toBe('test')

    rerender(<AutoComplete options={options} value="updated" />)
    expect((screen.getByRole('combobox') as HTMLInputElement).value).toBe('updated')
  })

  // ---------- Uncontrolled value ----------

  it('uses defaultValue as initial value', () => {
    render(<AutoComplete options={options} defaultValue="init" />)
    expect((screen.getByRole('combobox') as HTMLInputElement).value).toBe('init')
  })

  it('updates value on typing (uncontrolled)', () => {
    render(<AutoComplete options={options} />)
    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: 'hello' } })

    expect((input as HTMLInputElement).value).toBe('hello')
  })

  // ---------- Controlled open ----------

  it('respects controlled open prop', () => {
    render(<AutoComplete options={options} open />)
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('keeps dropdown closed when open=false', () => {
    render(<AutoComplete options={options} open={false} />)
    focusInput()
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  // ---------- Disabled ----------

  it('disables the input when disabled=true', () => {
    render(<AutoComplete options={options} disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('does not show dropdown when disabled', () => {
    render(<AutoComplete options={options} disabled open />)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  // ---------- allowClear ----------

  it('shows clear button when allowClear and input has value', () => {
    render(<AutoComplete options={options} allowClear defaultValue="test" />)
    expect(screen.getByLabelText('Clear')).toBeInTheDocument()
  })

  it('does not show clear button when value is empty', () => {
    render(<AutoComplete options={options} allowClear />)
    expect(screen.queryByLabelText('Clear')).not.toBeInTheDocument()
  })

  it('clears value and calls onClear on clear button click', () => {
    const onChange = vi.fn()
    const onClear = vi.fn()
    render(
      <AutoComplete options={options} allowClear defaultValue="test" onChange={onChange} onClear={onClear} />
    )

    fireEvent.click(screen.getByLabelText('Clear'))

    expect(onChange).toHaveBeenCalledWith('')
    expect(onClear).toHaveBeenCalledTimes(1)
    expect((screen.getByRole('combobox') as HTMLInputElement).value).toBe('')
  })

  it('does not show clear button when disabled', () => {
    render(<AutoComplete options={options} allowClear defaultValue="test" disabled />)
    expect(screen.queryByLabelText('Clear')).not.toBeInTheDocument()
  })

  // ---------- Callbacks ----------

  it('calls onSearch when typing', () => {
    const onSearch = vi.fn()
    render(<AutoComplete options={options} onSearch={onSearch} />)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'ap' } })

    expect(onSearch).toHaveBeenCalledWith('ap')
  })

  it('calls onFocus and onBlur', () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    render(<AutoComplete options={[]} onFocus={onFocus} onBlur={onBlur} />)

    fireEvent.focus(screen.getByRole('combobox'))
    expect(onFocus).toHaveBeenCalledTimes(1)

    fireEvent.blur(screen.getByRole('combobox'))
    expect(onBlur).toHaveBeenCalledTimes(1)
  })

  it('calls onDropdownVisibleChange when dropdown opens/closes', () => {
    const onDropdownVisibleChange = vi.fn()
    render(<AutoComplete options={options} onDropdownVisibleChange={onDropdownVisibleChange} />)

    focusInput()
    expect(onDropdownVisibleChange).toHaveBeenCalledWith(true)

    fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' })
    expect(onDropdownVisibleChange).toHaveBeenCalledWith(false)
  })

  // ---------- notFoundContent ----------

  it('shows notFoundContent when no options match', () => {
    render(
      <AutoComplete options={options} notFoundContent="No results" defaultValue="xyz" />
    )
    focusInput()
    expect(screen.getByText('No results')).toBeInTheDocument()
  })

  it('hides dropdown when notFoundContent=null and no matches', () => {
    render(<AutoComplete options={options} defaultValue="xyz" />)
    focusInput()
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  // ---------- Option groups ----------

  it('renders grouped options with group header', () => {
    const groupOpts: AutoCompleteOption[] = [
      {
        value: 'fruits',
        label: 'Fruits',
        options: [
          { value: 'Apple' },
          { value: 'Banana' },
        ],
      },
    ]
    render(<AutoComplete options={groupOpts} />)
    focusInput()

    expect(screen.getByText('Fruits')).toBeInTheDocument()
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('Banana')).toBeInTheDocument()
    // Only children are role="option", group header is not
    expect(screen.getAllByRole('option')).toHaveLength(2)
  })

  // ---------- Custom label ----------

  it('renders option label instead of value when provided', () => {
    const labelOpts: AutoCompleteOption[] = [
      { value: 'val1', label: 'Display Label' },
    ]
    render(<AutoComplete options={labelOpts} />)
    focusInput()

    expect(screen.getByText('Display Label')).toBeInTheDocument()
  })

  // ---------- Variant ----------

  it('renders outlined variant with border', () => {
    render(<AutoComplete options={options} variant="outlined" />)
    const input = screen.getByRole('combobox')
    expect(input.style.border).toContain('1px solid')
  })

  it('renders filled variant with transparent border', () => {
    render(<AutoComplete options={options} variant="filled" />)
    const input = screen.getByRole('combobox')
    expect(input.style.border).toBe('1px solid transparent')
  })

  it('renders borderless variant', () => {
    render(<AutoComplete options={options} variant="borderless" />)
    const input = screen.getByRole('combobox')
    expect(input.style.border).toBe('1px solid transparent')
    expect(input.style.backgroundColor).toBe('transparent')
  })

  // ---------- Status ----------

  it('applies error border color when status="error"', () => {
    render(<AutoComplete options={options} status="error" />)
    const input = screen.getByRole('combobox')
    expect(input.style.borderColor).not.toBe('')
  })

  it('applies warning border color when status="warning"', () => {
    render(<AutoComplete options={options} status="warning" />)
    const input = screen.getByRole('combobox')
    expect(input.style.borderColor).not.toBe('')
  })

  // ---------- prefix & suffix ----------

  it('renders prefix content', () => {
    render(
      <AutoComplete options={options} prefix={<span data-testid="prefix">@</span>} />
    )
    expect(screen.getByTestId('prefix')).toBeInTheDocument()
  })

  it('renders custom suffix icon', () => {
    render(
      <AutoComplete options={options} suffix={<span data-testid="suffix">🔍</span>} />
    )
    expect(screen.getByTestId('suffix')).toBeInTheDocument()
  })

  it('renders prefix and suffix together', () => {
    render(
      <AutoComplete
        options={options}
        prefix={<span data-testid="prefix">@</span>}
        suffix={<span data-testid="suffix">🔍</span>}
      />
    )
    expect(screen.getByTestId('prefix')).toBeInTheDocument()
    expect(screen.getByTestId('suffix')).toBeInTheDocument()
  })

  it('adjusts input padding when prefix is present', () => {
    const { rerender } = render(<AutoComplete options={options} />)
    const input = screen.getByRole('combobox')
    const paddingWithout = input.style.paddingLeft

    rerender(<AutoComplete options={options} prefix={<span>@</span>} />)
    const paddingWith = input.style.paddingLeft

    // With prefix, paddingLeft should be larger to make room for the icon
    expect(parseInt(paddingWith)).toBeGreaterThan(parseInt(paddingWithout))
  })

  // ---------- className & style ----------

  it('applies custom className to root', () => {
    const { container } = render(<AutoComplete options={options} className="my-ac" />)
    expect(container.firstChild).toHaveClass('my-ac')
  })

  it('applies custom style to root', () => {
    const { container } = render(<AutoComplete options={options} style={{ margin: 10 }} />)
    expect((container.firstChild as HTMLElement).style.margin).toBe('10px')
  })

  // ---------- Semantic classNames ----------

  it('applies classNames.root', () => {
    const { container } = render(
      <AutoComplete options={options} classNames={{ root: 'custom-root' }} />
    )
    expect(container.firstChild).toHaveClass('custom-root')
  })

  it('applies classNames.input', () => {
    render(
      <AutoComplete options={options} classNames={{ input: 'custom-input' }} />
    )
    expect(screen.getByRole('combobox')).toHaveClass('custom-input')
  })

  it('applies classNames.dropdown', () => {
    const { container } = render(
      <AutoComplete options={options} classNames={{ dropdown: 'custom-dd' }} />
    )
    focusInput()
    expect(container.querySelector('.custom-dd')).toBeInTheDocument()
  })

  it('applies classNames.option to each option', () => {
    const { container } = render(
      <AutoComplete options={options} classNames={{ option: 'custom-opt' }} />
    )
    focusInput()
    expect(container.querySelectorAll('.custom-opt')).toHaveLength(3)
  })

  // ---------- Edge cases ----------

  it('renders with empty options array', () => {
    render(<AutoComplete options={[]} />)
    focusInput()
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('wraps around when navigating past last option', () => {
    render(<AutoComplete options={options} />)
    const input = screen.getByRole('combobox')
    focusInput()

    // Navigate to last option (start at 0, down twice → index 2)
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(screen.getAllByRole('option')[2]).toHaveAttribute('aria-selected', 'true')

    // One more ArrowDown → wraps to first
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-selected', 'true')
  })
})
