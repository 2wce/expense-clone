import { filterMap } from 'components/Table/TableFilter'
import { dateFormatStr, payingKey } from 'constants/index'
import {
  addMonths,
  addYears,
  differenceInMonths,
  differenceInYears,
  endOfMonth,
  endOfWeek,
  format,
  isFuture,
  isThisMonth,
  isToday,
  isValid,
  startOfMonth,
  startOfWeek,
  subMonths,
  subYears
} from 'date-fns'

export const getCurrentMonth = () => {
  const date = new Date()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const year = date.getFullYear()
  return `${year}-${month}`
}

export const getStartDateOfMonth = (date: string) => {
  return format(startOfMonth(new Date(date)), dateFormatStr)
}

export const getTodayDate = () => {
  return format(new Date(), dateFormatStr)
}

export const getEndDateOfMonth = (date: string) => {
  return format(endOfMonth(new Date(date)), dateFormatStr)
}

export const calculateRenewalDate = (dateStr: string, paid: string) => {
  const startDate = new Date(dateStr)
  const today = new Date()

  if (isFuture(startDate)) {
    return startDate
  }

  if (paid === payingKey.monthly) {
    const monthlyDate = addMonths(
      startDate,
      differenceInMonths(today, startDate)
    )
    if (isToday(monthlyDate) && !isToday(startDate)) return today
    return addMonths(monthlyDate, 1)
  }

  const yearRenewalDate = addYears(
    startDate,
    differenceInYears(today, startDate)
  )
  if (isToday(yearRenewalDate) && !isToday(startDate)) return today
  return addYears(yearRenewalDate, 1)
}

export const calculatePreviousRenewalDate = (
  dateStr: Date,
  { paid, date }: { paid: string; date: string }
) => {
  let previousRenewalDate = null
  const startDate = new Date(date)

  if (isFuture(startDate)) {
    return startDate
  }

  if (paid === payingKey.monthly) {
    previousRenewalDate = subMonths(dateStr, 1)
    return previousRenewalDate > startDate ? previousRenewalDate : startDate
  }

  previousRenewalDate = subYears(dateStr, 1)
  return previousRenewalDate > startDate ? previousRenewalDate : startDate
}

type Datum = {
  paid: string
  active: boolean | null
  cancelled_at: string | null
  date: string
}
export const calculatePaidDates = (
  datum: Datum,
  start?: string | string[],
  end?: string | string[]
) => {
  if (!start || !end) return []

  const hasValidCancelledAt =
    !datum.active &&
    datum.cancelled_at !== null &&
    isValid(new Date(datum.cancelled_at))
  const startDate = new Date(datum.date)
  const rangeStartDate = new Date(start as string)
  const rangeEndDate = hasValidCancelledAt
    ? new Date(new Date(datum.cancelled_at as string))
    : new Date(end as string)
  const startDateCount = 1
  let noOfPaidDurations = 0

  if (datum.paid === payingKey.monthly) {
    if (!isFuture(startDate)) {
      noOfPaidDurations =
        differenceInMonths(rangeEndDate, startDate) + startDateCount
    }
  } else {
    if (!isFuture(startDate)) {
      noOfPaidDurations =
        differenceInYears(rangeEndDate, startDate) + startDateCount
    }
  }

  return [...Array(noOfPaidDurations).keys()]
    .map((_, index) => {
      return addMonths(startDate, index)
    })
    .filter((rD) => rD >= rangeStartDate && rD <= rangeEndDate)
}

export const calculateTopCategory = (
  data: Array<{ category: string; price: number }>
) => {
  const result = data.reduce((acc, datum) => {
    acc[datum.category] = acc[datum.category]
      ? acc[datum.category] + Number(datum.price)
      : Number(datum.price)
    return acc
  }, {} as Record<string, number>)

  return result
}

export const getFirstAndLastDateOfWeek = () => {
  const start = new Date()
  const end = new Date()
  const weekDay = start.getDay()

  if (weekDay === 0) {
    start.setDate(start.getDate() - 6)
  } else if (weekDay === 1) {
    end.setDate(end.getDate() + 7 - end.getDay())
  } else if (weekDay >= 1) {
    start.setDate(start.getDate() - start.getDay() + 1)
    end.setDate(end.getDate() + 7 - end.getDay())
  }

  return { start, end }
}

export const getFirstAndLastDateOfMonth = () => {
  const date = new Date()
  const y = date.getFullYear()
  const m = date.getMonth()
  const start = new Date(y, m, 1)
  const end = new Date(y, m + 1, 0)

  return { start, end }
}

export const thisMonth = (datum: { date: string }) =>
  isThisMonth(new Date(datum.date))

export const getRangeDateForFilter = (filter: string) => {
  const dateObj = new Date()
  if (filter === filterMap.thisweek) {
    return [
      format(startOfWeek(dateObj), dateFormatStr),
      format(endOfWeek(dateObj), dateFormatStr)
    ]
  } else {
    return [
      format(startOfMonth(dateObj), dateFormatStr),
      format(endOfMonth(dateObj), dateFormatStr)
    ]
  }
}
