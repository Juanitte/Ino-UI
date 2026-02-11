import { useState } from 'react'
import { Pagination, Text } from '../../index'
import { Section } from './shared'

export function PaginationSection() {
  const [controlledPage, setControlledPage] = useState(3)
  const [controlledPageSize, setControlledPageSize] = useState(10)

  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Pagination</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Paginación de listas con soporte para tamaño normal/pequeño, modo simple, cambio de pageSize y salto rápido. Los colores se adaptan automáticamente al tema.
      </Text>

      <Section title="Básico" align="start">
        <Pagination total={50} />
      </Section>

      <Section title="Más páginas" align="start">
        <Pagination total={500} />
      </Section>

      <Section title="Cambiar pageSize" align="start">
        <Pagination total={200} showSizeChanger defaultPageSize={20} />
      </Section>

      <Section title="Salto rápido" align="start">
        <Pagination total={500} showQuickJumper />
      </Section>

      <Section title="Tamaño pequeño" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Pagination total={50} size="small" />
          <Pagination total={200} size="small" showSizeChanger showQuickJumper />
        </div>
      </Section>

      <Section title="Modo simple" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Pagination total={50} simple />
          <Pagination total={50} simple size="small" />
        </div>
      </Section>

      <Section title="Controlado" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Text size="sm" type="secondary" style={{ display: 'block' }}>
            Página actual: {controlledPage} — PageSize: {controlledPageSize}
          </Text>
          <Pagination
            total={500}
            current={controlledPage}
            pageSize={controlledPageSize}
            showSizeChanger
            onChange={(page, pageSize) => {
              setControlledPage(page)
              setControlledPageSize(pageSize)
            }}
          />
        </div>
      </Section>

      <Section title="showTotal" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Pagination
            total={85}
            showTotal={(total) => `Total ${total} items`}
          />
          <Pagination
            total={85}
            showTotal={(total, range) => `${range[0]}-${range[1]} de ${total} items`}
          />
        </div>
      </Section>

      <Section title="showLessItems" align="start">
        <Pagination total={500} showLessItems defaultCurrent={10} />
      </Section>

      <Section title="Deshabilitado" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Pagination total={200} disabled defaultCurrent={3} />
          <Pagination total={200} disabled showSizeChanger showQuickJumper defaultCurrent={3} />
        </div>
      </Section>

      <Section title="Ocultar con 1 página" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Text size="sm" type="secondary" style={{ display: 'block' }}>
            Con hideOnSinglePage y total=5 (1 sola página): no se muestra nada
          </Text>
          <Pagination total={5} hideOnSinglePage />
          <Text size="sm" type="secondary" style={{ display: 'block' }}>
            Sin hideOnSinglePage y total=5:
          </Text>
          <Pagination total={5} />
        </div>
      </Section>

      <Section title="itemRender (prev/next como texto)" align="start">
        <Pagination
          total={500}
          itemRender={(_page, type, originalElement) => {
            if (type === 'prev') return <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'inherit' }}>Previous</a>
            if (type === 'next') return <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'inherit' }}>Next</a>
            return originalElement
          }}
        />
      </Section>

      <Section title="Todas las opciones" align="start">
        <Pagination
          total={500}
          showSizeChanger
          showQuickJumper
          showTotal={(total, range) => `${range[0]}-${range[1]} de ${total} items`}
        />
      </Section>

      <Section title="Semantic DOM Styling (styles)" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block' }}>
            Slots disponibles: <Text code>root</Text>, <Text code>item</Text>, <Text code>options</Text>
          </Text>
          <Pagination
            total={200}
            showSizeChanger
            showQuickJumper
            styles={{
              root: { padding: 12, backgroundColor: '#1e1b4b', borderRadius: 12, color: '#e0e7ff' },
              item: { borderColor: '#4338ca', backgroundColor: '#312e81', color: '#e0e7ff' },
              options: { color: '#e0e7ff' },
            }}
          />
        </div>
      </Section>
    </div>
  )
}
