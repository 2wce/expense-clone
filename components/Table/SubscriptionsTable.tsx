import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import Table from 'components/Table'
import { dateFormatStr } from 'constants/index'
import { format, isFuture } from 'date-fns'
import Image from 'next/image'
import { formatCurrency, formatDate, isItToday } from 'utils/formatter'

const tdClassNames =
  'relative p-4 pl-8 text-zinc-800 text-sm font-normal whitespace-nowrap'
const thList = [
  'Name',
  'Price',
  'Renewal Date ↓',
  'Start Date',
  'Notes',
  'Cancelled',
  'Status',
  'Actions'
]

type Data = {
  id: string
  date: Date
  renewal_date: Date
  prev_renewal_date: Date
  cancelled_at: string
  active: boolean
  checked: boolean
  notes: string
  name: string
  url: string
  price: number
  paid: string
}

type Props = {
  isLoading: boolean
  data: Data[]
  onEdit: (value: Data) => void
  onDelete: (id: string) => void
  onActive: (data: Data) => void
  user: any
}
export default function SubscriptionTable({
  isLoading,
  data = [],
  onEdit,
  onDelete,
  onActive,
  user
}: Props) {
  const { currency, locale, isPremiumPlan, isPremiumPlanEnded } = user

  if (!isLoading && !data.length) {
    return (
      <>
        <div className="flex flex-col items-center justify-center">
          <p className="mt-2 font-medium text-black sm:mt-10">
            You don{"'"}t have any subcriptions yet!
          </p>
          <Image
            className="mt-2"
            src="/static/illustrations/keynote-presentation.svg"
            width={300}
            height={300}
            alt="No records"
          />
        </div>
      </>
    )
  }

  const sortByDate = data.sort((a, b) => {
    return new Date(a.renewal_date) > new Date(b.renewal_date) ? 1 : -1
  })
  const sortedData = sortByDate.sort((a, b) => (a.active > b.active ? -1 : 1))
  return (
    <Table
      title="Subscriptions"
      thList={thList}
      isLoading={isLoading}
      isPremiumPlan={isPremiumPlan && !isPremiumPlanEnded}
    >
      {sortedData.map((datum) => {
        const renewalDateObj = new Date(datum.renewal_date)
        const isToday = isItToday(renewalDateObj, new Date(), locale)
        return (
          <tr
            key={datum.id}
            className={`border-b border-gray-200 last:border-0 hover:bg-gray-50 ${
              !datum.active ? 'bg-red-50' : ''
            } `}
          >
            <td className={tdClassNames}>
              <div className="flex items-center">
                <Image
                  className="absolute left-2 inline-block text-transparent"
                  src={`https://www.google.com/s2/favicons?domain=${datum.url}`}
                  width={14}
                  height={14}
                  alt={datum.name}
                />
                <a
                  target="_blank"
                  className="underline"
                  href={datum.url}
                  rel="noreferrer"
                >
                  {datum.name}
                </a>
              </div>
            </td>
            <td className={`${tdClassNames}`}>
              <p>{formatCurrency(datum.price, currency, locale)}</p>
              <p className="mt-[2px] text-xs text-zinc-500">
                {' '}
                per {datum.paid.replace(/ly/, '')}
              </p>
            </td>
            <td className={`${tdClassNames}`}>
              <p className={`${!datum.active ? 'line-through' : ''}`}>
                {isToday ? 'Today' : formatDate(renewalDateObj, locale)}
              </p>
              <p className="mt-[2px] text-xs text-zinc-500">
                prev:{' '}
                {isFuture(new Date(datum.prev_renewal_date))
                  ? 'None'
                  : formatDate(datum.prev_renewal_date, locale)}
              </p>
            </td>
            <td className={`${tdClassNames}`}>
              {formatDate(datum.date, locale)}
            </td>
            <td className={`${tdClassNames}  break-words`}>{datum.notes}</td>
            <td className={`${tdClassNames}`}>
              {datum.cancelled_at
                ? formatDate(new Date(datum.cancelled_at), locale)
                : '-'}
            </td>
            <td className={`${tdClassNames}`}>
              <span
                className={`inset-0 rounded-full px-2 py-1 text-xs font-medium ${
                  datum.active
                    ? 'bg-green-200 text-green-900'
                    : 'bg-red-200 text-red-900'
                }`}
              >
                {datum.active ? 'Active' : 'Cancelled'}
              </span>
            </td>
            <td className={`${tdClassNames}`}>
              <div className="flex w-20 items-center justify-between">
                <input
                  className="checked:border-blue-600 checked:bg-blue-600 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 focus:ring-offset-0"
                  type="checkbox"
                  defaultChecked={datum.active}
                  checked={datum.checked}
                  onChange={(event) => {
                    if (!event.target.checked) {
                      onActive({
                        ...datum,
                        active: event.target.checked,
                        cancelled_at: format(new Date(), dateFormatStr)
                      })
                    } else {
                      onActive({
                        ...datum,
                        active: event.target.checked,
                        cancelled_at: ''
                      })
                    }
                  }}
                  title={datum.active ? 'Cancel it?' : 'Make it Active?'}
                />
                <button onClick={() => onEdit(datum)} title="Edit">
                  <PencilIcon className="hover:text-x-500 h-4 w-4 cursor-pointer text-slate-700" />
                </button>
                <button onClick={() => onDelete(datum.id)} title="Delete">
                  <TrashIcon className="h-4 w-4 cursor-pointer text-slate-700 hover:text-slate-500" />
                </button>
              </div>
            </td>
          </tr>
        )
      })}
    </Table>
  )
}
