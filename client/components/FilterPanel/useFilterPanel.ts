import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
  const filters = useMemo<IFilter[]>(
    () => props.filters.map((f) => f.initialize(props.items)),
    [props.filters, props.items]
  )

  // Use ref to store the latest callback to avoid effect re-runs
  const onFiltersUpdatedRef = useRef(props.onFiltersUpdated)
  const lastUpdateSignature = useRef<string>('')
  useEffect(() => {
    onFiltersUpdatedRef.current = props.onFiltersUpdated
  }, [props.onFiltersUpdated])

  /**
   * On filter updated
   *
   * @param filter - Filter to update
   * @param selected - Selected keys
   */
  const onFilterUpdated = useCallback((filter: IFilter, selected: Set<string>) => {
    setSelected((previousSelected) => {
      const newSelected = new Map(previousSelected)
      newSelected.set(filter.key, selected)
      return newSelected
    })
  }, [])

  useEffect(() => {
    const updatedFilters = filters
      .map((f) => ({
        ...f,
        selected: selected.get(f.key) ?? new Set<string>()
      }))
      .filter(({ selected }) => selected.size > 0)

    // Use signature-based comparison to prevent calling onFiltersUpdated
    // when filters/selected Maps are recreated but values are unchanged.
    // This prevents potential infinite loops when parent components reload
    // items in response to filter changes.
    const signature = updatedFilters
      .map((filter) => {
        const values = Array.from(filter.selected).sort().join('|')
        return `${filter.key}:${values}`
      })
      .sort()
      .join(';')
    if (signature !== lastUpdateSignature.current) {
      lastUpdateSignature.current = signature
      onFiltersUpdatedRef.current(updatedFilters)
    }
  }, [selected, filters])

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
    [props, onFilterUpdated, selected]
  )

  return {
    filtersToRender,
  title,
    contextValue
  }
}
