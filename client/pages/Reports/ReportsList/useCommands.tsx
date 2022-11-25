import {
  ContextualMenuItemType,
  ICommandBarProps,
  IContextualMenuItem
} from '@fluentui/react'
import React, { useContext } from 'react'
import _ from 'underscore'
import { IReportsContext, ReportsContext } from '../context'
import { REMOVE_SELECTED_SAVED_FILTER, SET_FILTER } from '../reducer/actions'
import { SaveFilterForm } from '../SaveFilterForm'

/**
 * Save filter  command
 *
 * @param context Context
 */
const saveFilterCmd = (context: IReportsContext): IContextualMenuItem =>
  ({
    key: 'SAVED_FILTERS',
    text: context.state.filter?.text || context.t('reports.savedFilters'),
    iconProps: context.state.filter?.iconProps || { iconName: 'ChromeRestore' },
    subMenuProps: {
      items: [
        {
          key: 'SAVE_FILTER',
          onRender: () => (
            <SaveFilterForm style={{ padding: '12px 12px 6px 32px' }} />
          )
        },
        {
          key: 'DIVIDER_O',
          itemType: ContextualMenuItemType.Divider
        },
        context.state.filter?.text && {
          key: 'REMOVE_SELECTED_SAVED_FILTER',
          text: context.t('reports.deleteFilterText'),
          iconProps: { iconName: 'RemoveFilter' },
          onClick: () => context.dispatch(REMOVE_SELECTED_SAVED_FILTER())
        },
        {
          key: 'DIVIDER_1',
          itemType: ContextualMenuItemType.Divider
        },
        ...Object.keys(context.state.savedFilters).map((key) => {
          const filter = context.state.savedFilters[key]
          return {
            ...(_.omit(filter, 'values') as IContextualMenuItem),
            canCheck: true,
            checked: filter.text === context.state.filter?.text,
            onClick: () => context.dispatch(SET_FILTER({ filter }))
          }
        })
      ].filter((index) => index)
    }
  } as IContextualMenuItem)

export function useCommands(): ICommandBarProps {
  const context = useContext(ReportsContext)
  const farItems = []
  if (!!context.state.preset && !context.state.loading) {
    farItems.push(
      ...[
        !_.isEmpty(context.state.savedFilters) && saveFilterCmd(context)
      ].filter(Boolean)
    )
  }
  return {
    items: [],
    farItems
  } as ICommandBarProps
}
