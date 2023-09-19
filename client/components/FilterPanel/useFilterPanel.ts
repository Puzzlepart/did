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
  const [filters, setFilters] = useFilterPanelFilters(props)

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
    let selected = [...filter.selected]
    if (checked) selected.push(item)
    else selected = selected.filter((f) => f.key !== item.key)
    const updatedFilters = filters.map((f) => {
      return f.key === filter.key ? { ...filter, selected } : f
    })
    setFilters(updatedFilters)
    props.onFiltersUpdated(
      updatedFilters.filter((filter) => filter.selected.length > 0)
    )
  }

  const headerText = props.selectedFilter
    ? t('common.filterByColumn', props.selectedFilter)
    : props.headerText

  const filtersToRender = filters
    .filter((filter) =>
      props.selectedFilter ? props.selectedFilter?.key === filter.key : true
    )
    .filter((filter) => filter.items.length > 1)

  let onClearFilters = null

  if (props.onClearFilters) {
    onClearFilters = () => {
      setFilters((filters) => filters.map((f) => ({ ...f, selected: [] })))
      props.onClearFilters()
    }
  }

  return {
    filtersToRender,
    onFilterUpdated,
    headerText,
    onClearFilters
  }
}
