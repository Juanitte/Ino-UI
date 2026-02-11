import { generateVariants } from '../colors'

describe('generateVariants', () => {
  it('returns an object with all 10 shade levels', () => {
    const variants = generateVariants('#8c75d1')
    const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const
    for (const level of levels) {
      expect(variants[level]).toBeDefined()
      expect(variants[level]).toMatch(/^#[0-9a-f]{6}$/i)
    }
  })

  it('produces lighter shades for low levels and darker for high levels', () => {
    const variants = generateVariants('#8c75d1')
    // 50 should be very light (high luminance)
    // 900 should be very dark (low luminance)
    // We can compare hex values indirectly: lighter colors have higher average RGB
    const hexToAvg = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return (r + g + b) / 3
    }

    expect(hexToAvg(variants[50])).toBeGreaterThan(hexToAvg(variants[500]))
    expect(hexToAvg(variants[500])).toBeGreaterThan(hexToAvg(variants[900]))
  })

  it('produces valid hex colors for different inputs', () => {
    const inputs = ['#ff0000', '#00ff00', '#0000ff', '#000000', '#ffffff']
    for (const input of inputs) {
      const variants = generateVariants(input)
      for (const value of Object.values(variants)) {
        expect(value).toMatch(/^#[0-9a-f]{6}$/i)
      }
    }
  })
})
