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
import { AnyAction } from 'redux'
import _ from 'underscore'
import { ListGroupHeader } from './ListGroupHeader'
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
  selection,
  groups,
  items
}: UseListProps): IListProps {
  const columns = _.filter(props.columns, (col) => {
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
      onRenderHeader: (props) => {
        return <ListGroupHeader {...props} />
      }
    },
    checkboxVisibility: props.checkboxVisibility || CheckboxVisibility.hidden
  } as IListProps
}
