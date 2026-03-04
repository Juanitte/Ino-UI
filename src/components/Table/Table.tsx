import {
  useState,
  useMemo,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  Fragment,
  type ReactNode,
  type CSSProperties,
  type HTMLAttributes,
} from 'react'
import { createPortal } from 'react-dom'
import { tokens } from '../../theme/tokens'
import type { SemanticClassNames, SemanticStyles } from '../../utils/semanticDom'
import { mergeSemanticClassName, mergeSemanticStyle } from '../../utils/semanticDom'
import { Checkbox } from '../Checkbox'
import type { CheckboxProps } from '../Checkbox'
import { Radio } from '../Radio'
import { Pagination } from '../Pagination'
import type { PaginationSize } from '../Pagination'
import { Empty } from '../Empty'

// ─── Types ──────────────────────────────────────────────────────────────────────

export type TableSize = 'large' | 'middle' | 'small'
export type SortOrder = 'ascend' | 'descend' | null
export type SortDirection = 'ascend' | 'descend'

export type TableSemanticSlot =
  | 'root' | 'header' | 'headerRow' | 'headerCell'
  | 'body' | 'row' | 'cell' | 'pagination'
  | 'empty' | 'loading' | 'expandedRow'
  | 'title' | 'footer' | 'filterDropdown'

export type TableClassNames = SemanticClassNames<TableSemanticSlot>
export type TableStyles = SemanticStyles<TableSemanticSlot>

export interface ColumnFilterItem {
  text: string
  value: string | number | boolean
  children?: ColumnFilterItem[]
}

export interface FilterDropdownProps {
  selectedKeys: (string | number | boolean)[]
  setSelectedKeys: (keys: (string | number | boolean)[]) => void
  confirm: () => void
  clearFilters: () => void
  close: () => void
}

export interface ColumnType<T = any> {
  /** Column header text */
  title?: ReactNode
  /** Data field path — supports nested via string[] */
  dataIndex?: string | string[]
  /** Unique key for the column */
  key?: string
  /** Custom cell renderer */
  render?: (value: any, record: T, index: number) => ReactNode
  /** Text alignment */
  align?: 'left' | 'right' | 'center'
  /** Column width */
  width?: string | number
  /** Truncate cell content with ellipsis */
  ellipsis?: boolean
  /** Sort comparator, true for default, or object with compare + multiple priority */
  sorter?: ((a: T, b: T) => number) | boolean | { compare: (a: T, b: T) => number; multiple?: number }
  /** Controlled sort order */
  sortOrder?: SortOrder
  /** Default sort order (uncontrolled) */
  defaultSortOrder?: SortOrder
  /** Allowed sort directions */
  sortDirections?: SortDirection[]
  /** Filter menu items */
  filters?: ColumnFilterItem[]
  /** Filter function applied per value */
  onFilter?: (value: string | number | boolean, record: T) => boolean
  /** Allow multiple filter selections (default true) */
  filterMultiple?: boolean
  /** Controlled filter values */
  filteredValue?: (string | number | boolean)[]
  /** Default filter values (uncontrolled) */
  defaultFilteredValue?: (string | number | boolean)[]
  /** Enable search in filter dropdown */
  filterSearch?: boolean | ((input: string, record: ColumnFilterItem) => boolean)
  /** Custom filter dropdown render */
  filterDropdown?: ReactNode | ((props: FilterDropdownProps) => ReactNode)
  /** Custom filter icon */
  filterIcon?: ReactNode | ((filtered: boolean) => ReactNode)
  /** Trigger filter when dropdown closes (default true) */
  filterOnClose?: boolean
  /** Hide this column */
  hidden?: boolean
  /** Extra className for this column */
  className?: string
  /** Fix column position for horizontal scroll */
  fixed?: 'left' | 'right' | boolean
  /** Nested columns for grouped headers */
  children?: ColumnType<T>[]
  /** Cell props setter */
  onCell?: (record: T, index: number) => HTMLAttributes<HTMLTableCellElement>
  /** Header cell props setter */
  onHeaderCell?: (column: ColumnType<T>) => HTMLAttributes<HTMLTableCellElement>
}

export interface TableRowSelection<T = any> {
  /** Selection type */
  type?: 'checkbox' | 'radio'
  /** Currently selected row keys (controlled) */
  selectedRowKeys?: (string | number)[]
  /** Callback on selection change */
  onChange?: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void
  /** Callback when a single row is selected/deselected */
  onSelect?: (record: T, selected: boolean, selectedRows: T[]) => void
  /** Customize checkbox/radio props per row */
  getCheckboxProps?: (record: T) => Partial<CheckboxProps>
  /** Width of the selection column */
  columnWidth?: string | number
  /** Hide header select-all checkbox */
  hideSelectAll?: boolean
  /** Preserve selection when data changes */
  preserveSelectedRowKeys?: boolean
}

export interface TableExpandable<T = any> {
  /** Render expanded row content */
  expandedRowRender?: (record: T, index: number, indent: number, expanded: boolean) => ReactNode
  /** Controlled expanded row keys */
  expandedRowKeys?: (string | number)[]
  /** Default expanded row keys (uncontrolled) */
  defaultExpandedRowKeys?: (string | number)[]
  /** Default expand all rows */
  defaultExpandAllRows?: boolean
  /** Callback when a row is expanded/collapsed */
  onExpand?: (expanded: boolean, record: T) => void
  /** Callback when expanded rows change */
  onExpandedRowsChange?: (expandedKeys: (string | number)[]) => void
  /** Determine if a row is expandable */
  rowExpandable?: (record: T) => boolean
  /** Click row to expand */
  expandRowByClick?: boolean
  /** Width of the expand column */
  columnWidth?: string | number
  /** Show the expand column */
  showExpandColumn?: boolean
}

export interface TablePaginationConfig {
  total?: number
  current?: number
  pageSize?: number
  defaultPageSize?: number
  defaultCurrent?: number
  size?: PaginationSize
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  showTotal?: (total: number, range: [number, number]) => ReactNode
  simple?: boolean
  hideOnSinglePage?: boolean
  disabled?: boolean
  position?: ('topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight')[]
  onChange?: (page: number, pageSize: number) => void
}

export interface SorterResult<T = any> {
  column?: ColumnType<T>
  order?: SortOrder
  field?: string | string[]
  columnKey?: string
}

export interface TableProps<T = any> {
  /** Data records array */
  dataSource?: T[]
  /** Column definitions */
  columns?: ColumnType<T>[]
  /** Row key — string field name or function */
  rowKey?: string | ((record: T) => string | number)
  /** Show table borders */
  bordered?: boolean
  /** Table size */
  size?: TableSize
  /** Show table header */
  showHeader?: boolean
  /** Loading state */
  loading?: boolean
  /** Pagination config or false to disable */
  pagination?: TablePaginationConfig | false
  /** Row selection config */
  rowSelection?: TableRowSelection<T>
  /** Scroll config (y for fixed header, x for fixed columns) */
  scroll?: { x?: number | string; y?: number | string }
  /** Expandable config */
  expandable?: TableExpandable<T>
  /** Global sort directions */
  sortDirections?: SortDirection[]
  /** Enable row hover effect */
  rowHoverable?: boolean
  /** Title rendered above the table */
  title?: (currentPageData: T[]) => ReactNode
  /** Footer rendered below the table */
  footer?: (currentPageData: T[]) => ReactNode
  /** Field name for tree data children (default 'children') */
  childrenColumnName?: string
  /** Indent size for tree data in px (default 15) */
  indentSize?: number
  /** Keep showing previous data while loading (useful for server-side pagination) */
  keepPreviousData?: boolean
  /** Callback when pagination, sorter, or filters change */
  onChange?: (
    pagination: { current: number; pageSize: number },
    sorter: SorterResult<T> | SorterResult<T>[],
    filters: Record<string, (string | number | boolean)[] | null>,
  ) => void
  /** Set custom HTML attributes on each row */
  onRow?: (record: T, index: number) => HTMLAttributes<HTMLTableRowElement>
  /** Table layout mode */
  tableLayout?: 'auto' | 'fixed'
  /** Locale for i18n */
  locale?: { emptyText?: ReactNode }
  /** Root CSS class */
  className?: string
  /** Root inline style */
  style?: CSSProperties
  /** Semantic class names */
  classNames?: TableClassNames
  /** Semantic styles */
  styles?: TableStyles
}

// ─── Icons ──────────────────────────────────────────────────────────────────────

function SortIcon({ order }: { order: SortOrder }) {
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', marginLeft: '0.25rem', gap: '0.0625rem', lineHeight: 0 }}>
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ opacity: order === 'ascend' ? 1 : 0.3 }}>
        <path d="M5 0.5L9 5.5H1L5 0.5Z" fill="currentColor" />
      </svg>
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ opacity: order === 'descend' ? 1 : 0.3 }}>
        <path d="M5 5.5L1 0.5H9L5 5.5Z" fill="currentColor" />
      </svg>
    </span>
  )
}

function ExpandIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="10" height="10" viewBox="0 0 10 10"
      fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ transition: 'transform 0.2s ease', transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)', cursor: 'pointer' }}
    >
      <path d="M3.5 2L7 5L3.5 8" />
    </svg>
  )
}

function FilterIconSvg({ active }: { active: boolean }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 12 12"
      fill={active ? tokens.colorPrimary : 'none'}
      stroke={active ? tokens.colorPrimary : 'currentColor'}
      strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
      style={{ opacity: active ? 1 : 0.5 }}
    >
      <path d="M1.5 2.5h9L7 6.5V10L5 9V6.5L1.5 2.5z" />
    </svg>
  )
}

// ─── Helpers ────────────────────────────────────────────────────────────────────

function getRowKey<T>(
  record: T,
  index: number,
  rowKey: string | ((record: T) => string | number),
): string | number {
  if (typeof rowKey === 'function') return rowKey(record)
  return (record as any)[rowKey] ?? index
}

function getNestedValue(record: any, dataIndex?: string | string[]): any {
  if (!dataIndex) return undefined
  if (typeof dataIndex === 'string') return record?.[dataIndex]
  return dataIndex.reduce((obj, key) => obj?.[key], record)
}

function getColumnKey<T>(column: ColumnType<T>, index: number): string {
  if (column.key) return column.key
  if (typeof column.dataIndex === 'string') return column.dataIndex
  if (Array.isArray(column.dataIndex)) return column.dataIndex.join('.')
  return String(index)
}

function getSorterFn<T>(col: ColumnType<T>): ((a: T, b: T) => number) | null {
  if (!col.sorter) return null
  if (typeof col.sorter === 'function') return col.sorter
  if (typeof col.sorter === 'object' && 'compare' in col.sorter) return col.sorter.compare
  return (a: T, b: T) => {
    const aVal = getNestedValue(a, col.dataIndex)
    const bVal = getNestedValue(b, col.dataIndex)
    if (aVal < bVal) return -1
    if (aVal > bVal) return 1
    return 0
  }
}

function getLeafColumns<T>(columns: ColumnType<T>[]): ColumnType<T>[] {
  const result: ColumnType<T>[] = []
  for (const col of columns) {
    if (col.hidden) continue
    if (col.children?.length) result.push(...getLeafColumns(col.children))
    else result.push(col)
  }
  return result
}

interface HeaderCell<T> {
  column: ColumnType<T>
  colSpan: number
  rowSpan: number
  isLeaf: boolean
}

function getHeaderRows<T>(columns: ColumnType<T>[]): HeaderCell<T>[][] {
  function getMaxDepth(cols: ColumnType<T>[]): number {
    let max = 1
    for (const col of cols) {
      if (col.hidden) continue
      if (col.children?.length) max = Math.max(max, 1 + getMaxDepth(col.children))
    }
    return max
  }

  function countLeaves(cols: ColumnType<T>[]): number {
    let count = 0
    for (const col of cols) {
      if (col.hidden) continue
      if (col.children?.length) count += countLeaves(col.children)
      else count++
    }
    return count
  }

  const maxDepth = getMaxDepth(columns)
  const rows: HeaderCell<T>[][] = Array.from({ length: maxDepth }, () => [])

  function traverse(cols: ColumnType<T>[], depth: number) {
    for (const col of cols) {
      if (col.hidden) continue
      if (col.children?.length) {
        const leafCount = countLeaves(col.children)
        if (leafCount > 0) {
          rows[depth].push({ column: col, colSpan: leafCount, rowSpan: 1, isLeaf: false })
          traverse(col.children, depth + 1)
        }
      } else {
        rows[depth].push({ column: col, colSpan: 1, rowSpan: maxDepth - depth, isLeaf: true })
      }
    }
  }

  traverse(columns, 0)
  return rows
}

interface FlatRow<T> { record: T; level: number; hasChildren: boolean; exiting?: boolean }

function flattenTreeData<T>(
  data: T[],
  childrenField: string,
  expandedKeySet: Set<string | number>,
  exitingParentKeys: Set<string | number>,
  rowKey: string | ((record: T) => string | number),
  level: number = 0,
): FlatRow<T>[] {
  const result: FlatRow<T>[] = []
  for (let i = 0; i < data.length; i++) {
    const record = data[i]
    const children = (record as any)[childrenField] as T[] | undefined
    const hasChildren = Array.isArray(children) && children.length > 0
    result.push({ record, level, hasChildren })
    if (hasChildren) {
      const key = getRowKey(record, i, rowKey)
      const isExpanded = expandedKeySet.has(key)
      const isExiting = exitingParentKeys.has(key)
      if (isExpanded || isExiting) {
        const childRows = flattenTreeData(children!, childrenField, expandedKeySet, exitingParentKeys, rowKey, level + 1)
        if (isExiting && !isExpanded) {
          childRows.forEach(r => { r.exiting = true })
        }
        result.push(...childRows)
      }
    }
  }
  return result
}

// ─── Size Config ────────────────────────────────────────────────────────────────

const SIZE_CONFIG: Record<TableSize, { cellPaddingV: string; cellPaddingH: string; fontSize: string }> = {
  large:  { cellPaddingV: '1rem',     cellPaddingH: '1rem',    fontSize: '0.875rem' },
  middle: { cellPaddingV: '0.625rem', cellPaddingH: '0.75rem', fontSize: '0.875rem' },
  small:  { cellPaddingV: '0.375rem', cellPaddingH: '0.5rem',  fontSize: '0.8125rem' },
}

// ─── Loading Spinner ────────────────────────────────────────────────────────────

function LoadingSpinner() {
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([])
  useEffect(() => {
    let raf: number
    const start = performance.now()
    const animate = (time: number) => {
      const elapsed = time - start
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return
        const phase = (elapsed / 400 + i * 0.33) % 1
        const scale = 0.5 + 0.5 * Math.sin(phase * Math.PI)
        dot.style.opacity = String(0.3 + 0.7 * scale)
        dot.style.transform = `scale(${0.8 + 0.4 * scale})`
      })
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div style={{ display: 'flex', gap: '0.375rem' }}>
      {[0, 1, 2].map(i => (
        <span
          key={i}
          ref={el => { dotsRef.current[i] = el }}
          style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', backgroundColor: tokens.colorPrimary }}
        />
      ))}
    </div>
  )
}

// ─── Expanded Row Wrapper (animated) ────────────────────────────────────────────

function ExpandedRowWrapper({ expanded, children }: { expanded: boolean; children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const mountedRef = useRef(false)

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    if (!mountedRef.current) {
      mountedRef.current = true
      wrapper.style.maxHeight = expanded ? 'none' : '0px'
      wrapper.style.opacity = expanded ? '1' : '0'
      return
    }
    const body = bodyRef.current
    if (!body) return
    if (expanded) {
      const h = body.scrollHeight
      wrapper.style.transition = 'none'
      wrapper.style.maxHeight = '0px'
      wrapper.style.opacity = '0'
      void wrapper.offsetHeight
      wrapper.style.transition = 'max-height 300ms ease, opacity 200ms ease'
      wrapper.style.maxHeight = h + 'px'
      wrapper.style.opacity = '1'
    } else {
      const h = body.scrollHeight
      wrapper.style.transition = 'none'
      wrapper.style.maxHeight = h + 'px'
      void wrapper.offsetHeight
      wrapper.style.transition = 'max-height 300ms ease, opacity 200ms ease'
      wrapper.style.maxHeight = '0px'
      wrapper.style.opacity = '0'
    }
  }, [expanded])

  const handleTransitionEnd = useCallback((e: React.TransitionEvent) => {
    if (e.propertyName !== 'max-height') return
    if (expanded && wrapperRef.current) wrapperRef.current.style.maxHeight = 'none'
  }, [expanded])

  return (
    <div ref={wrapperRef} style={{ overflow: 'hidden' }} onTransitionEnd={handleTransitionEnd}>
      <div ref={bodyRef}>{children}</div>
    </div>
  )
}

// ─── Filter Dropdown Panel ──────────────────────────────────────────────────────

function FilterDropdownPanel({
  column,
  filterValues,
  rect,
  onConfirm,
  onReset,
  onClose,
}: {
  column: ColumnType<any>
  filterValues: (string | number | boolean)[]
  rect: DOMRect
  onConfirm: (values: (string | number | boolean)[]) => void
  onReset: () => void
  onClose: () => void
}) {
  const [tempSelected, setTempSelected] = useState(filterValues)
  const [searchText, setSearchText] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Click outside + ESC to close
  useEffect(() => {
    const mouseHandler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        if (column.filterOnClose !== false) onConfirm(tempSelected)
        onClose()
      }
    }
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (column.filterOnClose !== false) onConfirm(tempSelected)
        onClose()
      }
    }
    document.addEventListener('mousedown', mouseHandler)
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('mousedown', mouseHandler)
      document.removeEventListener('keydown', keyHandler)
    }
  }, [tempSelected, onConfirm, onClose, column.filterOnClose])

  // Custom filter dropdown
  if (column.filterDropdown) {
    const content = typeof column.filterDropdown === 'function'
      ? column.filterDropdown({
          selectedKeys: tempSelected,
          setSelectedKeys: setTempSelected,
          confirm: () => { onConfirm(tempSelected); onClose() },
          clearFilters: () => { setTempSelected([]); onReset() },
          close: onClose,
        })
      : column.filterDropdown

    return createPortal(
      <div ref={dropdownRef} style={{ position: 'fixed', top: rect.bottom + 4, left: rect.left, zIndex: 1050 }}>
        {content}
      </div>,
      document.body,
    )
  }

  const items = column.filters ?? []
  const filteredItems = searchText
    ? items.filter(item => {
        if (typeof column.filterSearch === 'function') return column.filterSearch(searchText, item)
        return item.text.toLowerCase().includes(searchText.toLowerCase())
      })
    : items

  const dropdown = (
    <div
      ref={dropdownRef}
      style={{
        position: 'fixed',
        top: rect.bottom + 4,
        left: Math.max(8, rect.right - 200),
        zIndex: 1050,
        minWidth: '10rem',
        maxWidth: '18rem',
        backgroundColor: tokens.colorBg,
        border: `1px solid ${tokens.colorBorder}`,
        borderRadius: '0.5rem',
        boxShadow: tokens.shadowMd,
        padding: '0.5rem',
      }}
    >
      {/* Search input */}
      {column.filterSearch && (
        <input
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder="Search filters"
          style={{
            width: '100%',
            boxSizing: 'border-box' as const,
            padding: '0.25rem 0.5rem',
            marginBottom: '0.5rem',
            border: `1px solid ${tokens.colorBorder}`,
            borderRadius: '0.25rem',
            fontSize: '0.8125rem',
            outline: 'none',
            backgroundColor: tokens.colorBg,
            color: tokens.colorText,
          }}
        />
      )}

      {/* Filter items */}
      <div style={{ maxHeight: '12rem', overflowY: 'auto', scrollbarWidth: 'thin' as const, scrollbarColor: `${tokens.colorBorderHover} transparent` }}>
        {filteredItems.map(item => {
          const checked = tempSelected.includes(item.value)
          return (
            <label
              key={String(item.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                padding: '0.25rem 0.25rem',
                cursor: 'pointer',
                fontSize: '0.8125rem',
                color: tokens.colorText,
                borderRadius: '0.25rem',
              }}
            >
              {column.filterMultiple !== false ? (
                <Checkbox
                  checked={checked}
                  onChange={() =>
                    setTempSelected(prev =>
                      checked ? prev.filter(v => v !== item.value) : [...prev, item.value],
                    )
                  }
                />
              ) : (
                <Radio
                  checked={checked}
                  onChange={() => setTempSelected([item.value])}
                />
              )}
              {item.text}
            </label>
          )
        })}
      </div>

      {/* OK / Reset */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: `1px solid ${tokens.colorBorder}`,
        marginTop: '0.5rem',
        paddingTop: '0.5rem',
        gap: '0.5rem',
      }}>
        <button
          onClick={() => { setTempSelected([]); onReset(); onClose() }}
          style={{
            padding: '0.25rem 0.5rem',
            border: `1px solid ${tokens.colorBorder}`,
            borderRadius: '0.25rem',
            backgroundColor: tokens.colorBg,
            color: tokens.colorTextMuted,
            cursor: 'pointer',
            fontSize: '0.75rem',
          }}
        >
          Reset
        </button>
        <button
          onClick={() => { onConfirm(tempSelected); onClose() }}
          style={{
            padding: '0.25rem 0.5rem',
            border: 'none',
            borderRadius: '0.25rem',
            backgroundColor: tokens.colorPrimary,
            color: '#fff',
            cursor: 'pointer',
            fontSize: '0.75rem',
          }}
        >
          OK
        </button>
      </div>
    </div>
  )

  return createPortal(dropdown, document.body)
}

// ─── Table Component ────────────────────────────────────────────────────────────

function TableComponent<T = any>({
  dataSource,
  columns,
  rowKey = 'key',
  bordered = false,
  size = 'large',
  showHeader = true,
  loading = false,
  pagination,
  rowSelection,
  scroll,
  expandable,
  sortDirections: globalSortDirections,
  rowHoverable = true,
  title,
  footer,
  childrenColumnName,
  indentSize = 15,
  keepPreviousData = false,
  onChange,
  onRow,
  tableLayout,
  locale,
  className,
  style,
  classNames,
  styles,
}: TableProps<T>) {
  const sc = SIZE_CONFIG[size]
  const childrenField = childrenColumnName ?? 'children'
  const selectedRowBg = `color-mix(in srgb, ${tokens.colorPrimary} 12%, transparent)`

  // ─── Data persistence during loading ───────────────────

  const prevDataRef = useRef(dataSource)
  useEffect(() => {
    if (!loading && dataSource !== undefined) {
      prevDataRef.current = dataSource
    }
  }, [dataSource, loading])
  const effectiveData = (keepPreviousData && loading)
    ? (prevDataRef.current ?? dataSource)
    : dataSource

  // ─── Column processing ──────────────────────────────────

  const hasColumnGroups = useMemo(() =>
    (columns ?? []).some(c => !c.hidden && c.children?.length),
    [columns],
  )

  const visibleColumns = useMemo(() =>
    (columns ?? []).filter(col => !col.hidden),
    [columns],
  )

  const leafColumns = useMemo(() =>
    hasColumnGroups ? getLeafColumns(columns ?? []) : visibleColumns,
    [hasColumnGroups, columns, visibleColumns],
  )

  const headerRows = useMemo(() =>
    hasColumnGroups ? getHeaderRows(columns ?? []) : null,
    [hasColumnGroups, columns],
  )

  const maxHeaderDepth = headerRows?.length ?? 1

  // ─── Tree mode ──────────────────────────────────────────

  const isTreeMode = useMemo(() =>
    (effectiveData ?? []).some(r => {
      const ch = (r as any)[childrenField]
      return Array.isArray(ch) && ch.length > 0
    }),
    [effectiveData, childrenField],
  )

  // ─── Flags ──────────────────────────────────────────────

  const hasSelection = !!rowSelection
  const hasExpandable = !!expandable?.expandedRowRender
  const showExpandColumn = hasExpandable && (expandable?.showExpandColumn !== false) && !isTreeMode
  const totalColCount = leafColumns.length + (showExpandColumn ? 1 : 0) + (hasSelection ? 1 : 0)
  const hasScrollX = !!scroll?.x

  // ─── Sort state (map-based for multi-sort) ─────────────

  const initialSortMap = useMemo(() => {
    const map: Record<string, SortOrder> = {}
    const cols = (columns ?? []).filter(c => !c.hidden)
    const leaves = hasColumnGroups ? getLeafColumns(cols) : cols
    for (let i = 0; i < leaves.length; i++) {
      if (leaves[i].defaultSortOrder) {
        map[getColumnKey(leaves[i], i)] = leaves[i].defaultSortOrder!
      }
    }
    return map
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [internalSortMap, setInternalSortMap] = useState<Record<string, SortOrder>>(initialSortMap)

  const getEffectiveSortOrder = useCallback((col: ColumnType<T>, colKey: string): SortOrder => {
    if (col.sortOrder !== undefined) return col.sortOrder
    return internalSortMap[colKey] ?? null
  }, [internalSortMap])

  // ─── Filter state ──────────────────────────────────────

  const initialFilters = useMemo(() => {
    const filters: Record<string, (string | number | boolean)[]> = {}
    for (let i = 0; i < leafColumns.length; i++) {
      const col = leafColumns[i]
      if (col.defaultFilteredValue) {
        filters[getColumnKey(col, i)] = col.defaultFilteredValue
      }
    }
    return filters
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [internalFilters, setInternalFilters] = useState(initialFilters)
  const [filterState, setFilterState] = useState<{ key: string; rect: DOMRect } | null>(null)

  const getEffectiveFilterValue = useCallback((col: ColumnType<T>, colKey: string): (string | number | boolean)[] => {
    if (col.filteredValue !== undefined) return col.filteredValue
    return internalFilters[colKey] ?? []
  }, [internalFilters])

  // ─── Pagination state ──────────────────────────────────

  const paginationEnabled = pagination !== false
  const pConfig = (paginationEnabled && pagination ? pagination : {}) as TablePaginationConfig

  const [internalCurrent, setInternalCurrent] = useState(pConfig.defaultCurrent ?? 1)
  const [internalPageSize, setInternalPageSize] = useState(pConfig.defaultPageSize ?? 10)

  const pageCurrent = pConfig.current ?? internalCurrent
  const pageSize = pConfig.pageSize ?? internalPageSize

  // ─── Expandable state ──────────────────────────────────

  const initialExpandedKeys = useMemo(() => {
    if (expandable?.defaultExpandAllRows) {
      const allKeys: (string | number)[] = []
      function collectKeys(data: T[], field: string) {
        data.forEach((r, i) => {
          allKeys.push(getRowKey(r, i, rowKey))
          const ch = (r as any)[field] as T[] | undefined
          if (ch?.length) collectKeys(ch, field)
        })
      }
      collectKeys(dataSource ?? [], childrenField)
      return allKeys
    }
    return expandable?.defaultExpandedRowKeys ?? []
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [internalExpandedKeys, setInternalExpandedKeys] = useState<(string | number)[]>(initialExpandedKeys)
  const expandedKeys = expandable?.expandedRowKeys ?? internalExpandedKeys
  const expandedKeySet = useMemo(() => new Set(expandedKeys), [expandedKeys])
  const [treeExitingParents, setTreeExitingParents] = useState<Set<string | number>>(new Set())

  // ─── Data pipeline ─────────────────────────────────────

  // Step 1: Flatten tree data
  const flatRows = useMemo<FlatRow<T>[]>(() => {
    if (isTreeMode) return flattenTreeData(effectiveData ?? [], childrenField, expandedKeySet, treeExitingParents, rowKey)
    return (effectiveData ?? []).map(r => ({ record: r, level: 0, hasChildren: false }))
  }, [effectiveData, isTreeMode, childrenField, expandedKeySet, treeExitingParents, rowKey])

  // Step 2: Filter
  const filteredFlatRows = useMemo(() => {
    const hasActiveFilters = leafColumns.some((col, i) => {
      const key = getColumnKey(col, i)
      const vals = getEffectiveFilterValue(col, key)
      return vals.length > 0 && col.onFilter
    })
    if (!hasActiveFilters) return flatRows

    return flatRows.filter(({ record }) =>
      leafColumns.every((col, i) => {
        const key = getColumnKey(col, i)
        const vals = getEffectiveFilterValue(col, key)
        if (vals.length === 0 || !col.onFilter) return true
        return vals.some(val => col.onFilter!(val, record))
      }),
    )
  }, [flatRows, leafColumns, getEffectiveFilterValue])

  // Step 3: Sort
  const sortedFlatRows = useMemo(() => {
    type ActiveSort = { col: ColumnType<T>; order: SortOrder; priority: number }
    const activeSorts: ActiveSort[] = []

    for (let i = 0; i < leafColumns.length; i++) {
      const col = leafColumns[i]
      const key = getColumnKey(col, i)
      const order = getEffectiveSortOrder(col, key)
      if (!order || !col.sorter) continue
      const priority = typeof col.sorter === 'object' && 'multiple' in col.sorter
        ? (col.sorter.multiple ?? Infinity)
        : Infinity
      activeSorts.push({ col, order, priority })
    }

    if (activeSorts.length === 0) return filteredFlatRows

    activeSorts.sort((a, b) => a.priority - b.priority)

    const copy = [...filteredFlatRows]
    copy.sort((a, b) => {
      for (const { col, order } of activeSorts) {
        const fn = getSorterFn(col)
        if (!fn) continue
        const result = fn(a.record, b.record)
        if (result !== 0) return order === 'descend' ? -result : result
      }
      return 0
    })
    return copy
  }, [filteredFlatRows, leafColumns, getEffectiveSortOrder])

  // Step 4: Paginate
  const paginationTotal = pConfig.total ?? sortedFlatRows.length

  // When total > dataSource length, it's server-side pagination —
  // dataSource already contains only the current page, skip slicing.
  const isServerPagination = pConfig.total !== undefined && pConfig.total > sortedFlatRows.length

  const pageFlatRows = useMemo(() => {
    if (!paginationEnabled || isServerPagination) return sortedFlatRows
    const start = (pageCurrent - 1) * pageSize
    return sortedFlatRows.slice(start, start + pageSize)
  }, [sortedFlatRows, pageCurrent, pageSize, paginationEnabled, isServerPagination])

  const pageRecords = useMemo(() => pageFlatRows.map(r => r.record), [pageFlatRows])

  // ─── onChange helpers ──────────────────────────────────

  const buildSorterParam = useCallback((): SorterResult<T> | SorterResult<T>[] => {
    const result: SorterResult<T>[] = []
    for (let i = 0; i < leafColumns.length; i++) {
      const col = leafColumns[i]
      const key = getColumnKey(col, i)
      const order = getEffectiveSortOrder(col, key)
      if (order && col.sorter) {
        result.push({ column: col, order, field: col.dataIndex, columnKey: key })
      }
    }
    return result.length <= 1 ? (result[0] ?? {}) : result
  }, [leafColumns, getEffectiveSortOrder])

  const buildFiltersParam = useCallback((): Record<string, (string | number | boolean)[] | null> => {
    const result: Record<string, (string | number | boolean)[] | null> = {}
    for (let i = 0; i < leafColumns.length; i++) {
      const col = leafColumns[i]
      if (col.filters || col.filteredValue !== undefined || col.defaultFilteredValue) {
        const key = getColumnKey(col, i)
        const vals = getEffectiveFilterValue(col, key)
        result[key] = vals.length > 0 ? [...vals] : null
      }
    }
    return result
  }, [leafColumns, getEffectiveFilterValue])

  // ─── Sort handler ──────────────────────────────────────

  const handleSortClick = useCallback((col: ColumnType<T>, colKey: string) => {
    if (!col.sorter) return

    const directions = col.sortDirections ?? globalSortDirections ?? (['ascend', 'descend'] as SortDirection[])
    const currentOrder = getEffectiveSortOrder(col, colKey)
    const cycle: SortOrder[] = [...directions, null]
    const currentIdx = cycle.indexOf(currentOrder)
    const nextOrder = cycle[(currentIdx + 1) % cycle.length]

    if (col.sortOrder === undefined) {
      const isMulti = typeof col.sorter === 'object' && 'multiple' in col.sorter && col.sorter.multiple !== undefined
      if (isMulti) {
        setInternalSortMap(prev => ({ ...prev, [colKey]: nextOrder }))
      } else {
        setInternalSortMap({ [colKey]: nextOrder })
      }
    }

    if (!pConfig.current) setInternalCurrent(1)

    onChange?.(
      { current: 1, pageSize },
      { column: col, order: nextOrder, field: col.dataIndex, columnKey: colKey },
      buildFiltersParam(),
    )
  }, [getEffectiveSortOrder, globalSortDirections, onChange, pageSize, pConfig.current, buildFiltersParam])

  // ─── Pagination handler ────────────────────────────────

  const handlePaginationChange = useCallback((page: number, newPageSize: number) => {
    if (!pConfig.current) setInternalCurrent(page)
    if (!pConfig.pageSize) setInternalPageSize(newPageSize)
    pConfig.onChange?.(page, newPageSize)
    onChange?.({ current: page, pageSize: newPageSize }, buildSorterParam(), buildFiltersParam())
  }, [pConfig, onChange, buildSorterParam, buildFiltersParam])

  // ─── Filter handlers ───────────────────────────────────

  const handleFilterConfirm = useCallback((colKey: string, values: (string | number | boolean)[]) => {
    const col = leafColumns.find((c, i) => getColumnKey(c, i) === colKey)
    if (col && col.filteredValue === undefined) {
      setInternalFilters(prev => ({ ...prev, [colKey]: values }))
    }
    if (!pConfig.current) setInternalCurrent(1)
    setFilterState(null)

    const filtersParam = { ...buildFiltersParam(), [colKey]: values.length > 0 ? values : null }
    onChange?.({ current: 1, pageSize }, buildSorterParam(), filtersParam)
  }, [leafColumns, pConfig.current, pageSize, onChange, buildSorterParam, buildFiltersParam])

  const handleFilterReset = useCallback((colKey: string) => {
    const col = leafColumns.find((c, i) => getColumnKey(c, i) === colKey)
    if (col && col.filteredValue === undefined) {
      setInternalFilters(prev => {
        const next = { ...prev }
        delete next[colKey]
        return next
      })
    }
    if (!pConfig.current) setInternalCurrent(1)
    setFilterState(null)

    const filtersParam = { ...buildFiltersParam(), [colKey]: null }
    onChange?.({ current: 1, pageSize }, buildSorterParam(), filtersParam)
  }, [leafColumns, pConfig.current, pageSize, onChange, buildSorterParam, buildFiltersParam])

  // ─── Row selection ─────────────────────────────────────

  const [internalSelectedKeys, setInternalSelectedKeys] = useState<(string | number)[]>([])
  const selectedKeys = rowSelection?.selectedRowKeys ?? internalSelectedKeys

  const selectablePageData = useMemo(() => {
    if (!hasSelection) return []
    return pageFlatRows.filter(({ record }) => {
      const props = rowSelection?.getCheckboxProps?.(record)
      return !props?.disabled
    })
  }, [pageFlatRows, hasSelection, rowSelection])

  const selectablePageKeys = useMemo(() =>
    selectablePageData.map(({ record }, i) => {
      const actualIdx = paginationEnabled ? (pageCurrent - 1) * pageSize + i : i
      return getRowKey(record, actualIdx, rowKey)
    }),
    [selectablePageData, pageCurrent, pageSize, paginationEnabled, rowKey],
  )

  const allPageSelected = selectablePageKeys.length > 0 && selectablePageKeys.every(k => selectedKeys.includes(k))
  const somePageSelected = selectablePageKeys.some(k => selectedKeys.includes(k))
  const indeterminate = somePageSelected && !allPageSelected

  const updateSelection = useCallback((newKeys: (string | number)[]) => {
    const newRows = (effectiveData ?? []).filter(r => newKeys.includes(getRowKey(r, 0, rowKey)))
    if (!rowSelection?.selectedRowKeys) setInternalSelectedKeys(newKeys)
    rowSelection?.onChange?.(newKeys, newRows)
  }, [effectiveData, rowKey, rowSelection])

  const handleSelectAll = useCallback(() => {
    if (allPageSelected) {
      const pageKeySet = new Set(selectablePageKeys)
      updateSelection(selectedKeys.filter(k => !pageKeySet.has(k)))
    } else {
      const keySet = new Set(selectedKeys)
      selectablePageKeys.forEach(k => keySet.add(k))
      updateSelection(Array.from(keySet))
    }
  }, [allPageSelected, selectablePageKeys, selectedKeys, updateSelection])

  const handleRowSelect = useCallback((record: T, key: string | number) => {
    const isRadio = rowSelection?.type === 'radio'
    const isSelected = selectedKeys.includes(key)
    let newKeys: (string | number)[]
    if (isRadio) {
      newKeys = isSelected ? [] : [key]
    } else {
      newKeys = isSelected ? selectedKeys.filter(k => k !== key) : [...selectedKeys, key]
    }
    const newRows = (effectiveData ?? []).filter(r => newKeys.includes(getRowKey(r, 0, rowKey)))
    if (!rowSelection?.selectedRowKeys) setInternalSelectedKeys(newKeys)
    rowSelection?.onChange?.(newKeys, newRows)
    rowSelection?.onSelect?.(record, !isSelected, newRows)
  }, [rowSelection, selectedKeys, effectiveData, rowKey])

  // ─── Expand handler ────────────────────────────────────

  const handleExpandToggle = useCallback((record: T, key: string | number) => {
    const isExpanded = expandedKeys.includes(key)
    const newKeys = isExpanded ? expandedKeys.filter(k => k !== key) : [...expandedKeys, key]

    if (isTreeMode) {
      if (isExpanded) {
        // Collapsing: keep children briefly for exit animation
        setTreeExitingParents(prev => new Set([...prev, key]))
        setTimeout(() => {
          setTreeExitingParents(prev => {
            const next = new Set(prev)
            next.delete(key)
            return next
          })
        }, 300)
      } else {
        // Expanding: cancel any pending exit animation for this key
        setTreeExitingParents(prev => {
          if (!prev.has(key)) return prev
          const next = new Set(prev)
          next.delete(key)
          return next
        })
      }
    }

    if (!expandable?.expandedRowKeys) setInternalExpandedKeys(newKeys)
    expandable?.onExpand?.(!isExpanded, record)
    expandable?.onExpandedRowsChange?.(newKeys)
  }, [expandedKeys, expandable, isTreeMode])

  // ─── Row hover (ref-based) ─────────────────────────────

  const handleRowMouseEnter = useCallback((el: HTMLElement) => {
    if (!rowHoverable) return
    el.style.backgroundColor = tokens.colorBgMuted
    // Update fixed columns too (they have their own background that overrides row bg)
    if (hasScrollX) {
      const cells = el.querySelectorAll<HTMLElement>(':scope > td')
      cells.forEach(cell => {
        if (cell.style.position === 'sticky') cell.style.backgroundColor = tokens.colorBgMuted
      })
    }
  }, [rowHoverable, hasScrollX])

  const handleRowMouseLeave = useCallback((el: HTMLElement, isSelected: boolean) => {
    if (!rowHoverable) return
    el.style.backgroundColor = isSelected ? selectedRowBg : ''
    if (hasScrollX) {
      const fixedBg = isSelected ? selectedRowBg : tokens.colorBg
      const cells = el.querySelectorAll<HTMLElement>(':scope > td')
      cells.forEach(cell => {
        if (cell.style.position === 'sticky') cell.style.backgroundColor = fixedBg
      })
    }
  }, [rowHoverable, selectedRowBg, hasScrollX])

  // ─── Fixed column offsets ──────────────────────────────

  const fixedColumnInfo = useMemo(() => {
    if (!hasScrollX) return {}
    const info: Record<string, { position: 'left' | 'right'; offset: number; isEdge: boolean }> = {}
    const leftKeys: string[] = []
    const rightKeys: string[] = []

    for (let i = 0; i < leafColumns.length; i++) {
      const col = leafColumns[i]
      const key = getColumnKey(col, i)
      const fixed = col.fixed === true ? 'left' : col.fixed
      if (fixed === 'left') leftKeys.push(key)
      else if (fixed === 'right') rightKeys.push(key)
    }

    let leftAcc = 0
    for (let i = 0; i < leftKeys.length; i++) {
      const key = leftKeys[i]
      const col = leafColumns.find((c, j) => getColumnKey(c, j) === key)!
      info[key] = { position: 'left', offset: leftAcc, isEdge: i === leftKeys.length - 1 }
      leftAcc += (typeof col.width === 'number' ? col.width : parseFloat(String(col.width)) || 0)
    }

    let rightAcc = 0
    for (let i = rightKeys.length - 1; i >= 0; i--) {
      const key = rightKeys[i]
      const col = leafColumns.find((c, j) => getColumnKey(c, j) === key)!
      info[key] = { position: 'right', offset: rightAcc, isEdge: i === 0 }
      rightAcc += (typeof col.width === 'number' ? col.width : parseFloat(String(col.width)) || 0)
    }

    return info
  }, [hasScrollX, leafColumns])

  // ─── Styles ────────────────────────────────────────────

  const rootStyle: CSSProperties = {
    ...(bordered ? {
      border: `1px solid ${tokens.colorBorder}`,
      borderRadius: '0.5rem',
      overflow: 'hidden',
    } : {}),
  }

  const scrollContainerStyle: CSSProperties = {
    ...(scroll?.y ? { maxHeight: typeof scroll.y === 'number' ? `${scroll.y / 16}rem` : scroll.y } : {}),
    ...((scroll?.y || hasScrollX) ? { overflow: 'auto' } : {}),
    scrollbarWidth: 'thin' as const,
    scrollbarColor: `${tokens.colorBorderHover} transparent`,
  }

  const tableStyle: CSSProperties = {
    width: '100%',
    ...(hasScrollX ? { minWidth: typeof scroll!.x === 'number' ? `${scroll!.x / 16}rem` : scroll!.x } : {}),
    borderCollapse: bordered ? 'collapse' : 'separate',
    borderSpacing: 0,
    tableLayout: tableLayout ?? ((scroll?.y || hasScrollX) ? 'fixed' : 'auto'),
    fontSize: sc.fontSize,
    fontFamily: 'inherit',
  }

  const headerCellBaseStyle: CSSProperties = {
    padding: `${sc.cellPaddingV} ${sc.cellPaddingH}`,
    textAlign: 'left',
    fontWeight: 600,
    color: tokens.colorText,
    backgroundColor: tokens.colorBgSubtle,
    borderBottom: `1px solid ${tokens.colorBorder}`,
    ...(bordered ? { borderRight: `1px solid ${tokens.colorBorder}` } : {}),
    whiteSpace: 'nowrap',
  }

  const cellBaseStyle: CSSProperties = {
    padding: `${sc.cellPaddingV} ${sc.cellPaddingH}`,
    color: tokens.colorText,
    borderBottom: `1px solid ${tokens.colorBorder}`,
    ...(bordered ? { borderRight: `1px solid ${tokens.colorBorder}` } : {}),
  }

  const theadStickyStyle: CSSProperties = scroll?.y
    ? { position: 'sticky', top: 0, zIndex: 2 }
    : {}

  // ─── Fixed cell style helper ───────────────────────────

  const getFixedCellStyle = useCallback((colKey: string, baseBg: string): CSSProperties => {
    const info = fixedColumnInfo[colKey]
    if (!info) return {}
    return {
      position: 'sticky',
      [info.position]: `${info.offset / 16}rem`,
      zIndex: 1,
      backgroundColor: baseBg,
      ...(info.isEdge ? {
        boxShadow: info.position === 'left' ? '2px 0 4px rgba(0,0,0,0.06)' : '-2px 0 4px rgba(0,0,0,0.06)',
      } : {}),
    }
  }, [fixedColumnInfo])

  // ─── Render pagination ─────────────────────────────────

  const renderPagination = (position: 'top' | 'bottom') => {
    if (!paginationEnabled) return null
    const positions = pConfig.position ?? ['bottomRight']

    const matchingPos = positions.find(p =>
      position === 'top' ? p.startsWith('top') : p.startsWith('bottom'),
    )
    if (!matchingPos) return null

    const justifyContent = matchingPos.endsWith('Left')
      ? 'flex-start'
      : matchingPos.endsWith('Center')
        ? 'center'
        : 'flex-end'

    const paddingStyle = bordered
      ? { padding: '0.75rem 1rem' }
      : { padding: position === 'top' ? '0 0 1rem' : '1rem 0 0' }

    return (
      <div
        className={classNames?.pagination}
        style={mergeSemanticStyle({ display: 'flex', justifyContent, ...paddingStyle }, styles?.pagination)}
      >
        <Pagination
          total={paginationTotal}
          current={pageCurrent}
          pageSize={pageSize}
          size={pConfig.size ?? (size === 'small' ? 'small' : 'default')}
          showSizeChanger={pConfig.showSizeChanger}
          showQuickJumper={pConfig.showQuickJumper}
          showTotal={pConfig.showTotal}
          simple={pConfig.simple}
          hideOnSinglePage={pConfig.hideOnSinglePage}
          disabled={pConfig.disabled}
          onChange={handlePaginationChange}
        />
      </div>
    )
  }

  // ─── Render header cell content ────────────────────────

  const renderHeaderCellContent = (col: ColumnType<T>, colKey: string, isLeaf: boolean) => {
    const isSortable = isLeaf && !!col.sorter
    const sortOrder = isSortable ? getEffectiveSortOrder(col, colKey) : null
    const hasFilters = isLeaf && (col.filters?.length || col.filterDropdown)
    const filterValues = hasFilters ? getEffectiveFilterValue(col, colKey) : []
    const isFiltered = filterValues.length > 0
    const isMultiSorter = typeof col.sorter === 'object' && 'multiple' in col.sorter

    return (
      <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        {col.title}
        {isSortable && <SortIcon order={sortOrder} />}
        {isSortable && isMultiSorter && sortOrder && (
          <span style={{ fontSize: '0.625rem', color: tokens.colorTextMuted, marginLeft: '0.125rem' }}>
            {(col.sorter as { multiple?: number }).multiple}
          </span>
        )}
        {hasFilters && (
          <span
            onClick={(e) => {
              e.stopPropagation()
              const rect = e.currentTarget.getBoundingClientRect()
              setFilterState(prev => prev?.key === colKey ? null : { key: colKey, rect })
            }}
            style={{ display: 'inline-flex', marginLeft: '0.25rem', cursor: 'pointer' }}
          >
            {typeof col.filterIcon === 'function'
              ? col.filterIcon(isFiltered)
              : col.filterIcon ?? <FilterIconSvg active={isFiltered} />}
          </span>
        )}
      </div>
    )
  }

  // ─── Render ────────────────────────────────────────────

  return (
    <div
      className={mergeSemanticClassName(className, classNames?.root)}
      style={mergeSemanticStyle(rootStyle, styles?.root, style)}
    >
      {/* Scrollbar styles for webkit */}
      <style>{`
        .j-table-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
        .j-table-scroll::-webkit-scrollbar-track { background: transparent; }
        .j-table-scroll::-webkit-scrollbar-thumb { background: ${tokens.colorBorderHover}; border-radius: 4px; }
        .j-table-scroll::-webkit-scrollbar-thumb:hover { background: ${tokens.colorTextSubtle}; }
        @keyframes j-tree-enter { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {renderPagination('top')}

      {/* Title */}
      {title && (
        <div
          className={classNames?.title}
          style={mergeSemanticStyle({
            padding: `${sc.cellPaddingV} ${sc.cellPaddingH}`,
            fontWeight: 600,
            borderBottom: `1px solid ${tokens.colorBorder}`,
            backgroundColor: tokens.colorBgSubtle,
          }, styles?.title)}
        >
          {title(pageRecords)}
        </div>
      )}

      <div style={{ position: 'relative' }}>
        {/* Loading overlay */}
        {loading && (
          <div
            className={classNames?.loading}
            style={mergeSemanticStyle({
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: `color-mix(in srgb, ${tokens.colorBg} 60%, transparent)`,
              zIndex: 10,
              borderRadius: bordered ? '0.5rem' : undefined,
            }, styles?.loading)}
          >
            <LoadingSpinner />
          </div>
        )}

        <div className="j-table-scroll" style={scrollContainerStyle}>
          <table style={tableStyle}>
            {/* ── Header ── */}
            {showHeader && (
              <thead
                className={classNames?.header}
                style={mergeSemanticStyle(theadStickyStyle, styles?.header)}
              >
                {headerRows ? (
                  /* Column groups: multi-row header */
                  headerRows.map((row, rowIdx) => (
                    <tr key={rowIdx} className={classNames?.headerRow} style={styles?.headerRow}>
                      {rowIdx === 0 && showExpandColumn && (
                        <th rowSpan={maxHeaderDepth} style={{ ...headerCellBaseStyle, width: expandable?.columnWidth ?? '2.5rem', textAlign: 'center' }} />
                      )}
                      {rowIdx === 0 && hasSelection && (
                        <th rowSpan={maxHeaderDepth} style={{ ...headerCellBaseStyle, width: rowSelection?.columnWidth ?? '2.5rem', textAlign: 'center' }}>
                          {rowSelection?.type !== 'radio' && !rowSelection?.hideSelectAll && (
                            <Checkbox checked={allPageSelected} indeterminate={indeterminate} onChange={handleSelectAll} />
                          )}
                        </th>
                      )}
                      {row.map((cell, cellIdx) => {
                        const col = cell.column
                        let colKey: string
                        if (cell.isLeaf) {
                          const leafIdx = leafColumns.indexOf(col)
                          colKey = getColumnKey(col, leafIdx >= 0 ? leafIdx : cellIdx)
                        } else {
                          colKey = col.key ?? `group-${rowIdx}-${cellIdx}`
                        }
                        const isSortable = cell.isLeaf && !!col.sorter
                        const extraProps = cell.isLeaf ? (col.onHeaderCell?.(col) ?? {}) : {}
                        const { colSpan: hcs, rowSpan: hrs, ...restHeaderProps } = extraProps as any

                        return (
                          <th
                            key={colKey}
                            colSpan={cell.colSpan > 1 ? cell.colSpan : (hcs > 1 ? hcs : undefined)}
                            rowSpan={cell.rowSpan > 1 ? cell.rowSpan : (hrs > 1 ? hrs : undefined)}
                            className={mergeSemanticClassName(col.className, classNames?.headerCell)}
                            style={mergeSemanticStyle(
                              {
                                ...headerCellBaseStyle,
                                textAlign: col.align ?? 'left',
                                width: cell.isLeaf ? col.width : undefined,
                                cursor: isSortable ? 'pointer' : undefined,
                                userSelect: isSortable ? 'none' : undefined,
                                ...getFixedCellStyle(colKey, tokens.colorBgSubtle),
                              },
                              styles?.headerCell,
                            )}
                            onClick={isSortable ? () => handleSortClick(col, colKey) : undefined}
                            {...restHeaderProps}
                          >
                            {renderHeaderCellContent(col, colKey, cell.isLeaf)}
                          </th>
                        )
                      })}
                    </tr>
                  ))
                ) : (
                  /* Simple single-row header */
                  <tr className={classNames?.headerRow} style={styles?.headerRow}>
                    {showExpandColumn && (
                      <th style={{ ...headerCellBaseStyle, width: expandable?.columnWidth ?? '2.5rem', textAlign: 'center' }} />
                    )}
                    {hasSelection && (
                      <th style={{ ...headerCellBaseStyle, width: rowSelection?.columnWidth ?? '2.5rem', textAlign: 'center' }}>
                        {rowSelection?.type !== 'radio' && !rowSelection?.hideSelectAll && (
                          <Checkbox checked={allPageSelected} indeterminate={indeterminate} onChange={handleSelectAll} />
                        )}
                      </th>
                    )}
                    {leafColumns.map((col, colIdx) => {
                      const colKey = getColumnKey(col, colIdx)
                      const isSortable = !!col.sorter
                      const extraProps = col.onHeaderCell?.(col) ?? {}
                      const { colSpan: hcs, rowSpan: hrs, ...restHeaderProps } = extraProps as any
                      if (hcs === 0) return null

                      return (
                        <th
                          key={colKey}
                          colSpan={hcs > 1 ? hcs : undefined}
                          rowSpan={hrs > 1 ? hrs : undefined}
                          className={mergeSemanticClassName(col.className, classNames?.headerCell)}
                          style={mergeSemanticStyle(
                            {
                              ...headerCellBaseStyle,
                              textAlign: col.align ?? 'left',
                              width: col.width,
                              cursor: isSortable ? 'pointer' : undefined,
                              userSelect: isSortable ? 'none' : undefined,
                              ...getFixedCellStyle(colKey, tokens.colorBgSubtle),
                            },
                            styles?.headerCell,
                          )}
                          onClick={isSortable ? () => handleSortClick(col, colKey) : undefined}
                          {...restHeaderProps}
                        >
                          {renderHeaderCellContent(col, colKey, true)}
                        </th>
                      )
                    })}
                  </tr>
                )}
              </thead>
            )}

            {/* ── Body ── */}
            <tbody className={classNames?.body} style={styles?.body}>
              {pageFlatRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={totalColCount}
                    className={classNames?.empty}
                    style={mergeSemanticStyle({ padding: '2rem', textAlign: 'center' as const }, styles?.empty)}
                  >
                    <Empty description={locale?.emptyText ?? 'No data'} />
                  </td>
                </tr>
              ) : (
                pageFlatRows.map(({ record, level, hasChildren, exiting }, pageIdx) => {
                  const actualIdx = paginationEnabled ? (pageCurrent - 1) * pageSize + pageIdx : pageIdx
                  const key = getRowKey(record, actualIdx, rowKey)
                  const isSelected = hasSelection && selectedKeys.includes(key)
                  const isExpanded = expandedKeySet.has(key)
                  const isRowExpandable = !expandable?.rowExpandable || expandable.rowExpandable(record)
                  const rowProps = onRow?.(record, actualIdx) ?? {}
                  const checkboxProps = rowSelection?.getCheckboxProps?.(record)

                  const rowBgStyle: CSSProperties = isSelected ? { backgroundColor: selectedRowBg } : {}
                  const treeAnimStyle: CSSProperties = (isTreeMode && level > 0)
                    ? exiting
                      ? { opacity: 0, transition: 'background-color 0.15s ease, opacity 250ms ease', pointerEvents: 'none' }
                      : { animation: 'j-tree-enter 250ms ease' }
                    : {}

                  return (
                    <Fragment key={String(key)}>
                      <tr
                        {...rowProps}
                        className={classNames?.row}
                        style={mergeSemanticStyle(
                          { transition: 'background-color 0.15s ease', ...rowBgStyle, ...treeAnimStyle },
                          styles?.row,
                        )}
                        onMouseEnter={e => {
                          rowProps.onMouseEnter?.(e)
                          handleRowMouseEnter(e.currentTarget as HTMLElement)
                        }}
                        onMouseLeave={e => {
                          rowProps.onMouseLeave?.(e)
                          handleRowMouseLeave(e.currentTarget as HTMLElement, isSelected)
                        }}
                        onClick={e => {
                          rowProps.onClick?.(e)
                          if (expandable?.expandRowByClick && (hasExpandable || (isTreeMode && hasChildren)) && isRowExpandable) {
                            handleExpandToggle(record, key)
                          }
                        }}
                      >
                        {/* Expand column (non-tree mode) */}
                        {showExpandColumn && (
                          <td style={{ ...cellBaseStyle, textAlign: 'center', width: expandable?.columnWidth ?? '2.5rem' }}>
                            {isRowExpandable && (
                              <span
                                onClick={e => { e.stopPropagation(); handleExpandToggle(record, key) }}
                                style={{ display: 'inline-flex', cursor: 'pointer', color: tokens.colorTextMuted }}
                              >
                                <ExpandIcon expanded={isExpanded} />
                              </span>
                            )}
                          </td>
                        )}

                        {/* Selection cell */}
                        {hasSelection && (
                          <td style={{ ...cellBaseStyle, textAlign: 'center', width: rowSelection?.columnWidth ?? '2.5rem' }}>
                            {rowSelection?.type === 'radio' ? (
                              <Radio checked={isSelected} disabled={checkboxProps?.disabled} onChange={() => handleRowSelect(record, key)} />
                            ) : (
                              <Checkbox checked={isSelected} disabled={checkboxProps?.disabled} onChange={() => handleRowSelect(record, key)} />
                            )}
                          </td>
                        )}

                        {/* Data cells */}
                        {leafColumns.map((col, colIdx) => {
                          const colKey = getColumnKey(col, colIdx)
                          const value = getNestedValue(record, col.dataIndex)
                          const cellContent = col.render ? col.render(value, record, actualIdx) : value
                          const extraCellProps = col.onCell?.(record, actualIdx) ?? {}
                          const { colSpan: cellColSpan, rowSpan: cellRowSpan, style: cellExtraStyle, ...restCellProps } = extraCellProps as any

                          if (cellColSpan === 0 || cellRowSpan === 0) return null

                          const fixedStyle = getFixedCellStyle(
                            colKey,
                            isSelected ? selectedRowBg : tokens.colorBg,
                          )

                          return (
                            <td
                              key={colKey}
                              colSpan={cellColSpan > 1 ? cellColSpan : undefined}
                              rowSpan={cellRowSpan > 1 ? cellRowSpan : undefined}
                              className={mergeSemanticClassName(col.className, classNames?.cell)}
                              style={mergeSemanticStyle(
                                {
                                  ...cellBaseStyle,
                                  textAlign: col.align ?? 'left',
                                  width: col.width,
                                  ...(col.ellipsis ? {
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap' as const,
                                    textOverflow: 'ellipsis',
                                    maxWidth: 0,
                                  } : {}),
                                  ...fixedStyle,
                                },
                                styles?.cell,
                                cellExtraStyle,
                              )}
                              {...restCellProps}
                            >
                              {/* Tree indent + expand icon for first column */}
                              {colIdx === 0 && isTreeMode && (
                                <span style={{ paddingLeft: `${(level * indentSize) / 16}rem`, display: 'inline-flex', alignItems: 'center' }}>
                                  {hasChildren ? (
                                    <span
                                      onClick={e => { e.stopPropagation(); handleExpandToggle(record, key) }}
                                      style={{ cursor: 'pointer', marginRight: '0.25rem', display: 'inline-flex', color: tokens.colorTextMuted }}
                                    >
                                      <ExpandIcon expanded={isExpanded} />
                                    </span>
                                  ) : (
                                    <span style={{ width: '10px', marginRight: '0.25rem', display: 'inline-block' }} />
                                  )}
                                </span>
                              )}
                              {cellContent != null ? cellContent : null}
                            </td>
                          )
                        })}
                      </tr>

                      {/* Expanded row content */}
                      {hasExpandable && isRowExpandable && (
                        <tr
                          className={classNames?.expandedRow}
                          style={mergeSemanticStyle(
                            { backgroundColor: tokens.colorBgSubtle },
                            styles?.expandedRow,
                          )}
                        >
                          <td colSpan={totalColCount} style={{ padding: 0, border: 'none' }}>
                            <ExpandedRowWrapper expanded={isExpanded}>
                              <div style={{ padding: `${sc.cellPaddingV} ${sc.cellPaddingH}`, borderBottom: `1px solid ${tokens.colorBorder}` }}>
                                {expandable!.expandedRowRender!(record, actualIdx, level, isExpanded)}
                              </div>
                            </ExpandedRowWrapper>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      {footer && (
        <div
          className={classNames?.footer}
          style={mergeSemanticStyle({
            padding: `${sc.cellPaddingV} ${sc.cellPaddingH}`,
            borderTop: `1px solid ${tokens.colorBorder}`,
            backgroundColor: tokens.colorBgSubtle,
          }, styles?.footer)}
        >
          {footer(pageRecords)}
        </div>
      )}

      {renderPagination('bottom')}

      {/* Filter dropdown portal */}
      {filterState && (() => {
        const colIdx = leafColumns.findIndex((c, i) => getColumnKey(c, i) === filterState.key)
        const col = leafColumns[colIdx]
        if (!col) return null
        const filterValues = getEffectiveFilterValue(col, filterState.key)
        return (
          <FilterDropdownPanel
            column={col}
            filterValues={filterValues}
            rect={filterState.rect}
            onConfirm={values => handleFilterConfirm(filterState.key, values)}
            onReset={() => handleFilterReset(filterState.key)}
            onClose={() => setFilterState(null)}
          />
        )
      })()}
    </div>
  )
}

// ─── Export ──────────────────────────────────────────────────────────────────────

export const Table = Object.assign(TableComponent, {})
