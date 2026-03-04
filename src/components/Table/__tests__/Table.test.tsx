import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Table } from '../Table'
import type { ColumnType } from '../Table'

// ============================================================================
// Test data
// ============================================================================

interface User {
  key: string
  name: string
  age: number
  city: string
}

const columns: ColumnType<User>[] = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'City', dataIndex: 'city', key: 'city' },
]

const dataSource: User[] = [
  { key: '1', name: 'Alice', age: 28, city: 'NYC' },
  { key: '2', name: 'Bob', age: 35, city: 'LA' },
  { key: '3', name: 'Charlie', age: 22, city: 'Chicago' },
  { key: '4', name: 'Diana', age: 31, city: 'NYC' },
  { key: '5', name: 'Eve', age: 27, city: 'LA' },
]

// ============================================================================
// Helpers
// ============================================================================

function getRoot(container: HTMLElement) {
  return container.firstElementChild as HTMLElement
}

function getTable(container: HTMLElement) {
  return getRoot(container).querySelector('table') as HTMLTableElement
}

function getThead(container: HTMLElement) {
  return getTable(container).querySelector('thead') as HTMLTableSectionElement | null
}

function getTbody(container: HTMLElement) {
  return getTable(container).querySelector('tbody') as HTMLTableSectionElement
}

function getHeaderCells(container: HTMLElement) {
  const thead = getThead(container)
  if (!thead) return []
  return Array.from(thead.querySelectorAll('th')) as HTMLElement[]
}

function getBodyRows(container: HTMLElement) {
  const tbody = getTbody(container)
  return Array.from(tbody.querySelectorAll(':scope > tr')) as HTMLElement[]
}

function getCellsInRow(row: HTMLElement) {
  return Array.from(row.querySelectorAll(':scope > td')) as HTMLElement[]
}

function getCheckboxInputs(container: HTMLElement) {
  return Array.from(getTable(container).querySelectorAll('input[type="checkbox"]')) as HTMLInputElement[]
}

function getRadioInputs(container: HTMLElement) {
  return Array.from(getTable(container).querySelectorAll('input[type="radio"]')) as HTMLInputElement[]
}

function getPagination(container: HTMLElement) {
  return getRoot(container).querySelector('nav') as HTMLElement | null
}

// ============================================================================
// Basic rendering
// ============================================================================

describe('Table', () => {
  describe('basic rendering', () => {
    it('renders root element', () => {
      const { container } = render(<Table dataSource={dataSource} columns={columns} />)
      expect(getRoot(container)).toBeTruthy()
      expect(getRoot(container).tagName).toBe('DIV')
    })

    it('renders table element', () => {
      const { container } = render(<Table dataSource={dataSource} columns={columns} />)
      expect(getTable(container)).toBeTruthy()
    })

    it('renders thead with header cells', () => {
      const { container } = render(<Table dataSource={dataSource} columns={columns} />)
      const headers = getHeaderCells(container)
      expect(headers).toHaveLength(3)
    })

    it('renders column titles', () => {
      render(<Table dataSource={dataSource} columns={columns} />)
      expect(screen.getByText('Name')).toBeTruthy()
      expect(screen.getByText('Age')).toBeTruthy()
      expect(screen.getByText('City')).toBeTruthy()
    })

    it('renders tbody with data rows', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} pagination={false} />,
      )
      const rows = getBodyRows(container)
      expect(rows).toHaveLength(5)
    })

    it('renders cell content', () => {
      render(<Table dataSource={dataSource} columns={columns} pagination={false} />)
      expect(screen.getByText('Alice')).toBeTruthy()
      expect(screen.getByText('Bob')).toBeTruthy()
    })

    it('table has 100% width', () => {
      const { container } = render(<Table dataSource={dataSource} columns={columns} />)
      expect(getTable(container).style.width).toBe('100%')
    })
  })

  // ============================================================================
  // Columns
  // ============================================================================

  describe('columns', () => {
    it('renders cell data by dataIndex', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} pagination={false} />,
      )
      const rows = getBodyRows(container)
      const firstRowCells = getCellsInRow(rows[0])
      expect(firstRowCells[0].textContent).toContain('Alice')
      expect(firstRowCells[1].textContent).toContain('28')
      expect(firstRowCells[2].textContent).toContain('NYC')
    })

    it('custom render function', () => {
      const cols: ColumnType<User>[] = [
        { title: 'Info', dataIndex: 'name', render: (val, record) => `${val} (${record.age})` },
      ]
      render(<Table dataSource={dataSource} columns={cols} pagination={false} />)
      expect(screen.getByText('Alice (28)')).toBeTruthy()
    })

    it('column alignment', () => {
      const cols: ColumnType<User>[] = [
        { title: 'Name', dataIndex: 'name', align: 'center' },
      ]
      const { container } = render(
        <Table dataSource={dataSource} columns={cols} pagination={false} />,
      )
      const headerCells = getHeaderCells(container)
      expect(headerCells[0].style.textAlign).toBe('center')
      const rows = getBodyRows(container)
      const cells = getCellsInRow(rows[0])
      expect(cells[0].style.textAlign).toBe('center')
    })

    it('column width', () => {
      const cols: ColumnType<User>[] = [
        { title: 'Name', dataIndex: 'name', width: 200 },
      ]
      const { container } = render(
        <Table dataSource={dataSource} columns={cols} pagination={false} />,
      )
      const headerCells = getHeaderCells(container)
      expect(headerCells[0].style.width).toBe('200px')
    })

    it('ellipsis truncation', () => {
      const cols: ColumnType<User>[] = [
        { title: 'Name', dataIndex: 'name', ellipsis: true },
      ]
      const { container } = render(
        <Table dataSource={dataSource} columns={cols} pagination={false} />,
      )
      const rows = getBodyRows(container)
      const cell = getCellsInRow(rows[0])[0]
      expect(cell.style.overflow).toBe('hidden')
      expect(cell.style.textOverflow).toBe('ellipsis')
      expect(cell.style.whiteSpace).toBe('nowrap')
    })

    it('hidden column not rendered', () => {
      const cols: ColumnType<User>[] = [
        { title: 'Name', dataIndex: 'name' },
        { title: 'Age', dataIndex: 'age', hidden: true },
        { title: 'City', dataIndex: 'city' },
      ]
      const { container } = render(
        <Table dataSource={dataSource} columns={cols} pagination={false} />,
      )
      expect(getHeaderCells(container)).toHaveLength(2)
      expect(screen.queryByText('Age')).toBeNull()
    })

    it('column className applied to header and cells', () => {
      const cols: ColumnType<User>[] = [
        { title: 'Name', dataIndex: 'name', className: 'col-name' },
      ]
      const { container } = render(
        <Table dataSource={dataSource} columns={cols} pagination={false} />,
      )
      const headerCells = getHeaderCells(container)
      expect(headerCells[0].className).toContain('col-name')
      const rows = getBodyRows(container)
      expect(getCellsInRow(rows[0])[0].className).toContain('col-name')
    })

    it('nested dataIndex with string array', () => {
      interface NestedData { key: string; address: { city: string } }
      const data: NestedData[] = [{ key: '1', address: { city: 'Paris' } }]
      const cols: ColumnType<NestedData>[] = [
        { title: 'City', dataIndex: ['address', 'city'] },
      ]
      render(<Table dataSource={data} columns={cols} pagination={false} />)
      expect(screen.getByText('Paris')).toBeTruthy()
    })
  })

  // ============================================================================
  // rowKey
  // ============================================================================

  describe('rowKey', () => {
    it('uses "key" field by default', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} pagination={false} />,
      )
      // Renders correctly using key field
      expect(getBodyRows(container)).toHaveLength(5)
    })

    it('uses custom string rowKey', () => {
      const data = [{ id: 'a', name: 'Test' }]
      const cols: ColumnType<any>[] = [{ title: 'Name', dataIndex: 'name' }]
      const { container } = render(
        <Table dataSource={data} columns={cols} rowKey="id" pagination={false} />,
      )
      expect(getBodyRows(container)).toHaveLength(1)
    })

    it('uses function rowKey', () => {
      const data = [{ id: 'x', name: 'Func' }]
      const cols: ColumnType<any>[] = [{ title: 'Name', dataIndex: 'name' }]
      const { container } = render(
        <Table dataSource={data} columns={cols} rowKey={(r: any) => r.id} pagination={false} />,
      )
      expect(getBodyRows(container)).toHaveLength(1)
    })
  })

  // ============================================================================
  // Bordered
  // ============================================================================

  describe('bordered', () => {
    it('no border by default', () => {
      const { container } = render(<Table dataSource={dataSource} columns={columns} />)
      expect(getRoot(container).style.border).not.toContain('1px solid')
    })

    it('has border when bordered', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} bordered />,
      )
      expect(getRoot(container).style.border).toContain('1px solid')
    })

    it('has border radius when bordered', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} bordered />,
      )
      expect(getRoot(container).style.borderRadius).toBe('0.5rem')
    })

    it('bordered uses collapse border spacing', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} bordered />,
      )
      expect(getTable(container).style.borderCollapse).toBe('collapse')
    })
  })

  // ============================================================================
  // Size variants
  // ============================================================================

  describe('size variants', () => {
    it('large size by default', () => {
      const { container } = render(<Table dataSource={dataSource} columns={columns} />)
      expect(getTable(container).style.fontSize).toBe('0.875rem')
    })

    it('small size has smaller font', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} size="small" />,
      )
      expect(getTable(container).style.fontSize).toBe('0.8125rem')
    })

    it('large header cell has 1rem padding', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} size="large" />,
      )
      const th = getHeaderCells(container)[0]
      expect(th.style.paddingTop).toBe('1rem')
    })

    it('small header cell has 0.375rem vertical padding', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} size="small" />,
      )
      const th = getHeaderCells(container)[0]
      expect(th.style.paddingTop).toBe('0.375rem')
    })
  })

  // ============================================================================
  // showHeader
  // ============================================================================

  describe('showHeader', () => {
    it('shows header by default', () => {
      const { container } = render(<Table dataSource={dataSource} columns={columns} />)
      expect(getThead(container)).toBeTruthy()
    })

    it('hides header when showHeader=false', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} showHeader={false} />,
      )
      expect(getThead(container)).toBeNull()
    })
  })

  // ============================================================================
  // Loading
  // ============================================================================

  describe('loading', () => {
    it('does not show loading overlay by default', () => {
      const { container } = render(<Table dataSource={dataSource} columns={columns} />)
      const overlay = getRoot(container).querySelector('[style*="z-index: 10"]') as HTMLElement | null
      expect(overlay).toBeNull()
    })

    it('shows loading overlay when loading', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} loading />,
      )
      const overlay = getRoot(container).querySelector('[style*="z-index"]') as HTMLElement | null
      expect(overlay).toBeTruthy()
      expect(overlay!.style.position).toBe('absolute')
    })

    it('loading overlay contains spinner dots', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} loading />,
      )
      const overlay = getRoot(container).querySelector('[style*="z-index"]') as HTMLElement
      const dots = overlay.querySelectorAll('span[style*="border-radius: 50%"]')
      expect(dots).toHaveLength(3)
    })
  })

  // ============================================================================
  // Empty state
  // ============================================================================

  describe('empty state', () => {
    it('shows "No data" when dataSource is empty', () => {
      render(<Table dataSource={[]} columns={columns} />)
      expect(screen.getByText('No data')).toBeTruthy()
    })

    it('shows custom emptyText', () => {
      render(
        <Table dataSource={[]} columns={columns} locale={{ emptyText: 'Nothing here' }} />,
      )
      expect(screen.getByText('Nothing here')).toBeTruthy()
    })

    it('shows empty state when dataSource is undefined', () => {
      render(<Table columns={columns} />)
      expect(screen.getByText('No data')).toBeTruthy()
    })
  })

  // ============================================================================
  // Sorting
  // ============================================================================

  describe('sorting', () => {
    it('renders sort icon for sortable columns', () => {
      const sortCols: ColumnType<User>[] = [
        { title: 'Name', dataIndex: 'name', sorter: true },
      ]
      const { container } = render(
        <Table dataSource={dataSource} columns={sortCols} pagination={false} />,
      )
      // Sort icon has two SVGs (ascend + descend arrows)
      const th = getHeaderCells(container)[0]
      const svgs = th.querySelectorAll('svg')
      expect(svgs.length).toBeGreaterThanOrEqual(2)
    })

    it('sortable header has pointer cursor', () => {
      const sortCols: ColumnType<User>[] = [
        { title: 'Name', dataIndex: 'name', sorter: true },
      ]
      const { container } = render(
        <Table dataSource={dataSource} columns={sortCols} pagination={false} />,
      )
      expect(getHeaderCells(container)[0].style.cursor).toBe('pointer')
    })

    it('clicking sortable header sorts ascending first', () => {
      const sortCols: ColumnType<User>[] = [
        { title: 'Age', dataIndex: 'age', key: 'age', sorter: (a: User, b: User) => a.age - b.age },
      ]
      const { container } = render(
        <Table dataSource={dataSource} columns={sortCols} pagination={false} />,
      )
      fireEvent.click(getHeaderCells(container)[0])
      const rows = getBodyRows(container)
      const ages = rows.map(r => getCellsInRow(r)[0].textContent)
      expect(ages).toEqual(['22', '27', '28', '31', '35'])
    })

    it('clicking twice sorts descending', () => {
      const sortCols: ColumnType<User>[] = [
        { title: 'Age', dataIndex: 'age', key: 'age', sorter: (a: User, b: User) => a.age - b.age },
      ]
      const { container } = render(
        <Table dataSource={dataSource} columns={sortCols} pagination={false} />,
      )
      const th = getHeaderCells(container)[0]
      fireEvent.click(th) // ascend
      fireEvent.click(th) // descend
      const rows = getBodyRows(container)
      const ages = rows.map(r => getCellsInRow(r)[0].textContent)
      expect(ages).toEqual(['35', '31', '28', '27', '22'])
    })

    it('clicking three times resets sort', () => {
      const sortCols: ColumnType<User>[] = [
        { title: 'Age', dataIndex: 'age', key: 'age', sorter: (a: User, b: User) => a.age - b.age },
      ]
      const { container } = render(
        <Table dataSource={dataSource} columns={sortCols} pagination={false} />,
      )
      const th = getHeaderCells(container)[0]
      fireEvent.click(th) // ascend
      fireEvent.click(th) // descend
      fireEvent.click(th) // reset
      const rows = getBodyRows(container)
      const ages = rows.map(r => getCellsInRow(r)[0].textContent)
      // Back to original order
      expect(ages).toEqual(['28', '35', '22', '31', '27'])
    })

    it('defaultSortOrder applies on initial render', () => {
      const sortCols: ColumnType<User>[] = [
        { title: 'Age', dataIndex: 'age', key: 'age', sorter: (a: User, b: User) => a.age - b.age, defaultSortOrder: 'ascend' },
      ]
      const { container } = render(
        <Table dataSource={dataSource} columns={sortCols} pagination={false} />,
      )
      const rows = getBodyRows(container)
      const ages = rows.map(r => getCellsInRow(r)[0].textContent)
      expect(ages).toEqual(['22', '27', '28', '31', '35'])
    })

    it('sorter: true uses default comparison', () => {
      const sortCols: ColumnType<User>[] = [
        { title: 'Name', dataIndex: 'name', key: 'name', sorter: true, defaultSortOrder: 'ascend' },
      ]
      const { container } = render(
        <Table dataSource={dataSource} columns={sortCols} pagination={false} />,
      )
      const rows = getBodyRows(container)
      const names = rows.map(r => getCellsInRow(r)[0].textContent)
      expect(names).toEqual(['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'])
    })

    it('calls onChange when sort changes', () => {
      const onChange = vi.fn()
      const sortCols: ColumnType<User>[] = [
        { title: 'Age', dataIndex: 'age', key: 'age', sorter: true },
      ]
      const { container } = render(
        <Table dataSource={dataSource} columns={sortCols} onChange={onChange} />,
      )
      fireEvent.click(getHeaderCells(container)[0])
      expect(onChange).toHaveBeenCalledTimes(1)
      const [pagination, sorter] = onChange.mock.calls[0]
      expect(pagination.current).toBe(1)
      expect(sorter.order).toBe('ascend')
      expect(sorter.columnKey).toBe('age')
    })
  })

  // ============================================================================
  // Pagination
  // ============================================================================

  describe('pagination', () => {
    const manyData = Array.from({ length: 25 }, (_, i) => ({
      key: String(i),
      name: `User ${i}`,
      age: 20 + i,
      city: 'City',
    }))

    it('shows pagination by default', () => {
      const { container } = render(
        <Table dataSource={manyData} columns={columns} />,
      )
      expect(getPagination(container)).toBeTruthy()
    })

    it('default page size is 10', () => {
      const { container } = render(
        <Table dataSource={manyData} columns={columns} />,
      )
      const rows = getBodyRows(container)
      expect(rows).toHaveLength(10)
    })

    it('no pagination when pagination=false', () => {
      const { container } = render(
        <Table dataSource={manyData} columns={columns} pagination={false} />,
      )
      expect(getPagination(container)).toBeNull()
      expect(getBodyRows(container)).toHaveLength(25)
    })

    it('custom page size', () => {
      const { container } = render(
        <Table dataSource={manyData} columns={columns} pagination={{ pageSize: 5 }} />,
      )
      expect(getBodyRows(container)).toHaveLength(5)
    })

    it('pagination hides on single page when configured', () => {
      const { container } = render(
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ hideOnSinglePage: true }}
        />,
      )
      // 5 items with default 10 per page = single page
      expect(getPagination(container)).toBeNull()
    })

    it('calls onChange when page changes', () => {
      const onChange = vi.fn()
      const { container } = render(
        <Table dataSource={manyData} columns={columns} onChange={onChange} />,
      )
      // Find and click page 2 button
      const page2 = screen.getByText('2')
      fireEvent.click(page2)
      expect(onChange).toHaveBeenCalled()
      const [pag] = onChange.mock.calls[0]
      expect(pag.current).toBe(2)
    })
  })

  // ============================================================================
  // Row selection - checkbox
  // ============================================================================

  describe('row selection - checkbox', () => {
    it('renders selection column', () => {
      const { container } = render(
        <Table
          dataSource={dataSource}
          columns={columns}
          rowSelection={{}}
          pagination={false}
        />,
      )
      const checkboxes = getCheckboxInputs(container)
      // 1 header checkbox + 5 row checkboxes
      expect(checkboxes).toHaveLength(6)
    })

    it('header has select-all checkbox', () => {
      const { container } = render(
        <Table
          dataSource={dataSource}
          columns={columns}
          rowSelection={{}}
          pagination={false}
        />,
      )
      const headerCheckbox = getCheckboxInputs(container)[0]
      expect(headerCheckbox).toBeTruthy()
    })

    it('hides select-all when hideSelectAll', () => {
      const { container } = render(
        <Table
          dataSource={dataSource}
          columns={columns}
          rowSelection={{ hideSelectAll: true }}
          pagination={false}
        />,
      )
      const headerThs = getHeaderCells(container)
      // Selection th exists but no checkbox inside
      const selTh = headerThs[0]
      expect(selTh.querySelector('input[type="checkbox"]')).toBeNull()
    })

    it('calls onChange on row selection', () => {
      const onChange = vi.fn()
      const { container } = render(
        <Table
          dataSource={dataSource}
          columns={columns}
          rowSelection={{ onChange }}
          pagination={false}
        />,
      )
      const checkboxes = getCheckboxInputs(container)
      // Click first row checkbox (index 1 because index 0 is select-all)
      fireEvent.click(checkboxes[1])
      expect(onChange).toHaveBeenCalledTimes(1)
      const [keys] = onChange.mock.calls[0]
      expect(keys).toContain('1')
    })

    it('select-all selects all rows', () => {
      const onChange = vi.fn()
      const { container } = render(
        <Table
          dataSource={dataSource}
          columns={columns}
          rowSelection={{ onChange }}
          pagination={false}
        />,
      )
      const checkboxes = getCheckboxInputs(container)
      fireEvent.click(checkboxes[0]) // select-all
      expect(onChange).toHaveBeenCalled()
      const [keys] = onChange.mock.calls[0]
      expect(keys).toHaveLength(5)
    })

    it('controlled selectedRowKeys', () => {
      const { container } = render(
        <Table
          dataSource={dataSource}
          columns={columns}
          rowSelection={{ selectedRowKeys: ['1', '3'] }}
          pagination={false}
        />,
      )
      const checkboxes = getCheckboxInputs(container)
      // Row checkboxes: index 1-5 (0 is header)
      expect(checkboxes[1].checked).toBe(true)
      expect(checkboxes[2].checked).toBe(false)
      expect(checkboxes[3].checked).toBe(true)
    })

    it('getCheckboxProps can disable specific rows', () => {
      const { container } = render(
        <Table
          dataSource={dataSource}
          columns={columns}
          rowSelection={{
            getCheckboxProps: (record: User) => ({
              disabled: record.name === 'Bob',
            }),
          }}
          pagination={false}
        />,
      )
      const checkboxes = getCheckboxInputs(container)
      // Bob is index 2 (0=header, 1=Alice, 2=Bob)
      expect(checkboxes[2].disabled).toBe(true)
      expect(checkboxes[1].disabled).toBe(false)
    })

    it('calls onSelect when individual row toggled', () => {
      const onSelect = vi.fn()
      const { container } = render(
        <Table
          dataSource={dataSource}
          columns={columns}
          rowSelection={{ onSelect }}
          pagination={false}
        />,
      )
      const checkboxes = getCheckboxInputs(container)
      fireEvent.click(checkboxes[1])
      expect(onSelect).toHaveBeenCalledTimes(1)
      expect(onSelect.mock.calls[0][1]).toBe(true) // selected=true
    })
  })

  // ============================================================================
  // Row selection - radio
  // ============================================================================

  describe('row selection - radio', () => {
    it('renders radio inputs', () => {
      const { container } = render(
        <Table
          dataSource={dataSource}
          columns={columns}
          rowSelection={{ type: 'radio' }}
          pagination={false}
        />,
      )
      const radios = getRadioInputs(container)
      expect(radios).toHaveLength(5)
    })

    it('no header select-all for radio', () => {
      const { container } = render(
        <Table
          dataSource={dataSource}
          columns={columns}
          rowSelection={{ type: 'radio' }}
          pagination={false}
        />,
      )
      expect(getCheckboxInputs(container)).toHaveLength(0)
    })

    it('only one radio can be selected', () => {
      const onChange = vi.fn()
      const { container } = render(
        <Table
          dataSource={dataSource}
          columns={columns}
          rowSelection={{ type: 'radio', onChange }}
          pagination={false}
        />,
      )
      const radios = getRadioInputs(container)
      fireEvent.click(radios[0])
      expect(onChange).toHaveBeenCalled()
      const [keys] = onChange.mock.calls[0]
      expect(keys).toHaveLength(1)
    })
  })

  // ============================================================================
  // Expandable
  // ============================================================================

  describe('expandable', () => {
    it('renders expand column', () => {
      const { container } = render(
        <Table
          dataSource={dataSource}
          columns={columns}
          expandable={{ expandedRowRender: (record: User) => <p>{record.name} details</p> }}
          pagination={false}
        />,
      )
      // Header should have extra th for expand column
      const headers = getHeaderCells(container)
      expect(headers).toHaveLength(4) // 3 data + 1 expand
    })

    it('clicking expand icon reveals expanded content', () => {
      const { container } = render(
        <Table
          dataSource={dataSource}
          columns={columns}
          expandable={{ expandedRowRender: (record: User) => <p>{record.name} expanded</p> }}
          pagination={false}
        />,
      )
      // Find expand icons (SVGs with chevron)
      const rows = getBodyRows(container)
      const expandCell = getCellsInRow(rows[0])[0]
      const expandBtn = expandCell.querySelector('span[style*="cursor: pointer"]') as HTMLElement
      fireEvent.click(expandBtn)
      expect(screen.getByText('Alice expanded')).toBeTruthy()
    })

    it('defaultExpandedRowKeys expands on mount', () => {
      render(
        <Table
          dataSource={dataSource}
          columns={columns}
          expandable={{
            expandedRowRender: (record: User) => <p>{record.name} details</p>,
            defaultExpandedRowKeys: ['1'],
          }}
          pagination={false}
        />,
      )
      expect(screen.getByText('Alice details')).toBeTruthy()
    })

    it('expandRowByClick expands on row click', () => {
      const { container } = render(
        <Table
          dataSource={dataSource}
          columns={columns}
          expandable={{
            expandedRowRender: (record: User) => <p>{record.name} expanded</p>,
            expandRowByClick: true,
          }}
          pagination={false}
        />,
      )
      const rows = getBodyRows(container)
      fireEvent.click(rows[0])
      expect(screen.getByText('Alice expanded')).toBeTruthy()
    })

    it('rowExpandable controls which rows can expand', () => {
      const { container } = render(
        <Table
          dataSource={dataSource}
          columns={columns}
          expandable={{
            expandedRowRender: (record: User) => <p>{record.name} expanded</p>,
            rowExpandable: (record: User) => record.name !== 'Alice',
          }}
          pagination={false}
        />,
      )
      const rows = getBodyRows(container)
      // Alice row should not have expand button
      const aliceExpandCell = getCellsInRow(rows[0])[0]
      expect(aliceExpandCell.querySelector('span[style*="cursor: pointer"]')).toBeNull()
      // Bob row should have expand button
      const bobExpandCell = getCellsInRow(rows[1])[0]
      expect(bobExpandCell.querySelector('span[style*="cursor: pointer"]')).toBeTruthy()
    })

    it('calls onExpand callback', () => {
      const onExpand = vi.fn()
      const { container } = render(
        <Table
          dataSource={dataSource}
          columns={columns}
          expandable={{
            expandedRowRender: (record: User) => <p>{record.name} details</p>,
            onExpand,
          }}
          pagination={false}
        />,
      )
      const rows = getBodyRows(container)
      const expandBtn = getCellsInRow(rows[0])[0].querySelector('span[style*="cursor: pointer"]') as HTMLElement
      fireEvent.click(expandBtn)
      expect(onExpand).toHaveBeenCalledWith(true, dataSource[0])
    })

    it('showExpandColumn=false hides expand column', () => {
      const { container } = render(
        <Table
          dataSource={dataSource}
          columns={columns}
          expandable={{
            expandedRowRender: (record: User) => <p>{record.name} details</p>,
            showExpandColumn: false,
          }}
          pagination={false}
        />,
      )
      expect(getHeaderCells(container)).toHaveLength(3) // no expand column
    })
  })

  // ============================================================================
  // Tree data
  // ============================================================================

  describe('tree data', () => {
    interface TreeItem {
      key: string
      name: string
      children?: TreeItem[]
    }

    const treeData: TreeItem[] = [
      {
        key: 'p1',
        name: 'Parent 1',
        children: [
          { key: 'c1', name: 'Child 1' },
          { key: 'c2', name: 'Child 2' },
        ],
      },
      { key: 'p2', name: 'Parent 2' },
    ]

    const treeCols: ColumnType<TreeItem>[] = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
    ]

    it('renders parent rows', () => {
      render(<Table dataSource={treeData} columns={treeCols} pagination={false} />)
      expect(screen.getByText('Parent 1')).toBeTruthy()
      expect(screen.getByText('Parent 2')).toBeTruthy()
    })

    it('children are hidden by default', () => {
      render(<Table dataSource={treeData} columns={treeCols} pagination={false} />)
      expect(screen.queryByText('Child 1')).toBeNull()
    })

    it('clicking expand shows children', () => {
      const { container } = render(
        <Table dataSource={treeData} columns={treeCols} pagination={false} />,
      )
      const rows = getBodyRows(container)
      const expandIcon = getCellsInRow(rows[0])[0].querySelector('span[style*="cursor: pointer"]') as HTMLElement
      fireEvent.click(expandIcon)
      expect(screen.getByText('Child 1')).toBeTruthy()
      expect(screen.getByText('Child 2')).toBeTruthy()
    })

    it('tree mode does not render separate expand column', () => {
      const { container } = render(
        <Table
          dataSource={treeData}
          columns={treeCols}
          expandable={{ expandedRowRender: () => <p>expanded</p> }}
          pagination={false}
        />,
      )
      // In tree mode, expand icons are inline in the first data cell
      expect(getHeaderCells(container)).toHaveLength(1)
    })

    it('defaultExpandAllRows expands all', () => {
      render(
        <Table
          dataSource={treeData}
          columns={treeCols}
          expandable={{ defaultExpandAllRows: true }}
          pagination={false}
        />,
      )
      expect(screen.getByText('Child 1')).toBeTruthy()
      expect(screen.getByText('Child 2')).toBeTruthy()
    })
  })

  // ============================================================================
  // Title and Footer
  // ============================================================================

  describe('title and footer', () => {
    it('renders title above the table', () => {
      render(
        <Table
          dataSource={dataSource}
          columns={columns}
          title={() => 'Table Title'}
          pagination={false}
        />,
      )
      expect(screen.getByText('Table Title')).toBeTruthy()
    })

    it('renders footer below the table', () => {
      render(
        <Table
          dataSource={dataSource}
          columns={columns}
          footer={() => 'Table Footer'}
          pagination={false}
        />,
      )
      expect(screen.getByText('Table Footer')).toBeTruthy()
    })

    it('title receives current page data', () => {
      const titleFn = vi.fn(() => 'Title')
      render(
        <Table
          dataSource={dataSource}
          columns={columns}
          title={titleFn}
          pagination={false}
        />,
      )
      expect(titleFn).toHaveBeenCalledWith(dataSource)
    })

    it('footer receives current page data', () => {
      const footerFn = vi.fn(() => 'Footer')
      render(
        <Table
          dataSource={dataSource}
          columns={columns}
          footer={footerFn}
          pagination={false}
        />,
      )
      expect(footerFn).toHaveBeenCalledWith(dataSource)
    })
  })

  // ============================================================================
  // Row hover
  // ============================================================================

  describe('row hover', () => {
    it('mouseEnter sets background on row', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} pagination={false} />,
      )
      const row = getBodyRows(container)[0]
      fireEvent.mouseEnter(row)
      expect(row.style.backgroundColor).toBeTruthy()
    })

    it('mouseLeave resets background', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} pagination={false} />,
      )
      const row = getBodyRows(container)[0]
      fireEvent.mouseEnter(row)
      fireEvent.mouseLeave(row)
      expect(row.style.backgroundColor).toBe('')
    })

    it('no hover when rowHoverable=false', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} rowHoverable={false} pagination={false} />,
      )
      const row = getBodyRows(container)[0]
      const bgBefore = row.style.backgroundColor
      fireEvent.mouseEnter(row)
      expect(row.style.backgroundColor).toBe(bgBefore)
    })
  })

  // ============================================================================
  // Column groups
  // ============================================================================

  describe('column groups', () => {
    it('renders multi-row header for grouped columns', () => {
      const groupCols: ColumnType<User>[] = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
          title: 'Details',
          key: 'details',
          children: [
            { title: 'Age', dataIndex: 'age', key: 'age' },
            { title: 'City', dataIndex: 'city', key: 'city' },
          ],
        },
      ]
      const { container } = render(
        <Table dataSource={dataSource} columns={groupCols} pagination={false} />,
      )
      const thead = getThead(container)!
      const headerRows = Array.from(thead.querySelectorAll('tr'))
      expect(headerRows.length).toBe(2) // two header rows
    })

    it('parent group header spans child columns', () => {
      const groupCols: ColumnType<User>[] = [
        {
          title: 'Group',
          key: 'group',
          children: [
            { title: 'Age', dataIndex: 'age', key: 'age' },
            { title: 'City', dataIndex: 'city', key: 'city' },
          ],
        },
      ]
      const { container } = render(
        <Table dataSource={dataSource} columns={groupCols} pagination={false} />,
      )
      const groupTh = screen.getByText('Group').closest('th') as HTMLElement
      expect(groupTh.getAttribute('colspan')).toBe('2')
    })
  })

  // ============================================================================
  // onRow
  // ============================================================================

  describe('onRow', () => {
    it('applies custom row attributes', () => {
      const { container } = render(
        <Table
          dataSource={dataSource}
          columns={columns}
          onRow={(record: User) => ({
            'data-name': record.name,
          } as any)}
          pagination={false}
        />,
      )
      const rows = getBodyRows(container)
      expect(rows[0].getAttribute('data-name')).toBe('Alice')
    })

    it('custom onClick on row is called', () => {
      const onClick = vi.fn()
      const { container } = render(
        <Table
          dataSource={dataSource}
          columns={columns}
          onRow={() => ({ onClick })}
          pagination={false}
        />,
      )
      fireEvent.click(getBodyRows(container)[0])
      expect(onClick).toHaveBeenCalled()
    })
  })

  // ============================================================================
  // Filtering
  // ============================================================================

  describe('filtering', () => {
    it('renders filter icon for columns with filters', () => {
      const filterCols: ColumnType<User>[] = [
        {
          title: 'City',
          dataIndex: 'city',
          key: 'city',
          filters: [
            { text: 'NYC', value: 'NYC' },
            { text: 'LA', value: 'LA' },
          ],
          onFilter: (value, record: User) => record.city === value,
        },
      ]
      const { container } = render(
        <Table dataSource={dataSource} columns={filterCols} pagination={false} />,
      )
      // Filter icon is an SVG inside the header
      const th = getHeaderCells(container)[0]
      const filterIcon = th.querySelector('svg[width="12"]')
      expect(filterIcon).toBeTruthy()
    })

    it('defaultFilteredValue applies on initial render', () => {
      const filterCols: ColumnType<User>[] = [
        {
          title: 'City',
          dataIndex: 'city',
          key: 'city',
          filters: [
            { text: 'NYC', value: 'NYC' },
            { text: 'LA', value: 'LA' },
          ],
          onFilter: (value, record: User) => record.city === String(value),
          defaultFilteredValue: ['NYC'],
        },
      ]
      const { container } = render(
        <Table dataSource={dataSource} columns={filterCols} pagination={false} />,
      )
      const rows = getBodyRows(container)
      // Only NYC rows: Alice and Diana
      expect(rows).toHaveLength(2)
    })
  })

  // ============================================================================
  // Semantic classNames
  // ============================================================================

  describe('semantic classNames', () => {
    it('applies classNames.root', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} classNames={{ root: 'tbl-root' }} />,
      )
      expect(getRoot(container).className).toContain('tbl-root')
    })

    it('applies classNames.header', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} classNames={{ header: 'tbl-header' }} />,
      )
      expect(getThead(container)!.className).toContain('tbl-header')
    })

    it('applies classNames.body', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} classNames={{ body: 'tbl-body' }} />,
      )
      expect(getTbody(container).className).toContain('tbl-body')
    })

    it('applies classNames.row', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} classNames={{ row: 'tbl-row' }} pagination={false} />,
      )
      const rows = getBodyRows(container)
      rows.forEach(row => {
        expect(row.className).toContain('tbl-row')
      })
    })

    it('applies classNames.headerCell', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} classNames={{ headerCell: 'tbl-hc' }} />,
      )
      const headers = getHeaderCells(container)
      headers.forEach(th => {
        expect(th.className).toContain('tbl-hc')
      })
    })

    it('applies classNames.cell', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} classNames={{ cell: 'tbl-cell' }} pagination={false} />,
      )
      const rows = getBodyRows(container)
      getCellsInRow(rows[0]).forEach(td => {
        expect(td.className).toContain('tbl-cell')
      })
    })
  })

  // ============================================================================
  // Semantic styles
  // ============================================================================

  describe('semantic styles', () => {
    it('applies styles.root', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} styles={{ root: { margin: '1rem' } }} />,
      )
      expect(getRoot(container).style.margin).toBe('1rem')
    })

    it('applies styles.header', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} styles={{ header: { opacity: '0.9' } }} />,
      )
      expect(getThead(container)!.style.opacity).toBe('0.9')
    })

    it('applies styles.headerCell', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} styles={{ headerCell: { letterSpacing: '1px' } }} />,
      )
      const ths = getHeaderCells(container)
      ths.forEach(th => {
        expect(th.style.letterSpacing).toBe('1px')
      })
    })

    it('applies styles.cell', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} styles={{ cell: { verticalAlign: 'top' } }} pagination={false} />,
      )
      const rows = getBodyRows(container)
      getCellsInRow(rows[0]).forEach(td => {
        expect(td.style.verticalAlign).toBe('top')
      })
    })
  })

  // ============================================================================
  // className / style
  // ============================================================================

  describe('className / style', () => {
    it('applies className to root', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} className="my-table" />,
      )
      expect(getRoot(container).className).toContain('my-table')
    })

    it('applies style to root', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} style={{ maxWidth: '600px' }} />,
      )
      expect(getRoot(container).style.maxWidth).toBe('600px')
    })
  })

  // ============================================================================
  // Header cell styling
  // ============================================================================

  describe('header cell styling', () => {
    it('header cells have font-weight 600', () => {
      const { container } = render(<Table dataSource={dataSource} columns={columns} />)
      getHeaderCells(container).forEach(th => {
        expect(th.style.fontWeight).toBe('600')
      })
    })

    it('header cells have bottom border', () => {
      const { container } = render(<Table dataSource={dataSource} columns={columns} />)
      getHeaderCells(container).forEach(th => {
        expect(th.style.borderBottom).toContain('1px solid')
      })
    })

    it('body cells have bottom border', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} pagination={false} />,
      )
      const row = getBodyRows(container)[0]
      getCellsInRow(row).forEach(td => {
        expect(td.style.borderBottom).toContain('1px solid')
      })
    })
  })

  // ============================================================================
  // Edge cases
  // ============================================================================

  describe('edge cases', () => {
    it('renders with no columns', () => {
      const { container } = render(<Table dataSource={dataSource} columns={[]} />)
      expect(getRoot(container)).toBeTruthy()
    })

    it('renders with no dataSource', () => {
      const { container } = render(<Table columns={columns} />)
      expect(getRoot(container)).toBeTruthy()
    })

    it('renders with undefined dataSource and columns', () => {
      const { container } = render(<Table />)
      expect(getRoot(container)).toBeTruthy()
    })

    it('non-sortable header has no pointer cursor', () => {
      const { container } = render(
        <Table dataSource={dataSource} columns={columns} />,
      )
      const th = getHeaderCells(container)[0]
      expect(th.style.cursor).not.toBe('pointer')
    })

    it('header cells have nowrap white-space', () => {
      const { container } = render(<Table dataSource={dataSource} columns={columns} />)
      getHeaderCells(container).forEach(th => {
        expect(th.style.whiteSpace).toBe('nowrap')
      })
    })

    it('table has separate border-spacing when not bordered', () => {
      const { container } = render(<Table dataSource={dataSource} columns={columns} />)
      expect(getTable(container).style.borderCollapse).toBe('separate')
    })
  })
})
