/* eslint-disable unicorn/consistent-destructuring */
import { IGroup } from '@fluentui/react'
import * as arraySort from 'array-sort'
import get from 'get-value'
import _ from 'underscore'
import { IListContext } from './context'

/**
 * Returns list groups based on property `listGroupProps` on
 * the `<List />` component
 *
 * @param context Context
 *
 * @category List
 */
export function useListGroups(context: IListContext): [IGroup[], any[]] {
  let items = [...context.state.items]
  const groupByFieldName =
    context.state.groupBy?.fieldName ?? context.props.listGroupProps?.fieldName
  if (!groupByFieldName) {
    return [null, items]
  }
  const { emptyGroupName, totalFunc, groupNames, groupData } =
    context.props.listGroupProps
  if (_.isEmpty(context.state.items) && !groupNames) {
    return [null, []]
  }
  const itemsSort = { props: [groupByFieldName], opts: { reverse: false } }
  items = arraySort([...items], itemsSort.props, itemsSort.opts)
  const groupNames_ = items.map((g) =>
    get(g, groupByFieldName, { default: emptyGroupName }).toString()
  )
  const uniqueGroupNames =
    groupNames || _.unique(groupNames_).sort((a, b) => (a > b ? 1 : -1))
  const groups = uniqueGroupNames.map((name, index) => {
    const items_ = items.filter((item) => {
      const itemValue = `${get(item, groupByFieldName, {
        default: emptyGroupName
      })}`
      return `${itemValue}`.toLowerCase() === name.toLowerCase()
    })
    const total = totalFunc ? totalFunc(items_) : ''
    const group: IGroup = {
      key: name,
      name: `${name} ${total}`,
      startIndex: groupNames_
        .map((g) => g.toLowerCase())
        .indexOf(name.toLowerCase(), 0),
      count: items_.length,
      isShowingAll: items_.length === items.length,
      isDropEnabled: false,
      isCollapsed: false,
      data: groupData && groupData[index]
    }
    return group
  })
  return [groups, items]
}
