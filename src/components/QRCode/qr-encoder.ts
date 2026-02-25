// ─── QR Code Matrix Generator ──────────────────────────────────────────────────
// Pure TypeScript implementation of ISO/IEC 18004 QR code generation.
// Supports byte mode encoding (UTF-8), error correction levels L/M/Q/H,
// versions 1-40, and all 8 mask patterns.

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H'

// ─── GF(256) Arithmetic ────────────────────────────────────────────────────────
// Galois Field 2^8 with primitive polynomial 0x11d (x^8 + x^4 + x^3 + x^2 + 1)

const GF_EXP = new Uint8Array(512)
const GF_LOG = new Uint8Array(256)

;(() => {
  let x = 1
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x
    GF_LOG[x] = i
    x = (x << 1) ^ (x & 0x80 ? 0x11d : 0)
    x &= 0xff
  }
  for (let i = 255; i < 512; i++) GF_EXP[i] = GF_EXP[i - 255]
})()

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0
  return GF_EXP[GF_LOG[a] + GF_LOG[b]]
}

function gfGeneratorPoly(degree: number): Uint8Array {
  let poly = new Uint8Array([1])
  for (let i = 0; i < degree; i++) {
    const next = new Uint8Array(poly.length + 1)
    const factor = GF_EXP[i]
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= poly[j]
      next[j + 1] ^= gfMul(poly[j], factor)
    }
    poly = next
  }
  return poly
}

// ─── Reed-Solomon Error Correction ─────────────────────────────────────────────

function rsEncode(data: Uint8Array, ecCount: number): Uint8Array {
  const gen = gfGeneratorPoly(ecCount)
  const result = new Uint8Array(data.length + ecCount)
  result.set(data)

  for (let i = 0; i < data.length; i++) {
    const coeff = result[i]
    if (coeff === 0) continue
    for (let j = 0; j < gen.length; j++) {
      result[i + j] ^= gfMul(gen[j], coeff)
    }
  }

  return result.slice(data.length)
}

// ─── Error Correction Tables ───────────────────────────────────────────────────
// [totalDataCodewords, [numBlocks, dataPerBlock, ecPerBlock]...]

const EC_LEVEL_INDEX: Record<ErrorCorrectionLevel, number> = { L: 0, M: 1, Q: 2, H: 3 }

// Per-version EC specification: [totalCodewords, [ecLevel → [numBlocks, dataPerBlock, ecPerBlock]]]
// Format: EC_PARAMS[version][ecLevelIndex] = [group1Count, group1Data, group2Count, group2Data, ecPerBlock]
const EC_PARAMS: number[][][] = [
  [], // version 0 placeholder
  // V1
  [[1, 19, 0, 0, 7], [1, 16, 0, 0, 10], [1, 13, 0, 0, 13], [1, 9, 0, 0, 17]],
  // V2
  [[1, 34, 0, 0, 10], [1, 28, 0, 0, 16], [1, 22, 0, 0, 22], [1, 16, 0, 0, 28]],
  // V3
  [[1, 55, 0, 0, 15], [1, 44, 0, 0, 26], [2, 17, 0, 0, 18], [2, 13, 0, 0, 22]],
  // V4
  [[1, 80, 0, 0, 20], [2, 32, 0, 0, 18], [2, 24, 0, 0, 26], [4, 9, 0, 0, 16]],
  // V5
  [[1, 108, 0, 0, 26], [2, 43, 0, 0, 24], [2, 15, 2, 16, 18], [2, 11, 2, 12, 22]],
  // V6
  [[2, 68, 0, 0, 18], [4, 27, 0, 0, 16], [4, 19, 0, 0, 24], [4, 15, 0, 0, 28]],
  // V7
  [[2, 78, 0, 0, 20], [4, 31, 0, 0, 18], [2, 14, 4, 15, 18], [4, 13, 1, 14, 26]],
  // V8
  [[2, 97, 0, 0, 24], [2, 38, 2, 39, 22], [4, 18, 2, 19, 22], [4, 14, 2, 15, 26]],
  // V9
  [[2, 116, 0, 0, 30], [3, 36, 2, 37, 22], [4, 16, 4, 17, 20], [4, 12, 4, 13, 24]],
  // V10
  [[2, 68, 2, 69, 18], [4, 43, 1, 44, 26], [6, 19, 2, 20, 24], [6, 15, 2, 16, 28]],
  // V11
  [[4, 81, 0, 0, 20], [1, 50, 4, 51, 30], [4, 22, 4, 23, 28], [3, 12, 8, 13, 24]],
  // V12
  [[2, 92, 2, 93, 24], [6, 36, 2, 37, 22], [4, 20, 6, 21, 26], [7, 14, 4, 15, 28]],
  // V13
  [[4, 107, 0, 0, 26], [8, 37, 1, 38, 22], [8, 20, 4, 21, 24], [12, 11, 4, 12, 22]],
  // V14
  [[3, 115, 1, 116, 30], [4, 40, 5, 41, 24], [11, 16, 5, 17, 20], [11, 12, 5, 13, 24]],
  // V15
  [[5, 87, 1, 88, 22], [5, 41, 5, 42, 24], [5, 24, 7, 25, 30], [11, 12, 7, 13, 24]],
  // V16
  [[5, 98, 1, 99, 24], [7, 45, 3, 46, 28], [15, 19, 2, 20, 24], [3, 15, 13, 16, 30]],
  // V17
  [[1, 107, 5, 108, 28], [10, 46, 1, 47, 28], [1, 22, 15, 23, 28], [2, 14, 17, 15, 28]],
  // V18
  [[5, 120, 1, 121, 30], [9, 43, 4, 44, 26], [17, 22, 1, 23, 28], [2, 14, 19, 15, 28]],
  // V19
  [[3, 113, 4, 114, 28], [3, 44, 11, 45, 26], [17, 21, 4, 22, 26], [9, 13, 16, 14, 26]],
  // V20
  [[3, 107, 5, 108, 28], [3, 41, 13, 42, 26], [15, 24, 5, 25, 30], [15, 15, 10, 16, 28]],
  // V21
  [[4, 116, 4, 117, 28], [17, 42, 0, 0, 26], [17, 22, 6, 23, 28], [19, 16, 6, 17, 30]],
  // V22
  [[2, 111, 7, 112, 28], [17, 46, 0, 0, 28], [7, 24, 16, 25, 30], [34, 13, 0, 0, 24]],
  // V23
  [[4, 121, 5, 122, 30], [4, 47, 14, 48, 28], [11, 24, 14, 25, 30], [16, 15, 14, 16, 30]],
  // V24
  [[6, 117, 4, 118, 30], [6, 45, 14, 46, 28], [11, 24, 16, 25, 30], [30, 16, 2, 17, 30]],
  // V25
  [[8, 106, 4, 107, 26], [8, 47, 13, 48, 28], [7, 24, 22, 25, 30], [22, 15, 13, 16, 30]],
  // V26
  [[10, 114, 2, 115, 28], [19, 46, 4, 47, 28], [28, 22, 6, 23, 28], [33, 16, 4, 17, 30]],
  // V27
  [[8, 122, 4, 123, 30], [22, 45, 3, 46, 28], [8, 23, 26, 24, 30], [12, 15, 28, 16, 30]],
  // V28
  [[3, 117, 10, 118, 30], [3, 45, 23, 46, 28], [4, 24, 31, 25, 30], [11, 15, 31, 16, 30]],
  // V29
  [[7, 116, 7, 117, 30], [21, 45, 7, 46, 28], [1, 23, 37, 24, 30], [19, 15, 26, 16, 30]],
  // V30
  [[5, 115, 10, 116, 30], [19, 47, 10, 48, 28], [15, 24, 25, 25, 30], [23, 15, 25, 16, 30]],
  // V31
  [[13, 115, 3, 116, 30], [2, 46, 29, 47, 28], [42, 24, 1, 25, 30], [23, 15, 28, 16, 30]],
  // V32
  [[17, 115, 0, 0, 30], [10, 46, 23, 47, 28], [10, 24, 35, 25, 30], [19, 15, 35, 16, 30]],
  // V33
  [[17, 115, 1, 116, 30], [14, 46, 21, 47, 28], [29, 24, 19, 25, 30], [11, 15, 46, 16, 30]],
  // V34
  [[13, 115, 6, 116, 30], [14, 46, 23, 47, 28], [44, 24, 7, 25, 30], [59, 16, 1, 17, 30]],
  // V35
  [[12, 121, 7, 122, 30], [12, 47, 26, 48, 28], [39, 24, 14, 25, 30], [22, 15, 41, 16, 30]],
  // V36
  [[6, 121, 14, 122, 30], [6, 47, 34, 48, 28], [46, 24, 10, 25, 30], [2, 15, 64, 16, 30]],
  // V37
  [[17, 122, 4, 123, 30], [29, 46, 14, 47, 28], [49, 24, 10, 25, 30], [24, 15, 46, 16, 30]],
  // V38
  [[4, 122, 18, 123, 30], [13, 46, 32, 47, 28], [48, 24, 14, 25, 30], [42, 15, 32, 16, 30]],
  // V39
  [[20, 117, 4, 118, 30], [40, 47, 7, 48, 28], [43, 24, 22, 25, 30], [10, 15, 67, 16, 30]],
  // V40
  [[19, 118, 6, 119, 30], [18, 47, 31, 48, 28], [34, 24, 34, 25, 30], [20, 15, 61, 16, 30]],
]

// Total codewords per version (data + ec)
const TOTAL_CODEWORDS = [
  0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655,
  733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921,
  2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706,
]

// Alignment pattern positions per version
const ALIGNMENT_POSITIONS: number[][] = [
  [], [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34],
  [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58],
  [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78],
  [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94],
  [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106],
  [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118],
  [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130],
  [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142],
  [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150],
  [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158],
  [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166],
  [6, 30, 58, 86, 114, 142, 170],
]

// ─── Data Encoding ─────────────────────────────────────────────────────────────

function textToBytes(text: string): Uint8Array {
  const encoder = new TextEncoder()
  return encoder.encode(text)
}

function getDataCapacity(version: number, ecLevel: ErrorCorrectionLevel): number {
  const idx = EC_LEVEL_INDEX[ecLevel]
  const params = EC_PARAMS[version][idx]
  const [g1Count, g1Data, g2Count, g2Data] = params
  return g1Count * g1Data + g2Count * g2Data
}

function getMinVersion(dataBytes: number, ecLevel: ErrorCorrectionLevel): number {
  // Byte mode: 4 bits mode + char count bits + data bytes
  // Char count is 8 bits for V1-9, 16 bits for V10+
  for (let v = 1; v <= 40; v++) {
    const charCountBits = v <= 9 ? 8 : 16
    const headerBits = 4 + charCountBits // mode indicator + char count
    const totalBits = headerBits + dataBytes * 8
    const totalBytes = Math.ceil(totalBits / 8)
    const capacity = getDataCapacity(v, ecLevel)
    if (totalBytes <= capacity) return v
  }
  return -1 // data too large
}

function encodeData(text: string, ecLevel: ErrorCorrectionLevel): { version: number; codewords: Uint8Array } {
  const dataBytes = textToBytes(text)
  const version = getMinVersion(dataBytes.length, ecLevel)
  if (version === -1) throw new Error('Data too large for QR code')

  const ecIdx = EC_LEVEL_INDEX[ecLevel]
  const params = EC_PARAMS[version][ecIdx]
  const [g1Count, g1Data, g2Count, g2Data, ecPerBlock] = params
  const totalDataCapacity = g1Count * g1Data + g2Count * g2Data

  // Build bit stream
  const charCountBits = version <= 9 ? 8 : 16
  const bits: number[] = []

  // Mode indicator: byte mode = 0100
  bits.push(0, 1, 0, 0)

  // Character count
  for (let i = charCountBits - 1; i >= 0; i--) {
    bits.push((dataBytes.length >> i) & 1)
  }

  // Data bits
  for (const byte of dataBytes) {
    for (let i = 7; i >= 0; i--) {
      bits.push((byte >> i) & 1)
    }
  }

  // Terminator (up to 4 zero bits)
  const totalDataBits = totalDataCapacity * 8
  const terminatorLen = Math.min(4, totalDataBits - bits.length)
  for (let i = 0; i < terminatorLen; i++) bits.push(0)

  // Pad to byte boundary
  while (bits.length % 8 !== 0) bits.push(0)

  // Convert to bytes
  const dataStream = new Uint8Array(totalDataCapacity)
  for (let i = 0; i < bits.length / 8; i++) {
    let byte = 0
    for (let j = 0; j < 8; j++) byte = (byte << 1) | bits[i * 8 + j]
    dataStream[i] = byte
  }

  // Pad codewords: alternating 0xEC, 0x11
  let byteCount = bits.length / 8
  let padToggle = 0
  while (byteCount < totalDataCapacity) {
    dataStream[byteCount] = padToggle === 0 ? 0xEC : 0x11
    padToggle ^= 1
    byteCount++
  }

  // Split into blocks
  const blocks: Uint8Array[] = []
  let offset = 0
  for (let i = 0; i < g1Count; i++) {
    blocks.push(dataStream.slice(offset, offset + g1Data))
    offset += g1Data
  }
  for (let i = 0; i < g2Count; i++) {
    blocks.push(dataStream.slice(offset, offset + g2Data))
    offset += g2Data
  }

  // Generate EC for each block
  const ecBlocks: Uint8Array[] = blocks.map(block => rsEncode(block, ecPerBlock))

  // Interleave data codewords
  const maxDataLen = Math.max(g1Data, g2Data || 0)
  const interleaved: number[] = []
  for (let i = 0; i < maxDataLen; i++) {
    for (const block of blocks) {
      if (i < block.length) interleaved.push(block[i])
    }
  }

  // Interleave EC codewords
  for (let i = 0; i < ecPerBlock; i++) {
    for (const ec of ecBlocks) {
      if (i < ec.length) interleaved.push(ec[i])
    }
  }

  // Remainder bits (padding to fill capacity — some versions need extra bits)
  const totalCodewords = TOTAL_CODEWORDS[version]
  while (interleaved.length < totalCodewords) {
    interleaved.push(0)
  }

  return { version, codewords: new Uint8Array(interleaved) }
}

// ─── Matrix Construction ───────────────────────────────────────────────────────

function createMatrix(size: number): { matrix: boolean[][]; reserved: boolean[][] } {
  const matrix: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false))
  const reserved: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false))
  return { matrix, reserved }
}

function placeFinderPattern(matrix: boolean[][], reserved: boolean[][], row: number, col: number) {
  for (let r = -1; r <= 7; r++) {
    for (let c = -1; c <= 7; c++) {
      const mr = row + r
      const mc = col + c
      if (mr < 0 || mr >= matrix.length || mc < 0 || mc >= matrix.length) continue
      reserved[mr][mc] = true
      if (r === -1 || r === 7 || c === -1 || c === 7) {
        matrix[mr][mc] = false // separator
      } else if (r === 0 || r === 6 || c === 0 || c === 6) {
        matrix[mr][mc] = true // outer border
      } else if (r >= 2 && r <= 4 && c >= 2 && c <= 4) {
        matrix[mr][mc] = true // inner square
      } else {
        matrix[mr][mc] = false
      }
    }
  }
}

function placeFinderPatterns(matrix: boolean[][], reserved: boolean[][]) {
  const size = matrix.length
  placeFinderPattern(matrix, reserved, 0, 0)
  placeFinderPattern(matrix, reserved, 0, size - 7)
  placeFinderPattern(matrix, reserved, size - 7, 0)
}

function placeAlignmentPatterns(matrix: boolean[][], reserved: boolean[][], version: number) {
  if (version < 2) return
  const positions = ALIGNMENT_POSITIONS[version]
  for (const row of positions) {
    for (const col of positions) {
      // Skip if overlapping finder patterns
      if (row < 9 && col < 9) continue // top-left
      if (row < 9 && col > matrix.length - 9) continue // top-right
      if (row > matrix.length - 9 && col < 9) continue // bottom-left

      for (let r = -2; r <= 2; r++) {
        for (let c = -2; c <= 2; c++) {
          const mr = row + r
          const mc = col + c
          reserved[mr][mc] = true
          if (Math.abs(r) === 2 || Math.abs(c) === 2) {
            matrix[mr][mc] = true // border
          } else if (r === 0 && c === 0) {
            matrix[mr][mc] = true // center
          } else {
            matrix[mr][mc] = false
          }
        }
      }
    }
  }
}

function placeTimingPatterns(matrix: boolean[][], reserved: boolean[][]) {
  const size = matrix.length
  for (let i = 8; i < size - 8; i++) {
    if (!reserved[6][i]) {
      matrix[6][i] = i % 2 === 0
      reserved[6][i] = true
    }
    if (!reserved[i][6]) {
      matrix[i][6] = i % 2 === 0
      reserved[i][6] = true
    }
  }
}

function reserveFormatArea(matrix: boolean[][], reserved: boolean[][]) {
  const size = matrix.length
  // Around top-left finder pattern
  for (let i = 0; i <= 8; i++) {
    if (!reserved[8][i]) reserved[8][i] = true
    if (!reserved[i][8]) reserved[i][8] = true
  }
  // Around top-right finder pattern
  for (let i = 0; i <= 7; i++) {
    if (!reserved[8][size - 1 - i]) reserved[8][size - 1 - i] = true
  }
  // Around bottom-left finder pattern
  for (let i = 0; i <= 7; i++) {
    if (!reserved[size - 1 - i][8]) reserved[size - 1 - i][8] = true
  }
  // Dark module
  matrix[size - 8][8] = true
  reserved[size - 8][8] = true
}

function reserveVersionArea(matrix: boolean[][], reserved: boolean[][], version: number) {
  if (version < 7) return
  const size = matrix.length
  // Bottom-left version info area (6x3)
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 3; c++) {
      reserved[size - 11 + c][r] = true
    }
  }
  // Top-right version info area (6x3)
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 3; c++) {
      reserved[r][size - 11 + c] = true
    }
  }
}

function placeDataBits(matrix: boolean[][], reserved: boolean[][], codewords: Uint8Array) {
  const size = matrix.length
  let bitIndex = 0
  const totalBits = codewords.length * 8
  let upward = true

  // Traverse in 2-column strips from right to left
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5 // skip timing column

    for (let i = 0; i < size; i++) {
      const row = upward ? size - 1 - i : i
      // For each row, process right column then left column
      for (let dc = 0; dc <= 1; dc++) {
        const col = right - dc
        if (reserved[row][col]) continue
        if (bitIndex < totalBits) {
          const byteIdx = bitIndex >> 3
          const bitIdx = 7 - (bitIndex & 7)
          matrix[row][col] = ((codewords[byteIdx] >> bitIdx) & 1) === 1
          bitIndex++
        }
      }
    }

    upward = !upward
  }
}

// ─── Masking ───────────────────────────────────────────────────────────────────

type MaskFn = (row: number, col: number) => boolean

const MASK_FUNCTIONS: MaskFn[] = [
  (r, c) => (r + c) % 2 === 0,
  (r) => r % 2 === 0,
  (_r, c) => c % 3 === 0,
  (r, c) => (r + c) % 3 === 0,
  (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
  (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
  (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0,
  (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0,
]

function applyMask(matrix: boolean[][], reserved: boolean[][], maskIndex: number): boolean[][] {
  const size = matrix.length
  const masked = matrix.map(row => [...row])
  const maskFn = MASK_FUNCTIONS[maskIndex]

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!reserved[r][c] && maskFn(r, c)) {
        masked[r][c] = !masked[r][c]
      }
    }
  }

  return masked
}

function calculatePenalty(matrix: boolean[][]): number {
  const size = matrix.length
  let penalty = 0

  // Rule 1: 5+ consecutive same-color modules in row/col
  for (let r = 0; r < size; r++) {
    let count = 1
    for (let c = 1; c < size; c++) {
      if (matrix[r][c] === matrix[r][c - 1]) {
        count++
      } else {
        if (count >= 5) penalty += count - 2
        count = 1
      }
    }
    if (count >= 5) penalty += count - 2
  }
  for (let c = 0; c < size; c++) {
    let count = 1
    for (let r = 1; r < size; r++) {
      if (matrix[r][c] === matrix[r - 1][c]) {
        count++
      } else {
        if (count >= 5) penalty += count - 2
        count = 1
      }
    }
    if (count >= 5) penalty += count - 2
  }

  // Rule 2: 2x2 blocks of same color
  for (let r = 0; r < size - 1; r++) {
    for (let c = 0; c < size - 1; c++) {
      const v = matrix[r][c]
      if (v === matrix[r][c + 1] && v === matrix[r + 1][c] && v === matrix[r + 1][c + 1]) {
        penalty += 3
      }
    }
  }

  // Rule 3: Finder-like pattern (10111010000 or reverse)
  const pattern1 = [true, false, true, true, true, false, true, false, false, false, false]
  const pattern2 = [false, false, false, false, true, false, true, true, true, false, true]
  for (let r = 0; r < size; r++) {
    for (let c = 0; c <= size - 11; c++) {
      let match1 = true
      let match2 = true
      for (let i = 0; i < 11; i++) {
        if (matrix[r][c + i] !== pattern1[i]) match1 = false
        if (matrix[r][c + i] !== pattern2[i]) match2 = false
      }
      if (match1 || match2) penalty += 40
    }
  }
  for (let c = 0; c < size; c++) {
    for (let r = 0; r <= size - 11; r++) {
      let match1 = true
      let match2 = true
      for (let i = 0; i < 11; i++) {
        if (matrix[r + i][c] !== pattern1[i]) match1 = false
        if (matrix[r + i][c] !== pattern2[i]) match2 = false
      }
      if (match1 || match2) penalty += 40
    }
  }

  // Rule 4: Proportion of dark modules
  let darkCount = 0
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (matrix[r][c]) darkCount++
    }
  }
  const percentage = (darkCount * 100) / (size * size)
  const prev5 = Math.floor(percentage / 5) * 5
  const next5 = prev5 + 5
  penalty += Math.min(Math.abs(prev5 - 50) / 5, Math.abs(next5 - 50) / 5) * 10

  return penalty
}

function selectBestMask(
  matrix: boolean[][],
  reserved: boolean[][],
): { maskIndex: number; maskedMatrix: boolean[][] } {
  let bestPenalty = Infinity
  let bestMask = 0
  let bestMatrix = matrix

  for (let i = 0; i < 8; i++) {
    const masked = applyMask(matrix, reserved, i)
    const penalty = calculatePenalty(masked)
    if (penalty < bestPenalty) {
      bestPenalty = penalty
      bestMask = i
      bestMatrix = masked
    }
  }

  return { maskIndex: bestMask, maskedMatrix: bestMatrix }
}

// ─── Format & Version Info ─────────────────────────────────────────────────────

const FORMAT_MASK = 0x5412 // XOR mask per spec

function bchFormatInfo(data: number): number {
  // BCH(15,5) with generator polynomial 0x537
  let d = data << 10
  let gen = 0x537
  for (let i = 4; i >= 0; i--) {
    if (d & (1 << (i + 10))) {
      d ^= gen << i
    }
  }
  return ((data << 10) | d) ^ FORMAT_MASK
}

function bchVersionInfo(version: number): number {
  // BCH(18,6) with generator polynomial 0x1f25
  let d = version << 12
  let gen = 0x1f25
  for (let i = 5; i >= 0; i--) {
    if (d & (1 << (i + 12))) {
      d ^= gen << i
    }
  }
  return (version << 12) | d
}

function placeFormatInfo(matrix: boolean[][], ecLevel: ErrorCorrectionLevel, maskIndex: number) {
  const size = matrix.length
  const ecBits = [1, 0, 3, 2][EC_LEVEL_INDEX[ecLevel]] // L=01, M=00, Q=11, H=10
  const formatBits = bchFormatInfo((ecBits << 3) | maskIndex)

  // Place format info around top-left finder pattern
  const positions1: [number, number][] = [
    [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [5, 8], [7, 8], [8, 8],
    [8, 7], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0],
  ]
  // Place format info around other finder patterns
  const positions2: [number, number][] = [
    [8, size - 1], [8, size - 2], [8, size - 3], [8, size - 4],
    [8, size - 5], [8, size - 6], [8, size - 7], [8, size - 8],
    [size - 7, 8], [size - 6, 8], [size - 5, 8], [size - 4, 8],
    [size - 3, 8], [size - 2, 8], [size - 1, 8],
  ]

  for (let i = 0; i < 15; i++) {
    const bit = ((formatBits >> i) & 1) === 1
    const [r1, c1] = positions1[i]
    matrix[r1][c1] = bit
    const [r2, c2] = positions2[i]
    matrix[r2][c2] = bit
  }
}

function placeVersionInfo(matrix: boolean[][], version: number) {
  if (version < 7) return
  const size = matrix.length
  const versionBits = bchVersionInfo(version)

  for (let i = 0; i < 18; i++) {
    const bit = ((versionBits >> i) & 1) === 1
    const row = Math.floor(i / 3)
    const col = i % 3

    // Bottom-left
    matrix[size - 11 + col][row] = bit
    // Top-right
    matrix[row][size - 11 + col] = bit
  }
}

// ─── Public API ────────────────────────────────────────────────────────────────

export function generateQRMatrix(text: string, errorLevel: ErrorCorrectionLevel = 'M'): boolean[][] {
  if (!text) return [[false]]

  const { version, codewords } = encodeData(text, errorLevel)
  const size = version * 4 + 17
  const { matrix, reserved } = createMatrix(size)

  // Place patterns
  placeFinderPatterns(matrix, reserved)
  placeAlignmentPatterns(matrix, reserved, version)
  placeTimingPatterns(matrix, reserved)
  reserveFormatArea(matrix, reserved)
  reserveVersionArea(matrix, reserved, version)

  // Place data
  placeDataBits(matrix, reserved, codewords)

  // Find best mask and apply
  const { maskIndex, maskedMatrix } = selectBestMask(matrix, reserved)

  // Place format and version info on the masked matrix
  placeFormatInfo(maskedMatrix, errorLevel, maskIndex)
  placeVersionInfo(maskedMatrix, version)

  return maskedMatrix
}
