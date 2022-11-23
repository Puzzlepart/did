/* eslint-disable unicorn/consistent-destructuring */
import { IGroup } from '@fluentui/react'
import * as arraySort from 'array-sort'
import get from 'get-value'
import _ from 'underscore'
import { IListGroupProps } from './types'

/**
 * Returns list groups based on property `listGroupProps` on
 * the `<List />` component
 *
 * @category List
 */
export function useListGroups(items: any[], props: IListGroupProps) {
  if (!props) return [null, items]
  const { fieldName, emptyGroupName, totalFunc } = props
  if (_.isEmpty(items) && !props.groupNames) return [null, []]
  const itemsSort = { props: [fieldName], opts: { reverse: false } }
  items = arraySort([...items], itemsSort.props, itemsSort.opts)
  const groupNames = items.map((g) =>
    get(g, fieldName, { default: emptyGroupName }).toString()
  )
  const uniqueGroupNames =
    props.groupNames || _.unique(groupNames).sort((a, b) => (a > b ? 1 : -1))
  const groups = uniqueGroupNames.map((name, index) => {
    const items_ = items.filter((item) => {
      const itemValue = `${get(item, fieldName, { default: emptyGroupName })}`
      return `${itemValue}`.toLowerCase() === name.toLowerCase()
    })
    const total = totalFunc ? props.totalFunc(items_) : ''
    const group: IGroup = {
      key: name,
      name: `${name} ${total}`,
      startIndex: groupNames
        .map((g) => g.toLowerCase())
        .indexOf(name.toLowerCase(), 0),
      count: items_.length,
      isShowingAll: items_.length === items.length,
      isDropEnabled: false,
      isCollapsed: false,
      data: props.groupData[index]
    }
    return group
  })
  return [groups, items] as const
}
