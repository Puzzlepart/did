import { useEffect, useState } from 'react'
import { IFilter } from './Filters'
import { IFilterPanelProps } from './types'

/**
 * Hook for `<FilterPanel />` filters. Initializes `filters` with
 * `props.items` every time `props.items` or `props.filters` are updated.
 *
 * @param props - Props
 *
 * @category FilterPanel
 */
export function useFilterPanelFilters(props: IFilterPanelProps) {
  const [filters, setFilters] = useState<IFilter[]>(
    props.filters.map((f) => f.initialize(props.items))
  )

  useEffect(
    () => setFilters(props.filters.map((f) => f.initialize(props.items))),
    [props.items, props.filters]
  )
  return [filters, setFilters] as const
}
