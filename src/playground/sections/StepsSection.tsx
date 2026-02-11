import { useState } from 'react'
import { Steps, Text } from '../../index'
import type { StepItem } from '../../index'
import { Section } from './shared'

// ============================================================================
// Icons
// ============================================================================

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

// ============================================================================
// Items data
// ============================================================================

const basicItems: StepItem[] = [
  { title: 'Registro' },
  { title: 'Verificación' },
  { title: 'Completado' },
]

const descItems: StepItem[] = [
  { title: 'Registro', description: 'Crea tu cuenta con email y contraseña' },
  { title: 'Verificación', description: 'Confirma tu dirección de email' },
  { title: 'Completado', description: 'Tu cuenta está lista para usar' },
]

const iconItems: StepItem[] = [
  { title: 'Datos personales', icon: <UserIcon /> },
  { title: 'Documentos', icon: <FileIcon /> },
  { title: 'Verificado', icon: <CheckCircleIcon /> },
]

const errorItems: StepItem[] = [
  { title: 'Registro', description: 'Cuenta creada' },
  { title: 'Verificación', description: 'Error al verificar email' },
  { title: 'Completado', description: 'Pendiente' },
]

const manyItems: StepItem[] = [
  { title: 'Paso 1', description: 'Inicio del proceso' },
  { title: 'Paso 2', description: 'Recopilación de datos' },
  { title: 'Paso 3', description: 'Validación' },
  { title: 'Paso 4', description: 'Aprobación' },
  { title: 'Paso 5', description: 'Finalizado' },
]

const navItems: StepItem[] = [
  { title: 'Paso 1', description: 'Información básica' },
  { title: 'Paso 2', description: 'Configuración' },
  { title: 'Paso 3', description: 'Confirmación' },
]

// ============================================================================
// StepsSection
// ============================================================================

export function StepsSection() {
  const [clickableCurrent, setClickableCurrent] = useState(0)
  const [navCurrent, setNavCurrent] = useState(1)

  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Steps</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Indicador de progreso por pasos. Soporta horizontal, vertical, dot style, navigation, estados y pasos clickeables. Los colores se adaptan automáticamente al tema.
      </Text>

      <Section title="Básico" align="start">
        <div style={{ width: '100%' }}>
          <Steps items={basicItems} current={1} />
        </div>
      </Section>

      <Section title="Con descripciones" align="start">
        <div style={{ width: '100%' }}>
          <Steps items={descItems} current={1} />
        </div>
      </Section>

      <Section title="Tamaño pequeño" align="start">
        <div style={{ width: '100%' }}>
          <Steps items={basicItems} current={1} size="small" />
        </div>
      </Section>

      <Section title="Con iconos" align="start">
        <div style={{ width: '100%' }}>
          <Steps items={iconItems} current={1} />
        </div>
      </Section>

      <Section title="Vertical" align="start">
        <div style={{ width: 300 }}>
          <Steps items={descItems} current={1} direction="vertical" />
        </div>
      </Section>

      <Section title="Vertical pequeño" align="start">
        <div style={{ width: 300 }}>
          <Steps items={descItems} current={1} direction="vertical" size="small" />
        </div>
      </Section>

      <Section title="Estado error" align="start">
        <div style={{ width: '100%' }}>
          <Steps items={errorItems} current={1} status="error" />
        </div>
      </Section>

      <Section title="Dot style" align="start">
        <div style={{ width: '100%' }}>
          <Steps items={descItems} current={1} progressDot />
        </div>
      </Section>

      <Section title="Label placement vertical" align="start">
        <div style={{ width: '100%' }}>
          <Steps items={descItems} current={1} labelPlacement="vertical" />
        </div>
      </Section>

      <Section title="Clickable" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block' }}>
            Paso actual: {clickableCurrent}
          </Text>
          <Steps
            items={manyItems}
            current={clickableCurrent}
            onChange={setClickableCurrent}
          />
        </div>
      </Section>

      <Section title="Navigation" align="start">
        <div style={{ width: '100%' }}>
          <Steps
            items={navItems}
            current={navCurrent}
            type="navigation"
            onChange={setNavCurrent}
          />
        </div>
      </Section>

      <Section title="Navigation small" align="start">
        <div style={{ width: '100%' }}>
          <Steps
            items={navItems}
            current={0}
            type="navigation"
            size="small"
          />
        </div>
      </Section>

      <Section title="Con progreso (percent)" align="start">
        <div style={{ width: '100%' }}>
          <Steps items={descItems} current={1} percent={60} />
        </div>
      </Section>

      <Section title="Semantic DOM Styling (styles)" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block' }}>
            Slots disponibles: <Text code>root</Text>, <Text code>step</Text>, <Text code>icon</Text>, <Text code>content</Text>, <Text code>tail</Text>
          </Text>
          <Steps
            items={descItems}
            current={1}
            styles={{
              root: { padding: 16, backgroundColor: '#1e1b4b', borderRadius: 12 },
              icon: { borderColor: '#818cf8', backgroundColor: '#312e81', color: '#e0e7ff' },
              content: { color: '#e0e7ff' },
              tail: { backgroundColor: '#4338ca' },
            }}
          />
        </div>
      </Section>
    </div>
  )
}
