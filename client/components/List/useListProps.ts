/* eslint-disable tsdoc/syntax */
import { getValue } from 'helpers'
import {
  CheckboxVisibility,
  ConstrainMode,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode
} from 'office-ui-fabric-react'
import { filter } from 'underscore'
import { ListGroupHeader } from './ListGroupHeader'
import { onRenderListHeader } from './onRenderListHeader'
import { IListProps } from './types'

/**
 * List props hook
 */
export function useListProps({ props, state, dispatch, selection, groups }): IListProps {
  return {
    getKey: (_item, index) => `list_item_${index}`,
    setKey: 'list',
    enableShimmer: props.enableShimmer,
    isPlaceholderData: props.enableShimmer,
    selection,
    columns: filter(props.columns, (col) => !col.data?.hidden),
    items: state.items,
    groups,
    selectionMode:
      props.selectionProps
        ? props.selectionProps.mode
        : SelectionMode.none
    ,
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
        headerProps,
        defaultRender,
        props,
        state,
        dispatch
      }),
    checkboxVisibility:
      props.checkboxVisibility || CheckboxVisibility.hidden
  } as IListProps
}
