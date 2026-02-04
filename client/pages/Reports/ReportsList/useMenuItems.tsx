import { ListMenuItem } from 'components/List'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ReportsContext } from '../context'
import { REMOVE_SAVED_FILTER, SET_FILTER } from '../reducer/actions'
import { IReportsListProps } from './types'
import { useReportsExcelExportCommand } from '../hooks/useReportsExcelExportCommand'

/**
 * Returns an array of `ListMenuItem` objects to be used in the ReportsList component's menu.
 * The array contains menu items for Excel export and saved filters.
 *
 * @param props - The props for the `<ReportsList />` component.
 *
 * @returns An array of `ListMenuItem` objects.
 */
export function useMenuItems(props: IReportsListProps): ListMenuItem[] {
  const { t } = useTranslation()
  const context = useContext(ReportsContext)
  const { savedFilters, activeFilter, loading } = context.state
  const { commandBarItem: excelExportCommand } =
    useReportsExcelExportCommand(props)

  const menuItems: ListMenuItem[] = []

  // Add Excel export command if available
  if (excelExportCommand) {
    const excelMenuItem = new ListMenuItem(excelExportCommand.text)
      .withIcon('ExcelLogoInverse')
      .setOnClick(excelExportCommand.onClick)
      .setDisabled(excelExportCommand.disabled)
    menuItems.push(excelMenuItem)
  }

  // Add saved filters menu
  const savedFiltersMenuItem = new ListMenuItem(
    activeFilter?.text ?? t('reports.savedFilters')
  )
    .withIcon('ContentView')
    .setDisabled(loading)
    .setHidden(Object.keys(savedFilters).length === 0 || !props.filters)
    .setItems(
      Object.keys(savedFilters).map((key) => {
        const filter = savedFilters[key]
        return new ListMenuItem(filter.text).setItems([
          new ListMenuItem(t('reports.applyFilterText'))
            .withIcon('Play')
            .setOnClick(() => context.dispatch(SET_FILTER(filter))),
          new ListMenuItem(t('reports.deleteFilterText'))
            .withIcon('Delete')
            .setOnClick(() => context.dispatch(REMOVE_SAVED_FILTER(key)))
        ])
      }),
      {}
    )

  menuItems.push(savedFiltersMenuItem)

  return menuItems
}
