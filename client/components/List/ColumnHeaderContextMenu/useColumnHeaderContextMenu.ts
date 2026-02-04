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

type ColumnHeaderMenuItem = {
  key: string
  text?: string
  type?: 'item' | 'divider'
  checkable?: boolean
  checked?: boolean
  disabled?: boolean
  onClick?: () => void
}

type ColumnHeaderContextMenuProps = {
  target: EventTarget & HTMLElement
  items: ColumnHeaderMenuItem[]
  checkedValues: Record<string, string[]>
  hasCheckmarks: boolean
  onDismiss: () => void
}

const CHECKBOX_NAME = 'columnHeader'

export function useColumnHeaderContextMenu(): ColumnHeaderContextMenuProps | null {
  const { t } = useTranslation()
  const context = useListContext()
  if (!context.state.columnHeaderContextMenu) return null
  const { column, target } = context.state.columnHeaderContextMenu
  const columnData: IListColumnData = column.data ?? {}
  const items = [
    columnData.isSortable && {
      key: 'SORT_DESC',
      text: t('common.sortDesc'),
      onClick: () => {
        context.dispatch(SET_SORT({ column, direction: 'desc' }))
      },
      checkable: true,
      checked: _.isEqual(context.state.sortOpts, [column.fieldName, 'desc'])
    },
    columnData.isSortable &&
      ({
        key: 'SORT_ASC',
        text: t('common.sortAsc'),
        onClick: () => {
          context.dispatch(SET_SORT({ column, direction: 'asc' }))
        },
        checkable: true,
        checked: _.isEqual(context.state.sortOpts, [column.fieldName, 'asc'])
      } as ColumnHeaderMenuItem),
    columnData.isFilterable &&
      context.props.filters && {
        key: 'DIVIDER_0',
        type: 'divider'
      },
    columnData.isFilterable &&
      context.props.filters && {
        key: 'FILTER_BY',
        text: t('common.filterByColumn', column),
        checkable: true,
        checked: context.state.filterBy?.fieldName === column.fieldName,
        disabled: Boolean(context.props.filterPanelLoading),
        onClick: () => {
          context.dispatch(SET_FILTER_BY({ column }))
          context.props.onFilterPanelToggle?.(true)
        }
      },
    columnData.isGroupable && {
      key: 'DIVIDER_1',
      type: 'divider'
    },
    columnData.isGroupable &&
      ({
        key: 'GROUP_BY',
        text: t('common.groupByColumn', column),
        checkable: true,
        checked: context.state.groupBy?.fieldName === column.fieldName,
        onClick: () => {
          context.dispatch(SET_GROUP_BY({ column }))
        }
      } as ColumnHeaderMenuItem)
  ].filter(Boolean) as ColumnHeaderMenuItem[]

  const checkedValues = {
    [CHECKBOX_NAME]: items
      .filter((item) => item.checked)
      .map((item) => item.key)
  }
  const hasCheckmarks = items.some((item) => item.checkable)

  return {
    target,
    items,
    checkedValues,
    hasCheckmarks,
    onDismiss: () => context.dispatch(DISMISS_COLUMN_HEADER_CONTEXT_MENU())
  }
}
