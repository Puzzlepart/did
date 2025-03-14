import {
  ContextualMenuItemType,
  IContextualMenuItem,
  IContextualMenuProps
} from '@fluentui/react'
import { useTranslation } from 'react-i18next'
import { useListContext } from '../context'
import {
  DISMISS_COLUMN_HEADER_CONTEXT_MENU,
  SET_FILTER_BY,
  SET_GROUP_BY,
  SET_SORT
} from '../reducer'
import { IListColumnData } from '../types'
import _ from 'underscore'

export function useColumnHeaderContextMenu(): IContextualMenuProps {
  const { t } = useTranslation()
  const context = useListContext()
  if (!context.state.columnHeaderContextMenu) return null
  const { column, target } = context.state.columnHeaderContextMenu
  const columnData: IListColumnData = column.data ?? {}
  const items: IContextualMenuItem[] = [
    columnData.isSortable && {
      key: 'SORT_DESC',
      text: t('common.sortDesc'),
      onClick: () => {
        context.dispatch(SET_SORT({ column, direction: 'desc' }))
      },
      checked: _.isEqual(context.state.sortOpts, [column.fieldName, 'desc'])
    },
    columnData.isSortable &&
      ({
        key: 'SORT_ASC',
        text: t('common.sortAsc'),
        onClick: () => {
          context.dispatch(SET_SORT({ column, direction: 'asc' }))
        },
        canCheck: true,
        checked: _.isEqual(context.state.sortOpts, [column.fieldName, 'asc'])
      } as IContextualMenuItem),
    columnData.isFilterable &&
      context.props.filters && {
        key: 'DIVIDER_0',
        itemType: ContextualMenuItemType.Divider
      },
    columnData.isFilterable &&
      context.props.filters && {
        key: 'FILTER_BY',
        text: t('common.filterByColumn', column),
        canCheck: true,
        checked: context.state.filterBy?.fieldName === column.fieldName,
        onClick: () => {
          context.dispatch(SET_FILTER_BY({ column }))
        }
      },
    columnData.isGroupable && {
      key: 'DIVIDER_1',
      itemType: ContextualMenuItemType.Divider
    },
    columnData.isGroupable &&
      ({
        key: 'GROUP_BY',
        text: t('common.groupByColumn', column),
        canCheck: true,
        checked: context.state.groupBy?.fieldName === column.fieldName,
        onClick: () => {
          context.dispatch(SET_GROUP_BY({ column }))
        }
      } as IContextualMenuItem)
  ].filter(Boolean)

  return {
    target,
    items,
    onDismiss: () => context.dispatch(DISMISS_COLUMN_HEADER_CONTEXT_MENU())
  } as IContextualMenuProps
}
