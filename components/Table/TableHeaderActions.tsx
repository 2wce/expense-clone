import ExportButton, { ExportButtonDummy } from './ExportButton'
import TableFilter from './TableFilter'
import { dateFormatStr } from 'constants/index'
import { format } from 'date-fns'

type Props = {
  isPremiumPlan: boolean
  filterKey?: string
  title: string
  isLoading: boolean
  showFilter: boolean
  onFilterChange?: () => void
}

export default function TableHeaderActions({
  isPremiumPlan,
  filterKey,
  title,
  isLoading,
  showFilter,
  onFilterChange
}: Props) {
  return (
    <div className="mb-12 flex h-[34px] w-full flex-col xs:mb-4 xs:flex-row xs:items-center xs:justify-between">
      <h3 className="text-black">Data</h3>
      <div className="mt-2 flex justify-end xs:mt-0">
        {showFilter && !isLoading ? (
          <TableFilter filterKey={filterKey} onFilterChange={onFilterChange} />
        ) : null}
        {isPremiumPlan && !isLoading ? (
          <ExportButton
            filename={`${title}-${format(new Date(), dateFormatStr)}.csv`}
          />
        ) : !isLoading ? (
          <ExportButtonDummy />
        ) : null}
      </div>
    </div>
  )
}
