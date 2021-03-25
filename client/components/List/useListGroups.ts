/* eslint-disable tsdoc/syntax */
import * as arraySort from 'array-sort'
import { getValue as get } from 'helpers'
import { IGroup } from '@fluentui/react'
import { isEmpty, unique } from 'underscore'
import { IListGroupProps } from './types'

type GenerateListGroups = [IGroup[], any[]]

/**
 * Returns list groups based on property
 * `listGroupProps` on the `<List />` component
 *
 * @category List
 */
export function useListGroups(
  items: any[],
  props: IListGroupProps
): GenerateListGroups {
  if (!props) return [null, items]
  const { fieldName, emptyGroupName, totalFunc } = props
  if (isEmpty(items) && !props.groupNames) return [null, []]
  const itemsSort = { props: [fieldName], opts: { reverse: false } }
  items = arraySort([...items], itemsSort.props, itemsSort.opts)
  const groupNames = items.map((g) =>
    get(g, fieldName, emptyGroupName).toString()
  )
  const uniqueGroupNames =
    props.groupNames || unique(groupNames).sort((a, b) => (a > b ? 1 : -1))
  const groups = uniqueGroupNames.map((name) => {
    const items_ = items.filter((item) => {
      const itemValue = `${get(item, fieldName, emptyGroupName)}`
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
      isCollapsed: false
    }
    return group
  })
  return [groups, items]
}
