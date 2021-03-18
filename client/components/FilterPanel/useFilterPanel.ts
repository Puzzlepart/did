/* eslint-disable tsdoc/syntax */
import { useEffect, useState } from 'react'
import { IFilter, IFilterItem } from './Filters'

/**
 * Component logic hook for FilterPanel
 *
 * @category FilterPanel
 */
export function useFilterPanel({ props }) {
  const [filters, setFilters] = useState<IFilter[]>(
    props.filters.map((f) => f.initialize(props.items))
  )
  useEffect(
    () => setFilters(props.filters.map((f) => f.initialize(props.items))),
    [props.items, props.filters]
  )

  /**
   * On filter updated
   *
   * @param filter - Filter
   * @param item - Item
   * @param checked - Checked
   */
  const onFilterUpdated = (
    filter: IFilter,
    item: IFilterItem,
    checked: boolean
  ) => {
    if (checked) filter.selected.push(item)
    else filter.selected = filter.selected.filter((f) => f.key !== item.key)
    const updatedFilters = filters.map((f) => {
      if (f.key === filter.key) {
        return filter
      }
      return f
    })
    setFilters(updatedFilters)
    props.onFiltersUpdated(
      updatedFilters.filter((filter) => filter.selected.length > 0)
    )
  }

  return {
    filters,
    onFilterUpdated
  }
}
