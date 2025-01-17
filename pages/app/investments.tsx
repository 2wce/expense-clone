/* eslint-disable @typescript-eslint/no-explicit-any */
import enforceAuth from 'components/Auth/enforceAuth'
import Card from 'components/Card'
import LoaderCard from 'components/Loader/LoaderCard'
import AddButton from 'components/Modal/AddButton'
import AddInvestment from 'components/Modal/AddInvestment'
import InvestmentTable from 'components/Table/InvestmentTable'
import { filterMap } from 'components/Table/TableFilter'
import {
  showErrorToast,
  showSuccessToast,
  toastMessages
} from 'components/Toast'
import { shortcuts } from 'constants/index'
import { incrementUsageLimit } from 'lib/usageLimit'
import Head from 'next/head'
import { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import useSWR from 'swr'
// @ts-expect-error no types
import textFilter from 'text-filter'
import { formatCurrency } from 'utils/formatter'
import { getApiUrl } from 'utils/url'

const addShortcutKey = Object.values(shortcuts.investments.add.shortcut)

type Props = {
  user: {
    currency: unknown
    locale: undefined
    isPremiumPlan: boolean
    isPremiumPlanEnded: boolean
  }
}

export default function Investments({ user }: Props) {
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState<{ id: string }>()
  const [filterKey, setFilterKey] = useState(filterMap.thismonth)
  useHotkeys(addShortcutKey, () => !isLoading && setShow(true))

  const {
    data = [],
    mutate,
    isLoading
  } = useSWR(getApiUrl(filterKey, 'investments'))

  const onHide = () => setShow(false)
  const onEdit = (selected: { id: string }) => {
    setShow(true)
    setSelected(selected)
  }

  const onSubmit = async (data: any) => {
    let url = '/api/investments/create'
    let method = 'POST'
    const body = JSON.stringify(data)

    setLoading(true)

    const isEditing = selected && selected.id

    if (isEditing) {
      url = '/api/investments/update'
      method = 'PATCH'
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body
      })
      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || res.statusText)
      }

      if (isEditing) {
        showSuccessToast(toastMessages.updated)
      } else {
        incrementUsageLimit(method)
        showSuccessToast(toastMessages.success)
      }
    } catch (error) {
      showErrorToast((error as Error).message)
    } finally {
      mutate()
      setLoading(false)
      onHide()
      if (isEditing) setSelected(undefined)
    }
  }

  const onDelete = async (id: string) => {
    try {
      const res = await fetch('/api/investments/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || res.statusText)
      }

      showSuccessToast(toastMessages.deleted)
    } catch (error) {
      showErrorToast((error as Error).message)
    } finally {
      mutate()
    }
  }

  const onLookup = (name: string) => {
    const result = data.filter(textFilter({ query: name, fields: ['name'] }))
    if (result.length) return [result[0]]
    return result
  }

  return (
    <>
      <Head>
        <title>Expense.fyi - Investments</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <div className="h-ful mb-20">
        <div className="mb-2 flex justify-between">
          <h1 className="mr-3 mb-2 text-2xl font-extrabold text-black max-sm:mb-4 max-sm:ml-[45px]">
            Investments
          </h1>
        </div>

        <h2 className="mb-4 text-black">Summary</h2>
        {isLoading ? (
          <LoaderCard nums={2} />
        ) : (
          <div className="mb-6 grid grid-cols-1 gap-6 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <Card
              title="Total Investments"
              className="relative"
              data={data.length}
            />
            <Card
              title="Total Amount"
              className="relative"
              data={formatCurrency(
                data.reduce(
                  (acc: number, datum: { price: number; units: number }) =>
                    Number(datum.price) * datum.units + acc,
                  0
                ),
                user.currency,
                user.locale
              )}
            />
          </div>
        )}

        <AddInvestment
          onHide={onHide}
          onSubmit={onSubmit}
          loading={loading}
          selected={selected}
          currency={user.currency}
          locale={user.locale}
          show={show}
          lookup={onLookup}
        />

        <InvestmentTable
          onFilterChange={(filterKey: string) => {
            setFilterKey(filterKey)
          }}
          filterKey={filterKey}
          isLoading={isLoading}
          data={data}
          onEdit={onEdit}
          onDelete={onDelete}
          user={user}
        />

        {!isLoading ? (
          <AddButton
            onClick={() => {
              if (selected?.id) setSelected(undefined)
              setShow(true)
            }}
          />
        ) : null}
      </div>
      <div className="h-1" />
    </>
  )
}

export const getServerSideProps = enforceAuth()
