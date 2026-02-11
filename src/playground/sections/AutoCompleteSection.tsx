import { useState } from 'react'
import { AutoComplete, Text, tokens } from '../../index'
import type { AutoCompleteOption } from '../../index'
import { Section } from './shared'

// ============================================================================
// Icons
// ============================================================================

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 7l-10 7L2 7" />
  </svg>
)

const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

// ============================================================================
// Helpers para generar sugerencias dinámicas
// ============================================================================

const emailDomains = ['@gmail.com', '@outlook.com', '@yahoo.es', '@hotmail.com', '@proton.me']

function generateEmailSuggestions(input: string): AutoCompleteOption[] {
  if (!input || input.includes('@')) return []
  return emailDomains.map((domain) => ({
    value: `${input}${domain}`,
  }))
}

const urlProtocols = ['https://', 'http://']
const urlSuffixes = ['.com', '.es', '.org', '.io', '.dev', '.net']

function generateUrlSuggestions(input: string): AutoCompleteOption[] {
  if (!input) return []
  // Si ya tiene protocolo, sugerir sufijos
  const withoutProtocol = input.replace(/^https?:\/\//, '')
  if (withoutProtocol && !withoutProtocol.includes('.')) {
    return urlSuffixes.map((suffix) => ({
      value: input.startsWith('http') ? `${input}${suffix}` : `https://${input}${suffix}`,
    }))
  }
  // Si no tiene protocolo, sugerir con protocolo
  if (!input.startsWith('http')) {
    return urlProtocols.map((protocol) => ({
      value: `${protocol}${input}`,
    }))
  }
  return []
}

// Ciudades para búsqueda remota
const allCities = [
  'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza',
  'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao',
  'Alicante', 'Córdoba', 'Valladolid', 'Vigo', 'Gijón',
  'Hospitalet', 'Vitoria', 'Granada', 'Elche', 'Oviedo',
]

// ============================================================================
// AutoCompleteSection
// ============================================================================

export function AutoCompleteSection() {
  // Email suggestions
  const [emailOptions, setEmailOptions] = useState<AutoCompleteOption[]>([])

  // URL suggestions
  const [urlOptions, setUrlOptions] = useState<AutoCompleteOption[]>([])

  // Remote search state
  const [searchOptions, setSearchOptions] = useState<AutoCompleteOption[]>([])
  const [searching, setSearching] = useState(false)

  // Custom render suggestions
  const [queryOptions, setQueryOptions] = useState<AutoCompleteOption[]>([])

  const handleEmailSearch = (value: string) => {
    setEmailOptions(generateEmailSuggestions(value))
  }

  const handleUrlSearch = (value: string) => {
    setUrlOptions(generateUrlSuggestions(value))
  }

  const handleRemoteSearch = (value: string) => {
    if (!value) {
      setSearchOptions([])
      return
    }
    setSearching(true)
    setTimeout(() => {
      const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
      const needle = normalize(value)
      const results = allCities
        .filter((c) => normalize(c).includes(needle))
        .map((c) => ({ value: c }))
      setSearchOptions(results)
      setSearching(false)
    }, 300)
  }

  const handleQuerySearch = (value: string) => {
    if (!value) {
      setQueryOptions([])
      return
    }
    setQueryOptions([
      {
        value: `${value}`,
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <SearchIcon />
            <span>Buscar "<strong>{value}</strong>"</span>
          </div>
        ),
      },
      {
        value: `${value} tutorial`,
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <SearchIcon />
            <span>{value} <span style={{ color: tokens.colorTextMuted }}>tutorial</span></span>
          </div>
        ),
      },
      {
        value: `${value} documentation`,
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <SearchIcon />
            <span>{value} <span style={{ color: tokens.colorTextMuted }}>documentation</span></span>
          </div>
        ),
      },
      {
        value: `${value} examples`,
        label: (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <SearchIcon />
            <span>{value} <span style={{ color: tokens.colorTextMuted }}>examples</span></span>
          </div>
        ),
      },
    ])
  }

  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>AutoComplete</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Input de texto con sugerencias dinámicas. Las sugerencias se generan a partir de lo que el usuario escribe — no es un selector, es un input que se autocompleta. Los colores se adaptan automáticamente al tema.
      </Text>

      <Section title="Autocompletado de email" align="start">
        <div style={{ width: 350 }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>
            Escribe un nombre de usuario y se sugieren dominios de email.
          </Text>
          <AutoComplete
            options={emailOptions}
            placeholder="Escribe tu nombre de usuario..."
            onSearch={handleEmailSearch}
            filterOption={false}
          />
        </div>
      </Section>

      <Section title="Autocompletado de URL" align="start">
        <div style={{ width: 350 }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>
            Escribe un dominio y se sugieren protocolos y sufijos.
          </Text>
          <AutoComplete
            options={urlOptions}
            placeholder="Escribe una URL..."
            onSearch={handleUrlSearch}
            filterOption={false}
          />
        </div>
      </Section>

      <Section title="Sugerencias de búsqueda" align="start">
        <div style={{ width: 350 }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>
            Simula un buscador: las sugerencias se construyen a partir del texto escrito.
          </Text>
          <AutoComplete
            options={queryOptions}
            placeholder="Buscar..."
            onSearch={handleQuerySearch}
            filterOption={false}
          />
        </div>
      </Section>

      <Section title="Búsqueda remota (async)" align="start">
        <div style={{ width: 350 }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>
            <Text code>filterOption: false</Text> + <Text code>onSearch</Text> — simula una llamada a API buscando ciudades de España.
          </Text>
          <AutoComplete
            options={searchOptions}
            placeholder="Busca una ciudad..."
            filterOption={false}
            onSearch={handleRemoteSearch}
            notFoundContent={searching ? 'Buscando...' : 'Sin resultados'}
          />
        </div>
      </Section>

      <Section title="Variantes" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>outlined (default)</Text>
            <AutoComplete
              options={emailOptions}
              placeholder="Outlined..."
              variant="outlined"
              onSearch={handleEmailSearch}
              filterOption={false}
            />
          </div>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>filled</Text>
            <AutoComplete
              options={emailOptions}
              placeholder="Filled..."
              variant="filled"
              onSearch={handleEmailSearch}
              filterOption={false}
            />
          </div>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>borderless</Text>
            <AutoComplete
              options={emailOptions}
              placeholder="Borderless..."
              variant="borderless"
              onSearch={handleEmailSearch}
              filterOption={false}
            />
          </div>
        </div>
      </Section>

      <Section title="Prefix & Suffix" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>Solo prefix</Text>
            <AutoComplete
              options={emailOptions}
              placeholder="Tu email..."
              onSearch={handleEmailSearch}
              filterOption={false}
              prefix={<MailIcon />}
            />
          </div>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>Solo suffix</Text>
            <AutoComplete
              options={emailOptions}
              placeholder="Con chevron..."
              onSearch={handleEmailSearch}
              filterOption={false}
              suffix={<ChevronDownIcon />}
            />
          </div>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>Prefix + suffix</Text>
            <AutoComplete
              options={urlOptions}
              placeholder="Escribe una URL..."
              onSearch={handleUrlSearch}
              filterOption={false}
              prefix={<GlobeIcon />}
              suffix={<SearchIcon />}
            />
          </div>
        </div>
      </Section>

      <Section title="Allow clear" align="start">
        <div style={{ width: 300 }}>
          <AutoComplete
            options={emailOptions}
            placeholder="Escribe y limpia..."
            allowClear
            onSearch={handleEmailSearch}
            filterOption={false}
          />
        </div>
      </Section>

      <Section title="Disabled" align="start">
        <div style={{ width: 300 }}>
          <AutoComplete
            options={[]}
            placeholder="Deshabilitado"
            disabled
            defaultValue="usuario@gmail.com"
          />
        </div>
      </Section>

      <Section title="Status" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>error</Text>
            <AutoComplete
              options={emailOptions}
              placeholder="Email inválido..."
              status="error"
              onSearch={handleEmailSearch}
              filterOption={false}
            />
          </div>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>warning</Text>
            <AutoComplete
              options={emailOptions}
              placeholder="Revisa el email..."
              status="warning"
              onSearch={handleEmailSearch}
              filterOption={false}
            />
          </div>
        </div>
      </Section>

      <Section title="Backfill" align="start">
        <div style={{ width: 300 }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>
            Con <Text code>backfill</Text>, al navegar con flechas el input se rellena con la sugerencia resaltada.
          </Text>
          <AutoComplete
            options={emailOptions}
            placeholder="Escribe y usa flechas..."
            backfill
            onSearch={handleEmailSearch}
            filterOption={false}
          />
        </div>
      </Section>

      <Section title="Not found content" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>Con mensaje custom</Text>
            <AutoComplete
              options={[]}
              placeholder="Sin sugerencias..."
              notFoundContent={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                  <SearchIcon />
                  <span>No se encontraron sugerencias</span>
                </div>
              }
            />
          </div>
          <div>
            <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 4 }}>
              <Text code>notFoundContent: null</Text> — oculta el dropdown si no hay sugerencias
            </Text>
            <AutoComplete
              options={[]}
              placeholder="Dropdown no aparece..."
              notFoundContent={null}
            />
          </div>
        </div>
      </Section>

      <Section title="Semantic DOM Styling (styles)" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
          <Text size="sm" type="secondary" style={{ display: 'block' }}>
            Slots disponibles: <Text code>root</Text>, <Text code>input</Text>, <Text code>dropdown</Text>, <Text code>option</Text>
          </Text>
          <AutoComplete
            options={emailOptions}
            placeholder="Estilo personalizado..."
            onSearch={handleEmailSearch}
            filterOption={false}
            suffix={<ChevronDownIcon />}
            styles={{
              input: {
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
    </div>
  )
}
