# J-UI

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> **🇪🇸 [Leer en Español](./README.es.md)**

A modern, lightweight React component library with built-in theming support.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Theme System](#theme-system)
  - [ThemeProvider](#themeprovider)
  - [useTheme Hook](#usetheme-hook)
  - [Color System](#color-system)
  - [Theme Tokens](#theme-tokens)
- [Components](#components)
  - [Badge](#badge)
  - [Bubble](#bubble)
  - [Button](#button)
  - [Divider](#divider)
  - [Text](#text)
  - [Tooltip](#tooltip)

## Features

- Fully typed with TypeScript
- Built-in dark/light mode support
- Automatic color palette generation
- CSS variables for easy customization
- Tree-shakeable and lightweight
- React 18 & 19 compatible

## Installation

```bash
# npm
npm install j-ui

# yarn
yarn add j-ui

# pnpm
pnpm add j-ui
```

## Quick Start

Wrap your application with `ThemeProvider` and start using components:

```tsx
import { ThemeProvider, Button, Tooltip } from 'j-ui'

function App() {
  return (
    <ThemeProvider>
      <Tooltip content="Click me!">
        <Button>Hello J-UI</Button>
      </Tooltip>
    </ThemeProvider>
  )
}
```

---

## Theme System

J-UI includes a powerful theming system that automatically generates color palettes and handles light/dark mode switching.

### ThemeProvider

The `ThemeProvider` component must wrap your application to enable theming functionality.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Application content |
| `config` | `ThemeConfig` | `{}` | Theme configuration object |

#### ThemeConfig

```typescript
interface ThemeConfig {
  colors?: ThemeColors      // Custom color palette
  defaultMode?: ThemeMode   // 'light' | 'dark'
}

interface ThemeColors {
  primary?: string    // Default: '#8c75d1'
  secondary?: string  // Default: '#78808b'
  success?: string    // Default: '#79bc58'
  warning?: string    // Default: '#d5ac59'
  error?: string      // Default: '#d7595b'
  info?: string       // Default: '#6591c7'
}
```

#### Usage

```tsx
// Basic usage
<ThemeProvider>
  <App />
</ThemeProvider>

// With custom configuration
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

### useTheme Hook

Access and control the current theme from any component within the `ThemeProvider`.

```typescript
const { mode, setMode, toggleMode } = useTheme()
```

#### Returns

| Property | Type | Description |
|----------|------|-------------|
| `mode` | `'light' \| 'dark'` | Current theme mode |
| `setMode` | `(mode: ThemeMode) => void` | Set theme mode explicitly |
| `toggleMode` | `() => void` | Toggle between light and dark |

#### Example

```tsx
import { useTheme, Button } from 'j-ui'

function ThemeToggle() {
  const { mode, toggleMode } = useTheme()

  return (
    <Button onClick={toggleMode}>
      Current: {mode}
    </Button>
  )
}
```

### Color System

J-UI automatically generates 10 shades (50-900) for each semantic color. These are available as CSS variables:

```css
/* Base color */
var(--j-primary)

/* Color variants */
var(--j-primary-50)   /* Lightest */
var(--j-primary-100)
var(--j-primary-200)
var(--j-primary-300)
var(--j-primary-400)
var(--j-primary-500)
var(--j-primary-600)
var(--j-primary-700)
var(--j-primary-800)
var(--j-primary-900)  /* Darkest */

/* Semantic aliases */
var(--j-primary-light)     /* Light variant */
var(--j-primary-dark)      /* Dark variant */
var(--j-primary-hover)     /* Hover state */
var(--j-primary-border)    /* Border color */
var(--j-primary-contrast)  /* Contrast text color */
```

#### Neutral Colors

These automatically adapt based on the current theme mode:

| Variable | Description |
|----------|-------------|
| `--j-bg` | Background color |
| `--j-bgSubtle` | Subtle background |
| `--j-bgMuted` | Muted background |
| `--j-border` | Border color |
| `--j-borderHover` | Border hover color |
| `--j-text` | Primary text color |
| `--j-textMuted` | Muted text |
| `--j-textSubtle` | Subtle text |
| `--j-shadowSm` | Small shadow |
| `--j-shadowMd` | Medium shadow |
| `--j-shadowLg` | Large shadow |

### Theme Tokens

J-UI provides a `tokens` object with typed references to all CSS variables. This enables autocomplete in your IDE and type-safe styling in JavaScript/TypeScript.

#### Import

```tsx
import { tokens } from 'j-ui'
```

#### Usage

```tsx
// In inline styles
<div style={{
  backgroundColor: tokens.colorPrimaryBg,
  color: tokens.colorPrimary,
  boxShadow: tokens.shadowMd
}}>
  Styled with tokens
</div>

// In styled-components, emotion, etc.
const StyledCard = styled.div`
  background: ${tokens.colorBgSubtle};
  border: 1px solid ${tokens.colorBorder};
`
```

#### Available Tokens

**Semantic Colors** (for each: primary, secondary, success, warning, error, info):

| Token | CSS Variable |
|-------|--------------|
| `tokens.colorPrimary` | `var(--j-primary)` |
| `tokens.colorPrimaryHover` | `var(--j-primary-hover)` |
| `tokens.colorPrimaryBg` | `var(--j-primary-dark)` |
| `tokens.colorPrimaryBorder` | `var(--j-primary-border)` |
| `tokens.colorPrimaryContrast` | `var(--j-primary-contrast)` |
| `tokens.colorPrimary50` - `tokens.colorPrimary900` | `var(--j-primary-50)` - `var(--j-primary-900)` |

**Neutral Colors**:

| Token | CSS Variable |
|-------|--------------|
| `tokens.colorBg` | `var(--j-bg)` |
| `tokens.colorBgSubtle` | `var(--j-bgSubtle)` |
| `tokens.colorBgMuted` | `var(--j-bgMuted)` |
| `tokens.colorBorder` | `var(--j-border)` |
| `tokens.colorBorderHover` | `var(--j-borderHover)` |
| `tokens.colorText` | `var(--j-text)` |
| `tokens.colorTextMuted` | `var(--j-textMuted)` |
| `tokens.colorTextSubtle` | `var(--j-textSubtle)` |

**Shadows**:

| Token | CSS Variable |
|-------|--------------|
| `tokens.shadowSm` | `var(--j-shadowSm)` |
| `tokens.shadowMd` | `var(--j-shadowMd)` |
| `tokens.shadowLg` | `var(--j-shadowLg)` |

---

## Components

<details>
<summary><strong>Badge</strong> - Compact label for status and metadata</summary>

### Badge

A compact label component for displaying status, categories, or metadata.

#### Import

```tsx
import { Badge } from 'j-ui'
// Optionally import tokens for type-safe colors
import { Badge, tokens } from 'j-ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Badge content |
| `bgColor` | `string` | `'var(--j-primary-light)'` | Background color (CSS color, CSS variable, or token) |
| `color` | `string` | `'var(--j-primary)'` | Text and border color (CSS color, CSS variable, or token) |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Border radius |
| `icon` | `ReactNode` | — | Optional icon on the left |
| `bordered` | `boolean` | `true` | Show border |

#### Radius Options

| Radius | Value |
|--------|-------|
| `none` | 0 |
| `sm` | 4px |
| `md` | 6px |
| `lg` | 12px |
| `full` | 9999px (pill shape) |

#### Examples

```tsx
// Basic
<Badge>New</Badge>

// Using tokens (recommended - type-safe with autocomplete)
<Badge bgColor={tokens.colorSuccess100} color={tokens.colorSuccess}>
  Active
</Badge>

<Badge bgColor={tokens.colorError100} color={tokens.colorError}>
  Expired
</Badge>

<Badge bgColor={tokens.colorWarning100} color={tokens.colorWarning}>
  Pending
</Badge>

// Using CSS variables directly
<Badge bgColor="var(--j-info-light)" color="var(--j-info)">
  Info
</Badge>

// Different radius
<Badge radius="none">Square</Badge>
<Badge radius="full">Pill</Badge>

// With icon
<Badge icon={<CheckIcon />}>Verified</Badge>

// Without border
<Badge bordered={false}>Subtle</Badge>

// Custom colors (any CSS color)
<Badge bgColor="#ffe4e6" color="#be123c">
  Custom Pink
</Badge>
```

</details>

---

<details>
<summary><strong>Bubble</strong> - Floating action button with menus and groups</summary>

### Bubble

A floating action button (FAB) component for quick actions, with support for badges, tooltips, compact groups, and expandable menus.

#### Import

```tsx
import { Bubble, BackToTopIcon, ChatIcon, BellIcon, CloseIcon } from 'j-ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | — | Icon to display |
| `description` | `string` | — | Text to display (only if no icon) |
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'bottom-right'` | Fixed position on screen |
| `shape` | `'circle' \| 'square'` | `'circle'` | Bubble shape |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Bubble size |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | Semantic color |
| `badge` | `number \| boolean` | — | Show badge with number or dot |
| `badgeColor` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'error'` | Badge color |
| `tooltip` | `string` | — | Tooltip text |
| `tooltipPosition` | `'left' \| 'right' \| 'top' \| 'bottom'` | auto | Tooltip position |
| `offsetX` | `number` | `24` | Horizontal offset from edge (px) |
| `offsetY` | `number` | `24` | Vertical offset from edge (px) |
| `shadow` | `boolean \| 'sm' \| 'md' \| 'lg'` | `'lg'` | Apply shadow |
| `bordered` | `boolean` | `true` | Show border |
| `onBackToTop` | `() => void` | — | Callback when scrolling to top |
| `visibleOnScroll` | `number` | — | Show only after scrolling (px) |
| `disabled` | `boolean` | `false` | Disable bubble |

Also accepts all standard `<button>` HTML attributes.

#### Sizes

| Size | Dimensions | Icon Size |
|------|------------|-----------|
| `sm` | 40px | 16px |
| `md` | 48px | 20px |
| `lg` | 56px | 24px |

#### Built-in Icons

J-UI provides utility icons for common FAB use cases:

| Icon | Description |
|------|-------------|
| `BackToTopIcon` | Arrow pointing up |
| `ChatIcon` | Chat/message bubble |
| `BellIcon` | Notification bell |
| `CloseIcon` | X close icon |

#### Examples

```tsx
// Basic
<Bubble icon={<ChatIcon />} />

// With tooltip
<Bubble icon={<ChatIcon />} tooltip="Open chat" />

// Different positions
<Bubble icon={<BellIcon />} position="top-right" />
<Bubble icon={<ChatIcon />} position="bottom-left" />

// With badge (number)
<Bubble icon={<BellIcon />} badge={5} />

// With badge (dot)
<Bubble icon={<ChatIcon />} badge={true} />

// Badge with custom color
<Bubble icon={<BellIcon />} badge={3} badgeColor="warning" />

// Different colors
<Bubble icon={<ChatIcon />} color="success" />
<Bubble icon={<BellIcon />} color="info" />

// Different sizes
<Bubble icon={<ChatIcon />} size="sm" />
<Bubble icon={<ChatIcon />} size="lg" />

// Square shape
<Bubble icon={<ChatIcon />} shape="square" />

// Without border
<Bubble icon={<ChatIcon />} bordered={false} />

// Back to top button (appears after scrolling 200px)
<Bubble
  icon={<BackToTopIcon />}
  tooltip="Back to top"
  visibleOnScroll={200}
  onBackToTop={() => console.log('Scrolled to top')}
/>

// Custom offset
<Bubble icon={<ChatIcon />} offsetX={40} offsetY={40} />

// With text instead of icon
<Bubble description="?" tooltip="Help" />
```

---

### Bubble.Group

A compact button bar that joins multiple Bubbles together with unified styling. The bubbles are rendered as a seamless group with shared shadow and automatic border-radius handling.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Child Bubble components |
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'bottom-right'` | Fixed position on screen |
| `direction` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Layout direction |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size for all children |
| `offsetX` | `number` | `24` | Horizontal offset from edge (px) |
| `offsetY` | `number` | `24` | Vertical offset from edge (px) |
| `shadow` | `boolean \| 'sm' \| 'md' \| 'lg'` | `'lg'` | Shadow for the group container |

#### Direction

| Direction | Description |
|-----------|-------------|
| `top` | Bubbles stack upward from position |
| `bottom` | Bubbles stack downward from position |
| `left` | Bubbles stack leftward from position |
| `right` | Bubbles stack rightward from position |

#### Examples

```tsx
// Vertical compact group (stacks upward)
<Bubble.Group>
  <Bubble icon={<ChatIcon />} color="info" />
  <Bubble icon={<BellIcon />} color="warning" />
  <Bubble icon={<BackToTopIcon />} color="success" />
</Bubble.Group>

// Horizontal compact group
<Bubble.Group direction="left">
  <Bubble icon={<ChatIcon />} color="primary" />
  <Bubble icon={<BellIcon />} color="secondary" />
</Bubble.Group>

// Different position
<Bubble.Group position="top-right" direction="bottom">
  <Bubble icon={<ChatIcon />} />
  <Bubble icon={<BellIcon />} />
</Bubble.Group>

// With badges (badges extend outside the group)
<Bubble.Group>
  <Bubble icon={<ChatIcon />} badge={3} />
  <Bubble icon={<BellIcon />} badge={true} badgeColor="warning" />
</Bubble.Group>

// Custom size
<Bubble.Group size="lg">
  <Bubble icon={<ChatIcon />} />
  <Bubble icon={<BellIcon />} />
</Bubble.Group>
```

---

### Bubble.Menu

An expandable floating menu that shows/hides child Bubbles with animation. Supports click or hover activation.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Child Bubble components |
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'bottom-right'` | Fixed position on screen |
| `direction` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Expansion direction |
| `trigger` | `'click' \| 'hover'` | `'click'` | Activation mode |
| `icon` | `ReactNode` | `+` | Trigger icon when closed |
| `openIcon` | `ReactNode` | — | Trigger icon when open (defaults to rotating the icon 45deg) |
| `shape` | `'circle' \| 'square'` | `'circle'` | Shape for trigger and children |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size for trigger and children |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | Trigger color |
| `offsetX` | `number` | `24` | Horizontal offset from edge (px) |
| `offsetY` | `number` | `24` | Vertical offset from edge (px) |
| `shadow` | `boolean \| 'sm' \| 'md' \| 'lg'` | `'lg'` | Apply shadow |
| `tooltip` | `string` | — | Tooltip for trigger (shown when closed) |
| `defaultOpen` | `boolean` | `false` | Initially open (uncontrolled) |
| `open` | `boolean` | — | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | — | Callback when state changes |
| `gap` | `number` | `12` | Space between bubbles (px) |

#### Examples

```tsx
// Basic expandable menu (click to open)
<Bubble.Menu>
  <Bubble icon={<ChatIcon />} tooltip="Chat" color="info" />
  <Bubble icon={<BellIcon />} tooltip="Notifications" color="warning" />
</Bubble.Menu>

// Hover to open
<Bubble.Menu trigger="hover">
  <Bubble icon={<ChatIcon />} tooltip="Chat" />
  <Bubble icon={<BellIcon />} tooltip="Alerts" />
</Bubble.Menu>

// Custom trigger icons
<Bubble.Menu
  icon={<ChatIcon />}
  openIcon={<CloseIcon />}
  color="success"
>
  <Bubble icon={<BellIcon />} tooltip="Notifications" />
  <Bubble icon={<BackToTopIcon />} tooltip="Back to top" />
</Bubble.Menu>

// Horizontal expansion
<Bubble.Menu direction="left">
  <Bubble icon={<ChatIcon />} />
  <Bubble icon={<BellIcon />} />
</Bubble.Menu>

// Controlled state
function MyComponent() {
  const [open, setOpen] = useState(false)

  return (
    <Bubble.Menu
      open={open}
      onOpenChange={setOpen}
      tooltip="Actions"
    >
      <Bubble icon={<ChatIcon />} onClick={() => openChat()} />
      <Bubble icon={<BellIcon />} onClick={() => openNotifications()} />
    </Bubble.Menu>
  )
}

// Different position
<Bubble.Menu position="top-left" direction="bottom">
  <Bubble icon={<ChatIcon />} />
  <Bubble icon={<BellIcon />} />
</Bubble.Menu>

// Inline mode (not fixed, flows with content)
<Bubble.Menu style={{ position: 'relative' }}>
  <Bubble icon={<ChatIcon />} />
  <Bubble icon={<BellIcon />} />
</Bubble.Menu>

// Custom gap
<Bubble.Menu gap={20}>
  <Bubble icon={<ChatIcon />} />
  <Bubble icon={<BellIcon />} />
</Bubble.Menu>
```

</details>

---

<details>
<summary><strong>Button</strong> - Versatile button with variants and animations</summary>

### Button

A versatile button component with multiple variants, sizes, and states.

#### Import

```tsx
import { Button } from 'j-ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'dashed' \| 'ghost' \| 'link'` | `'primary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | Semantic color |
| `icon` | `ReactNode` | — | Icon element |
| `iconPlacement` | `'start' \| 'end'` | `'start'` | Icon position relative to text |
| `loading` | `boolean` | `false` | Show loading spinner |
| `shadow` | `boolean \| 'sm' \| 'md' \| 'lg'` | `false` | Apply shadow |
| `clickAnimation` | `'pulse' \| 'ripple' \| 'shake' \| 'firecracker' \| 'confetti'` | — | Animation on click |
| `hoverAnimation` | `'pulse' \| 'ripple' \| 'shake' \| 'firecracker' \| 'confetti'` | — | Animation on hover |
| `gradient` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | — | Preset gradient using theme color |
| `gradientAngle` | `number` | `135` | Angle for preset gradient (degrees) |
| `gradientCss` | `string` | — | Custom CSS gradient (overrides `gradient`) |
| `block` | `boolean` | `false` | Button takes 100% width of container |
| `bordered` | `boolean` | `false` | Add extra border |
| `disabled` | `boolean` | `false` | Disable button |
| `children` | `ReactNode` | — | Button content |

Also accepts all standard `<button>` HTML attributes.

#### Variants

| Variant | Description |
|---------|-------------|
| `primary` | Solid background with the selected color |
| `secondary` | Light background with darker text |
| `outline` | Transparent with solid colored border |
| `dashed` | Transparent with dashed colored border |
| `ghost` | Transparent, color appears on hover |
| `link` | Text-only, no padding, looks like a hyperlink |

#### Sizes

| Size | Padding | Font Size |
|------|---------|-----------|
| `sm` | `6px 12px` | 13px |
| `md` | `10px 18px` | 14px |
| `lg` | `14px 24px` | 16px |

#### Animations

| Animation | Description |
|-----------|-------------|
| `ripple` | Wave expanding from click point |
| `pulse` | Double border wave expanding outward |
| `shake` | Button shakes horizontally |
| `firecracker` | Particles burst from button edges |
| `confetti` | Particles burst from click point |

#### Examples

```tsx
// Basic
<Button>Click me</Button>

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="dashed">Dashed</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Colors
<Button color="success">Success</Button>
<Button color="warning">Warning</Button>
<Button color="error">Error</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// States
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>

// Click animations
<Button clickAnimation="ripple">Ripple</Button>
<Button clickAnimation="pulse">Pulse</Button>
<Button clickAnimation="shake">Shake</Button>
<Button clickAnimation="firecracker">Firecracker</Button>
<Button clickAnimation="confetti">Confetti</Button>

// Hover animation
<Button hoverAnimation="pulse">Hover me</Button>

// Shadow
<Button shadow="lg">With Shadow</Button>

// Full width (block)
<Button block>Full Width Button</Button>

// Preset gradient (uses theme color shades)
<Button gradient="primary">Primary Gradient</Button>
<Button gradient="success">Success Gradient</Button>

// Custom gradient angle
<Button gradient="info" gradientAngle={45}>45deg Gradient</Button>
<Button gradient="warning" gradientAngle={90}>90deg Gradient</Button>

// Custom CSS gradient
<Button gradientCss="linear-gradient(90deg, #ff6b6b, #feca57)">
  Sunset
</Button>
<Button gradientCss="linear-gradient(135deg, #667eea, #764ba2)">
  Purple Haze
</Button>

// With icon (start position - default)
<Button icon={<PlusIcon />}>Add Item</Button>

// With icon at end
<Button icon={<ArrowRightIcon />} iconPlacement="end">
  Continue
</Button>

// Icon with dashed variant
<Button variant="dashed" icon={<UploadIcon />}>
  Upload File
</Button>

// Combined
<Button
  variant="outline"
  color="success"
  size="lg"
  clickAnimation="confetti"
  shadow
>
  Complete Order
</Button>
```

</details>

---

<details>
<summary><strong>Divider</strong> - Separator line with optional text</summary>

### Divider

A separator component for dividing content sections, with optional text and multiple styling options.

#### Import

```tsx
import { Divider } from 'j-ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'horizontal' \| 'vertical'` | `'horizontal'` | Divider orientation |
| `dashed` | `boolean` | `false` | Use dashed line instead of solid |
| `orientation` | `'left' \| 'center' \| 'right'` | `'center'` | Text position (horizontal only) |
| `orientationMargin` | `number \| string` | — | Margin from edge to text (px or %) |
| `plain` | `boolean` | `false` | Plain text style (smaller, no bold) |
| `color` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Line and text color |
| `thickness` | `'thin' \| 'normal' \| 'medium' \| 'thick' \| number` | `'normal'` | Line thickness |
| `children` | `ReactNode` | — | Text content inside the divider |

#### Thickness Values

| Thickness | Value |
|-----------|-------|
| `thin` | 1px |
| `normal` | 1px |
| `medium` | 2px |
| `thick` | 3px |
| `number` | Custom px value |

#### Examples

```tsx
// Basic horizontal divider
<Divider />

// With text
<Divider>Section Title</Divider>

// Text orientation
<Divider orientation="left">Left Text</Divider>
<Divider orientation="center">Center Text</Divider>
<Divider orientation="right">Right Text</Divider>

// Custom margin from edge
<Divider orientation="left" orientationMargin={20}>
  20px from left
</Divider>
<Divider orientation="left" orientationMargin="10%">
  10% from left
</Divider>

// Dashed line
<Divider dashed>Dashed Divider</Divider>

// Plain text (smaller, no bold)
<Divider plain>Plain Text</Divider>

// Colors
<Divider color="primary">Primary</Divider>
<Divider color="success">Success</Divider>
<Divider color="warning">Warning</Divider>
<Divider color="error">Error</Divider>
<Divider color="info">Info</Divider>

// Line thickness
<Divider thickness="thin" />
<Divider thickness="medium">Medium</Divider>
<Divider thickness="thick">Thick</Divider>
<Divider thickness={4}>Custom 4px</Divider>

// Vertical divider (inline separator)
<span>Item 1</span>
<Divider type="vertical" />
<span>Item 2</span>
<Divider type="vertical" />
<span>Item 3</span>

// Vertical with color
<span>Home</span>
<Divider type="vertical" color="primary" />
<span>About</span>

// Combined styles
<Divider dashed color="primary" thickness="medium" orientation="left">
  Important Section
</Divider>
```

</details>

---

<details>
<summary><strong>Text</strong> - Typography with formatting and copy-to-clipboard</summary>

### Text

A typography component for displaying text with various styles, formatting options, and utility features like copy-to-clipboard and text truncation.

#### Import

```tsx
import { Text } from 'j-ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Text content |
| `type` | `'default' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Text color/type |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Text size |
| `weight` | `'thin' \| 'light' \| 'normal' \| 'medium' \| 'semibold' \| 'bold' \| 'extrabold' \| 'black'` | — | Font weight |
| `lineHeight` | `'none' \| 'tight' \| 'snug' \| 'normal' \| 'relaxed' \| 'loose'` | — | Line height |
| `disabled` | `boolean` | `false` | Disabled style (gray, no interaction) |
| `mark` | `boolean` | `false` | Highlight with yellow background |
| `code` | `boolean` | `false` | Inline code style |
| `keyboard` | `boolean` | `false` | Keyboard key style |
| `underline` | `boolean` | `false` | Underlined text |
| `delete` | `boolean` | `false` | Strikethrough text |
| `italic` | `boolean` | `false` | Italic text |
| `copyable` | `boolean \| { text?: string; onCopy?: () => void }` | `false` | Show copy button |
| `ellipsis` | `boolean \| EllipsisConfig` | `false` | Truncate with ellipsis |

#### EllipsisConfig

```typescript
interface EllipsisConfig {
  rows?: number           // Lines before truncating (default: 1)
  expandable?: boolean    // Show expand/collapse button
  onExpand?: (expanded: boolean) => void  // Callback on expand change
}
```

#### Sizes

| Size | Font Size |
|------|-----------|
| `xs` | 10px |
| `sm` | 13px |
| `md` | 16px |
| `lg` | 24px |
| `xl` | 36px |

#### Weights

| Weight | Value |
|--------|-------|
| `thin` | 100 |
| `light` | 300 |
| `normal` | 400 |
| `medium` | 500 |
| `semibold` | 600 |
| `bold` | 700 |
| `extrabold` | 800 |
| `black` | 900 |

#### Line Heights

| LineHeight | Value |
|------------|-------|
| `none` | 1 |
| `tight` | 1.25 |
| `snug` | 1.375 |
| `normal` | 1.5 |
| `relaxed` | 1.625 |
| `loose` | 2 |

#### Examples

```tsx
// Basic
<Text>Hello world</Text>

// Types (colors)
<Text type="secondary">Secondary text</Text>
<Text type="success">Success message</Text>
<Text type="warning">Warning message</Text>
<Text type="error">Error message</Text>
<Text type="info">Info message</Text>

// Sizes
<Text size="xs">Extra small</Text>
<Text size="sm">Small</Text>
<Text size="md">Medium</Text>
<Text size="lg">Large</Text>
<Text size="xl">Extra large</Text>

// Font weight
<Text weight="light">Light text</Text>
<Text weight="bold">Bold text</Text>
<Text weight="black">Black text</Text>

// Text styles
<Text mark>Highlighted text</Text>
<Text code>const x = 42</Text>
<Text keyboard>Ctrl</Text> + <Text keyboard>C</Text>
<Text underline>Underlined</Text>
<Text delete>Deleted</Text>
<Text italic>Italic</Text>

// Disabled
<Text disabled>Disabled text</Text>

// Copy to clipboard
<Text copyable>Click the icon to copy this text</Text>

// Custom text to copy
<Text copyable={{ text: "Custom text", onCopy: () => console.log('Copied!') }}>
  Visible text (copies "Custom text")
</Text>

// Single-line ellipsis
<Text ellipsis style={{ width: 200 }}>
  This is a very long text that will be truncated with an ellipsis
</Text>

// Multi-line ellipsis (3 rows)
<Text ellipsis={{ rows: 3 }} style={{ width: 200 }}>
  This is a very long text that spans multiple lines and will be
  truncated after three rows with an ellipsis at the end.
</Text>

// Expandable ellipsis
<Text ellipsis={{ rows: 2, expandable: true }} style={{ width: 200 }}>
  This text can be expanded or collapsed by clicking the button.
  Very useful for long content that you want to show partially.
</Text>

// Combined styles
<Text type="error" weight="bold" size="lg">
  Important Error!
</Text>

<Text type="success" italic underline>
  Task completed successfully
</Text>
```

</details>

---

<details>
<summary><strong>Tooltip</strong> - Lightweight hover tooltips</summary>

### Tooltip

A lightweight tooltip component for displaying additional information on hover.

#### Import

```tsx
import { Tooltip } from 'j-ui'
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | — | Tooltip content |
| `children` | `ReactNode` | — | Trigger element |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Tooltip position |
| `delay` | `number` | `200` | Delay before showing (ms) |
| `disabled` | `boolean` | `false` | Disable tooltip |

#### Positions

| Position | Description |
|----------|-------------|
| `top` | Above the trigger element |
| `bottom` | Below the trigger element |
| `left` | Left of the trigger element |
| `right` | Right of the trigger element |

#### Examples

```tsx
// Basic
<Tooltip content="Hello!">
  <Button>Hover me</Button>
</Tooltip>

// Positions
<Tooltip content="Top tooltip" position="top">
  <Button>Top</Button>
</Tooltip>

<Tooltip content="Bottom tooltip" position="bottom">
  <Button>Bottom</Button>
</Tooltip>

<Tooltip content="Left tooltip" position="left">
  <Button>Left</Button>
</Tooltip>

<Tooltip content="Right tooltip" position="right">
  <Button>Right</Button>
</Tooltip>

// Custom delay
<Tooltip content="Quick!" delay={0}>
  <Button>No delay</Button>
</Tooltip>

<Tooltip content="Patient..." delay={1000}>
  <Button>1 second delay</Button>
</Tooltip>

// Disabled
<Tooltip content="Won't show" disabled>
  <Button>Disabled tooltip</Button>
</Tooltip>

// With complex content
<Tooltip content={<span>Styled <strong>content</strong></span>}>
  <Button>Rich content</Button>
</Tooltip>
```

#### Accessibility

The tooltip supports keyboard navigation:
- Shows on focus
- Hides on blur
- Works with screen readers

</details>

---

## License

MIT License - see [LICENSE](./LICENSE) for details.
