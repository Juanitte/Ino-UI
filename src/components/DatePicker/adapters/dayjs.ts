import type { DateAdapter } from './types'

// dayjs is a peer dependency — users must install it separately
// This adapter requires: dayjs + plugins (weekOfYear, customParseFormat, quarterOfYear)

type Dayjs = any

// Declare global require for CommonJS fallback
declare const require: (id: string) => any

let dayjsLib: any = null

function getDayjs(): any {
  if (dayjsLib) return dayjsLib
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    dayjsLib = require('dayjs')
    const weekOfYear = require('dayjs/plugin/weekOfYear')
    const customParseFormat = require('dayjs/plugin/customParseFormat')
    const quarterOfYear = require('dayjs/plugin/quarterOfYear')
    dayjsLib.extend(weekOfYear)
    dayjsLib.extend(customParseFormat)
    dayjsLib.extend(quarterOfYear)
  } catch {
    throw new Error(
      'DayjsAdapter requires dayjs to be installed. Run: npm install dayjs'
    )
  }
  return dayjsLib
}

export class DayjsAdapter implements DateAdapter<Dayjs> {
  private dayjs: any

  constructor(dayjsInstance?: any) {
    this.dayjs = dayjsInstance ?? getDayjs()
  }

  today(): Dayjs {
    return this.dayjs().startOf('day')
  }

  create(value?: string | number | Dayjs | null): Dayjs {
    if (value == null) return this.dayjs(null)
    return this.dayjs(value)
  }

  clone(date: Dayjs): Dayjs {
    return date.clone()
  }

  isValid(date: Dayjs | null | undefined): boolean {
    if (!date) return false
    return date.isValid()
  }

  // ---- Getters ----
  getYear(date: Dayjs): number { return date.year() }
  getMonth(date: Dayjs): number { return date.month() }
  getDate(date: Dayjs): number { return date.date() }
  getDay(date: Dayjs): number { return date.day() }
  getHour(date: Dayjs): number { return date.hour() }
  getMinute(date: Dayjs): number { return date.minute() }
  getSecond(date: Dayjs): number { return date.second() }

  // ---- Setters ----
  setYear(date: Dayjs, year: number): Dayjs { return date.year(year) }
  setMonth(date: Dayjs, month: number): Dayjs { return date.month(month) }
  setDate(date: Dayjs, day: number): Dayjs { return date.date(day) }
  setHour(date: Dayjs, hour: number): Dayjs { return date.hour(hour) }
  setMinute(date: Dayjs, minute: number): Dayjs { return date.minute(minute) }
  setSecond(date: Dayjs, second: number): Dayjs { return date.second(second) }

  // ---- Arithmetic ----
  addDays(date: Dayjs, days: number): Dayjs { return date.add(days, 'day') }
  addMonths(date: Dayjs, months: number): Dayjs { return date.add(months, 'month') }
  addYears(date: Dayjs, years: number): Dayjs { return date.add(years, 'year') }

  // ---- Comparison ----
  isSameDay(a: Dayjs, b: Dayjs): boolean { return a.isSame(b, 'day') }
  isSameMonth(a: Dayjs, b: Dayjs): boolean { return a.isSame(b, 'month') }
  isSameYear(a: Dayjs, b: Dayjs): boolean { return a.isSame(b, 'year') }
  isBefore(a: Dayjs, b: Dayjs): boolean { return a.isBefore(b) }
  isAfter(a: Dayjs, b: Dayjs): boolean { return a.isAfter(b) }

  // ---- Range helpers ----
  startOfWeek(date: Dayjs, weekStartsOn = 1): Dayjs {
    const day = date.day()
    const diff = (day - weekStartsOn + 7) % 7
    return date.subtract(diff, 'day').startOf('day')
  }

  endOfWeek(date: Dayjs, weekStartsOn = 1): Dayjs {
    return this.startOfWeek(date, weekStartsOn).add(6, 'day').endOf('day')
  }

  startOfMonth(date: Dayjs): Dayjs { return date.startOf('month') }
  endOfMonth(date: Dayjs): Dayjs { return date.endOf('month') }
  getDaysInMonth(date: Dayjs): number { return date.daysInMonth() }
  getWeekNumber(date: Dayjs): number { return date.week() }

  // ---- Format / Parse ----
  format(date: Dayjs, formatStr: string): string { return date.format(formatStr) }

  parse(value: string, formatStr: string): Dayjs | null {
    const d = this.dayjs(value, formatStr, true)
    return d.isValid() ? d : null
  }

  // ---- Locale data ----
  getMonthNames(style: 'long' | 'short' = 'long'): string[] {
    const fmt = style === 'short' ? 'MMM' : 'MMMM'
    return Array.from({ length: 12 }, (_, i) => this.dayjs().month(i).format(fmt))
  }

  getDayNames(style: 'long' | 'short' | 'narrow' = 'short'): string[] {
    const fmt = style === 'narrow' ? 'dd' : style === 'short' ? 'ddd' : 'dddd'
    return Array.from({ length: 7 }, (_, i) => this.dayjs().day(i).format(fmt))
  }

  getQuarterLabel(quarter: number): string {
    return `Q${quarter}`
  }
}
