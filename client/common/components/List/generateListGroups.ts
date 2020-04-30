
import * as arraySort from 'array-sort';
import { IGroup } from 'office-ui-fabric-react/lib/DetailsList';
import { getValueTyped as value } from 'helpers';
import * as _ from 'underscore';

/**
 * Create groups
 * 
 * @param {any[]} items Items
 * @param {string} groupBy Group by field name
 * @param {string[]} uniqueGroupNames Group names
 * @param {string} emptyGroupName Empty group name
 * @param {Function} totalFunc Function to calculate sum
 * 
 * @category List
 */
export function generateListGroups(items: any[], groupBy: string, uniqueGroupNames: string[], emptyGroupName: string = '', totalFunc?: Function): { items: any[], groups: IGroup[] } {
    const itemsSort = { props: [groupBy], opts: { reverse: false } };
    items = arraySort([...items], itemsSort.props, itemsSort.opts);
    let groupNames = items.map(g => value<string>(g, groupBy, emptyGroupName));
    uniqueGroupNames = uniqueGroupNames || _.uniq(groupNames).sort((a, b) => a > b ? 1 : -1);
    const groups = uniqueGroupNames.map((name, idx) => {
        let itemsInGroup = items.filter(item => value<string>(item, groupBy, emptyGroupName) === name);
        let total = totalFunc ? totalFunc(itemsInGroup) : '';
        const group: IGroup = {
            key: idx.toString(),
            name: `${name} ${total}`,
            startIndex: groupNames.indexOf(name, 0),
            count: itemsInGroup.length,
            isShowingAll: itemsInGroup.length === items.length,
            isDropEnabled: false,
            isCollapsed: false,
        };
        return group;
    });
    return { groups, items };
}