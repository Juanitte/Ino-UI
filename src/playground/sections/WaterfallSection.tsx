import { useState } from 'react'
import { Button, Waterfall, Text, tokens } from '../../index'
import { Section } from './shared'

export function WaterfallSection() {
  const sampleItems = [
    { key: 1, height: 150, title: 'Paisaje montañoso', color: tokens.colorPrimary },
    { key: 2, height: 200, title: 'Atardecer en la playa', color: tokens.colorSecondary },
    { key: 3, height: 120, title: 'Ciudad nocturna', color: tokens.colorSuccess },
    { key: 4, height: 180, title: 'Bosque otoñal', color: tokens.colorWarning },
    { key: 5, height: 140, title: 'Lago cristalino', color: tokens.colorError },
    { key: 6, height: 220, title: 'Aurora boreal', color: tokens.colorInfo },
    { key: 7, height: 160, title: 'Desierto al amanecer', color: tokens.colorPrimary },
    { key: 8, height: 130, title: 'Cascada tropical', color: tokens.colorSecondary },
    { key: 9, height: 190, title: 'Montaña nevada', color: tokens.colorSuccess },
    { key: 10, height: 145, title: 'Pradera verde', color: tokens.colorWarning },
    { key: 11, height: 175, title: 'Costa rocosa', color: tokens.colorError },
    { key: 12, height: 135, title: 'Jardín japonés', color: tokens.colorInfo },
  ]

  const [dynamicItems, setDynamicItems] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      key: i + 1,
      height: 80 + Math.floor(Math.random() * 100),
    }))
  )
  const [nextKey, setNextKey] = useState(9)

  const handleRemoveItem = (key: number) => {
    setDynamicItems(items => items.filter(item => item.key !== key))
  }

  const handleAddItem = () => {
    const newItem = {
      key: nextKey,
      height: 80 + Math.floor(Math.random() * 100),
    }
    setDynamicItems(items => [...items, newItem])
    setNextKey(prev => prev + 1)
  }

  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Waterfall</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Layout estilo Pinterest para contenido de alturas variables.
      </Text>

      <Section title="Dinámico">
        <div style={{ width: '100%' }}>
          <Waterfall
            columns={4}
            gutter={8}
            items={dynamicItems.map(item => ({
              key: item.key,
              height: item.height,
              children: (
                <div style={{
                  height: item.height,
                  backgroundColor: tokens.colorBgMuted,
                  borderRadius: 8,
                  border: `1px solid ${tokens.colorBorder}`,
                  padding: 12,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}>
                  <Text weight="semibold">{item.key}</Text>
                  <button
                    onClick={() => handleRemoveItem(item.key)}
                    style={{
                      width: 24,
                      height: 24,
                      border: `1px solid ${tokens.colorBorder}`,
                      borderRadius: 4,
                      backgroundColor: 'transparent',
                      color: tokens.colorTextMuted,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      lineHeight: 1,
                    }}
                  >
                    ×
                  </button>
                </div>
              ),
            }))}
          />
          <Button
            variant="outline"
            style={{ width: '100%', marginTop: 8 }}
            onClick={handleAddItem}
          >
            Add Item
          </Button>
        </div>
      </Section>

      <Section title="Básico (3 columnas)">
        <div style={{ width: '100%' }}>
          <Waterfall
            columns={3}
            gutter={16}
            items={sampleItems.map(item => ({
              key: item.key,
              children: (
                <div style={{
                  height: item.height,
                  backgroundColor: item.color,
                  borderRadius: 8,
                  padding: 16,
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}>
                  <Text style={{ color: '#fff' }} weight="semibold">{item.title}</Text>
                  <Text style={{ color: 'rgba(255,255,255,0.7)' }} size="sm">{item.height}px</Text>
                </div>
              ),
            }))}
          />
        </div>
      </Section>

      <Section title="2 columnas">
        <div style={{ width: '100%', maxWidth: 500 }}>
          <Waterfall
            columns={2}
            gutter={12}
            items={sampleItems.slice(0, 6).map(item => ({
              key: item.key,
              children: (
                <div style={{
                  height: item.height,
                  backgroundColor: item.color,
                  borderRadius: 12,
                  padding: 16,
                  color: '#fff',
                }}>
                  <Text style={{ color: '#fff' }} weight="bold">{item.title}</Text>
                </div>
              ),
            }))}
          />
        </div>
      </Section>

      <Section title="Con itemRender">
        <div style={{ width: '100%' }}>
          <Waterfall
            columns={3}
            gutter={16}
            items={sampleItems.map(item => ({
              key: item.key,
              data: item,
            }))}
            itemRender={({ data, assignedColumn }) => (
              <div style={{
                height: (data as typeof sampleItems[0]).height,
                backgroundColor: (data as typeof sampleItems[0]).color,
                borderRadius: 8,
                padding: 16,
                color: '#fff',
              }}>
                <Text style={{ color: '#fff' }} weight="semibold">{(data as typeof sampleItems[0]).title}</Text>
                <Text style={{ color: 'rgba(255,255,255,0.7)' }} size="sm">Columna {assignedColumn + 1}</Text>
              </div>
            )}
          />
        </div>
      </Section>

      <Section title="Responsive (xs:1, sm:2, md:3, lg:4)">
        <div style={{ width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 12 }}>
            Redimensiona la ventana para ver el cambio de columnas
          </Text>
          <Waterfall
            columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            gutter={{ xs: 8, sm: 12, md: 16 }}
            items={sampleItems.slice(0, 8).map(item => ({
              key: item.key,
              children: (
                <div style={{
                  height: item.height,
                  backgroundColor: item.color,
                  borderRadius: 8,
                  padding: 16,
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Text style={{ color: '#fff' }} weight="bold">{item.title}</Text>
                </div>
              ),
            }))}
          />
        </div>
      </Section>

      <Section title="Semantic DOM Styling (classNames / styles)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block' }}>
            Slots disponibles: <Text code>root</Text>, <Text code>column</Text>, <Text code>item</Text>
          </Text>
          <Waterfall
            columns={3}
            gutter={12}
            styles={{
              root: { backgroundColor: '#fefce8', padding: 12, borderRadius: 12, border: '1px solid #fde68a' },
              column: { backgroundColor: '#fffbeb', borderRadius: 8 },
              item: { boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderRadius: 8 },
            }}
            items={sampleItems.slice(0, 6).map(item => ({
              key: item.key,
              children: (
                <div style={{
                  height: item.height,
                  backgroundColor: item.color,
                  borderRadius: 8,
                  padding: 16,
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}>
                  <Text style={{ color: '#fff' }} weight="semibold">{item.title}</Text>
                </div>
              ),
            }))}
          />
        </div>
      </Section>
    </div>
  )
}
