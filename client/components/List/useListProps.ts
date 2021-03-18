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
} from 'office-ui-fabric-react'
import React from 'react'
import { AnyAction } from 'redux'
import { filter } from 'underscore'
import { ListGroupHeader } from './ListGroupHeader'
import { onRenderListHeader } from './onRenderListHeader'
import { IListProps, IListState } from './types'

type UseListProps = {
  props: IListProps
  state: IListState
  dispatch: React.Dispatch<AnyAction>
  selection: Selection<IObjectWithKey>
  groups: IGroup[]
}

/**
 * List props hook
 */
export function useListProps({
  props,
  state,
  dispatch,
  selection,
  groups
}: UseListProps): IListProps {
  return {
    getKey: (_item, index) => `list_item_${index}`,
    setKey: 'list',
    enableShimmer: props.enableShimmer,
    isPlaceholderData: props.enableShimmer,
    selection,
    columns: filter(props.columns, (col) => !col.data?.hidden),
    items: state.items,
    groups,
    selectionMode: props.selectionProps
      ? props.selectionProps.mode
      : SelectionMode.none,
    constrainMode: ConstrainMode.horizontalConstrained,
    layoutMode: DetailsListLayoutMode.justified,
    groupProps: {
      ...props.listGroupRenderProps,
      onRenderHeader: ListGroupHeader
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
