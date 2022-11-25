import {
  ContextualMenuItemType,
  IContextualMenuItem,
  IContextualMenuProps
} from '@fluentui/react'
import { useTranslation } from 'react-i18next'
import { useListContext } from '../context'
import { DISMISS_COLUMN_HEADER_CONTEXT_MENU, SET_GROUP_BY } from '../reducer'
import { IListColumnData } from '../types'

export function useColumnHeaderContextMenu(): IContextualMenuProps {
  const { t } = useTranslation()
  const context = useListContext()
  if (!context.state.columnHeaderContextMenu) return null
  const { column, target } = context.state.columnHeaderContextMenu
  const columnData: IListColumnData = column.data ?? {}
  const items: IContextualMenuItem[] = [
    columnData.isSortable && {
      key: 'sortDesc',
      text: t('common.sortDesc')
    },
    columnData.isSortable && {
      key: 'sortAsc',
      text: t('common.sortAsc')
    },
    columnData.isFilterable && {
      key: 'separator',
      itemType: ContextualMenuItemType.Divider
    },
    columnData.isFilterable && {
      key: 'filterBy',
      text: t('common.filterByColumn', column)
    },
    columnData.isGroupable && {
      key: 'separator',
      itemType: ContextualMenuItemType.Divider
    },
    columnData.isGroupable &&
      ({
        key: 'groupBy',
        text: t('common.groupByColumn', column),
        canCheck: true,
        checked: context.state.groupBy?.fieldName === column.fieldName,
        onClick: () => {
          context.dispatch(SET_GROUP_BY({ groupBy: column }))
        }
      } as IContextualMenuItem)
  ].filter(Boolean)

  return {
    target,
    items,
    onDismiss: () => context.dispatch(DISMISS_COLUMN_HEADER_CONTEXT_MENU())
  } as IContextualMenuProps
}
