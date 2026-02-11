export interface DateAdapter<TDate = any> {
  // ---- Creation ----
  today(): TDate
  create(value?: string | number | TDate | null): TDate
  clone(date: TDate): TDate
  isValid(date: TDate | null | undefined): boolean

  // ---- Getters ----
  getYear(date: TDate): number
  getMonth(date: TDate): number        // 0-based (0=Jan)
  getDate(date: TDate): number          // day of month (1-31)
  getDay(date: TDate): number           // day of week (0=Sun)
  getHour(date: TDate): number
  getMinute(date: TDate): number
  getSecond(date: TDate): number

  // ---- Setters (return new instance) ----
  setYear(date: TDate, year: number): TDate
  setMonth(date: TDate, month: number): TDate
  setDate(date: TDate, day: number): TDate
  setHour(date: TDate, hour: number): TDate
  setMinute(date: TDate, minute: number): TDate
  setSecond(date: TDate, second: number): TDate

  // ---- Arithmetic (return new instance) ----
  addDays(date: TDate, days: number): TDate
  addMonths(date: TDate, months: number): TDate
  addYears(date: TDate, years: number): TDate

  // ---- Comparison ----
  isSameDay(a: TDate, b: TDate): boolean
  isSameMonth(a: TDate, b: TDate): boolean
  isSameYear(a: TDate, b: TDate): boolean
  isBefore(a: TDate, b: TDate): boolean
  isAfter(a: TDate, b: TDate): boolean

  // ---- Range helpers ----
  startOfWeek(date: TDate, weekStartsOn?: number): TDate
  endOfWeek(date: TDate, weekStartsOn?: number): TDate
  startOfMonth(date: TDate): TDate
  endOfMonth(date: TDate): TDate
  getDaysInMonth(date: TDate): number
  getWeekNumber(date: TDate): number

  // ---- Format / Parse ----
  format(date: TDate, formatStr: string): string
  parse(value: string, formatStr: string): TDate | null

  // ---- Locale data ----
  getMonthNames(style?: 'long' | 'short'): string[]
  getDayNames(style?: 'long' | 'short' | 'narrow'): string[]
  getQuarterLabel(quarter: number): string
}
