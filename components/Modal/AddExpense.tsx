import Modal from '.'
import Button from 'components/Button'
import Dropdown from 'components/Dropdown'
import {
  dateFormatStr,
  datePattern,
  expensesCategory,
  groupedExpensesCategory
} from 'constants/index'
import { format } from 'date-fns'
// @ts-expect-error no types
import debounce from 'debounce'
import useAutoFocus from 'hooks/useAutoFocus'
import { useEffect, useMemo, useState } from 'react'
import { getCurrencySymbol } from 'utils/formatter'

const todayDate = format(new Date(), dateFormatStr)

const initialState = {
  id: '',
  category: 'food',
  name: '',
  notes: '',
  price: '',
  date: todayDate,
  autocomplete: [] as any[]
}

type Selected = {
  id: any
  category: string
  name: string
  notes: string
  price: string
  date: string
  autocomplete: any[]
}

type Props = {
  show: boolean
  selected: Selected
  lookup: any
  onHide: () => void
  onSubmit: (state: Selected) => void
  loading: boolean
  currency: any
  locale?: string
}

export default function AddExpense({
  show,
  selected,
  lookup,
  onHide,
  onSubmit,
  loading,
  currency,
  locale
}: Props) {
  const inputRef = useAutoFocus()
  const [state, setState] = useState(initialState)

  useEffect(() => setState(selected.id ? selected : initialState), [selected])

  const onLookup = useMemo(() => {
    const callbackHandler = (value: any) => {
      setState((prev) => ({ ...prev, autocomplete: lookup(value) }))
    }

    return debounce(callbackHandler, 500)
  }, [lookup])

  const onHideDropdown = () => {
    setState({ ...state, autocomplete: [] })
  }

  return (
    <Modal
      inputRef={inputRef}
      show={show}
      title={`${selected.id ? 'Edit' : 'Add'} Expense`}
      onHide={onHide}
    >
      <div className="sm:flex sm:items-start">
        <form
          className="md:[420px] grid w-full grid-cols-1 items-center gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit(state)
            if (!selected.id) setState({ ...initialState })
          }}
        >
          <label className="block">
            <span className="block text-sm font-medium text-zinc-800">
              Name
            </span>
            <input
              className="mt-2 block h-10 w-full appearance-none rounded-md bg-white px-3 text-sm text-zinc-800 shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
              type="text"
              placeholder="Swiggy - Biriyani"
              maxLength={30}
              required
              ref={inputRef}
              autoFocus
              onChange={({ target }) => {
                const { value } = target
                if (value.length) {
                  setState({ ...state, name: value, autocomplete: [] })
                  if (value.length > 2) onLookup(value)
                } else {
                  setState({
                    ...state,
                    name: '',
                    category: 'food',
                    autocomplete: []
                  })
                }
              }}
              value={state.name}
            />
            <Dropdown
              onHide={onHideDropdown}
              data={state.autocomplete}
              searchTerm={state.name.length > 2 ? state.name.toLowerCase() : ''}
              onClick={({ name, category }) => {
                setState({ ...state, name, category, autocomplete: [] })
              }}
              show={Boolean(state.autocomplete?.length)}
            />
          </label>

          <div className="grid grid-cols-[32%,38%,30%]">
            <label className="block">
              <span className="block text-sm font-medium text-zinc-800">
                Price
                <span className="ml-2 font-mono text-xs">
                  ({getCurrencySymbol(currency, locale)})
                </span>
              </span>
              <div className="flex items-center justify-between">
                <input
                  className="mt-2 mr-4 block h-10 w-full appearance-none rounded-md bg-white px-3 text-sm text-zinc-800 shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  type="number"
                  placeholder="199"
                  required
                  min="0"
                  step=".01"
                  onChange={(event) =>
                    setState({ ...state, price: event.target.value })
                  }
                  value={state.price}
                />
              </div>
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-zinc-800">
                Spent Date
              </span>
              <div className="flex items-center justify-between">
                <input
                  className="mt-2 mr-4 block h-10 w-full appearance-none rounded-md bg-white p-3 text-sm leading-tight text-zinc-800 shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2  focus:ring-gray-900"
                  type="date"
                  required
                  max={todayDate}
                  pattern={datePattern}
                  onChange={(event) => {
                    setState({ ...state, date: event.target.value })
                  }}
                  value={state.date}
                />
              </div>
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-zinc-800">
                Category{' '}
                <span className="ml-1">
                  {expensesCategory[state.category].emoji}
                </span>
              </span>
              <select
                name="category"
                className="mt-2 block h-10 w-full appearance-none rounded-md bg-white py-2 px-3 pr-8 text-sm text-zinc-800 shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                onChange={(event) => {
                  setState({ ...state, category: event.target.value })
                }}
                value={state.category}
                required
              >
                {Object.keys(groupedExpensesCategory).map((key) => {
                  return (
                    <optgroup
                      label={groupedExpensesCategory[key].name}
                      key={groupedExpensesCategory[key].name}
                    >
                      {Object.keys(groupedExpensesCategory[key].list).map(
                        (listKey) => {
                          return (
                            <option key={listKey} value={listKey}>
                              {groupedExpensesCategory[key].list[listKey].name}
                            </option>
                          )
                        }
                      )}
                    </optgroup>
                  )
                })}
                <option key={'other'} value={'other'}>
                  {expensesCategory.other.name}
                </option>
              </select>
            </label>
          </div>
          <label className="block">
            <span className="block text-sm font-medium text-zinc-800">
              Notes{' '}
              <span className="mb-6 text-center text-sm font-medium text-gray-400">
                (optional)
              </span>
            </span>
            <textarea
              className="mt-2 block h-20 w-full appearance-none rounded-md bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm ring-1 ring-gray-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder=""
              onChange={(event) =>
                setState({ ...state, notes: event.target.value })
              }
              value={state.notes}
              maxLength={60}
            />
          </label>

          <Button
            type="submit"
            loading={loading}
            text={state.id ? 'Update' : 'Submit'}
          />
        </form>
      </div>
    </Modal>
  )
}
