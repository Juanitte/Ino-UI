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
  - [Text](#text)
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
