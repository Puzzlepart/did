import { IFilterPanelProps } from 'components/FilterPanel'
import { useTranslation } from 'react-i18next'
import { useListContext } from '../context'

export function useListFilterPanel() {
  const { t } = useTranslation()
  const context = useListContext()
  const filterPanelProps: IFilterPanelProps = {
    isOpen: true,
    headerText: t('reports.filterPanelHeaderText'),
    filters: context.props.columns
      .filter((col) => col?.data?.isFilterable)
      .map((col) => new col.data.filterType().fromColumn(col)),
    items: context.state.items,
    onFiltersUpdated: (filters) => {
      // eslint-disable-next-line no-console
      console.log(filters)
    }
  }
  return { filterPanelProps } as const
}
