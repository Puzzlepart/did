import { ListMenuItem } from 'components/List'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { ReportsContext } from '../context'
import { REMOVE_SAVED_FILTER, SET_FILTER } from '../reducer/actions'

/**
 * Returns an array of `ListMenuItem` objects to be used in the ReportsList component's menu.
 * The array contains a single `ListMenuItem` object representing the active filter or the default saved filters text.
 *
 * @returns An array of `ListMenuItem` objects.
 */
export function useMenuItems(): ListMenuItem[] {
  const { t } = useTranslation()
  const context = useContext(ReportsContext)
  const { savedFilters, activeFilter, loading } = context.state
  return [
    new ListMenuItem(activeFilter?.text ?? t('reports.savedFilters'))
      .withIcon('ContentView')
      .setDisabled(loading)
      .setHidden(Object.keys(savedFilters).length === 0)
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
  ]
}
