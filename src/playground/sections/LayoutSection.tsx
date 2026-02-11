import { useState, type CSSProperties } from 'react'
import { Layout, Row, Col, Text, tokens } from '../../index'
import { Section } from './shared'

export function LayoutSection() {
  const [collapsed, setCollapsed] = useState(false)
  const [collapsed2, setCollapsed2] = useState(false)

  const demoBoxStyle: CSSProperties = {
    border: `1px solid ${tokens.colorBorder}`,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  }

  const headerStyle: CSSProperties = {
    backgroundColor: '#3a3a3a',
    color: '#fff',
    borderBottom: '1px solid #555',
  }

  const siderStyle: CSSProperties = {
    backgroundColor: '#2a2a2a',
  }

  const contentStyle: CSSProperties = {
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const footerStyle: CSSProperties = {
    backgroundColor: '#e0e0e0',
    textAlign: 'center',
    borderTop: '1px solid #ccc',
  }

  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Layout</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Componentes de layout para estructurar páginas.
      </Text>

      <Section title="Básico: Header + Content + Footer">
        <div style={{ width: '100%', ...demoBoxStyle, height: 300 }}>
          <Layout style={{ height: '100%' }}>
            <Layout.Header style={headerStyle}>
              <Text style={{ color: '#fff' }} weight="semibold">Header</Text>
            </Layout.Header>
            <Layout.Content style={contentStyle}>
              <Text style={{ color: '#333' }}>Content</Text>
            </Layout.Content>
            <Layout.Footer style={footerStyle}>
              <Text style={{ color: '#555' }}>Footer</Text>
            </Layout.Footer>
          </Layout>
        </div>
      </Section>

      <Section title="Con Sider izquierdo">
        <div style={{ width: '100%', ...demoBoxStyle, height: 350 }}>
          <Layout style={{ height: '100%' }} hasSider>
            <Layout.Sider style={{ ...siderStyle, borderRight: '1px solid #444' }}>
              <div style={{ padding: 16, color: 'rgba(255,255,255,0.85)' }}>
                <Text style={{ color: 'rgba(255,255,255,0.85)' }} weight="semibold">Sider</Text>
                <div style={{ marginTop: 16 }}>
                  <div style={{ padding: '8px 0', color: 'rgba(255,255,255,0.65)' }}>Menu Item 1</div>
                  <div style={{ padding: '8px 0', color: 'rgba(255,255,255,0.65)' }}>Menu Item 2</div>
                  <div style={{ padding: '8px 0', color: 'rgba(255,255,255,0.65)' }}>Menu Item 3</div>
                </div>
              </div>
            </Layout.Sider>
            <Layout>
              <Layout.Header style={headerStyle}>
                <Text style={{ color: '#fff' }} weight="semibold">Header</Text>
              </Layout.Header>
              <Layout.Content style={contentStyle}>
                <Text style={{ color: '#333' }}>Content</Text>
              </Layout.Content>
              <Layout.Footer style={footerStyle}>
                <Text style={{ color: '#555' }}>Footer</Text>
              </Layout.Footer>
            </Layout>
          </Layout>
        </div>
      </Section>

      <Section title="Con Sider derecho">
        <div style={{ width: '100%', ...demoBoxStyle, height: 300 }}>
          <Layout style={{ height: '100%' }} hasSider>
            <Layout>
              <Layout.Header style={headerStyle}>
                <Text style={{ color: '#fff' }} weight="semibold">Header</Text>
              </Layout.Header>
              <Layout.Content style={contentStyle}>
                <Text style={{ color: '#333' }}>Content</Text>
              </Layout.Content>
            </Layout>
            <Layout.Sider width={120} style={{ ...siderStyle, borderLeft: '1px solid #444' }}>
              <div style={{ padding: 16, color: 'rgba(255,255,255,0.85)' }}>
                <Text style={{ color: 'rgba(255,255,255,0.85)' }} size="sm">Sider derecho</Text>
              </div>
            </Layout.Sider>
          </Layout>
        </div>
      </Section>

      <Section title="Sider colapsable">
        <div style={{ width: '100%', ...demoBoxStyle, height: 350 }}>
          <Layout style={{ height: '100%' }} hasSider>
            <Layout.Sider
              collapsible
              collapsed={collapsed}
              onCollapse={(c) => setCollapsed(c)}
              style={{ ...siderStyle, borderRight: '1px solid #444' }}
            >
              <div style={{ padding: 16, color: 'rgba(255,255,255,0.85)' }}>
                {!collapsed && <Text style={{ color: 'rgba(255,255,255,0.85)' }} weight="semibold">Menu</Text>}
                <div style={{ marginTop: collapsed ? 0 : 16 }}>
                  <div style={{ padding: '8px 0', color: 'rgba(255,255,255,0.65)', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    {collapsed ? '📄' : '📄 Documentos'}
                  </div>
                  <div style={{ padding: '8px 0', color: 'rgba(255,255,255,0.65)', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    {collapsed ? '⚙️' : '⚙️ Configuración'}
                  </div>
                  <div style={{ padding: '8px 0', color: 'rgba(255,255,255,0.65)', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    {collapsed ? '👤' : '👤 Perfil'}
                  </div>
                </div>
              </div>
            </Layout.Sider>
            <Layout>
              <Layout.Header style={headerStyle}>
                <Text style={{ color: '#fff' }}>Header - Sider {collapsed ? 'colapsado' : 'expandido'}</Text>
              </Layout.Header>
              <Layout.Content style={contentStyle}>
                <Text style={{ color: '#333' }}>Click en la flecha del Sider para colapsar/expandir</Text>
              </Layout.Content>
            </Layout>
          </Layout>
        </div>
      </Section>

      <Section title="Sider con collapsedWidth=0">
        <div style={{ width: '100%', ...demoBoxStyle, height: 300 }}>
          <Layout style={{ height: '100%' }} hasSider>
            <Layout.Sider
              collapsible
              collapsed={collapsed2}
              collapsedWidth={0}
              onCollapse={(c) => setCollapsed2(c)}
              style={siderStyle}
            >
              <div style={{ padding: 16, color: 'rgba(255,255,255,0.85)' }}>
                <Text style={{ color: 'rgba(255,255,255,0.85)' }} weight="semibold">Sider</Text>
                <div style={{ marginTop: 16 }}>
                  <div style={{ padding: '8px 0', color: 'rgba(255,255,255,0.65)' }}>Item 1</div>
                  <div style={{ padding: '8px 0', color: 'rgba(255,255,255,0.65)' }}>Item 2</div>
                </div>
              </div>
            </Layout.Sider>
            <Layout>
              <Layout.Content style={contentStyle}>
                <Text style={{ color: '#333' }}>Cuando collapsedWidth=0, aparece un trigger especial fuera del sider</Text>
              </Layout.Content>
            </Layout>
          </Layout>
        </div>
      </Section>

      <Section title="Layouts anidados">
        <div style={{ width: '100%', ...demoBoxStyle, height: 350 }}>
          <Layout style={{ height: '100%' }}>
            <Layout.Header style={headerStyle}>
              <Text style={{ color: '#fff' }} weight="semibold">Header principal</Text>
            </Layout.Header>
            <Layout hasSider>
              <Layout.Sider width={160} style={{ ...siderStyle, borderRight: '1px solid #444' }}>
                <div style={{ padding: 16, color: 'rgba(255,255,255,0.85)' }}>
                  <Text style={{ color: 'rgba(255,255,255,0.85)' }} weight="semibold">Nav</Text>
                </div>
              </Layout.Sider>
              <Layout>
                <Layout.Header style={{ backgroundColor: '#4a4a4a', borderBottom: '1px solid #666' }}>
                  <Text style={{ color: '#fff' }} size="sm">Sub-header (layout anidado)</Text>
                </Layout.Header>
                <Layout hasSider>
                  <Layout.Content style={{ ...contentStyle, padding: 16 }}>
                    <Text style={{ color: '#333' }}>Content del layout interno</Text>
                  </Layout.Content>
                  <Layout.Sider width={100} theme="light" style={{ borderLeft: `1px solid ${tokens.colorBorder}` }}>
                    <div style={{ padding: 12 }}>
                      <Text size="sm" type="secondary">Panel lateral</Text>
                    </div>
                  </Layout.Sider>
                </Layout>
                <Layout.Footer style={{ ...footerStyle, padding: '8px 16px' }}>
                  <Text style={{ color: '#555' }} size="sm">Footer interno</Text>
                </Layout.Footer>
              </Layout>
            </Layout>
          </Layout>
        </div>
      </Section>

      <Section title="Layout completo (dashboard)">
        <div style={{ width: '100%', ...demoBoxStyle, height: 400 }}>
          <Layout style={{ height: '100%' }}>
            <Layout.Header style={{ ...headerStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ color: '#fff' }} weight="bold" size="lg">Dashboard</Text>
              <div style={{ display: 'flex', gap: 16 }}>
                <Text style={{ color: 'rgba(255,255,255,0.65)' }} size="sm">Usuario</Text>
                <Text style={{ color: 'rgba(255,255,255,0.65)' }} size="sm">Salir</Text>
              </div>
            </Layout.Header>
            <Layout hasSider>
              <Layout.Sider width={180} theme="light" style={{ borderRight: `1px solid ${tokens.colorBorder}` }}>
                <div style={{ padding: '16px 0' }}>
                  {['Dashboard', 'Usuarios', 'Productos', 'Pedidos', 'Reportes'].map((item, i) => (
                    <div
                      key={item}
                      style={{
                        padding: '12px 24px',
                        backgroundColor: i === 0 ? '#e8e8e8' : 'transparent',
                        fontWeight: i === 0 ? 600 : 400,
                        cursor: 'pointer',
                      }}
                    >
                      <Text style={{ color: i === 0 ? '#333' : tokens.colorTextMuted }}>{item}</Text>
                    </div>
                  ))}
                </div>
              </Layout.Sider>
              <Layout>
                <Layout.Content style={{ backgroundColor: '#f5f5f5' }}>
                  <div style={{ backgroundColor: '#fff', padding: 24, borderRadius: 8, height: '100%', border: `1px solid ${tokens.colorBorder}` }}>
                    <Text weight="semibold" size="lg" style={{ display: 'block', marginBottom: 16, color: '#333' }}>
                      Bienvenido al Dashboard
                    </Text>
                    <Row gutter={[16, 16]}>
                      {['Ventas', 'Usuarios', 'Pedidos', 'Ingresos'].map((stat) => (
                        <Col key={stat} span={6}>
                          <div style={{ padding: 16, backgroundColor: '#fafafa', borderRadius: 8, textAlign: 'center', border: `1px solid ${tokens.colorBorder}` }}>
                            <Text type="secondary" size="sm" style={{ display: 'block' }}>{stat}</Text>
                            <Text weight="bold" size="xl" style={{ color: '#333' }}>123</Text>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Layout.Content>
                <Layout.Footer style={{ ...footerStyle, padding: '12px 24px' }}>
                  <Text type="secondary" size="sm">© 2024 Mi Empresa</Text>
                </Layout.Footer>
              </Layout>
            </Layout>
          </Layout>
        </div>
      </Section>

      <Section title="Semantic DOM Styling: Sider (classNames / styles)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block' }}>
            Slots de Sider: <Text code>root</Text>, <Text code>content</Text>, <Text code>trigger</Text>
          </Text>
          <div style={{ width: '100%', ...demoBoxStyle, height: 300 }}>
            <Layout style={{ height: '100%' }} hasSider>
              <Layout.Sider
                collapsible
                theme="light"
                styles={{
                  root: { borderRight: '2px solid #8b5cf6', backgroundColor: '#faf5ff' },
                  content: { padding: 16 },
                  trigger: { backgroundColor: '#8b5cf6', color: '#fff' },
                }}
              >
                <Text style={{ color: '#7c3aed' }} weight="semibold">Menu</Text>
                <div style={{ marginTop: 16 }}>
                  <div style={{ padding: '8px 0', color: '#7c3aed' }}>Item 1</div>
                  <div style={{ padding: '8px 0', color: '#7c3aed' }}>Item 2</div>
                  <div style={{ padding: '8px 0', color: '#7c3aed' }}>Item 3</div>
                </div>
              </Layout.Sider>
              <Layout>
                <Layout.Content style={contentStyle}>
                  <Text style={{ color: '#333' }}>El Sider usa styles.trigger para colorear el trigger</Text>
                </Layout.Content>
              </Layout>
            </Layout>
          </div>
        </div>
      </Section>
    </div>
  )
}
