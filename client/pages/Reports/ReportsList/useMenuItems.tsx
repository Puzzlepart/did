import {
  ContentView24Regular,
  Delete24Regular,
  Play24Regular
} from '@fluentui/react-icons'
import { ListMenuItem } from 'components/List/ListToolbar'
import { useContext } from 'react'
import { ReportsContext } from '../context'
import { REMOVE_SAVED_FILTER, SET_FILTER } from '../reducer/actions'
import { useTranslation } from 'react-i18next'

/**
 * Returns an array of `ListMenuItem` objects to be used in the ReportsList component's menu.
 * The array contains a single `ListMenuItem` object representing the active filter or the default saved filters text.
 *
 * @returns An array of `ListMenuItem` objects.
 */
export function useMenuItems(): ListMenuItem[] {
  const { t } = useTranslation()
  const context = useContext(ReportsContext)
  const { savedFilters, activeFilter } = context.state
  return [
    new ListMenuItem(activeFilter?.text ?? t('reports.savedFilters'))
      .withIcon(ContentView24Regular)
      .setItems(
        Object.keys(savedFilters).map((key) => {
          const filter = savedFilters[key]
          return new ListMenuItem(filter.text)
            .withIcon(filter.iconProps?.iconName)
            .setItems([
              new ListMenuItem(t('reports.applyFilterText'))
                .withIcon(Play24Regular)
                .setOnClick(() => context.dispatch(SET_FILTER(filter))),
              new ListMenuItem(t('reports.deleteFilterText'))
                .withIcon(Delete24Regular)
                .setOnClick(() => context.dispatch(REMOVE_SAVED_FILTER(key)))
            ])
        }),
        {}
      )
  ]
}
