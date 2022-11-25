import { BaseFilter, IFilterPanelProps } from 'components/FilterPanel'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useListContext } from '../context'
import { FILTERS_UPDATED } from '../reducer'

export function useListFilterPanel() {
  const { t } = useTranslation()
  const context = useListContext()
  const filters = useMemo<BaseFilter[]>(
    () =>
      context.props.columns
        .filter((col) => col?.data?.isFilterable)
        .map<BaseFilter>((col) => new col.data.filterType().fromColumn(col)),
    [context.props.columns]
  )
  const filterPanelProps: IFilterPanelProps = {
    isOpen: context.state.isFilterPanelOpen,
    headerText: t('reports.filterPanelHeaderText'),
    filters,
    items: context.state.origItems,
    onFiltersUpdated: (filters) =>
      context.dispatch(FILTERS_UPDATED({ filters }))
  }
  return { filterPanelProps } as const
}
