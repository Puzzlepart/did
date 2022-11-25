import {
  ContextualMenuItemType,
  ICommandBarProps,
  IContextualMenuItem
} from '@fluentui/react'
import { useContext } from 'react'
import _ from 'underscore'
import { IReportsContext, ReportsContext } from '../context'
import { REMOVE_SAVED_FILTER } from '../reducer/actions'

/**
 * Save filter  command
 *
 * @param context Context
 */
const saveFilterCmd = (context: IReportsContext): IContextualMenuItem =>
({
  key: 'SAVED_FILTERS',
  text: context.state.activeFilter?.text || context.t('reports.savedFilters'),
  iconProps: context.state.activeFilter?.iconProps || { iconName: 'ChromeRestore' },
  disabled: _.isEmpty(context.state?.savedFilters),
  subMenuProps: {
    items: [
      {
        key: 'DIVIDER_0',
        itemType: ContextualMenuItemType.Divider
      },
      ...Object.keys(context.state.savedFilters).map<IContextualMenuItem>((key) => {
        const filter = _.omit(context.state.savedFilters[key], 'values')
        return {
          key,
          ...filter,
          canCheck: true,
          checked: filter.text === context.state.activeFilter?.text,
          subMenuProps: {
            items: [
              {
                key: 'USE_FILTER',
                text: context.t('reports.applyFilterText'),
                iconProps: { iconName: 'Play' },
                onClick: () => context.dispatch(REMOVE_SAVED_FILTER())
              },
              {
                key: 'REMOVE_FILTE#R',
                text: context.t('reports.deleteFilterText'),
                iconProps: { iconName: 'RemoveFilter' },
                onClick: () => context.dispatch(REMOVE_SAVED_FILTER({ key }))
              }
            ]
          }
        }
      })
    ].filter((index) => index)
  }
} as IContextualMenuItem)

export function useCommands(): ICommandBarProps {
  const context = useContext(ReportsContext)
  const farItems = [saveFilterCmd(context)]
  return { items: [], farItems } as ICommandBarProps
}
