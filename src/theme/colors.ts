/** Convierte hex a HSL */
function hexToHsl(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return [0, 0, 50]

  let r = parseInt(result[1], 16) / 255
  let g = parseInt(result[2], 16) / 255
  let b = parseInt(result[3], 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

/** Convierte HSL a hex */
function hslToHex(h: number, s: number, l: number): string {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

export interface ColorVariants {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string  // color base
  600: string
  700: string
  800: string
  900: string
}

/** Genera 10 variantes de un color (50-900) */
export function generateVariants(baseColor: string): ColorVariants {
  const [h, s, l] = hexToHsl(baseColor)

  // Ajustamos la luminosidad para cada variante
  // 50 es muy claro, 900 es muy oscuro, 500 es el base
  const lightnesses = {
    50: Math.min(97, l + 45),
    100: Math.min(94, l + 38),
    200: Math.min(90, l + 30),
    300: Math.min(82, l + 20),
    400: Math.min(70, l + 10),
    500: l,
    600: Math.max(30, l - 10),
    700: Math.max(24, l - 18),
    800: Math.max(18, l - 26),
    900: Math.max(12, l - 34),
  }

  return {
    50: hslToHex(h, Math.max(s - 30, 10), lightnesses[50]),
    100: hslToHex(h, Math.max(s - 20, 15), lightnesses[100]),
    200: hslToHex(h, Math.max(s - 10, 20), lightnesses[200]),
    300: hslToHex(h, s, lightnesses[300]),
    400: hslToHex(h, s, lightnesses[400]),
    500: hslToHex(h, s, lightnesses[500]),
    600: hslToHex(h, s, lightnesses[600]),
    700: hslToHex(h, s, lightnesses[700]),
    800: hslToHex(h, Math.min(s + 5, 100), lightnesses[800]),
    900: hslToHex(h, Math.min(s + 10, 100), lightnesses[900]),
  }
}
