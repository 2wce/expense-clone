import TableHeaderActions from './TableHeaderActions'
import LoaderTable, { LoaderTableHeader } from 'components/Loader/LoaderTable'
import { PropsWithChildren } from 'react'

const thClassNames =
  'pl-8 pt-4 pb-4 text-zinc-600 bg-gray-100 h-[44px] tracking-wide leading-tight border-b border-gray-200 text-left text-xs font-bold uppercase'

type Props = {
  title: string
  isLoading: boolean
  thList: string[]
  filterKey?: string
  onFilterChange?: () => void
  isPremiumPlan: boolean
  showFilter?: boolean
}

export default function Table({
  title,
  isLoading = false,
  thList = [],
  children,
  ...otherProps
}: PropsWithChildren<Props>) {
  const {
    filterKey,
    onFilterChange,
    isPremiumPlan,
    showFilter = false
  } = otherProps

  return (
    <>
      <TableHeaderActions
        isPremiumPlan={isPremiumPlan}
        isLoading={isLoading}
        showFilter={showFilter}
        onFilterChange={onFilterChange}
        filterKey={filterKey}
        title={title}
      />
      <div className="block w-full overflow-x-auto rounded-lg border">
        <table className="relative w-full table-auto border-collapse overflow-hidden rounded-lg bg-slate-50 shadow-md shadow-gray-200">
          <thead className="p-10">
            <tr>
              {!isLoading ? (
                thList.map((thItem) => (
                  <th key={thItem} className={thClassNames}>
                    {thItem}
                  </th>
                ))
              ) : (
                <LoaderTableHeader
                  thList={thList}
                  thClassNames={thClassNames}
                />
              )}
            </tr>
          </thead>
          <tbody className="rounded-lg bg-white">
            {isLoading ? <LoaderTable td={thList.length} /> : children}
          </tbody>
        </table>
      </div>
    </>
  )
}
