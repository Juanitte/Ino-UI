import type { CSSProperties } from 'react'
import { Row, Col, Text, tokens } from '../../index'
import { Section } from './shared'

export function GridSection() {
  const colStyle: CSSProperties = {
    backgroundColor: tokens.colorPrimary,
    color: tokens.colorPrimaryContrast,
    padding: '12px 0',
    textAlign: 'center',
    borderRadius: 4,
  }

  const colStyleAlt: CSSProperties = {
    ...colStyle,
    backgroundColor: tokens.colorPrimaryHover,
  }

  return (
    <div>
      <Text size="xl" weight="bold" style={{ display: 'block' }}>Grid</Text>
      <Text type="secondary" style={{ display: 'block', marginBottom: 32 }}>
        Sistema de grid de 24 columnas con soporte responsive.
      </Text>

      <Section title="Básico (24 columnas)">
        <div style={{ width: '100%' }}>
          <Row gutter={8}>
            <Col span={24}><div style={colStyle}>col-24</div></Col>
          </Row>
          <div style={{ height: 8 }} />
          <Row gutter={8}>
            <Col span={12}><div style={colStyle}>col-12</div></Col>
            <Col span={12}><div style={colStyleAlt}>col-12</div></Col>
          </Row>
          <div style={{ height: 8 }} />
          <Row gutter={8}>
            <Col span={8}><div style={colStyle}>col-8</div></Col>
            <Col span={8}><div style={colStyleAlt}>col-8</div></Col>
            <Col span={8}><div style={colStyle}>col-8</div></Col>
          </Row>
          <div style={{ height: 8 }} />
          <Row gutter={8}>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyleAlt}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyleAlt}>col-6</div></Col>
          </Row>
        </div>
      </Section>

      <Section title="Gutter (espacio entre columnas)">
        <div style={{ width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>gutter={`{16}`}</Text>
          <Row gutter={16}>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
          </Row>
          <div style={{ height: 16 }} />
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>gutter={`{32}`}</Text>
          <Row gutter={32}>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
          </Row>
        </div>
      </Section>

      <Section title="Gutter vertical y horizontal">
        <div style={{ width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>gutter={`{[16, 24]}`} - 16px horizontal, 24px vertical</Text>
          <Row gutter={[16, 24]}>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
            <Col span={6}><div style={colStyle}>col-6</div></Col>
          </Row>
        </div>
      </Section>

      <Section title="Offset (desplazamiento)">
        <div style={{ width: '100%' }}>
          <Row gutter={16}>
            <Col span={8}><div style={colStyle}>col-8</div></Col>
            <Col span={8} offset={8}><div style={colStyle}>col-8 offset-8</div></Col>
          </Row>
          <div style={{ height: 8 }} />
          <Row gutter={16}>
            <Col span={6} offset={6}><div style={colStyle}>col-6 offset-6</div></Col>
            <Col span={6} offset={6}><div style={colStyle}>col-6 offset-6</div></Col>
          </Row>
        </div>
      </Section>

      <Section title="Align (alineación vertical)">
        <div style={{ width: '100%' }}>
          {(['top', 'middle', 'bottom'] as const).map((align) => (
            <div key={align} style={{ marginBottom: 16 }}>
              <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>{align}</Text>
              <Row gutter={16} align={align} style={{ backgroundColor: tokens.colorBgMuted, padding: 8, borderRadius: 8 }}>
                <Col span={4}><div style={{ ...colStyle, padding: '32px 0' }}>col-4</div></Col>
                <Col span={4}><div style={{ ...colStyle, padding: '16px 0' }}>col-4</div></Col>
                <Col span={4}><div style={{ ...colStyle, padding: '48px 0' }}>col-4</div></Col>
                <Col span={4}><div style={{ ...colStyle, padding: '24px 0' }}>col-4</div></Col>
              </Row>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Justify (alineación horizontal)">
        <div style={{ width: '100%' }}>
          {(['start', 'center', 'end', 'space-between', 'space-around'] as const).map((justify) => (
            <div key={justify} style={{ marginBottom: 16 }}>
              <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>{justify}</Text>
              <Row gutter={16} justify={justify} style={{ backgroundColor: tokens.colorBgMuted, padding: 8, borderRadius: 8 }}>
                <Col span={4}><div style={colStyle}>col-4</div></Col>
                <Col span={4}><div style={colStyle}>col-4</div></Col>
                <Col span={4}><div style={colStyle}>col-4</div></Col>
              </Row>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Order (orden flex)">
        <div style={{ width: '100%' }}>
          <Row gutter={16}>
            <Col span={6} order={4}><div style={colStyle}>1 - order: 4</div></Col>
            <Col span={6} order={3}><div style={colStyleAlt}>2 - order: 3</div></Col>
            <Col span={6} order={2}><div style={colStyle}>3 - order: 2</div></Col>
            <Col span={6} order={1}><div style={colStyleAlt}>4 - order: 1</div></Col>
          </Row>
        </div>
      </Section>

      <Section title="Flex">
        <div style={{ width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>flex="auto" + flex="200px"</Text>
          <Row gutter={16}>
            <Col flex="200px"><div style={colStyle}>200px</div></Col>
            <Col flex="auto"><div style={colStyleAlt}>auto</div></Col>
          </Row>
          <div style={{ height: 16 }} />
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>flex="1" + flex="2"</Text>
          <Row gutter={16}>
            <Col flex={1}><div style={colStyle}>flex: 1</div></Col>
            <Col flex={2}><div style={colStyleAlt}>flex: 2</div></Col>
          </Row>
        </div>
      </Section>

      <Section title="Push y Pull">
        <div style={{ width: '100%' }}>
          <Row gutter={16}>
            <Col span={8} push={16}><div style={colStyle}>col-8 push-16</div></Col>
            <Col span={16} pull={8}><div style={colStyleAlt}>col-16 pull-8</div></Col>
          </Row>
        </div>
      </Section>

      <Section title="Responsive">
        <div style={{ width: '100%' }}>
          <Text size="sm" type="secondary" style={{ display: 'block', marginBottom: 8 }}>
            Redimensiona la ventana para ver el cambio
          </Text>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}><div style={colStyle}>xs:24 sm:12 md:8 lg:6</div></Col>
            <Col xs={24} sm={12} md={8} lg={6}><div style={colStyleAlt}>xs:24 sm:12 md:8 lg:6</div></Col>
            <Col xs={24} sm={12} md={8} lg={6}><div style={colStyle}>xs:24 sm:12 md:8 lg:6</div></Col>
            <Col xs={24} sm={12} md={8} lg={6}><div style={colStyleAlt}>xs:24 sm:12 md:8 lg:6</div></Col>
          </Row>
        </div>
      </Section>

      <Section title="Responsive con objeto">
        <div style={{ width: '100%' }}>
          <Row gutter={[16, 16]}>
            <Col xs={{ span: 24 }} md={{ span: 12, offset: 6 }}>
              <div style={colStyle}>xs:24 md:12+offset:6</div>
            </Col>
          </Row>
        </div>
      </Section>

      <Section title="Ejemplo: Layout de tarjetas">
        <div style={{ width: '100%' }}>
          <Row gutter={[16, 16]}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <Col key={n} xs={24} sm={12} md={8}>
                <div style={{
                  padding: 16,
                  backgroundColor: tokens.colorBgMuted,
                  borderRadius: 8,
                  border: `1px solid ${tokens.colorBorder}`,
                }}>
                  <div style={{ height: 80, backgroundColor: tokens.colorPrimaryLight, borderRadius: 4, marginBottom: 12 }} />
                  <Text weight="semibold" style={{ display: 'block' }}>Tarjeta {n}</Text>
                  <Text size="sm" type="secondary">Descripción de la tarjeta</Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Section>
    </div>
  )
}
