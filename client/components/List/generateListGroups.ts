
import * as arraySort from 'array-sort'
import { value as value } from 'helpers'
import { IGroup } from 'office-ui-fabric-react/lib/DetailsList'
import { unique } from 'underscore'

/**
 * Create groups
 * 
 * @param {any[]} items Items
 * @param {string} groupBy Group by field name
 * @param {string[]} uniqueGroupNames Group names
 * @param {string} emptyGroupName Empty group name
 * @param {Function} totalFunc Function to calculate sum for the group
 * 
 * @category List
 */
export function generateListGroups(items: any[], groupBy: string, uniqueGroupNames: string[], emptyGroupName = '', totalFunc?: Function): [IGroup[], any[]] {
    const itemsSort = { props: [groupBy], opts: { reverse: false } }
    items = arraySort([...items], itemsSort.props, itemsSort.opts)
    const groupNames = items.map(g => value<string>(g, groupBy, emptyGroupName))
    uniqueGroupNames = uniqueGroupNames || unique(groupNames).sort((a, b) => a > b ? 1 : -1)
    const groups = uniqueGroupNames.map((name, idx) => {
        const itemsInGroup = items.filter(item => {
            const itemValue = value<string>(item, groupBy, emptyGroupName)
            return itemValue.toLowerCase() === name.toLowerCase()
        })
        const total = totalFunc ? totalFunc(itemsInGroup) : ''
        const group: IGroup = {
            key: idx.toString(),
            name: `${name} ${total}`,
            startIndex: groupNames.map(g => g.toLowerCase()).indexOf(name.toLowerCase(), 0),
            count: itemsInGroup.length,
            isShowingAll: itemsInGroup.length === items.length,
            isDropEnabled: false,
            isCollapsed: false,
        }
        return group
    })
    return [groups, items]
}