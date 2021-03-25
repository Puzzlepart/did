/* eslint-disable tsdoc/syntax */
import { getValue } from 'helpers'
import {
  CheckboxVisibility,
  ConstrainMode,
  DetailsListLayoutMode,
  IColumn,
  IGroup,
  IObjectWithKey,
  Selection,
  SelectionMode
} from '@fluentui/react-react'
import React from 'react'
import { AnyAction } from 'redux'
import { filter } from 'underscore'
import { ListGroupHeader } from './ListGroupHeader'
import { onRenderListHeader } from './ListHeader/onRenderListHeader'
import { IListProps, IListState } from './types'

type UseListProps<T = any> = {
  props: IListProps
  state: IListState
  dispatch: React.Dispatch<AnyAction>
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
  props,
  state,
  dispatch,
  selection,
  groups,
  items
}: UseListProps): IListProps {
  const columns = filter(props.columns, (col) => {
    const groupBy = props.listGroupProps?.fieldName
    if (col.data?.hidden) return false
    if (groupBy && col.fieldName === groupBy) return false
    return true
  })
  return {
    getKey: (_item, index) => `list_item_${index}`,
    setKey: 'list',
    enableShimmer: props.enableShimmer,
    isPlaceholderData: props.enableShimmer,
    selection,
    columns,
    items,
    groups,
    selectionMode: props.selectionProps
      ? props.selectionProps.mode
      : SelectionMode.none,
    constrainMode: ConstrainMode.horizontalConstrained,
    layoutMode: DetailsListLayoutMode.justified,
    groupProps: {
      ...props.listGroupRenderProps,
      onRenderHeader: ListGroupHeader,
      
    },
    onRenderItemColumn: (item: any, index: number, column: IColumn) => {
      if (!!column.onRender) return column.onRender(item, index, column)
      return getValue(item, column.fieldName)
    },
    onRenderDetailsHeader: (headerProps, defaultRender) =>
      onRenderListHeader({
        headerProps: {
          ...headerProps,
          className: props.headerClassName
        },
        defaultRender,
        props,
        state,
        dispatch
      }),
    checkboxVisibility: props.checkboxVisibility || CheckboxVisibility.hidden
  } as IListProps
}
