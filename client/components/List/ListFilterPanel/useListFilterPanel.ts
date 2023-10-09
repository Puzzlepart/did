import { BaseFilter, IFilterPanelProps } from 'components/FilterPanel'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useListContext } from '../context'
import { CLEAR_FILTERS, FILTERS_UPDATED, TOGGLE_FILTER_PANEL } from '../reducer'

/**
 * Returns the props for a filter panel to be used in a list component.
 *
 * @returns The props for the filter panel.
 */
export function useListFilterPanel(): IFilterPanelProps {
  const { t } = useTranslation()
  const context = useListContext()
  const filters = useMemo<BaseFilter[]>(
    () =>
      context.props.columns
        .filter((col) => col?.data?.isFilterable)
        .map<BaseFilter>((col) => new col.data.filterType().fromColumn(col)),
    [context.props.columns]
  )
  return useMemo<IFilterPanelProps>(
    () =>
      ({
        ...context.state.filterPanel,
        ...context.props.filterPanel,
        title: t('reports.filterPanelHeaderText'),
        filters,
        items: context.state.origItems,
        onFiltersUpdated: (filters) =>
          context.dispatch(FILTERS_UPDATED({ filters })),
        onClearFilters: () => context.dispatch(CLEAR_FILTERS()),
        onDismiss: () => context.dispatch(TOGGLE_FILTER_PANEL()),
        selectedFilter: context.state.filterBy
      }) as IFilterPanelProps,
    [context]
  )
}
