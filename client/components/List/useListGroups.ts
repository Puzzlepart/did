/* eslint-disable unicorn/consistent-destructuring */
import * as arraySort from 'array-sort'
import get from 'get-value'
import _ from 'underscore'
import { IListContext } from './context'

export type ListGroup<T = any> = {
  key: string
  name: string
  items: T[]
  data?: any
  total?: string
}

/**
 * Returns list groups based on property `listGroupProps` on
 * the `<List />` component
 *
 * @param context Context
 *
 * @category List
 */
export function useListGroups<T = any>(
  context: IListContext
): [ListGroup<T>[], T[]] {
  let items = [...(context.state.items as T[])]
  const groupByFieldName =
    context.state.groupBy?.fieldName ?? context.props.listGroupProps?.fieldName
  if (!groupByFieldName) {
    return [[], items]
  }
  const { emptyGroupName, totalFunc, groupNames, groupData } =
    context.props.listGroupProps ?? {}
  const defaultGroupName =
    emptyGroupName ??
    get(context.state, 'groupBy.data.groupOptions?.emptyGroupName', {
      default: ''
    })
  if (_.isEmpty(context.state.items) && !groupNames) {
    return [[], []]
  }
  const itemsSort = { props: [groupByFieldName], opts: { reverse: false } }
  items = arraySort([...items], itemsSort.props, itemsSort.opts)
  const groupNames_ = items.map((g) =>
    get(g as any, groupByFieldName, { default: defaultGroupName }).toString()
  )
  const uniqueGroupNames =
    groupNames || _.unique(groupNames_).sort((a, b) => (a > b ? 1 : -1))
  const groups = uniqueGroupNames.map((name, index): ListGroup<T> => {
    const items_ = items.filter((item) => {
      const itemValue = `${get(item as any, groupByFieldName, {
        default: defaultGroupName
      })}`
      return `${itemValue}`.toLowerCase() === name.toLowerCase()
    })
    const total = totalFunc ? totalFunc(items_) : null
    const group: ListGroup<T> = {
      key: name,
      name,
      items: items_,
      data: {
        ...(groupData && groupData[index]),
        total,
        styles: context.props.listGroupProps.styles
      }
    }
    return group
  })
  return [groups, items]
}
