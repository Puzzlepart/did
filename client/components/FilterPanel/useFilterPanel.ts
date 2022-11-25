import { useTranslation } from 'react-i18next'
import { IFilter, IFilterItem } from './Filters'
import { IFilterPanelProps } from './types'
import { useFilterPanelFilters } from './useFilterPanelFilters'

/**
 * Component logic hook for `<FilterPanel />`
 *
 * @param props - Props
 *
 * @category FilterPanel
 */
export function useFilterPanel(props: IFilterPanelProps) {
  const { t } = useTranslation()
  const { filters, setFilters } = useFilterPanelFilters(props)

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

  const headerText = props.selectedFilter
    ? t('common.filterByColumn', props.selectedFilter)
    : props.headerText

  return {
    filters,
    onFilterUpdated,
    headerText
  } as const
}
