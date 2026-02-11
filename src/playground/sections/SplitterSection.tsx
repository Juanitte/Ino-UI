import { useState } from 'react'
import { Button, Splitter, Text, tokens } from '../../index'
import { Section } from './shared'

const panelStyle = (color: string) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  backgroundColor: color,
  color: '#fff',
  fontWeight: 600,
  fontSize: 18,
})

export function SplitterSection() {
  const [sizes, setSizes] = useState<number[]>([50, 50])

  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Splitter</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Paneles redimensionables con arrastre, colapso y anidamiento.
      </Text>

      <Section title="Básico">
        <div style={{ height: 200, width: '100%', border: `1px solid ${tokens.colorBorder}`, borderRadius: 8, overflow: 'hidden' }}>
          <Splitter>
            <Splitter.Panel>
              <div style={panelStyle(tokens.colorPrimary)}>Panel 1</div>
            </Splitter.Panel>
            <Splitter.Panel>
              <div style={panelStyle(tokens.colorSuccess)}>Panel 2</div>
            </Splitter.Panel>
          </Splitter>
        </div>
      </Section>

      <Section title="Vertical">
        <div style={{ height: 300, width: '100%', border: `1px solid ${tokens.colorBorder}`, borderRadius: 8, overflow: 'hidden' }}>
          <Splitter orientation="vertical">
            <Splitter.Panel>
              <div style={panelStyle(tokens.colorPrimary)}>Arriba</div>
            </Splitter.Panel>
            <Splitter.Panel>
              <div style={panelStyle(tokens.colorSuccess)}>Abajo</div>
            </Splitter.Panel>
          </Splitter>
        </div>
      </Section>

      <Section title="Tres paneles">
        <div style={{ height: 200, width: '100%', border: `1px solid ${tokens.colorBorder}`, borderRadius: 8, overflow: 'hidden' }}>
          <Splitter>
            <Splitter.Panel defaultSize="25%">
              <div style={panelStyle(tokens.colorPrimary)}>Panel 1</div>
            </Splitter.Panel>
            <Splitter.Panel defaultSize="50%">
              <div style={panelStyle(tokens.colorSuccess)}>Panel 2</div>
            </Splitter.Panel>
            <Splitter.Panel defaultSize="25%">
              <div style={panelStyle(tokens.colorWarning)}>Panel 3</div>
            </Splitter.Panel>
          </Splitter>
        </div>
      </Section>

      <Section title="Con colapsable">
        <div style={{ height: 200, width: '100%', border: `1px solid ${tokens.colorBorder}`, borderRadius: 8, overflow: 'hidden' }}>
          <Splitter>
            <Splitter.Panel collapsible defaultSize="30%">
              <div style={{ ...panelStyle(tokens.colorPrimary), flexDirection: 'column', gap: 4 }}>
                <span>Panel 1</span>
                <span style={{ fontSize: 12, fontWeight: 400, opacity: 0.8 }}>Colapsable</span>
              </div>
            </Splitter.Panel>
            <Splitter.Panel collapsible>
              <div style={{ ...panelStyle(tokens.colorSuccess), flexDirection: 'column', gap: 4 }}>
                <span>Panel 2</span>
                <span style={{ fontSize: 12, fontWeight: 400, opacity: 0.8 }}>Colapsable</span>
              </div>
            </Splitter.Panel>
          </Splitter>
        </div>
      </Section>

      <Section title="Con mínimo y máximo">
        <div style={{ height: 200, width: '100%', border: `1px solid ${tokens.colorBorder}`, borderRadius: 8, overflow: 'hidden' }}>
          <Splitter>
            <Splitter.Panel min="20%" max="70%" defaultSize="30%">
              <div style={{ ...panelStyle(tokens.colorPrimary), flexDirection: 'column', gap: 4 }}>
                <span>Panel 1</span>
                <span style={{ fontSize: 12, fontWeight: 400, opacity: 0.8 }}>min: 20% — max: 70%</span>
              </div>
            </Splitter.Panel>
            <Splitter.Panel min="30%">
              <div style={{ ...panelStyle(tokens.colorSuccess), flexDirection: 'column', gap: 4 }}>
                <span>Panel 2</span>
                <span style={{ fontSize: 12, fontWeight: 400, opacity: 0.8 }}>min: 30%</span>
              </div>
            </Splitter.Panel>
          </Splitter>
        </div>
      </Section>

      <Section title="Controlado">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button size="sm" variant="outline" onClick={() => setSizes([30, 70])}>30 / 70</Button>
            <Button size="sm" variant="outline" onClick={() => setSizes([50, 50])}>50 / 50</Button>
            <Button size="sm" variant="outline" onClick={() => setSizes([70, 30])}>70 / 30</Button>
          </div>
          <Text size="sm" type="secondary">
            Tamaños: [{sizes.map((s) => s.toFixed(1)).join(', ')}]
          </Text>
          <div style={{ height: 200, width: '100%', border: `1px solid ${tokens.colorBorder}`, borderRadius: 8, overflow: 'hidden' }}>
            <Splitter onResize={setSizes}>
              <Splitter.Panel size={`${sizes[0]}%`}>
                <div style={panelStyle(tokens.colorPrimary)}>{sizes[0].toFixed(1)}%</div>
              </Splitter.Panel>
              <Splitter.Panel size={`${sizes[1]}%`}>
                <div style={panelStyle(tokens.colorSuccess)}>{sizes[1].toFixed(1)}%</div>
              </Splitter.Panel>
            </Splitter>
          </div>
        </div>
      </Section>

      <Section title="Anidado">
        <div style={{ height: 300, width: '100%', border: `1px solid ${tokens.colorBorder}`, borderRadius: 8, overflow: 'hidden' }}>
          <Splitter>
            <Splitter.Panel defaultSize="30%">
              <div style={panelStyle(tokens.colorPrimary)}>Sidebar</div>
            </Splitter.Panel>
            <Splitter.Panel>
              <Splitter orientation="vertical">
                <Splitter.Panel defaultSize="60%">
                  <div style={panelStyle(tokens.colorSuccess)}>Contenido principal</div>
                </Splitter.Panel>
                <Splitter.Panel>
                  <div style={panelStyle(tokens.colorWarning)}>Panel inferior</div>
                </Splitter.Panel>
              </Splitter>
            </Splitter.Panel>
          </Splitter>
        </div>
      </Section>

      <Section title="Modo lazy">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
          <Text size="sm" type="secondary">
            El tamaño solo se actualiza al soltar el ratón.
          </Text>
          <div style={{ height: 200, width: '100%', border: `1px solid ${tokens.colorBorder}`, borderRadius: 8, overflow: 'hidden' }}>
            <Splitter lazy>
              <Splitter.Panel>
                <div style={panelStyle(tokens.colorPrimary)}>Panel 1</div>
              </Splitter.Panel>
              <Splitter.Panel>
                <div style={panelStyle(tokens.colorSuccess)}>Panel 2</div>
              </Splitter.Panel>
            </Splitter>
          </div>
        </div>
      </Section>

      <Section title="Semantic DOM Styling (classNames / styles)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block' }}>
            Slots disponibles: <Text code>root</Text>, <Text code>panel</Text>, <Text code>bar</Text>, <Text code>collapseButton</Text>
          </Text>
          <div style={{ height: 200, width: '100%', borderRadius: 8, overflow: 'hidden' }}>
            <Splitter
              styles={{
                root: { border: '2px solid #8b5cf6', borderRadius: 12 },
                panel: { backgroundColor: '#faf5ff' },
                bar: { backgroundColor: '#ede9fe' },
                collapseButton: { backgroundColor: '#8b5cf6', color: '#fff', borderRadius: '50%' },
              }}
            >
              <Splitter.Panel collapsible defaultSize="35%">
                <div style={{ ...panelStyle('transparent'), color: '#7c3aed' }}>Sidebar</div>
              </Splitter.Panel>
              <Splitter.Panel collapsible>
                <div style={{ ...panelStyle('transparent'), color: '#7c3aed' }}>Content</div>
              </Splitter.Panel>
            </Splitter>
          </div>
        </div>
      </Section>

    </div>
  )
}
