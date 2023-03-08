import TableHeaderActions from './TableHeaderActions'
import { PropsWithChildren } from 'react'

type Props = {
  title?: string
  filterKey: string
  isPremiumPlan: boolean
  onFilterChange: () => void
}

export default function NoDataTable({
  title,
  filterKey,
  children,
  isPremiumPlan,
  onFilterChange
}: PropsWithChildren<Props>) {
  return (
    <>
      <TableHeaderActions
        title={title}
        isPremiumPlan={isPremiumPlan}
        isLoading={false}
        showFilter={true}
        onFilterChange={onFilterChange}
        filterKey={filterKey}
      />

      {children}
    </>
  )
}
