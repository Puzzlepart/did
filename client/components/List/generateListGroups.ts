import * as arraySort from 'array-sort';
import {getValue} from 'helpers';
import {IGroup} from 'office-ui-fabric-react';
import {isEmpty, unique} from 'underscore';
import {IListGroups} from './types';

/**
 * Create groups
 *
 * @param items - Items
 * @param props - Props
 */
export function generateListGroups(
	items: any[],
	props: IListGroups
): [IGroup[], any[]] {
	if (isEmpty(items)) {
		return [null, []];
	}

	const itemsSort = {props: [props.fieldName], opts: {reverse: false}};
	items = arraySort([...items], itemsSort.props, itemsSort.opts);
	const groupNames = items.map(g =>
		getValue<string>(g, props.fieldName, props.emptyGroupName).toString()
	);
	const uniqueGroupNames =
		props.groupNames || unique(groupNames).sort((a, b) => (a > b ? 1 : -1));
	const groups = uniqueGroupNames.map((name, idx) => {
		const itemsInGroup = items.filter(item => {
			const itemValue = `${getValue<string>(
				item,
				props.fieldName,
				props.emptyGroupName
			)}`;
			return `${itemValue}`.toLowerCase() === name.toLowerCase();
		});
		const total = props.totalFunc ? props.totalFunc(itemsInGroup) : '';
		const group: IGroup = {
			key: idx.toString(),
			name: `${name} ${total}`,
			startIndex: groupNames
				.map(g => g.toLowerCase())
				.indexOf(name.toLowerCase(), 0),
			count: itemsInGroup.length,
			isShowingAll: itemsInGroup.length === items.length,
			isDropEnabled: false,
			isCollapsed: false
		};
		return group;
	});
	return [groups, items];
}
