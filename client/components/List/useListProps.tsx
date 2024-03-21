import {
  CheckboxVisibility,
  ConstrainMode,
  DetailsListLayoutMode,
  IGroup,
  IObjectWithKey,
  Selection,
  SelectionMode
} from '@fluentui/react'
import React from 'react'
import _ from 'underscore'
import { IListContext } from './context'
import { ItemColumn } from './ItemColumn'
import { ListGroupHeader } from './ListGroupHeader'
import { ListHeader } from './ListHeader/ListHeader'
import { INIT_COLUMN_HEADER_CONTEXT_MENU } from './reducer'
import { IListColumn, IListProps } from './types'

type UseListProps<T = any> = {
  context: IListContext
  selection: Selection<IObjectWithKey>
  groups: IGroup[]
  items: T[]
}

/**
 * List props hook
 *
 * @category List
 */
export function useListProps({
  context,
  selection,
  groups,
  items
}: UseListProps): IListProps {
  const columns = _.filter(context.props.columns, (col) => {
    const groupBy = context.props.listGroupProps?.fieldName
    if (col.data?.hidden) return false
    if (groupBy && col.fieldName === groupBy) return false
    return true
  })
  const [selectionMode = SelectionMode.none] = context.props.selectionProps
  let checkboxVisibility =
    selectionMode === SelectionMode.none
      ? CheckboxVisibility.hidden
      : CheckboxVisibility.onHover
  if (context.props.checkboxVisibility) {
    checkboxVisibility = context.props.checkboxVisibility
  }
  return {
    getKey: context.props.getKey,
    setKey: 'list',
    enableShimmer: context.props.enableShimmer,
    isPlaceholderData: context.props.enableShimmer,
    selection: selectionMode === SelectionMode.none ? undefined : selection,
    columns,
    items,
    groups,
    selectionMode: selectionMode,
    checkboxVisibility,
    constrainMode: ConstrainMode.horizontalConstrained,
    layoutMode: DetailsListLayoutMode.justified,
    groupProps: {
      ...context.props.listGroupRenderProps,
      onRenderHeader: (props) => {
        return <ListGroupHeader {...props} />
      }
    },
    onRenderDetailsHeader: (headerProps, defaultRender) => (
      <ListHeader headerProps={headerProps} defaultRender={defaultRender} />
    ),
    onRenderItemColumn: (item, index, column) => (
      <ItemColumn item={item} index={index} column={column} />
    ),
    onColumnHeaderContextMenu: (
      column: IListColumn,
      event?: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
      context.dispatch(
        INIT_COLUMN_HEADER_CONTEXT_MENU({
          column,
          target: event.currentTarget
        })
      )
    }
  } as IListProps
}
