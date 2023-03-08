/* eslint-disable @typescript-eslint/no-explicit-any */

export const sortByKey = (arr: any[], key: string) => {
  return arr.sort((a, b) => (a[key] < b[key] ? 1 : -1))
}

export const range = (start: number, stop: number) =>
  Array.from({ length: stop - start + 1 }, (_, i) => start + i)
