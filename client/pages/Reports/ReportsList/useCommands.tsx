import {
  ContextualMenuItemType,
  ICommandBarProps,
  IContextualMenuItem
} from '@fluentui/react'
import { useContext } from 'react'
import _ from 'underscore'
import { IReportsContext, ReportsContext } from '../context'
import { REMOVE_SAVED_FILTER, SET_FILTER } from '../reducer/actions'

/**
 * Save filter  command
 *
 * @param context Context
 */
const saveFilterCmd = (context: IReportsContext): IContextualMenuItem =>
  ({
    key: 'SAVED_FILTERS',
    text: context.state.activeFilter?.text || context.t('reports.savedFilters'),
    iconProps: context.state.activeFilter?.iconProps || {
      iconName: 'ChromeRestore'
    },
    disabled: _.isEmpty(context.state?.savedFilters),
    subMenuProps: {
      items: [
        {
          key: 'DIVIDER_0',
          itemType: ContextualMenuItemType.Divider
        },
        ...Object.keys(context.state.savedFilters).map<IContextualMenuItem>(
          (key) => {
            const filter = context.state.savedFilters[key]
            return {
              key,
              ..._.omit(filter, 'values'),
              iconProps: {
                ...filter.iconProps,
                styles: { root: { color: '#444' } }
              },
              subMenuProps: {
                items: [
                  {
                    key: 'USE_FILTER',
                    text: context.t('reports.applyFilterText'),
                    canCheck: true,
                    checked: filter.text === context.state.activeFilter?.text,
                    iconProps: {
                      iconName: 'Play',
                      styles: { root: { color: 'green' } }
                    },
                    onClick: () => context.dispatch(SET_FILTER(filter))
                  },
                  {
                    key: 'REMOVE_FILTER',
                    text: context.t('reports.deleteFilterText'),
                    iconProps: {
                      iconName: 'RemoveFilter',
                      styles: { root: { color: 'red' } }
                    },
                    onClick: () => context.dispatch(REMOVE_SAVED_FILTER(key))
                  }
                ]
              }
            }
          }
        )
      ].filter(Boolean)
    }
  } as IContextualMenuItem)

export function useCommands(): ICommandBarProps {
  const context = useContext(ReportsContext)
  const farItems = [saveFilterCmd(context)]
  return { items: [], farItems } as ICommandBarProps
}
