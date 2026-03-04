import { useState, useEffect, useCallback } from 'react'
import { Table, Text, Toggle, tokens } from '../../index'
import type { ColumnType } from '../../index'
import { Section } from './shared'

// ─── Sample Data ─────────────────────────────────────────────────────────────

interface User {
  key: string
  name: string
  age: number
  address: string
  tags?: string[]
  description?: string
}

const basicData: User[] = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Joe Black', age: 28, address: 'Sydney No. 1 Lake Park' },
  { key: '4', name: 'Jane White', age: 35, address: 'Tokyo No. 1 Lake Park' },
]

const basicColumns: ColumnType<User>[] = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
]

// ─── 1. Basic ────────────────────────────────────────────────────────────────

function BasicDemo() {
  return <Table dataSource={basicData} columns={basicColumns} pagination={false} />
}

// ─── 2. Custom Render ────────────────────────────────────────────────────────

function CustomRenderDemo() {
  const data: User[] = [
    { key: '1', name: 'John Brown', age: 32, address: 'New York', tags: ['developer', 'senior'] },
    { key: '2', name: 'Jim Green', age: 42, address: 'London', tags: ['designer'] },
    { key: '3', name: 'Joe Black', age: 28, address: 'Sydney', tags: ['intern', 'new'] },
  ]

  const columns: ColumnType<User>[] = [
    { title: 'Name', dataIndex: 'name', key: 'name', render: (name: string) => <strong>{name}</strong> },
    { title: 'Age', dataIndex: 'age', key: 'age', align: 'right' },
    { title: 'Address', dataIndex: 'address', key: 'address', ellipsis: true, width: '12rem' },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags: string[]) => (
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          {tags?.map(tag => (
            <span
              key={tag}
              style={{
                padding: '0.125rem 0.5rem',
                borderRadius: '0.75rem',
                fontSize: '0.75rem',
                backgroundColor: tag === 'developer' ? tokens.colorPrimary100 : tag === 'designer' ? tokens.colorSuccess100 : tokens.colorWarning100,
                color: tag === 'developer' ? tokens.colorPrimary700 : tag === 'designer' ? tokens.colorSuccess700 : tokens.colorWarning700,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: User) => (
        <a
          style={{ color: tokens.colorPrimary, cursor: 'pointer', textDecoration: 'none' }}
          onClick={() => alert(`Invite ${record.name}`)}
        >
          Invite
        </a>
      ),
    },
  ]

  return <Table dataSource={data} columns={columns} pagination={false} />
}

// ─── 3. Bordered & Sizes ────────────────────────────────────────────────────

function BorderedSizesDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <Text type="secondary" style={{ display: 'block', marginBottom: '0.5rem' }}>Bordered — Large (default)</Text>
        <Table dataSource={basicData.slice(0, 2)} columns={basicColumns} bordered pagination={false} />
      </div>
      <div>
        <Text type="secondary" style={{ display: 'block', marginBottom: '0.5rem' }}>Middle</Text>
        <Table dataSource={basicData.slice(0, 2)} columns={basicColumns} size="middle" bordered pagination={false} />
      </div>
      <div>
        <Text type="secondary" style={{ display: 'block', marginBottom: '0.5rem' }}>Small</Text>
        <Table dataSource={basicData.slice(0, 2)} columns={basicColumns} size="small" bordered pagination={false} />
      </div>
    </div>
  )
}

// ─── 4. Sorting ─────────────────────────────────────────────────────────────

function SortingDemo() {
  const columns: ColumnType<User>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      defaultSortOrder: 'ascend',
    },
    { title: 'Address', dataIndex: 'address', key: 'address' },
  ]

  return <Table dataSource={basicData} columns={columns} pagination={false} />
}

// ─── 5. Row Selection (Checkbox) ────────────────────────────────────────────

function SelectionCheckboxDemo() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([])

  return (
    <div>
      <Text type="secondary" style={{ display: 'block', marginBottom: '0.5rem' }}>
        Selected: {selectedRowKeys.length} row{selectedRowKeys.length !== 1 ? 's' : ''}
      </Text>
      <Table
        dataSource={basicData}
        columns={basicColumns}
        pagination={false}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
          getCheckboxProps: (record) => ({
            disabled: record.name === 'Jim Green',
          }),
        }}
      />
    </div>
  )
}

// ─── 6. Row Selection (Radio) ───────────────────────────────────────────────

function SelectionRadioDemo() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([])

  return (
    <div>
      <Text type="secondary" style={{ display: 'block', marginBottom: '0.5rem' }}>
        Selected: {selectedRowKeys[0] ? basicData.find(d => d.key === selectedRowKeys[0])?.name : 'None'}
      </Text>
      <Table
        dataSource={basicData}
        columns={basicColumns}
        pagination={false}
        rowSelection={{
          type: 'radio',
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
      />
    </div>
  )
}

// ─── 7. Pagination ──────────────────────────────────────────────────────────

function PaginationDemo() {
  const data: User[] = Array.from({ length: 46 }, (_, i) => ({
    key: String(i + 1),
    name: `User ${i + 1}`,
    age: 20 + (i % 40),
    address: `City ${(i % 5) + 1}, Street ${i + 1}`,
  }))

  return (
    <Table
      dataSource={data}
      columns={basicColumns}
      pagination={{
        pageSize: 5,
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      }}
    />
  )
}

// ─── 8. Fixed Header ────────────────────────────────────────────────────────

function FixedHeaderDemo() {
  const data: User[] = Array.from({ length: 30 }, (_, i) => ({
    key: String(i + 1),
    name: `User ${i + 1}`,
    age: 20 + (i % 40),
    address: `City ${(i % 5) + 1}, Street ${i + 1}`,
  }))

  return (
    <Table
      dataSource={data}
      columns={basicColumns}
      scroll={{ y: 200 }}
      pagination={false}
    />
  )
}

// ─── 9. Expandable Rows ────────────────────────────────────────────────────

function ExpandableDemo() {
  const data: User[] = [
    { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
    { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.' },
    { key: '3', name: 'Joe Black', age: 28, address: 'Sydney No. 1 Lake Park', description: 'My name is Joe Black, I am 28 years old, living in Sydney No. 1 Lake Park.' },
  ]

  return (
    <Table
      dataSource={data}
      columns={basicColumns}
      pagination={false}
      expandable={{
        expandedRowRender: (record) => (
          <Text type="secondary">{record.description}</Text>
        ),
        rowExpandable: (record) => record.name !== 'Jim Green',
      }}
    />
  )
}

// ─── 10. Combined ───────────────────────────────────────────────────────────

function CombinedDemo() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([])

  const data: User[] = Array.from({ length: 20 }, (_, i) => ({
    key: String(i + 1),
    name: `User ${i + 1}`,
    age: 20 + (i % 40),
    address: `City ${(i % 5) + 1}, Street ${i + 1}`,
  }))

  const columns: ColumnType<User>[] = [
    { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
    { title: 'Age', dataIndex: 'age', key: 'age', sorter: (a, b) => a.age - b.age },
    { title: 'Address', dataIndex: 'address', key: 'address', ellipsis: true },
  ]

  return (
    <Table
      dataSource={data}
      columns={columns}
      bordered
      size="middle"
      rowSelection={{
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys),
      }}
      pagination={{ pageSize: 5, showSizeChanger: true }}
    />
  )
}

// ─── 11. Title & Footer ─────────────────────────────────────────────────────

function TitleFooterDemo() {
  return (
    <Table
      dataSource={basicData}
      columns={basicColumns}
      bordered
      pagination={false}
      title={() => 'User List'}
      footer={(data) => `Total: ${data.length} users on this page`}
    />
  )
}

// ─── 12. Multiple Sort ──────────────────────────────────────────────────────

function MultipleSortDemo() {
  const data: User[] = [
    { key: '1', name: 'John Brown', age: 32, address: 'New York' },
    { key: '2', name: 'Jim Green', age: 42, address: 'London' },
    { key: '3', name: 'Joe Black', age: 32, address: 'Sydney' },
    { key: '4', name: 'Jane White', age: 42, address: 'Tokyo' },
    { key: '5', name: 'Jack Brown', age: 28, address: 'Berlin' },
  ]

  const columns: ColumnType<User>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: { compare: (a, b) => a.name.localeCompare(b.name), multiple: 2 },
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: { compare: (a, b) => a.age - b.age, multiple: 1 },
      defaultSortOrder: 'ascend',
    },
    { title: 'Address', dataIndex: 'address', key: 'address' },
  ]

  return (
    <div>
      <Text type="secondary" style={{ display: 'block', marginBottom: '0.5rem' }}>
        Click column headers to sort. Multiple columns can be sorted simultaneously (priority shown as number).
      </Text>
      <Table dataSource={data} columns={columns} pagination={false} />
    </div>
  )
}

// ─── 13. Column Filters ─────────────────────────────────────────────────────

function ColumnFiltersDemo() {
  const data: User[] = [
    { key: '1', name: 'John Brown', age: 32, address: 'New York' },
    { key: '2', name: 'Jim Green', age: 42, address: 'London' },
    { key: '3', name: 'Joe Black', age: 28, address: 'Sydney' },
    { key: '4', name: 'Jane White', age: 35, address: 'New York' },
    { key: '5', name: 'Jack Brown', age: 30, address: 'London' },
  ]

  const columns: ColumnType<User>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
        { text: 'Names with J', value: 'J' },
        { text: 'Names with B', value: 'B' },
      ],
      onFilter: (value, record) => record.name.includes(String(value)),
      filterSearch: true,
    },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [
        { text: 'New York', value: 'New York' },
        { text: 'London', value: 'London' },
        { text: 'Sydney', value: 'Sydney' },
      ],
      onFilter: (value, record) => record.address === String(value),
    },
  ]

  return (
    <div>
      <Text type="secondary" style={{ display: 'block', marginBottom: '0.5rem' }}>
        Click the filter icon in the Name or Address column header to open filter dropdown.
      </Text>
      <Table dataSource={data} columns={columns} pagination={false} />
    </div>
  )
}

// ─── 14. Cell Merging (colSpan / rowSpan) ────────────────────────────────────

function CellMergingDemo() {
  interface DataRow {
    key: string
    name: string
    age: number
    phone: string
    address: string
  }

  const data: DataRow[] = [
    { key: '1', name: 'John Brown', age: 32, phone: '555-0101', address: 'New York No. 1 Lake Park' },
    { key: '2', name: 'Jim Green', age: 42, phone: '555-0102', address: 'London No. 1 Lake Park' },
    { key: '3', name: 'Joe Black', age: 28, phone: '555-0103', address: 'Sydney No. 1 Lake Park' },
    { key: '4', name: 'Jane White', age: 35, phone: '555-0104', address: 'Tokyo No. 1 Lake Park' },
  ]

  const columns: ColumnType<DataRow>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onCell: (_, index) => {
        if (index === 0) return { rowSpan: 2 } as any
        if (index === 1) return { rowSpan: 0 } as any
        return {}
      },
    },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      onCell: (_, index) => {
        if (index === 2) return { colSpan: 2 } as any
        return {}
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      onCell: (_, index) => {
        if (index === 2) return { colSpan: 0 } as any
        return {}
      },
    },
  ]

  return (
    <div>
      <Text type="secondary" style={{ display: 'block', marginBottom: '0.5rem' }}>
        Row 1-2 "Name" cells are merged (rowSpan). Row 3 "Phone" + "Address" are merged (colSpan).
      </Text>
      <Table dataSource={data} columns={columns} bordered pagination={false} />
    </div>
  )
}

// ─── 15. Tree Data ──────────────────────────────────────────────────────────

function TreeDataDemo() {
  interface Department {
    key: string
    name: string
    budget: number
    head: string
    children?: Department[]
  }

  const data: Department[] = [
    {
      key: '1',
      name: 'Engineering',
      budget: 500000,
      head: 'Alice',
      children: [
        {
          key: '1-1',
          name: 'Frontend',
          budget: 200000,
          head: 'Bob',
          children: [
            { key: '1-1-1', name: 'React Team', budget: 100000, head: 'Charlie' },
            { key: '1-1-2', name: 'Vue Team', budget: 100000, head: 'Diana' },
          ],
        },
        { key: '1-2', name: 'Backend', budget: 300000, head: 'Eve' },
      ],
    },
    {
      key: '2',
      name: 'Marketing',
      budget: 300000,
      head: 'Frank',
      children: [
        { key: '2-1', name: 'Digital', budget: 150000, head: 'Grace' },
        { key: '2-2', name: 'Content', budget: 150000, head: 'Henry' },
      ],
    },
    { key: '3', name: 'HR', budget: 200000, head: 'Iris' },
  ]

  const columns: ColumnType<Department>[] = [
    { title: 'Department', dataIndex: 'name', key: 'name', width: 250 },
    {
      title: 'Budget',
      dataIndex: 'budget',
      key: 'budget',
      render: (val: number) => `$${val.toLocaleString()}`,
      align: 'right',
    },
    { title: 'Head', dataIndex: 'head', key: 'head' },
  ]

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={false}
      expandable={{ defaultExpandAllRows: true }}
    />
  )
}

// ─── 16. Fixed Columns ──────────────────────────────────────────────────────

function FixedColumnsDemo() {
  interface FullUser {
    key: string
    name: string
    age: number
    address: string
    email: string
    phone: string
    company: string
    action?: string
  }

  const data: FullUser[] = Array.from({ length: 6 }, (_, i) => ({
    key: String(i + 1),
    name: `User ${i + 1}`,
    age: 25 + i * 3,
    address: `${['New York', 'London', 'Sydney', 'Tokyo', 'Berlin', 'Paris'][i]} Lake Park`,
    email: `user${i + 1}@example.com`,
    phone: `555-010${i + 1}`,
    company: `Company ${String.fromCharCode(65 + i)}`,
  }))

  const columns: ColumnType<FullUser>[] = [
    { title: 'Name', dataIndex: 'name', key: 'name', fixed: 'left', width: 120 },
    { title: 'Age', dataIndex: 'age', key: 'age', width: 100 },
    { title: 'Email', dataIndex: 'email', key: 'email', width: 200 },
    { title: 'Phone', dataIndex: 'phone', key: 'phone', width: 150 },
    { title: 'Company', dataIndex: 'company', key: 'company', width: 150 },
    { title: 'Address', dataIndex: 'address', key: 'address', width: 250 },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: () => (
        <a style={{ color: tokens.colorPrimary, cursor: 'pointer', textDecoration: 'none' }}>Edit</a>
      ),
    },
  ]

  return (
    <div>
      <Text type="secondary" style={{ display: 'block', marginBottom: '0.5rem' }}>
        "Name" is fixed left, "Action" is fixed right. Scroll horizontally to see the effect.
      </Text>
      <Table dataSource={data} columns={columns} scroll={{ x: 1200 }} pagination={false} />
    </div>
  )
}

// ─── 17. Column Groups ──────────────────────────────────────────────────────

function ColumnGroupsDemo() {
  interface PersonData {
    key: string
    firstName: string
    lastName: string
    age: number
    street: string
    city: string
    country: string
  }

  const data: PersonData[] = [
    { key: '1', firstName: 'John', lastName: 'Brown', age: 32, street: '1st Ave', city: 'New York', country: 'USA' },
    { key: '2', firstName: 'Jim', lastName: 'Green', age: 42, street: 'Baker St', city: 'London', country: 'UK' },
    { key: '3', firstName: 'Joe', lastName: 'Black', age: 28, street: 'George St', city: 'Sydney', country: 'Australia' },
  ]

  const columns: ColumnType<PersonData>[] = [
    {
      title: 'Personal Info',
      key: 'personal',
      children: [
        { title: 'First Name', dataIndex: 'firstName', key: 'firstName', width: 130 },
        { title: 'Last Name', dataIndex: 'lastName', key: 'lastName', width: 130 },
        { title: 'Age', dataIndex: 'age', key: 'age', width: 80, align: 'right' },
      ],
    },
    {
      title: 'Location',
      key: 'location',
      children: [
        { title: 'Street', dataIndex: 'street', key: 'street', width: 150 },
        { title: 'City', dataIndex: 'city', key: 'city', width: 120 },
        { title: 'Country', dataIndex: 'country', key: 'country', width: 120 },
      ],
    },
  ]

  return (
    <Table dataSource={data} columns={columns} bordered pagination={false} />
  )
}

// ─── 18. Pagination Position ─────────────────────────────────────────────────

type PaginationAlign = 'Left' | 'Center' | 'Right'
const alignOptions = ['Left', 'Center', 'Right']

function PaginationPositionDemo() {
  const [topEnabled, setTopEnabled] = useState(false)
  const [bottomEnabled, setBottomEnabled] = useState(true)
  const [topAlign, setTopAlign] = useState<PaginationAlign>('Right')
  const [bottomAlign, setBottomAlign] = useState<PaginationAlign>('Center')

  const data: User[] = Array.from({ length: 30 }, (_, i) => ({
    key: String(i + 1),
    name: `User ${i + 1}`,
    age: 20 + (i % 40),
    address: `City ${(i % 5) + 1}, Street ${i + 1}`,
  }))

  const positions: string[] = []
  if (topEnabled) positions.push(`top${topAlign}`)
  if (bottomEnabled) positions.push(`bottom${bottomAlign}`)

  const chipStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.25rem 0.75rem',
    borderRadius: '1rem',
    border: `1px solid ${active ? tokens.colorPrimary : tokens.colorBorder}`,
    backgroundColor: active ? tokens.colorPrimary : 'transparent',
    color: active ? '#fff' : tokens.colorText,
    cursor: 'pointer',
    fontSize: '0.8125rem',
    fontWeight: 500,
    transition: 'all 0.15s ease',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button style={chipStyle(topEnabled)} onClick={() => setTopEnabled(p => !p)}>Top</button>
          {topEnabled && <Toggle options={alignOptions} value={topAlign} onChange={v => setTopAlign(v as PaginationAlign)} size="small" />}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button style={chipStyle(bottomEnabled)} onClick={() => setBottomEnabled(p => !p)}>Bottom</button>
          {bottomEnabled && <Toggle options={alignOptions} value={bottomAlign} onChange={v => setBottomAlign(v as PaginationAlign)} size="small" />}
        </div>
      </div>

      <Text type="secondary" size="sm">
        position: {positions.length > 0
          ? `[${positions.map(p => `'${p}'`).join(', ')}]`
          : "undefined — default: ['bottomRight']"}
      </Text>

      <Table
        dataSource={data}
        columns={basicColumns}
        bordered
        pagination={{ pageSize: 4, position: positions.length > 0 ? positions as any : ['bottomRight'] }}
      />
    </div>
  )
}

// ─── 19. Keep Previous Data (Server-Side Pagination) ────────────────────────

// Simulates a server-side paginated API
const ALL_SERVER_DATA: User[] = Array.from({ length: 50 }, (_, i) => ({
  key: String(i + 1),
  name: `User ${i + 1}`,
  age: 20 + (i % 40),
  address: `City ${(i % 5) + 1}, Street ${i + 1}`,
}))

function fakeFetch(page: number, pageSize: number): Promise<{ data: User[]; total: number }> {
  return new Promise(resolve => {
    setTimeout(() => {
      const start = (page - 1) * pageSize
      resolve({ data: ALL_SERVER_DATA.slice(start, start + pageSize), total: ALL_SERVER_DATA.length })
    }, 1200)
  })
}

function ServerPaginatedTable({ keepPrevious }: { keepPrevious: boolean }) {
  const [data, setData] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const PAGE_SIZE = 5

  const fetchPage = useCallback((p: number) => {
    setLoading(true)
    setPage(p)
    setData([]) // clear data — simulates real API hook behavior
    fakeFetch(p, PAGE_SIZE).then(res => {
      setData(res.data)
      setTotal(res.total)
      setLoading(false)
    })
  }, [])

  useEffect(() => { fetchPage(1) }, [fetchPage])

  return (
    <Table
      dataSource={data}
      columns={basicColumns}
      loading={loading}
      keepPreviousData={keepPrevious}
      pagination={{
        current: page,
        pageSize: PAGE_SIZE,
        total,
        onChange: (p) => fetchPage(p),
      }}
    />
  )
}

function KeepPreviousDataDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <Text type="secondary" style={{ display: 'block', marginBottom: '0.5rem' }}>
          <strong>keepPreviousData=true</strong> — Previous page stays visible with loading overlay.
        </Text>
        <ServerPaginatedTable keepPrevious />
      </div>
      <div>
        <Text type="secondary" style={{ display: 'block', marginBottom: '0.5rem' }}>
          <strong>keepPreviousData=false</strong> — Table shows "No data" while loading (default).
        </Text>
        <ServerPaginatedTable keepPrevious={false} />
      </div>
    </div>
  )
}

// ─── Main Section ────────────────────────────────────────────────────────────

export function TableSection() {
  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Table</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Display structured data with sorting, selection, pagination, filters, tree data, and more.
      </Text>

      <Section title="Basic">
        <BasicDemo />
      </Section>

      <Section title="Custom Render">
        <CustomRenderDemo />
      </Section>

      <Section title="Bordered & Sizes">
        <BorderedSizesDemo />
      </Section>

      <Section title="Sorting" align="start">
        <SortingDemo />
      </Section>

      <Section title="Row Selection (Checkbox)" align="start">
        <SelectionCheckboxDemo />
      </Section>

      <Section title="Row Selection (Radio)" align="start">
        <SelectionRadioDemo />
      </Section>

      <Section title="Pagination">
        <PaginationDemo />
      </Section>

      <Section title="Fixed Header">
        <FixedHeaderDemo />
      </Section>

      <Section title="Expandable Rows">
        <ExpandableDemo />
      </Section>

      <Section title="Combined (Selection + Sorting + Pagination + Bordered)">
        <CombinedDemo />
      </Section>

      <Section title="Title & Footer">
        <TitleFooterDemo />
      </Section>

      <Section title="Multiple Sort">
        <MultipleSortDemo />
      </Section>

      <Section title="Column Filters">
        <ColumnFiltersDemo />
      </Section>

      <Section title="Cell Merging (colSpan / rowSpan)">
        <CellMergingDemo />
      </Section>

      <Section title="Tree Data">
        <TreeDataDemo />
      </Section>

      <Section title="Fixed Columns">
        <FixedColumnsDemo />
      </Section>

      <Section title="Column Groups">
        <ColumnGroupsDemo />
      </Section>

      <Section title="Pagination Position">
        <PaginationPositionDemo />
      </Section>

      <Section title="Server-Side Pagination (keepPreviousData)">
        <KeepPreviousDataDemo />
      </Section>
    </div>
  )
}
