import type { DateAdapter } from './types'

function pad(n: number, len = 2): string {
  return String(n).padStart(len, '0')
}

function cloneDate(d: Date): Date {
  return new Date(d.getTime())
}

function getISOWeekNumber(date: Date): number {
  const d = cloneDate(date)
  d.setHours(0, 0, 0, 0)
  // Set to nearest Thursday: current date + 4 - current day number (Mon=1, Sun=7)
  d.setDate(d.getDate() + 4 - (d.getDay() || 7))
  const yearStart = new Date(d.getFullYear(), 0, 1)
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

// Format tokens: longest first to ensure correct matching
const FORMAT_TOKENS = /\[([^\]]*)\]|YYYY|YY|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|A|a|ddd|dd|wo|Wo|QQ|Q/g

export class NativeDateAdapter implements DateAdapter<Date> {
  private locale: string

  constructor(locale?: string) {
    this.locale = locale ?? (typeof navigator !== 'undefined' ? navigator.language : 'en-US')
  }

  today(): Date {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }

  create(value?: string | number | Date | null): Date {
    if (value == null) return new Date(NaN)
    if (value instanceof Date) return cloneDate(value)
    return new Date(value)
  }

  clone(date: Date): Date {
    return cloneDate(date)
  }

  isValid(date: Date | null | undefined): boolean {
    return date instanceof Date && !isNaN(date.getTime())
  }

  // ---- Getters ----
  getYear(date: Date): number { return date.getFullYear() }
  getMonth(date: Date): number { return date.getMonth() }
  getDate(date: Date): number { return date.getDate() }
  getDay(date: Date): number { return date.getDay() }
  getHour(date: Date): number { return date.getHours() }
  getMinute(date: Date): number { return date.getMinutes() }
  getSecond(date: Date): number { return date.getSeconds() }

  // ---- Setters ----
  setYear(date: Date, year: number): Date {
    const d = cloneDate(date)
    d.setFullYear(year)
    return d
  }

  setMonth(date: Date, month: number): Date {
    const d = cloneDate(date)
    const day = d.getDate()
    d.setDate(1)
    d.setMonth(month)
    const maxDay = new Date(d.getFullYear(), month + 1, 0).getDate()
    d.setDate(Math.min(day, maxDay))
    return d
  }

  setDate(date: Date, day: number): Date {
    const d = cloneDate(date)
    d.setDate(day)
    return d
  }

  setHour(date: Date, hour: number): Date {
    const d = cloneDate(date)
    d.setHours(hour)
    return d
  }

  setMinute(date: Date, minute: number): Date {
    const d = cloneDate(date)
    d.setMinutes(minute)
    return d
  }

  setSecond(date: Date, second: number): Date {
    const d = cloneDate(date)
    d.setSeconds(second)
    return d
  }

  // ---- Arithmetic ----
  addDays(date: Date, days: number): Date {
    const d = cloneDate(date)
    d.setDate(d.getDate() + days)
    return d
  }

  addMonths(date: Date, months: number): Date {
    const d = cloneDate(date)
    const day = d.getDate()
    d.setDate(1)
    d.setMonth(d.getMonth() + months)
    const maxDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
    d.setDate(Math.min(day, maxDay))
    return d
  }

  addYears(date: Date, years: number): Date {
    const d = cloneDate(date)
    const day = d.getDate()
    d.setDate(1)
    d.setFullYear(d.getFullYear() + years)
    const maxDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
    d.setDate(Math.min(day, maxDay))
    return d
  }

  // ---- Comparison ----
  isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
  }

  isSameMonth(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()
  }

  isSameYear(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear()
  }

  isBefore(a: Date, b: Date): boolean {
    return a.getTime() < b.getTime()
  }

  isAfter(a: Date, b: Date): boolean {
    return a.getTime() > b.getTime()
  }

  // ---- Range helpers ----
  startOfWeek(date: Date, weekStartsOn = 1): Date {
    const d = cloneDate(date)
    d.setHours(0, 0, 0, 0)
    const day = d.getDay()
    const diff = (day - weekStartsOn + 7) % 7
    d.setDate(d.getDate() - diff)
    return d
  }

  endOfWeek(date: Date, weekStartsOn = 1): Date {
    const d = this.startOfWeek(date, weekStartsOn)
    d.setDate(d.getDate() + 6)
    d.setHours(23, 59, 59, 999)
    return d
  }

  startOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1)
  }

  endOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999)
  }

  getDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  getWeekNumber(date: Date): number {
    return getISOWeekNumber(date)
  }

  // ---- Format ----
  format(date: Date, formatStr: string): string {
    const y = date.getFullYear()
    const M = date.getMonth()
    const d = date.getDate()
    const H = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()
    const day = date.getDay()
    const h12 = H % 12 || 12
    const quarter = Math.floor(M / 3) + 1
    const weekNum = getISOWeekNumber(date)

    const dayNamesShort = this.getDayNames('short')
    const dayNamesNarrow = this.getDayNames('narrow')

    return formatStr.replace(FORMAT_TOKENS, (match, literal) => {
      if (literal !== undefined) return literal
      switch (match) {
        case 'YYYY': return String(y)
        case 'YY': return String(y).slice(-2)
        case 'MM': return pad(M + 1)
        case 'M': return String(M + 1)
        case 'DD': return pad(d)
        case 'D': return String(d)
        case 'HH': return pad(H)
        case 'H': return String(H)
        case 'hh': return pad(h12)
        case 'h': return String(h12)
        case 'mm': return pad(min)
        case 'm': return String(min)
        case 'ss': return pad(sec)
        case 's': return String(sec)
        case 'A': return H < 12 ? 'AM' : 'PM'
        case 'a': return H < 12 ? 'am' : 'pm'
        case 'ddd': return dayNamesShort[day]
        case 'dd': return dayNamesNarrow[day]
        case 'wo': case 'Wo': return ordinal(weekNum)
        case 'QQ': return 'Q' + quarter
        case 'Q': return String(quarter)
        default: return match
      }
    })
  }

  // ---- Parse ----
  parse(value: string, formatStr: string): Date | null {
    // Build a regex from the format string
    let regexStr = ''
    const groups: string[] = []
    let i = 0
    const fmt = formatStr

    while (i < fmt.length) {
      // Check for escaped text [...]
      if (fmt[i] === '[') {
        const end = fmt.indexOf(']', i)
        if (end !== -1) {
          regexStr += escapeRegex(fmt.substring(i + 1, end))
          i = end + 1
          continue
        }
      }

      // Check for known tokens (longest first)
      let matched = false
      for (const token of ['YYYY', 'YY', 'MM', 'DD', 'HH', 'hh', 'mm', 'ss', 'QQ', 'wo', 'Wo', 'ddd', 'dd', 'M', 'D', 'H', 'h', 'm', 's', 'A', 'a', 'Q']) {
        if (fmt.startsWith(token, i)) {
          groups.push(token)
          regexStr += `(${getTokenPattern(token)})`
          i += token.length
          matched = true
          break
        }
      }

      if (!matched) {
        regexStr += escapeRegex(fmt[i])
        i++
      }
    }

    const regex = new RegExp(`^${regexStr}$`)
    const match = value.match(regex)
    if (!match) return null

    let year = new Date().getFullYear()
    let month = 0
    let day = 1
    let hour = 0
    let minute = 0
    let second = 0
    let isPM = false

    for (let g = 0; g < groups.length; g++) {
      const val = match[g + 1]
      switch (groups[g]) {
        case 'YYYY': year = parseInt(val, 10); break
        case 'YY': year = 2000 + parseInt(val, 10); break
        case 'MM': case 'M': month = parseInt(val, 10) - 1; break
        case 'DD': case 'D': day = parseInt(val, 10); break
        case 'HH': case 'H': hour = parseInt(val, 10); break
        case 'hh': case 'h': hour = parseInt(val, 10); break
        case 'mm': case 'm': minute = parseInt(val, 10); break
        case 'ss': case 's': second = parseInt(val, 10); break
        case 'A': case 'a': isPM = val.toLowerCase() === 'pm'; break
        case 'Q': case 'QQ': month = (parseInt(val.replace('Q', ''), 10) - 1) * 3; break
      }
    }

    if (isPM && hour < 12) hour += 12
    if (!isPM && hour === 12 && groups.some(g => g === 'A' || g === 'a')) hour = 0

    const result = new Date(year, month, day, hour, minute, second)
    if (isNaN(result.getTime())) return null
    return result
  }

  // ---- Locale data ----
  getMonthNames(style: 'long' | 'short' = 'long'): string[] {
    const formatter = new Intl.DateTimeFormat(this.locale, { month: style })
    return Array.from({ length: 12 }, (_, i) => {
      const name = formatter.format(new Date(2026, i, 1))
      return name.charAt(0).toUpperCase() + name.slice(1)
    })
  }

  getDayNames(style: 'long' | 'short' | 'narrow' = 'short'): string[] {
    const formatter = new Intl.DateTimeFormat(this.locale, { weekday: style })
    // Return starting from Sunday (0)
    return Array.from({ length: 7 }, (_, i) => {
      const name = formatter.format(new Date(2026, 0, 4 + i)) // Jan 4 2026 is a Sunday
      return name.charAt(0).toUpperCase() + name.slice(1)
    })
  }

  getQuarterLabel(quarter: number): string {
    return `Q${quarter}`
  }
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function getTokenPattern(token: string): string {
  switch (token) {
    case 'YYYY': return '\\d{4}'
    case 'YY': return '\\d{2}'
    case 'MM': return '\\d{2}'
    case 'M': return '\\d{1,2}'
    case 'DD': return '\\d{2}'
    case 'D': return '\\d{1,2}'
    case 'HH': return '\\d{2}'
    case 'H': return '\\d{1,2}'
    case 'hh': return '\\d{2}'
    case 'h': return '\\d{1,2}'
    case 'mm': return '\\d{2}'
    case 'm': return '\\d{1,2}'
    case 'ss': return '\\d{2}'
    case 's': return '\\d{1,2}'
    case 'A': return '[AP]M'
    case 'a': return '[ap]m'
    case 'QQ': return 'Q[1-4]'
    case 'Q': return '[1-4]'
    case 'wo': case 'Wo': return '\\d{1,2}(?:st|nd|rd|th)'
    case 'ddd': return '[A-Za-z]+'
    case 'dd': return '[A-Za-z]+'
    default: return '.+'
  }
}
