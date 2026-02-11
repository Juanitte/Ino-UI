import { useState } from 'react'
import { NestedSelect, Text, tokens } from '../../index'
import type { NestedSelectOption } from '../../index'
import { Section } from './shared'

// ============================================================================
// Data
// ============================================================================

const spainOptions: NestedSelectOption[] = [
  {
    value: 'andalucia',
    label: 'Andalucía',
    children: [
      {
        value: 'sevilla',
        label: 'Sevilla',
        children: [
          { value: 'triana', label: 'Triana' },
          { value: 'centro', label: 'Centro' },
          { value: 'macarena', label: 'Macarena' },
        ],
      },
      {
        value: 'malaga',
        label: 'Málaga',
        children: [
          { value: 'centro-malaga', label: 'Centro' },
          { value: 'malagueta', label: 'La Malagueta' },
        ],
      },
      {
        value: 'cordoba',
        label: 'Córdoba',
        children: [
          { value: 'juderia', label: 'Judería' },
          { value: 'centro-cordoba', label: 'Centro' },
        ],
      },
    ],
  },
  {
    value: 'cataluna',
    label: 'Cataluña',
    children: [
      {
        value: 'barcelona',
        label: 'Barcelona',
        children: [
          { value: 'eixample', label: 'Eixample' },
          { value: 'gotico', label: 'Barrio Gótico' },
          { value: 'gracia', label: 'Gracia' },
        ],
      },
      {
        value: 'girona',
        label: 'Girona',
        children: [
          { value: 'barri-vell', label: 'Barri Vell' },
          { value: 'onyar', label: 'Onyar' },
        ],
      },
    ],
  },
  {
    value: 'madrid',
    label: 'Madrid',
    children: [
      {
        value: 'madrid-ciudad',
        label: 'Madrid',
        children: [
          { value: 'sol', label: 'Sol' },
          { value: 'retiro', label: 'Retiro' },
          { value: 'chamberi', label: 'Chamberí' },
          { value: 'salamanca', label: 'Salamanca' },
        ],
      },
      {
        value: 'alcala',
        label: 'Alcalá de Henares',
        children: [
          { value: 'centro-alcala', label: 'Centro' },
        ],
      },
    ],
  },
  {
    value: 'pais-vasco',
    label: 'País Vasco',
    children: [
      {
        value: 'bilbao',
        label: 'Bilbao',
        children: [
          { value: 'casco-viejo', label: 'Casco Viejo' },
          { value: 'ensanche', label: 'Ensanche' },
        ],
      },
      {
        value: 'san-sebastian',
        label: 'San Sebastián',
        children: [
          { value: 'parte-vieja', label: 'Parte Vieja' },
          { value: 'gros', label: 'Gros' },
        ],
      },
    ],
  },
]

const disabledOptions: NestedSelectOption[] = [
  {
    value: 'activa',
    label: 'Opción activa',
    children: [
      { value: 'sub1', label: 'Sub-opción 1' },
      { value: 'sub2', label: 'Sub-opción 2' },
    ],
  },
  {
    value: 'deshabilitada',
    label: 'Opción deshabilitada',
    disabled: true,
    children: [
      { value: 'sub3', label: 'Sub-opción 3' },
    ],
  },
  {
    value: 'parcial',
    label: 'Parcialmente',
    children: [
      { value: 'sub4', label: 'Disponible' },
      { value: 'sub5', label: 'No disponible', disabled: true },
      { value: 'sub6', label: 'Disponible también' },
    ],
  },
]

// fieldNames demo: data con campos custom
const customFieldData = [
  {
    code: 'ES',
    name: 'España',
    items: [
      {
        code: 'ES-AN',
        name: 'Andalucía',
        items: [
          { code: 'ES-SE', name: 'Sevilla' },
          { code: 'ES-MA', name: 'Málaga' },
        ],
      },
      {
        code: 'ES-CT',
        name: 'Cataluña',
        items: [
          { code: 'ES-B', name: 'Barcelona' },
        ],
      },
    ],
  },
  {
    code: 'FR',
    name: 'Francia',
    items: [
      {
        code: 'FR-IDF',
        name: 'Île-de-France',
        items: [
          { code: 'FR-75', name: 'París' },
        ],
      },
    ],
  },
]

// ============================================================================
// Lazy load demo component
// ============================================================================

function LazyLoadDemo() {
  const [opts, setOpts] = useState<NestedSelectOption[]>([
    { value: 'andalucia', label: 'Andalucía', isLeaf: false },
    { value: 'cataluna', label: 'Cataluña', isLeaf: false },
    { value: 'madrid', label: 'Madrid', isLeaf: false },
  ])

  const cityData: Record<string, { value: string; label: string; isLeaf?: boolean }[]> = {
    andalucia: [
      { value: 'sevilla', label: 'Sevilla', isLeaf: false },
      { value: 'malaga', label: 'Málaga', isLeaf: false },
    ],
    cataluna: [
      { value: 'barcelona', label: 'Barcelona', isLeaf: false },
      { value: 'girona', label: 'Girona', isLeaf: false },
    ],
    madrid: [
      { value: 'madrid-ciudad', label: 'Madrid', isLeaf: false },
      { value: 'alcala', label: 'Alcalá de Henares', isLeaf: false },
    ],
  }

  const districtData: Record<string, { value: string; label: string }[]> = {
    sevilla: [{ value: 'triana', label: 'Triana' }, { value: 'centro', label: 'Centro' }],
    malaga: [{ value: 'malagueta', label: 'La Malagueta' }],
    barcelona: [{ value: 'eixample', label: 'Eixample' }, { value: 'gotico', label: 'Barrio Gótico' }],
    girona: [{ value: 'barri-vell', label: 'Barri Vell' }],
    'madrid-ciudad': [{ value: 'sol', label: 'Sol' }, { value: 'retiro', label: 'Retiro' }],
    alcala: [{ value: 'centro-alcala', label: 'Centro' }],
  }

  const handleLoadData = (selectedOptions: NestedSelectOption[]) => {
    const target = selectedOptions[selectedOptions.length - 1]
    target.loading = true
    setOpts([...opts])

    setTimeout(() => {
      target.loading = false
      const key = String(target.value)
      if (cityData[key]) {
        target.children = cityData[key]
      } else if (districtData[key]) {
        target.children = districtData[key]
      } else {
        target.isLeaf = true
      }
      setOpts([...opts])
    }, 1000)
  }

  return (
    <NestedSelect
      options={opts}
      placeholder="Carga bajo demanda..."
      loadData={handleLoadData}
    />
  )
}

// ============================================================================
// NestedSelectSection
// ============================================================================

export function NestedSelectSection() {
  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>NestedSelect</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Selector jerárquico con paneles en cascada. Ideal para datos como comunidad/provincia/localidad. Soporta búsqueda, expansión por click o hover, selección intermedia, y personalización completa. Los colores se adaptan automáticamente al tema.
      </Text>

      <Section title="Básico" align="start">
        <div style={{ width: 350 }}>
          <NestedSelect
            options={spainOptions}
            placeholder="Selecciona ubicación..."
          />
        </div>
      </Section>

      <Section title="Hover para expandir" align="start">
        <div style={{ width: 350 }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>
            <Text code>expandTrigger="hover"</Text> — los paneles se abren al pasar el mouse.
          </Text>
          <NestedSelect
            options={spainOptions}
            placeholder="Pasa el mouse sobre las opciones..."
            expandTrigger="hover"
          />
        </div>
      </Section>

      <Section title="Selección intermedia" align="start">
        <div style={{ width: 350 }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>
            <Text code>changeOnSelect</Text> — permite seleccionar en cualquier nivel, no solo hojas.
          </Text>
          <NestedSelect
            options={spainOptions}
            placeholder="Selecciona cualquier nivel..."
            changeOnSelect
          />
        </div>
      </Section>

      <Section title="Con búsqueda" align="start">
        <div style={{ width: 350 }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>
            <Text code>showSearch</Text> — busca dentro de todas las opciones. El texto coincidente se resalta.
          </Text>
          <NestedSelect
            options={spainOptions}
            placeholder="Busca una ubicación..."
            showSearch
          />
        </div>
      </Section>

      <Section title="Tamaños" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 350 }}>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>large</Text>
            <NestedSelect options={spainOptions} placeholder="Large" size="large" />
          </div>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>middle (default)</Text>
            <NestedSelect options={spainOptions} placeholder="Middle" size="middle" />
          </div>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>small</Text>
            <NestedSelect options={spainOptions} placeholder="Small" size="small" />
          </div>
        </div>
      </Section>

      <Section title="Variantes" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 350 }}>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>outlined (default)</Text>
            <NestedSelect options={spainOptions} placeholder="Outlined" variant="outlined" />
          </div>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>filled</Text>
            <NestedSelect options={spainOptions} placeholder="Filled" variant="filled" />
          </div>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>borderless</Text>
            <NestedSelect options={spainOptions} placeholder="Borderless" variant="borderless" />
          </div>
        </div>
      </Section>

      <Section title="Disabled" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 350 }}>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>Componente deshabilitado</Text>
            <NestedSelect
              options={spainOptions}
              placeholder="Deshabilitado"
              disabled
              defaultValue={['andalucia', 'sevilla', 'triana']}
            />
          </div>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>Opciones deshabilitadas</Text>
            <NestedSelect
              options={disabledOptions}
              placeholder="Algunas opciones disabled..."
            />
          </div>
        </div>
      </Section>

      <Section title="Status" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 350 }}>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>error</Text>
            <NestedSelect options={spainOptions} placeholder="Error status" status="error" />
          </div>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>warning</Text>
            <NestedSelect options={spainOptions} placeholder="Warning status" status="warning" />
          </div>
        </div>
      </Section>

      <Section title="Display render custom" align="start">
        <div style={{ width: 350 }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>
            <Text code>displayRender</Text> personalizado con separador y formato custom.
          </Text>
          <NestedSelect
            options={spainOptions}
            placeholder="Selecciona ubicación..."
            displayRender={(labels) => labels.join(' > ')}
          />
        </div>
      </Section>

      <Section title="Field names" align="start">
        <div style={{ width: 350 }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>
            Datos con campos personalizados: <Text code>name</Text>, <Text code>code</Text>, <Text code>items</Text>.
          </Text>
          <NestedSelect
            options={customFieldData as unknown as NestedSelectOption[]}
            placeholder="Selecciona región..."
            fieldNames={{ label: 'name', value: 'code', children: 'items' }}
          />
        </div>
      </Section>

      <Section title="Semantic DOM Styling (styles)" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 350 }}>
          <Text size="sm" type="secondary" style={{ display: 'block' }}>
            Slots disponibles: <Text code>root</Text>, <Text code>selector</Text>, <Text code>dropdown</Text>, <Text code>menu</Text>, <Text code>option</Text>
          </Text>
          <NestedSelect
            options={spainOptions}
            placeholder="Estilo personalizado..."
            styles={{
              selector: {
                backgroundColor: '#1e1b4b',
                color: '#e0e7ff',
                borderColor: '#4338ca',
                borderRadius: 12,
              },
              dropdown: {
                backgroundColor: '#1e1b4b',
                borderColor: '#4338ca',
                borderRadius: 12,
              },
              option: {
                color: '#c7d2fe',
              },
            }}
          />
        </div>
      </Section>

      {/* ================================================================ */}
      {/* New sections */}
      {/* ================================================================ */}

      <Section title="Selección múltiple" align="start">
        <div style={{ width: 400 }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>
            <Text code>multiple</Text> — permite seleccionar varias ubicaciones con checkboxes.
          </Text>
          <NestedSelect
            options={spainOptions}
            placeholder="Selecciona ubicaciones..."
            multiple
            expandTrigger="hover"
          />
        </div>
      </Section>

      <Section title="showCheckedStrategy" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400 }}>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>
              SHOW_CHILD (default) — muestra cada hoja seleccionada
            </Text>
            <NestedSelect
              options={spainOptions}
              placeholder="SHOW_CHILD..."
              multiple
              expandTrigger="hover"
              showCheckedStrategy={NestedSelect.SHOW_CHILD}
            />
          </div>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>
              SHOW_PARENT — colapsa a padre cuando todos los hijos están seleccionados
            </Text>
            <NestedSelect
              options={spainOptions}
              placeholder="SHOW_PARENT..."
              multiple
              expandTrigger="hover"
              showCheckedStrategy={NestedSelect.SHOW_PARENT}
            />
          </div>
        </div>
      </Section>

      <Section title="Custom tag render" align="start">
        <div style={{ width: 400 }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>
            <Text code>tagRender</Text> — personaliza cada tag con contenido custom.
          </Text>
          <NestedSelect
            options={spainOptions}
            placeholder="Selecciona ubicaciones..."
            multiple
            expandTrigger="hover"
            tagRender={({ label, onClose }) => (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '2px 8px',
                  borderRadius: 12,
                  backgroundColor: tokens.colorPrimaryBg,
                  color: tokens.colorPrimary,
                  fontSize: 12,
                  gap: 4,
                }}
              >
                {label}
                <span
                  onClick={onClose}
                  style={{ cursor: 'pointer', marginLeft: 2, opacity: 0.7 }}
                >
                  x
                </span>
              </span>
            )}
          />
        </div>
      </Section>

      <Section title="Load Options Lazily" align="start">
        <div style={{ width: 350 }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>
            <Text code>loadData</Text> — las opciones se cargan bajo demanda. Simula una llamada API con 1s de delay.
          </Text>
          <LazyLoadDemo />
        </div>
      </Section>

      <Section title="Prefix" align="start">
        <div style={{ width: 350 }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>
            <Text code>prefix</Text> — contenido antes del valor seleccionado.
          </Text>
          <NestedSelect
            options={spainOptions}
            placeholder="Selecciona ubicación..."
            prefix={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            }
          />
        </div>
      </Section>

      <Section title="Custom dropdown (popupRender)" align="start">
        <div style={{ width: 350 }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>
            <Text code>popupRender</Text> — envuelve el contenido del dropdown con un footer personalizado.
          </Text>
          <NestedSelect
            options={spainOptions}
            placeholder="Con footer personalizado..."
            popupRender={(menus) => (
              <div>
                {menus}
                <div style={{
                  padding: '8px 12px',
                  borderTop: `1px solid ${tokens.colorBorder}`,
                  fontSize: 12,
                  color: tokens.colorTextMuted,
                  textAlign: 'center',
                }}>
                  Selecciona tu ubicación preferida
                </div>
              </div>
            )}
          />
        </div>
      </Section>

      <Section title="Placement" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 350 }}>
          {(['bottomLeft', 'bottomRight', 'topLeft', 'topRight'] as const).map((p) => (
            <div key={p}>
              <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>{p}</Text>
              <NestedSelect options={spainOptions} placeholder={p} placement={p} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Panel (inline)" align="start">
        <div>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>
            <Text code>NestedSelect.Panel</Text> — paneles en cascada sin selector ni dropdown. Ideal para vistas inline.
          </Text>
          <NestedSelect.Panel
            options={spainOptions}
          />
        </div>
      </Section>

      <Section title="Panel múltiple (inline)" align="start">
        <div>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>
            <Text code>NestedSelect.Panel</Text> con <Text code>multiple</Text> — selección múltiple inline con checkboxes.
          </Text>
          <NestedSelect.Panel
            options={spainOptions}
            multiple
            expandTrigger="hover"
          />
        </div>
      </Section>
    </div>
  )
}
