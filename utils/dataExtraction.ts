/* eslint-disable @typescript-eslint/no-explicit-any */
import { sortByKey } from './array'
import { formatDate } from './formatter'
import { expensesCategory } from 'constants/index'

const recentIndex = 4
const topExpenseIndex = 4

export const extractExpensesData = (
  data: Array<Record<string, unknown>>,
  locale?: undefined
) => {
  const groupByDate = sortByKey(data, 'date').reduce((acc, datum) => {
    const date = formatDate(datum.date, locale, {
      day: '2-digit',
      year: '2-digit',
      month: 'short'
    })
    acc[date] = acc[date]
      ? {
          ...acc[date],
          [datum.category]: acc[date][datum.category]
            ? acc[date][datum.category] + Number(datum.price)
            : Number(datum.price)
        }
      : { date, [datum.category]: Number(datum.price) }

    return acc
  }, {})

  return Object.values(groupByDate).reverse()
}

export const extractExpensesCategories = (data: Array<Record<string, any>>) => {
  return Object.keys(
    data.reduce((acc, datum) => {
      acc[datum.category] = true
      return acc
    }, {})
  )
}

export const extractMaxXAxisValue = (data: any[]) => {
  return data.sort((a, b) => b - a)
}

const sortValueByAsc = (a: { value: number }, b: { value: number }) =>
  a.value > b.value ? -1 : 1

export const extractTopExpenseCategoryData = (
  data: Array<{ category: string; price: number }>
) => {
  const dataMap = data.reduce((acc, datum) => {
    const obj = {
      name: `${expensesCategory[datum.category].emoji}  ${datum.category}`,
      value: acc[datum.category]
        ? Number(acc[datum.category].value) + Number(datum.price)
        : Number(datum.price)
    }
    acc[datum.category] = obj
    return acc
  }, {} as Record<string, { name: string; value: number }>)

  return Object.values(dataMap)
    .sort(sortValueByAsc)
    .filter((_, index) => index <= topExpenseIndex)
}

type CategoryData = Array<string>
export const extractCategoriesFromData = (
  data: Array<{ paid_dates: Array<any>; name: string }>
) => {
  return data
    .filter((datum) => datum.paid_dates.length > 0)
    .reduce((acc, datum) => {
      acc.push(datum.name)
      return acc
    }, [] as CategoryData)
}

type SubscriptionData = Array<{ name: string; price: number; from?: string }>
export const extractSubscriptionData = (
  data: Array<{ paid_dates: Array<any>; name: string; price: number }>
) => {
  return data
    .filter((datum) => datum.paid_dates.length > 0)
    .reduce((acc, c) => {
      acc.push({
        name: c.name,
        price: Number(c.price) * Number(c.paid_dates.length)
      })
      return acc
    }, [] as SubscriptionData)
}

export const extractRecentActivityData = (
  subscriptionsData: SubscriptionData,
  expensesData: any[],
  investmentsData: any[],
  incomeData: any[]
) => {
  const allData = [
    ...subscriptionsData.map((datum) => ({ ...datum, from: 'subcriptions' })),
    ...expensesData.map((datum) => ({ ...datum, from: 'expenses' })),
    ...investmentsData.map((datum) => ({ ...datum, from: 'investments' })),
    ...incomeData.map((datum) => ({ ...datum, from: 'income' }))
  ]
  return sortByKey(allData, 'updated_at').filter(
    (_, index) => index <= recentIndex
  )
}
