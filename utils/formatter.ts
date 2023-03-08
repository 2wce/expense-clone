/* eslint-disable @typescript-eslint/no-explicit-any */
const dateStyle = { day: '2-digit', year: 'numeric', month: 'short' }
const timeStyle = { hour: 'numeric', minute: 'numeric' }
const currencyStyle = {
  style: 'currency',
  currency: '',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}

export const formatCurrency = (
  number: number,
  currency: any,
  locale?: string | undefined,
  minimumFractionDigits = currencyStyle.maximumFractionDigits,
  maximumFractionDigits = currencyStyle.maximumFractionDigits
) => {
  return new Intl.NumberFormat(locale ? locale : undefined, {
    ...currencyStyle,
    minimumFractionDigits,
    maximumFractionDigits,
    currency
  })
    .format(number)
    .replace(/^(\D+)/, '$1 ')
}

export const formatDate = (
  date: Date,
  locale: string | undefined = undefined,
  customDateStyle = dateStyle
) => {
  // @ts-expect-error will fix
  return new Intl.DateTimeFormat(locale, customDateStyle).format(new Date(date))
}

export const formatDateToRelative = (date: string, locale = undefined) => {
  // @ts-expect-error will fix
  return new Intl.DateTimeFormat(locale, { ...timeStyle }).format(
    new Date(date)
  )
}

export const isItToday = (date1: Date, date2: Date, locale?: string) => {
  return formatDate(date1, locale) === formatDate(date2, locale)
}

export const getCurrencySymbol = (
  currency: any,
  locale: string | undefined = undefined
) => {
  // @ts-expect-error will fix
  return new Intl.NumberFormat(locale, { ...currencyStyle, currency })
    .formatToParts(1)
    .find((x) => x.type === 'currency').value
}
