import { BaseFilter, IFilterPanelProps } from 'components/FilterPanel'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useListContext } from '../context'
import { FILTERS_UPDATED, TOGGLE_FILTER_PANEL } from '../reducer'

/**
 * Returns the props for a filter panel to be used in a list component.
 *
 * @returns The props for the filter panel.
 */
export function useListFilterPanel(): IFilterPanelProps {
  const { t } = useTranslation()
  const context = useListContext()
  const columns = context.props.columns
  const filters = useMemo<BaseFilter[]>(
    () =>
      columns
        .filter((col) => col?.data?.isFilterable)
        .map<BaseFilter>((col) => new col.data.filterType().fromColumn(col)),
    [columns]
  )
  const filterItems =
    context.props.filterPanelItems ??
    context.state.itemsPreFilter ??
    context.state.origItems ??
    []
  const filterPanelState = context.state.filterPanel
  const filterPanelProps = context.props.filterPanel
  const selectedFilter = context.state.filterBy
  const onFilterPanelToggle = context.props.onFilterPanelToggle
  const dispatch = context.dispatch

  return useMemo<IFilterPanelProps>(
    () =>
      ({
        ...filterPanelState,
        ...filterPanelProps,
        title: t('reports.filterPanelHeaderText'),
        filters,
        items: filterItems,
        onFiltersUpdated: (filters) => dispatch(FILTERS_UPDATED({ filters })),
        onDismiss: () => {
          dispatch(TOGGLE_FILTER_PANEL())
          onFilterPanelToggle?.(false)
        },
        selectedFilter
      }) as IFilterPanelProps,
    [
      filterPanelState,
      filterPanelProps,
      t,
      filters,
      filterItems,
      dispatch,
      onFilterPanelToggle,
      selectedFilter
    ]
  )
}
