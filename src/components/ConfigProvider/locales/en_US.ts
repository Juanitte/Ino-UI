import type { Locale } from '../ConfigProvider'

export const en_US: Locale = {
  locale: 'en_US',
  DatePicker: {
    placeholder: 'Select date',
    yearPlaceholder: 'Select year',
    quarterPlaceholder: 'Select quarter',
    monthPlaceholder: 'Select month',
    weekPlaceholder: 'Select week',
    dateTimePlaceholder: 'Select date and time',
    rangeStartPlaceholder: 'Start date',
    rangeEndPlaceholder: 'End date',
    rangeStartTimePlaceholder: 'Start date time',
    rangeEndTimePlaceholder: 'End date time',
    today: 'Today',
    now: 'Now',
    ok: 'OK',
  },
  Pagination: {
    itemsPerPage: '/ page',
    jumpTo: 'Go to',
  },
  Form: {
    defaultRequiredMessage: 'This field is required',
    defaultPatternMessage: 'Does not match the required pattern',
  },
}
