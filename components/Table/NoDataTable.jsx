import TableHeaderActions from './TableHeaderActions'

export default function NoDataTable({
  title,
  filterKey,
  children,
  isPremiumPlan,
  onFilterChange
}) {
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
