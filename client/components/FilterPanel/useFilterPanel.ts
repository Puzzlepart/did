import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IFilter } from './Filters'
import { IFilterPanelProps } from './types'
import { IFilterPanelContext } from './context'

/**
 * Component logic hook for `<FilterPanel />`
 *
 * @param props - Props
 *
 * @category FilterPanel
 */
export function useFilterPanel(props: IFilterPanelProps) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<Map<string, Set<string>>>(new Map())
  const [filters, setFilters] = useState<IFilter[]>(
    props.filters.map((f) => f.initialize(props.items))
  )

  useEffect(() => {
    setFilters(props.filters.map((f) => f.initialize(props.items)))
  }, [props.items, props.filters])

  /**
   * On filter updated
   *
   * @param filter - Filter to update
   * @param selected - Selected keys
   */
  const onFilterUpdated = (filter: IFilter, selected: Set<string>) => {
    setSelected((previousSelected) => {
      const newSelected = new Map(previousSelected)
      newSelected.set(filter.key, selected)
      return newSelected
    })
  }

  useEffect(() => {
    const updatedFilters = filters
      .map((f) => ({
        ...f,
        selected: selected.get(f.key) ?? new Set<string>()
      }))
      .filter(({ selected }) => selected.size > 0)
    props.onFiltersUpdated(updatedFilters)
  }, [selected])

  const title = props.selectedFilter
    ? t('common.filterByColumn', props.selectedFilter)
    : props.title

  const filtersToRender = filters.filter((filter) =>
    props.selectedFilter ? props.selectedFilter?.key === filter.key : true
  )

  const contextValue = useMemo<IFilterPanelContext>(
    () => ({
      props,
      onFilterUpdated,
      selected,
      setSelected
    }),
    [selected]
  )

  return {
    filtersToRender,
    title,
    contextValue
  }
}
