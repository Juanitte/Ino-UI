# J-UI

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> **🇬🇧 [Read in English](./README.md)**

Una libreria de componentes React moderna y ligera con soporte integrado de temas.

## Tabla de Contenidos

- [Caracteristicas](#caracteristicas)
- [Instalacion](#instalacion)
- [Inicio Rapido](#inicio-rapido)
- [Sistema de Temas](#sistema-de-temas)
  - [ThemeProvider](#themeprovider)
  - [Hook useTheme](#hook-usetheme)
  - [Sistema de Colores](#sistema-de-colores)
  - [Theme Tokens](#theme-tokens)
- [Componentes](#componentes)
  - [Badge](#badge)
  - [Bubble](#bubble)
  - [Button](#button)
  - [Divider](#divider)
  - [Flex](#flex)
  - [Grid](#grid)
  - [Layout](#layout)
  - [Text](#text)
  - [Waterfall](#waterfall)
  - [Tooltip](#tooltip)

## Caracteristicas

- Completamente tipado con TypeScript
- Soporte integrado de modo claro/oscuro
- Generacion automatica de paletas de colores
- Variables CSS para facil personalizacion
- Tree-shakeable y ligero
- Compatible con React 18 y 19

## Instalacion

```bash
# npm
npm install j-ui

# yarn
yarn add j-ui

# pnpm
pnpm add j-ui
```

## Inicio Rapido

Envuelve tu aplicacion con `ThemeProvider` y comienza a usar los componentes:

```tsx
import { ThemeProvider, Button, Tooltip } from 'j-ui'

function App() {
  return (
    <ThemeProvider>
      <Tooltip content="Haz clic!">
        <Button>Hola J-UI</Button>
      </Tooltip>
    </ThemeProvider>
  )
}
```

---

## Sistema de Temas

J-UI incluye un potente sistema de temas que genera automaticamente paletas de colores y maneja el cambio entre modo claro y oscuro.

### ThemeProvider

El componente `ThemeProvider` debe envolver tu aplicacion para habilitar la funcionalidad de temas.

#### Props

| Prop | Tipo | Por Defecto | Descripcion |
|------|------|-------------|-------------|
| `children` | `ReactNode` | — | Contenido de la aplicacion |
| `config` | `ThemeConfig` | `{}` | Objeto de configuracion del tema |

#### ThemeConfig

```typescript
interface ThemeConfig {
  colors?: ThemeColors      // Paleta de colores personalizada
  defaultMode?: ThemeMode   // 'light' | 'dark'
}

interface ThemeColors {
  primary?: string    // Por defecto: '#8c75d1'
  secondary?: string  // Por defecto: '#78808b'
  success?: string    // Por defecto: '#79bc58'
  warning?: string    // Por defecto: '#d5ac59'
  error?: string      // Por defecto: '#d7595b'
  info?: string       // Por defecto: '#6591c7'
}
```

#### Uso

```tsx
// Uso basico
<ThemeProvider>
  <App />
</ThemeProvider>

// Con configuracion personalizada
<ThemeProvider
  config={{
    defaultMode: 'dark',
    colors: {
      primary: '#FF6B6B',
      success: '#4ECDC4'
    }
  }}
>
  <App />
</ThemeProvider>
```

### Hook useTheme

Accede y controla el tema actual desde cualquier componente dentro del `ThemeProvider`.

```typescript
const { mode, setMode, toggleMode } = useTheme()
```

#### Retorna

| Propiedad | Tipo | Descripcion |
|-----------|------|-------------|
| `mode` | `'light' \| 'dark'` | Modo actual del tema |
| `setMode` | `(mode: ThemeMode) => void` | Establece el modo explicitamente |
| `toggleMode` | `() => void` | Alterna entre claro y oscuro |

#### Ejemplo

```tsx
import { useTheme, Button } from 'j-ui'

function CambiarTema() {
  const { mode, toggleMode } = useTheme()

  return (
    <Button onClick={toggleMode}>
      Actual: {mode}
    </Button>
  )
}
```

### Sistema de Colores

J-UI genera automaticamente 10 tonos (50-900) para cada color semantico. Estan disponibles como variables CSS:

```css
/* Color base */
var(--j-primary)

/* Variantes de color */
var(--j-primary-50)   /* Mas claro */
var(--j-primary-100)
var(--j-primary-200)
var(--j-primary-300)
var(--j-primary-400)
var(--j-primary-500)
var(--j-primary-600)
var(--j-primary-700)
var(--j-primary-800)
var(--j-primary-900)  /* Mas oscuro */

/* Alias semanticos */
var(--j-primary-light)     /* Variante clara */
var(--j-primary-dark)      /* Variante oscura */
var(--j-primary-hover)     /* Estado hover */
var(--j-primary-border)    /* Color de borde */
var(--j-primary-contrast)  /* Color de texto con contraste */
```

#### Colores Neutros

Estos se adaptan automaticamente segun el modo actual del tema:

| Variable | Descripcion |
|----------|-------------|
| `--j-bg` | Color de fondo |
| `--j-bgSubtle` | Fondo sutil |
| `--j-bgMuted` | Fondo atenuado |
| `--j-border` | Color de borde |
| `--j-borderHover` | Color de borde en hover |
| `--j-text` | Color de texto principal |
| `--j-textMuted` | Texto atenuado |
| `--j-textSubtle` | Texto sutil |
| `--j-shadowSm` | Sombra pequena |
| `--j-shadowMd` | Sombra mediana |
| `--j-shadowLg` | Sombra grande |

### Theme Tokens

J-UI proporciona un objeto `tokens` con referencias tipadas a todas las variables CSS. Esto habilita autocompletado en tu IDE y estilos type-safe en JavaScript/TypeScript.

#### Importar

```tsx
import { tokens } from 'j-ui'
```

#### Uso

```tsx
// En estilos inline
<div style={{
  backgroundColor: tokens.colorPrimaryBg,
  color: tokens.colorPrimary,
  boxShadow: tokens.shadowMd
}}>
  Estilizado con tokens
</div>

// En styled-components, emotion, etc.
const StyledCard = styled.div`
  background: ${tokens.colorBgSubtle};
  border: 1px solid ${tokens.colorBorder};
`
```

#### Tokens Disponibles

**Colores Semanticos** (para cada uno: primary, secondary, success, warning, error, info):

| Token | Variable CSS |
|-------|--------------|
| `tokens.colorPrimary` | `var(--j-primary)` |
| `tokens.colorPrimaryHover` | `var(--j-primary-hover)` |
| `tokens.colorPrimaryBg` | `var(--j-primary-dark)` |
| `tokens.colorPrimaryBorder` | `var(--j-primary-border)` |
| `tokens.colorPrimaryContrast` | `var(--j-primary-contrast)` |
| `tokens.colorPrimary50` - `tokens.colorPrimary900` | `var(--j-primary-50)` - `var(--j-primary-900)` |

**Colores Neutros**:

| Token | Variable CSS |
|-------|--------------|
| `tokens.colorBg` | `var(--j-bg)` |
| `tokens.colorBgSubtle` | `var(--j-bgSubtle)` |
| `tokens.colorBgMuted` | `var(--j-bgMuted)` |
| `tokens.colorBorder` | `var(--j-border)` |
| `tokens.colorBorderHover` | `var(--j-borderHover)` |
| `tokens.colorText` | `var(--j-text)` |
| `tokens.colorTextMuted` | `var(--j-textMuted)` |
| `tokens.colorTextSubtle` | `var(--j-textSubtle)` |

**Sombras**:

| Token | Variable CSS |
|-------|--------------|
| `tokens.shadowSm` | `var(--j-shadowSm)` |
| `tokens.shadowMd` | `var(--j-shadowMd)` |
| `tokens.shadowLg` | `var(--j-shadowLg)` |

---

## Componentes

<details>
<summary><strong>Badge</strong> - Etiqueta compacta para estados y metadatos</summary>

### Badge

Un componente de etiqueta compacto para mostrar estados, categorias o metadatos.

#### Importar

```tsx
import { Badge } from 'j-ui'
// Opcionalmente importa tokens para colores type-safe
import { Badge, tokens } from 'j-ui'
```

#### Props

| Prop | Tipo | Por Defecto | Descripcion |
|------|------|-------------|-------------|
| `children` | `ReactNode` | — | Contenido del badge |
| `bgColor` | `string` | `'var(--j-primary-light)'` | Color de fondo (color CSS, variable CSS, o token) |
| `color` | `string` | `'var(--j-primary)'` | Color del texto y borde (color CSS, variable CSS, o token) |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Radio del borde |
| `icon` | `ReactNode` | — | Icono opcional a la izquierda |
| `bordered` | `boolean` | `true` | Mostrar borde |

#### Opciones de Radio

| Radio | Valor |
|-------|-------|
| `none` | 0 |
| `sm` | 4px |
| `md` | 6px |
| `lg` | 12px |
| `full` | 9999px (forma de pastilla) |

#### Ejemplos

```tsx
// Basico
<Badge>Nuevo</Badge>

// Usando tokens (recomendado - type-safe con autocompletado)
<Badge bgColor={tokens.colorSuccess100} color={tokens.colorSuccess}>
  Activo
</Badge>

<Badge bgColor={tokens.colorError100} color={tokens.colorError}>
  Expirado
</Badge>

<Badge bgColor={tokens.colorWarning100} color={tokens.colorWarning}>
  Pendiente
</Badge>

// Usando variables CSS directamente
<Badge bgColor="var(--j-info-light)" color="var(--j-info)">
  Info
</Badge>

// Diferentes radios
<Badge radius="none">Cuadrado</Badge>
<Badge radius="full">Pastilla</Badge>

// Con icono
<Badge icon={<CheckIcon />}>Verificado</Badge>

// Sin borde
<Badge bordered={false}>Sutil</Badge>

// Colores personalizados (cualquier color CSS)
<Badge bgColor="#ffe4e6" color="#be123c">
  Rosa Personalizado
</Badge>
```

</details>

---

<details>
<summary><strong>Bubble</strong> - Boton de accion flotante con menus y grupos</summary>

### Bubble

Un componente de boton de accion flotante (FAB) para acciones rapidas, con soporte para badges, tooltips, grupos compactos y menus expandibles.

#### Importar

```tsx
import { Bubble, BackToTopIcon, ChatIcon, BellIcon, CloseIcon } from 'j-ui'
```

#### Props

| Prop | Tipo | Por Defecto | Descripcion |
|------|------|-------------|-------------|
| `icon` | `ReactNode` | — | Icono a mostrar |
| `description` | `string` | — | Texto a mostrar (solo si no hay icono) |
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'bottom-right'` | Posicion fija en pantalla |
| `shape` | `'circle' \| 'square'` | `'circle'` | Forma del bubble |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano del bubble |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | Color semantico |
| `badge` | `number \| boolean` | — | Mostrar badge con numero o punto |
| `badgeColor` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'error'` | Color del badge |
| `tooltip` | `string` | — | Texto del tooltip |
| `tooltipPosition` | `'left' \| 'right' \| 'top' \| 'bottom'` | auto | Posicion del tooltip |
| `offsetX` | `number` | `24` | Desplazamiento horizontal desde el borde (px) |
| `offsetY` | `number` | `24` | Desplazamiento vertical desde el borde (px) |
| `shadow` | `boolean \| 'sm' \| 'md' \| 'lg'` | `'lg'` | Aplicar sombra |
| `bordered` | `boolean` | `true` | Mostrar borde |
| `onBackToTop` | `() => void` | — | Callback al volver arriba |
| `visibleOnScroll` | `number` | — | Mostrar solo despues de hacer scroll (px) |
| `disabled` | `boolean` | `false` | Deshabilita el bubble |

Tambien acepta todos los atributos HTML estandar de `<button>`.

#### Tamanos

| Tamano | Dimensiones | Tamano de Icono |
|--------|-------------|-----------------|
| `sm` | 40px | 16px |
| `md` | 48px | 20px |
| `lg` | 56px | 24px |

#### Iconos Incluidos

J-UI proporciona iconos utilitarios para casos de uso comunes de FAB:

| Icono | Descripcion |
|-------|-------------|
| `BackToTopIcon` | Flecha apuntando arriba |
| `ChatIcon` | Burbuja de chat/mensaje |
| `BellIcon` | Campana de notificacion |
| `CloseIcon` | Icono X de cerrar |

#### Ejemplos

```tsx
// Basico
<Bubble icon={<ChatIcon />} />

// Con tooltip
<Bubble icon={<ChatIcon />} tooltip="Abrir chat" />

// Diferentes posiciones
<Bubble icon={<BellIcon />} position="top-right" />
<Bubble icon={<ChatIcon />} position="bottom-left" />

// Con badge (numero)
<Bubble icon={<BellIcon />} badge={5} />

// Con badge (punto)
<Bubble icon={<ChatIcon />} badge={true} />

// Badge con color personalizado
<Bubble icon={<BellIcon />} badge={3} badgeColor="warning" />

// Diferentes colores
<Bubble icon={<ChatIcon />} color="success" />
<Bubble icon={<BellIcon />} color="info" />

// Diferentes tamanos
<Bubble icon={<ChatIcon />} size="sm" />
<Bubble icon={<ChatIcon />} size="lg" />

// Forma cuadrada
<Bubble icon={<ChatIcon />} shape="square" />

// Sin borde
<Bubble icon={<ChatIcon />} bordered={false} />

// Boton volver arriba (aparece despues de scroll de 200px)
<Bubble
  icon={<BackToTopIcon />}
  tooltip="Volver arriba"
  visibleOnScroll={200}
  onBackToTop={() => console.log('Scroll al inicio')}
/>

// Desplazamiento personalizado
<Bubble icon={<ChatIcon />} offsetX={40} offsetY={40} />

// Con texto en lugar de icono
<Bubble description="?" tooltip="Ayuda" />
```

---

### Bubble.Group

Una barra de botones compacta que une multiples Bubbles con estilos unificados. Los bubbles se renderizan como un grupo sin espacios, con sombra compartida y manejo automatico de border-radius.

#### Props

| Prop | Tipo | Por Defecto | Descripcion |
|------|------|-------------|-------------|
| `children` | `ReactNode` | — | Componentes Bubble hijos |
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'bottom-right'` | Posicion fija en pantalla |
| `direction` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Direccion del layout |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano para todos los hijos |
| `offsetX` | `number` | `24` | Desplazamiento horizontal desde el borde (px) |
| `offsetY` | `number` | `24` | Desplazamiento vertical desde el borde (px) |
| `shadow` | `boolean \| 'sm' \| 'md' \| 'lg'` | `'lg'` | Sombra del contenedor del grupo |

#### Direccion

| Direccion | Descripcion |
|-----------|-------------|
| `top` | Los bubbles se apilan hacia arriba desde la posicion |
| `bottom` | Los bubbles se apilan hacia abajo desde la posicion |
| `left` | Los bubbles se apilan hacia la izquierda desde la posicion |
| `right` | Los bubbles se apilan hacia la derecha desde la posicion |

#### Ejemplos

```tsx
// Grupo compacto vertical (apila hacia arriba)
<Bubble.Group>
  <Bubble icon={<ChatIcon />} color="info" />
  <Bubble icon={<BellIcon />} color="warning" />
  <Bubble icon={<BackToTopIcon />} color="success" />
</Bubble.Group>

// Grupo compacto horizontal
<Bubble.Group direction="left">
  <Bubble icon={<ChatIcon />} color="primary" />
  <Bubble icon={<BellIcon />} color="secondary" />
</Bubble.Group>

// Diferente posicion
<Bubble.Group position="top-right" direction="bottom">
  <Bubble icon={<ChatIcon />} />
  <Bubble icon={<BellIcon />} />
</Bubble.Group>

// Con badges (los badges se extienden fuera del grupo)
<Bubble.Group>
  <Bubble icon={<ChatIcon />} badge={3} />
  <Bubble icon={<BellIcon />} badge={true} badgeColor="warning" />
</Bubble.Group>

// Tamano personalizado
<Bubble.Group size="lg">
  <Bubble icon={<ChatIcon />} />
  <Bubble icon={<BellIcon />} />
</Bubble.Group>
```

---

### Bubble.Menu

Un menu flotante expandible que muestra/oculta Bubbles hijos con animacion. Soporta activacion por click o hover.

#### Props

| Prop | Tipo | Por Defecto | Descripcion |
|------|------|-------------|-------------|
| `children` | `ReactNode` | — | Componentes Bubble hijos |
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'bottom-right'` | Posicion fija en pantalla |
| `direction` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Direccion de expansion |
| `trigger` | `'click' \| 'hover'` | `'click'` | Modo de activacion |
| `icon` | `ReactNode` | `+` | Icono del trigger cuando esta cerrado |
| `openIcon` | `ReactNode` | — | Icono del trigger cuando esta abierto (por defecto rota el icono 45deg) |
| `shape` | `'circle' \| 'square'` | `'circle'` | Forma para trigger e hijos |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano para trigger e hijos |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | Color del trigger |
| `offsetX` | `number` | `24` | Desplazamiento horizontal desde el borde (px) |
| `offsetY` | `number` | `24` | Desplazamiento vertical desde el borde (px) |
| `shadow` | `boolean \| 'sm' \| 'md' \| 'lg'` | `'lg'` | Aplicar sombra |
| `tooltip` | `string` | — | Tooltip del trigger (mostrado cuando esta cerrado) |
| `defaultOpen` | `boolean` | `false` | Inicialmente abierto (no controlado) |
| `open` | `boolean` | — | Estado abierto controlado |
| `onOpenChange` | `(open: boolean) => void` | — | Callback cuando cambia el estado |
| `gap` | `number` | `12` | Espacio entre bubbles (px) |

#### Ejemplos

```tsx
// Menu expandible basico (click para abrir)
<Bubble.Menu>
  <Bubble icon={<ChatIcon />} tooltip="Chat" color="info" />
  <Bubble icon={<BellIcon />} tooltip="Notificaciones" color="warning" />
</Bubble.Menu>

// Hover para abrir
<Bubble.Menu trigger="hover">
  <Bubble icon={<ChatIcon />} tooltip="Chat" />
  <Bubble icon={<BellIcon />} tooltip="Alertas" />
</Bubble.Menu>

// Iconos de trigger personalizados
<Bubble.Menu
  icon={<ChatIcon />}
  openIcon={<CloseIcon />}
  color="success"
>
  <Bubble icon={<BellIcon />} tooltip="Notificaciones" />
  <Bubble icon={<BackToTopIcon />} tooltip="Volver arriba" />
</Bubble.Menu>

// Expansion horizontal
<Bubble.Menu direction="left">
  <Bubble icon={<ChatIcon />} />
  <Bubble icon={<BellIcon />} />
</Bubble.Menu>

// Estado controlado
function MiComponente() {
  const [open, setOpen] = useState(false)

  return (
    <Bubble.Menu
      open={open}
      onOpenChange={setOpen}
      tooltip="Acciones"
    >
      <Bubble icon={<ChatIcon />} onClick={() => abrirChat()} />
      <Bubble icon={<BellIcon />} onClick={() => abrirNotificaciones()} />
    </Bubble.Menu>
  )
}

// Diferente posicion
<Bubble.Menu position="top-left" direction="bottom">
  <Bubble icon={<ChatIcon />} />
  <Bubble icon={<BellIcon />} />
</Bubble.Menu>

// Modo inline (no fijo, fluye con el contenido)
<Bubble.Menu style={{ position: 'relative' }}>
  <Bubble icon={<ChatIcon />} />
  <Bubble icon={<BellIcon />} />
</Bubble.Menu>

// Espacio personalizado
<Bubble.Menu gap={20}>
  <Bubble icon={<ChatIcon />} />
  <Bubble icon={<BellIcon />} />
</Bubble.Menu>
```

</details>

---

<details>
<summary><strong>Button</strong> - Boton versatil con variantes y animaciones</summary>

### Button

Un componente de boton versatil con multiples variantes, tamanos y estados.

#### Importar

```tsx
import { Button } from 'j-ui'
```

#### Props

| Prop | Tipo | Por Defecto | Descripcion |
|------|------|-------------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'dashed' \| 'ghost' \| 'link'` | `'primary'` | Variante de estilo |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamano del boton |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | Color semantico |
| `icon` | `ReactNode` | — | Elemento de icono |
| `iconPlacement` | `'start' \| 'end'` | `'start'` | Posicion del icono respecto al texto |
| `loading` | `boolean` | `false` | Muestra spinner de carga |
| `shadow` | `boolean \| 'sm' \| 'md' \| 'lg'` | `false` | Aplica sombra |
| `clickAnimation` | `'pulse' \| 'ripple' \| 'shake' \| 'firecracker' \| 'confetti'` | — | Animacion al hacer clic |
| `hoverAnimation` | `'pulse' \| 'ripple' \| 'shake' \| 'firecracker' \| 'confetti'` | — | Animacion al hacer hover |
| `gradient` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | — | Gradiente preconfigurado usando color del tema |
| `gradientAngle` | `number` | `135` | Angulo del gradiente preconfigurado (grados) |
| `gradientCss` | `string` | — | Gradiente CSS personalizado (sobreescribe `gradient`) |
| `block` | `boolean` | `false` | El boton ocupa el 100% del ancho del contenedor |
| `bordered` | `boolean` | `false` | Anade borde extra |
| `disabled` | `boolean` | `false` | Deshabilita el boton |
| `children` | `ReactNode` | — | Contenido del boton |

Tambien acepta todos los atributos HTML estandar de `<button>`.

#### Variantes

| Variante | Descripcion |
|----------|-------------|
| `primary` | Fondo solido con el color seleccionado |
| `secondary` | Fondo claro con texto mas oscuro |
| `outline` | Transparente con borde solido de color |
| `dashed` | Transparente con borde punteado de color |
| `ghost` | Transparente, el color aparece en hover |
| `link` | Solo texto, sin padding, aspecto de hiperenlace |

#### Tamanos

| Tamano | Padding | Tamano de Fuente |
|--------|---------|------------------|
| `sm` | `6px 12px` | 13px |
| `md` | `10px 18px` | 14px |
| `lg` | `14px 24px` | 16px |

#### Animaciones

| Animacion | Descripcion |
|-----------|-------------|
| `ripple` | Onda expandiendose desde el punto de clic |
| `pulse` | Doble onda de borde expandiendose hacia afuera |
| `shake` | El boton se agita horizontalmente |
| `firecracker` | Particulas explotan desde los bordes del boton |
| `confetti` | Particulas explotan desde el punto de clic |

#### Ejemplos

```tsx
// Basico
<Button>Haz clic</Button>

// Variantes
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="dashed">Dashed</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Colores
<Button color="success">Exito</Button>
<Button color="warning">Advertencia</Button>
<Button color="error">Error</Button>

// Tamanos
<Button size="sm">Pequeno</Button>
<Button size="md">Mediano</Button>
<Button size="lg">Grande</Button>

// Estados
<Button loading>Cargando...</Button>
<Button disabled>Deshabilitado</Button>

// Animaciones de clic
<Button clickAnimation="ripple">Ripple</Button>
<Button clickAnimation="pulse">Pulse</Button>
<Button clickAnimation="shake">Shake</Button>
<Button clickAnimation="firecracker">Firecracker</Button>
<Button clickAnimation="confetti">Confetti</Button>

// Animacion de hover
<Button hoverAnimation="pulse">Pasa el cursor</Button>

// Sombra
<Button shadow="lg">Con Sombra</Button>

// Ancho completo (block)
<Button block>Boton Ancho Completo</Button>

// Gradiente preconfigurado (usa tonos del color del tema)
<Button gradient="primary">Gradiente Primary</Button>
<Button gradient="success">Gradiente Success</Button>

// Angulo de gradiente personalizado
<Button gradient="info" gradientAngle={45}>Gradiente 45deg</Button>
<Button gradient="warning" gradientAngle={90}>Gradiente 90deg</Button>

// Gradiente CSS personalizado
<Button gradientCss="linear-gradient(90deg, #ff6b6b, #feca57)">
  Atardecer
</Button>
<Button gradientCss="linear-gradient(135deg, #667eea, #764ba2)">
  Purple Haze
</Button>

// Con icono (posicion inicio - por defecto)
<Button icon={<PlusIcon />}>Agregar</Button>

// Con icono al final
<Button icon={<ArrowRightIcon />} iconPlacement="end">
  Continuar
</Button>

// Icono con variante dashed
<Button variant="dashed" icon={<UploadIcon />}>
  Subir Archivo
</Button>

// Combinado
<Button
  variant="outline"
  color="success"
  size="lg"
  clickAnimation="confetti"
  shadow
>
  Completar Pedido
</Button>
```

</details>

---

<details>
<summary><strong>Divider</strong> - Linea separadora con texto opcional</summary>

### Divider

Un componente separador para dividir secciones de contenido, con texto opcional y multiples opciones de estilo.

#### Importar

```tsx
import { Divider } from 'j-ui'
```

#### Props

| Prop | Tipo | Por Defecto | Descripcion |
|------|------|-------------|-------------|
| `type` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientacion del divider |
| `dashed` | `boolean` | `false` | Usar linea discontinua en lugar de solida |
| `orientation` | `'left' \| 'center' \| 'right'` | `'center'` | Posicion del texto (solo horizontal) |
| `orientationMargin` | `number \| string` | — | Margen desde el borde hasta el texto (px o %) |
| `plain` | `boolean` | `false` | Estilo de texto plano (mas pequeno, sin negrita) |
| `color` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Color de linea y texto |
| `thickness` | `'thin' \| 'normal' \| 'medium' \| 'thick' \| number` | `'normal'` | Grosor de la linea |
| `children` | `ReactNode` | — | Contenido de texto dentro del divider |

#### Valores de Grosor

| Grosor | Valor |
|--------|-------|
| `thin` | 1px |
| `normal` | 1px |
| `medium` | 2px |
| `thick` | 3px |
| `number` | Valor personalizado en px |

#### Ejemplos

```tsx
// Divider horizontal basico
<Divider />

// Con texto
<Divider>Titulo de Seccion</Divider>

// Orientacion del texto
<Divider orientation="left">Texto Izquierda</Divider>
<Divider orientation="center">Texto Centro</Divider>
<Divider orientation="right">Texto Derecha</Divider>

// Margen personalizado desde el borde
<Divider orientation="left" orientationMargin={20}>
  20px desde la izquierda
</Divider>
<Divider orientation="left" orientationMargin="10%">
  10% desde la izquierda
</Divider>

// Linea discontinua
<Divider dashed>Divider Discontinuo</Divider>

// Texto plano (mas pequeno, sin negrita)
<Divider plain>Texto Plano</Divider>

// Colores
<Divider color="primary">Primary</Divider>
<Divider color="success">Success</Divider>
<Divider color="warning">Warning</Divider>
<Divider color="error">Error</Divider>
<Divider color="info">Info</Divider>

// Grosor de linea
<Divider thickness="thin" />
<Divider thickness="medium">Medium</Divider>
<Divider thickness="thick">Thick</Divider>
<Divider thickness={4}>Personalizado 4px</Divider>

// Divider vertical (separador inline)
<span>Item 1</span>
<Divider type="vertical" />
<span>Item 2</span>
<Divider type="vertical" />
<span>Item 3</span>

// Vertical con color
<span>Inicio</span>
<Divider type="vertical" color="primary" />
<span>Acerca de</span>

// Estilos combinados
<Divider dashed color="primary" thickness="medium" orientation="left">
  Seccion Importante
</Divider>
```

</details>

---

<details>
<summary><strong>Flex</strong> - Contenedor flexbox para layout</summary>

### Flex

Un componente de layout con CSS Flexbox para organizar elementos.

#### Importar

```tsx
import { Flex } from 'j-ui'
```

#### Props

| Prop | Tipo | Por Defecto | Descripcion |
|------|------|-------------|-------------|
| `children` | `ReactNode` | — | Contenido del flex container |
| `vertical` | `boolean` | `false` | Direccion vertical (column) en lugar de horizontal (row) |
| `wrap` | `'nowrap' \| 'wrap' \| 'wrap-reverse' \| boolean` | `'nowrap'` | Comportamiento de wrap |
| `justify` | `FlexJustify` | `'normal'` | Alineacion horizontal (justify-content) |
| `align` | `FlexAlign` | `'normal'` | Alineacion vertical (align-items) |
| `gap` | `'small' \| 'middle' \| 'large' \| number \| [number, number]` | — | Espacio entre elementos |
| `flex` | `CSSProperties['flex']` | — | Propiedad flex del contenedor |
| `component` | `ElementType` | `'div'` | Elemento HTML a renderizar |

#### Valores de FlexJustify

`'flex-start'` | `'center'` | `'flex-end'` | `'space-between'` | `'space-around'` | `'space-evenly'` | `'start'` | `'end'` | `'normal'`

#### Valores de FlexAlign

`'flex-start'` | `'center'` | `'flex-end'` | `'stretch'` | `'baseline'` | `'start'` | `'end'` | `'normal'`

#### Valores de Gap

| Gap | Valor |
|-----|-------|
| `'small'` | 8px |
| `'middle'` | 16px |
| `'large'` | 24px |
| `number` | Valor personalizado en px |
| `[h, v]` | Gap [horizontal, vertical] |

#### Ejemplos

```tsx
// Flex horizontal basico
<Flex>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>

// Flex vertical
<Flex vertical>
  <div>Arriba</div>
  <div>Medio</div>
  <div>Abajo</div>
</Flex>

// Con gap
<Flex gap="middle">
  <div>Item 1</div>
  <div>Item 2</div>
</Flex>

// Gap numerico personalizado
<Flex gap={20}>
  <div>Item 1</div>
  <div>Item 2</div>
</Flex>

// Gap horizontal y vertical diferente
<Flex wrap gap={[16, 8]}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>

// Justify y align
<Flex justify="center" align="center" style={{ height: 200 }}>
  <div>Centrado</div>
</Flex>

// Space between
<Flex justify="space-between">
  <div>Izquierda</div>
  <div>Derecha</div>
</Flex>

// Con wrap
<Flex wrap gap="small">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Flex>

// Elemento personalizado
<Flex component="nav" gap="middle">
  <a href="/">Inicio</a>
  <a href="/acerca">Acerca de</a>
</Flex>

// Combinado
<Flex vertical gap="large" align="stretch">
  <Flex justify="space-between">
    <span>Titulo</span>
    <button>Accion</button>
  </Flex>
  <div>Contenido</div>
</Flex>
```

</details>

---

<details>
<summary><strong>Grid</strong> - Sistema de grid responsivo de 24 columnas</summary>

### Grid

Un sistema de grid responsivo basado en 24 columnas con componentes Row y Col.

#### Importar

```tsx
import { Grid, Row, Col } from 'j-ui'
// o
import { Grid } from 'j-ui'
// Usar como Grid.Row y Grid.Col
```

#### Props de Row

| Prop | Tipo | Por Defecto | Descripcion |
|------|------|-------------|-------------|
| `children` | `ReactNode` | — | Componentes Col |
| `gutter` | `number \| ResponsiveGutter \| [horizontal, vertical]` | `0` | Espacio entre columnas (px) |
| `align` | `'top' \| 'middle' \| 'bottom' \| 'stretch'` | `'top'` | Alineacion vertical |
| `justify` | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `'start'` | Alineacion horizontal |
| `wrap` | `boolean` | `true` | Permitir wrap |

#### Props de Col

| Prop | Tipo | Por Defecto | Descripcion |
|------|------|-------------|-------------|
| `children` | `ReactNode` | — | Contenido de la columna |
| `span` | `number` | — | Numero de columnas (1-24) |
| `offset` | `number` | — | Columnas a desplazar desde la izquierda |
| `push` | `number` | — | Mover a la derecha con position |
| `pull` | `number` | — | Mover a la izquierda con position |
| `order` | `number` | — | Orden flex |
| `flex` | `CSSProperties['flex']` | — | Propiedad flex |
| `xs` | `number \| ColSpanProps` | — | <576px |
| `sm` | `number \| ColSpanProps` | — | ≥576px |
| `md` | `number \| ColSpanProps` | — | ≥768px |
| `lg` | `number \| ColSpanProps` | — | ≥992px |
| `xl` | `number \| ColSpanProps` | — | ≥1200px |
| `xxl` | `number \| ColSpanProps` | — | ≥1600px |

#### Breakpoints

| Breakpoint | Ancho Minimo |
|------------|--------------|
| `xs` | 0px |
| `sm` | 576px |
| `md` | 768px |
| `lg` | 992px |
| `xl` | 1200px |
| `xxl` | 1600px |

#### Ejemplos

```tsx
// Grid basico
<Row>
  <Col span={12}>50%</Col>
  <Col span={12}>50%</Col>
</Row>

// Tres columnas
<Row>
  <Col span={8}>33.33%</Col>
  <Col span={8}>33.33%</Col>
  <Col span={8}>33.33%</Col>
</Row>

// Con gutter
<Row gutter={16}>
  <Col span={6}>25%</Col>
  <Col span={6}>25%</Col>
  <Col span={6}>25%</Col>
  <Col span={6}>25%</Col>
</Row>

// Gutter horizontal y vertical
<Row gutter={[16, 24]}>
  <Col span={6}>Item</Col>
  <Col span={6}>Item</Col>
  <Col span={6}>Item</Col>
  <Col span={6}>Item</Col>
  <Col span={6}>Item</Col>
  <Col span={6}>Item</Col>
</Row>

// Con offset
<Row>
  <Col span={8}>col-8</Col>
  <Col span={8} offset={8}>col-8 offset-8</Col>
</Row>

// Responsivo
<Row gutter={16}>
  <Col xs={24} sm={12} md={8} lg={6}>
    Columna responsiva
  </Col>
  <Col xs={24} sm={12} md={8} lg={6}>
    Columna responsiva
  </Col>
  <Col xs={24} sm={12} md={8} lg={6}>
    Columna responsiva
  </Col>
  <Col xs={24} sm={12} md={8} lg={6}>
    Columna responsiva
  </Col>
</Row>

// Responsivo con props completas
<Row>
  <Col xs={{ span: 24 }} md={{ span: 12, offset: 6 }}>
    Responsivo complejo
  </Col>
</Row>

// Alineacion
<Row justify="center" align="middle" style={{ height: 100 }}>
  <Col span={4}>Centrado</Col>
</Row>

// Columnas flex
<Row>
  <Col flex="100px">Fijo 100px</Col>
  <Col flex="auto">Flexible</Col>
  <Col flex="100px">Fijo 100px</Col>
</Row>

// Usando namespace Grid
<Grid.Row gutter={16}>
  <Grid.Col span={12}>Izquierda</Grid.Col>
  <Grid.Col span={12}>Derecha</Grid.Col>
</Grid.Row>
```

</details>

---

<details>
<summary><strong>Layout</strong> - Layout de pagina con Header, Sider, Content, Footer</summary>

### Layout

Un sistema de layout completo con componentes Header, Footer, Sider y Content.

#### Importar

```tsx
import { Layout } from 'j-ui'
// Usar como Layout, Layout.Header, Layout.Sider, Layout.Content, Layout.Footer

// O importar individualmente
import { Layout, Header, Footer, Content, Sider } from 'j-ui'
```

#### Props de Layout

| Prop | Tipo | Por Defecto | Descripcion |
|------|------|-------------|-------------|
| `children` | `ReactNode` | — | Contenido del layout |
| `hasSider` | `boolean` | `false` | Tiene Sider como hijo directo |

#### Props de Header

| Prop | Tipo | Por Defecto | Descripcion |
|------|------|-------------|-------------|
| `children` | `ReactNode` | — | Contenido del header |

Altura por defecto: 64px, padding: 0 24px

#### Props de Footer

| Prop | Tipo | Por Defecto | Descripcion |
|------|------|-------------|-------------|
| `children` | `ReactNode` | — | Contenido del footer |

Padding por defecto: 24px 50px

#### Props de Content

| Prop | Tipo | Por Defecto | Descripcion |
|------|------|-------------|-------------|
| `children` | `ReactNode` | — | Contenido principal |

Padding por defecto: 24px

#### Props de Sider

| Prop | Tipo | Por Defecto | Descripcion |
|------|------|-------------|-------------|
| `children` | `ReactNode` | — | Contenido del sider |
| `width` | `number \| string` | `200` | Ancho del sider (px) |
| `collapsedWidth` | `number` | `80` | Ancho cuando esta colapsado |
| `collapsible` | `boolean` | `false` | Puede colapsarse |
| `collapsed` | `boolean` | — | Estado colapsado (controlado) |
| `defaultCollapsed` | `boolean` | `false` | Estado colapsado inicial |
| `reverseArrow` | `boolean` | `false` | Invertir direccion de la flecha del trigger |
| `breakpoint` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl'` | — | Breakpoint para auto-colapsar |
| `theme` | `'light' \| 'dark'` | `'dark'` | Tema del sider |
| `trigger` | `ReactNode \| null` | — | Trigger personalizado, null para ocultar |
| `onCollapse` | `(collapsed: boolean, type: 'clickTrigger' \| 'responsive') => void` | — | Callback al colapsar |
| `onBreakpoint` | `(broken: boolean) => void` | — | Callback del breakpoint |

#### Breakpoints

| Breakpoint | Ancho |
|------------|-------|
| `xs` | 480px |
| `sm` | 576px |
| `md` | 768px |
| `lg` | 992px |
| `xl` | 1200px |
| `xxl` | 1600px |

#### Ejemplos

```tsx
// Layout basico
<Layout>
  <Layout.Header>Header</Layout.Header>
  <Layout.Content>Contenido</Layout.Content>
  <Layout.Footer>Footer</Layout.Footer>
</Layout>

// Con Sider
<Layout>
  <Layout.Header>Header</Layout.Header>
  <Layout hasSider>
    <Layout.Sider>Barra lateral</Layout.Sider>
    <Layout.Content>Contenido</Layout.Content>
  </Layout>
  <Layout.Footer>Footer</Layout.Footer>
</Layout>

// Sider a la derecha
<Layout hasSider>
  <Layout.Content>Contenido</Layout.Content>
  <Layout.Sider>Barra derecha</Layout.Sider>
</Layout>

// Sider colapsable
<Layout hasSider>
  <Layout.Sider collapsible>
    Navegacion
  </Layout.Sider>
  <Layout.Content>Contenido</Layout.Content>
</Layout>

// Colapso controlado
function MiLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout hasSider>
      <Layout.Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(c) => setCollapsed(c)}
      >
        Navegacion
      </Layout.Sider>
      <Layout.Content>Contenido</Layout.Content>
    </Layout>
  )
}

// Colapso responsivo
<Layout hasSider>
  <Layout.Sider
    collapsible
    breakpoint="lg"
    onBreakpoint={(broken) => console.log('Broken:', broken)}
  >
    Barra lateral responsiva
  </Layout.Sider>
  <Layout.Content>Contenido</Layout.Content>
</Layout>

// Ancho colapsado personalizado
<Layout hasSider>
  <Layout.Sider collapsible collapsedWidth={0}>
    Oculto cuando colapsado
  </Layout.Sider>
  <Layout.Content>Contenido</Layout.Content>
</Layout>

// Tema claro
<Layout hasSider>
  <Layout.Sider theme="light">
    Barra lateral clara
  </Layout.Sider>
  <Layout.Content>Contenido</Layout.Content>
</Layout>

// Trigger personalizado
<Layout hasSider>
  <Layout.Sider
    collapsible
    trigger={<span>Alternar</span>}
  >
    Trigger personalizado
  </Layout.Sider>
  <Layout.Content>Contenido</Layout.Content>
</Layout>

// Sin trigger (controlar externamente)
<Layout hasSider>
  <Layout.Sider collapsible trigger={null} collapsed={collapsed}>
    <button onClick={() => setCollapsed(!collapsed)}>Alternar</button>
  </Layout.Sider>
  <Layout.Content>Contenido</Layout.Content>
</Layout>

// Layout de pagina completa
<Layout style={{ minHeight: '100vh' }}>
  <Layout.Header>
    <div>Logo</div>
    <nav>Navegacion</nav>
  </Layout.Header>
  <Layout hasSider>
    <Layout.Sider collapsible breakpoint="md">
      <nav>Navegacion lateral</nav>
    </Layout.Sider>
    <Layout>
      <Layout.Content>
        <main>Contenido principal</main>
      </Layout.Content>
      <Layout.Footer>© 2024 Empresa</Layout.Footer>
    </Layout>
  </Layout>
</Layout>
```

#### Hook useSider

Acceder al contexto del sider desde componentes hijos:

```tsx
import { useSider } from 'j-ui'

function ComponenteMenu() {
  const { siderCollapsed } = useSider()

  return (
    <nav>
      {siderCollapsed ? <SoloIconos /> : <MenuCompleto />}
    </nav>
  )
}
```

</details>

---

<details>
<summary><strong>Text</strong> - Tipografia con formato y copiar al portapapeles</summary>

### Text

Un componente de tipografia para mostrar texto con varios estilos, opciones de formato y funciones utilitarias como copiar al portapapeles y truncado de texto.

#### Importar

```tsx
import { Text } from 'j-ui'
```

#### Props

| Prop | Tipo | Por Defecto | Descripcion |
|------|------|-------------|-------------|
| `children` | `ReactNode` | — | Contenido del texto |
| `type` | `'default' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Color/tipo del texto |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Tamano del texto |
| `weight` | `'thin' \| 'light' \| 'normal' \| 'medium' \| 'semibold' \| 'bold' \| 'extrabold' \| 'black'` | — | Grosor de la fuente |
| `lineHeight` | `'none' \| 'tight' \| 'snug' \| 'normal' \| 'relaxed' \| 'loose'` | — | Interlineado |
| `disabled` | `boolean` | `false` | Estilo deshabilitado (gris, sin interaccion) |
| `mark` | `boolean` | `false` | Resaltar con fondo amarillo |
| `code` | `boolean` | `false` | Estilo de codigo inline |
| `keyboard` | `boolean` | `false` | Estilo de tecla de teclado |
| `underline` | `boolean` | `false` | Texto subrayado |
| `delete` | `boolean` | `false` | Texto tachado |
| `italic` | `boolean` | `false` | Texto en cursiva |
| `copyable` | `boolean \| { text?: string; onCopy?: () => void }` | `false` | Mostrar boton de copiar |
| `ellipsis` | `boolean \| EllipsisConfig` | `false` | Truncar con puntos suspensivos |

#### EllipsisConfig

```typescript
interface EllipsisConfig {
  rows?: number           // Filas antes de truncar (default: 1)
  expandable?: boolean    // Mostrar boton expandir/colapsar
  onExpand?: (expanded: boolean) => void  // Callback al cambiar expansion
}
```

#### Tamanos

| Tamano | Tamano de Fuente |
|--------|------------------|
| `xs` | 10px |
| `sm` | 13px |
| `md` | 16px |
| `lg` | 24px |
| `xl` | 36px |

#### Grosores

| Grosor | Valor |
|--------|-------|
| `thin` | 100 |
| `light` | 300 |
| `normal` | 400 |
| `medium` | 500 |
| `semibold` | 600 |
| `bold` | 700 |
| `extrabold` | 800 |
| `black` | 900 |

#### Interlineados

| LineHeight | Valor |
|------------|-------|
| `none` | 1 |
| `tight` | 1.25 |
| `snug` | 1.375 |
| `normal` | 1.5 |
| `relaxed` | 1.625 |
| `loose` | 2 |

#### Ejemplos

```tsx
// Basico
<Text>Hola mundo</Text>

// Tipos (colores)
<Text type="secondary">Texto secundario</Text>
<Text type="success">Mensaje de exito</Text>
<Text type="warning">Mensaje de advertencia</Text>
<Text type="error">Mensaje de error</Text>
<Text type="info">Mensaje informativo</Text>

// Tamanos
<Text size="xs">Extra pequeno</Text>
<Text size="sm">Pequeno</Text>
<Text size="md">Mediano</Text>
<Text size="lg">Grande</Text>
<Text size="xl">Extra grande</Text>

// Grosor de fuente
<Text weight="light">Texto ligero</Text>
<Text weight="bold">Texto negrita</Text>
<Text weight="black">Texto black</Text>

// Estilos de texto
<Text mark>Texto resaltado</Text>
<Text code>const x = 42</Text>
<Text keyboard>Ctrl</Text> + <Text keyboard>C</Text>
<Text underline>Subrayado</Text>
<Text delete>Eliminado</Text>
<Text italic>Cursiva</Text>

// Deshabilitado
<Text disabled>Texto deshabilitado</Text>

// Copiar al portapapeles
<Text copyable>Haz clic en el icono para copiar este texto</Text>

// Texto personalizado para copiar
<Text copyable={{ text: "Texto personalizado", onCopy: () => console.log('Copiado!') }}>
  Texto visible (copia "Texto personalizado")
</Text>

// Ellipsis de una linea
<Text ellipsis style={{ width: 200 }}>
  Este es un texto muy largo que se truncara con puntos suspensivos
</Text>

// Ellipsis multi-linea (3 filas)
<Text ellipsis={{ rows: 3 }} style={{ width: 200 }}>
  Este es un texto muy largo que ocupa varias lineas y se truncara
  despues de tres filas con puntos suspensivos al final.
</Text>

// Ellipsis expandible
<Text ellipsis={{ rows: 2, expandable: true }} style={{ width: 200 }}>
  Este texto puede expandirse o colapsarse haciendo clic en el boton.
  Muy util para contenido largo que quieres mostrar parcialmente.
</Text>

// Estilos combinados
<Text type="error" weight="bold" size="lg">
  Error Importante!
</Text>

<Text type="success" italic underline>
  Tarea completada exitosamente
</Text>
```

</details>

---

<details>
<summary><strong>Waterfall</strong> - Layout estilo masonry/Pinterest</summary>

### Waterfall

Un componente de layout estilo masonry que distribuye los items en columnas basándose en la altura disponible, creando un efecto de cascada tipo Pinterest.

#### Importar

```tsx
import { Waterfall } from 'j-ui'
```

#### Props

| Prop | Tipo | Por Defecto | Descripción |
|------|------|-------------|-------------|
| `items` | `WaterfallItem<T>[]` | `[]` | Array de items a renderizar |
| `columns` | `number \| Partial<Record<Breakpoint, number>>` | `3` | Número de columnas (fijo o responsive) |
| `gutter` | `number \| ResponsiveGutter \| [horizontal, vertical]` | `0` | Espacio entre items (px) |
| `itemRender` | `(info: WaterfallItemRenderInfo<T>) => ReactNode` | — | Función para renderizar cada item |
| `fresh` | `boolean` | `false` | Monitorear continuamente cambios de tamaño en items |
| `onLayoutChange` | `(layoutInfo: WaterfallLayoutInfo[]) => void` | — | Callback cuando cambia la asignación de columnas |

#### WaterfallItem

```typescript
interface WaterfallItem<T = unknown> {
  key: Key              // Identificador único
  children?: ReactNode  // Contenido (tiene prioridad sobre itemRender)
  height?: number       // Altura conocida en px (mejora el layout inicial)
  column?: number       // Forzar columna específica (0-indexed)
  data?: T              // Datos personalizados asociados al item
}
```

#### WaterfallItemRenderInfo

Se pasa a la función `itemRender`:

```typescript
interface WaterfallItemRenderInfo<T> extends WaterfallItem<T> {
  index: number         // Índice en el array original
  assignedColumn: number // Columna asignada por el algoritmo
}
```

#### Breakpoints

| Breakpoint | Ancho Mínimo |
|------------|--------------|
| `xs` | 0px |
| `sm` | 576px |
| `md` | 768px |
| `lg` | 992px |
| `xl` | 1200px |
| `xxl` | 1600px |

#### Ejemplos

```tsx
// Uso básico con children
<Waterfall
  items={[
    { key: 1, children: <Card>Item 1</Card> },
    { key: 2, children: <Card>Item 2 con más contenido</Card> },
    { key: 3, children: <Card>Item 3</Card> },
  ]}
/>

// Usando itemRender
<Waterfall
  items={images.map((img) => ({
    key: img.id,
    data: img,
  }))}
  itemRender={({ data, index }) => (
    <img src={data.url} alt={`Imagen ${index}`} />
  )}
/>

// Columnas personalizadas
<Waterfall items={items} columns={4} />

// Columnas responsive
<Waterfall
  items={items}
  columns={{
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  }}
/>

// Con gutter
<Waterfall items={items} gutter={16} />

// Gutter horizontal y vertical diferentes
<Waterfall items={items} gutter={[16, 24]} />

// Gutter responsive
<Waterfall
  items={items}
  gutter={{ xs: 8, md: 16, lg: 24 }}
/>

// Con alturas conocidas (mejor layout inicial)
<Waterfall
  items={[
    { key: 1, height: 200, children: <Card /> },
    { key: 2, height: 150, children: <Card /> },
    { key: 3, height: 300, children: <Card /> },
  ]}
/>

// Forzar columnas específicas
<Waterfall
  items={[
    { key: 'destacado', column: 0, children: <FeaturedCard /> },
    { key: 'item1', children: <Card /> },
    { key: 'item2', children: <Card /> },
  ]}
  columns={3}
/>

// Monitorear cambios de tamaño (para contenido dinámico)
<Waterfall
  items={items}
  fresh
  onLayoutChange={(layout) => {
    console.log('Layout cambió:', layout)
  }}
/>

// Con ref
const waterfallRef = useRef<WaterfallRef>(null)

<Waterfall
  ref={waterfallRef}
  items={items}
/>

// Acceder al elemento nativo
waterfallRef.current?.nativeElement

// Ejemplo completo con imágenes
function GaleriaImagenes() {
  const imagenes = [
    { id: 1, url: '/img1.jpg', height: 200 },
    { id: 2, url: '/img2.jpg', height: 300 },
    { id: 3, url: '/img3.jpg', height: 150 },
    { id: 4, url: '/img4.jpg', height: 250 },
  ]

  return (
    <Waterfall
      columns={{ xs: 2, md: 3, lg: 4 }}
      gutter={[16, 16]}
      items={imagenes.map((img) => ({
        key: img.id,
        height: img.height,
        data: img,
      }))}
      itemRender={({ data }) => (
        <img
          src={data.url}
          style={{ width: '100%', borderRadius: 8 }}
        />
      )}
    />
  )
}
```

#### Algoritmo

El layout waterfall usa un algoritmo de "columna más corta primero":
1. Los items se colocan en la columna con menor altura actual
2. Si un item especifica la prop `column`, se colocará allí en su lugar
3. Las alturas conocidas (prop `height`) se usan para el layout inicial
4. Las alturas dinámicas se miden después del render y el layout se ajusta
5. Con `fresh=true`, los items se monitorean continuamente por cambios de tamaño

</details>

---

<details>
<summary><strong>Tooltip</strong> - Tooltips ligeros al pasar el cursor</summary>

### Tooltip

Un componente ligero de tooltip para mostrar informacion adicional al pasar el cursor.

#### Importar

```tsx
import { Tooltip } from 'j-ui'
```

#### Props

| Prop | Tipo | Por Defecto | Descripcion |
|------|------|-------------|-------------|
| `content` | `ReactNode` | — | Contenido del tooltip |
| `children` | `ReactNode` | — | Elemento disparador |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Posicion del tooltip |
| `delay` | `number` | `200` | Retraso antes de mostrar (ms) |
| `disabled` | `boolean` | `false` | Deshabilita el tooltip |

#### Posiciones

| Posicion | Descripcion |
|----------|-------------|
| `top` | Encima del elemento disparador |
| `bottom` | Debajo del elemento disparador |
| `left` | A la izquierda del elemento disparador |
| `right` | A la derecha del elemento disparador |

#### Ejemplos

```tsx
// Basico
<Tooltip content="Hola!">
  <Button>Pasa el cursor</Button>
</Tooltip>

// Posiciones
<Tooltip content="Tooltip arriba" position="top">
  <Button>Arriba</Button>
</Tooltip>

<Tooltip content="Tooltip abajo" position="bottom">
  <Button>Abajo</Button>
</Tooltip>

<Tooltip content="Tooltip izquierda" position="left">
  <Button>Izquierda</Button>
</Tooltip>

<Tooltip content="Tooltip derecha" position="right">
  <Button>Derecha</Button>
</Tooltip>

// Retraso personalizado
<Tooltip content="Rapido!" delay={0}>
  <Button>Sin retraso</Button>
</Tooltip>

<Tooltip content="Paciente..." delay={1000}>
  <Button>1 segundo de retraso</Button>
</Tooltip>

// Deshabilitado
<Tooltip content="No se mostrara" disabled>
  <Button>Tooltip deshabilitado</Button>
</Tooltip>

// Con contenido complejo
<Tooltip content={<span>Contenido <strong>estilizado</strong></span>}>
  <Button>Contenido rico</Button>
</Tooltip>
```

#### Accesibilidad

El tooltip soporta navegacion por teclado:
- Se muestra con focus
- Se oculta con blur
- Funciona con lectores de pantalla

</details>

---

## Licencia

Licencia MIT - ver [LICENSE](./LICENSE) para detalles.
