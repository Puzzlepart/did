import DateUtils from 'DateUtils';
import {getValue} from 'helpers';
import {contains, indexOf, unique} from 'underscore';
import {BaseFilter, IFilter} from './BaseFilter';

/**
 * @category FilterPanel
 */
export class MonthFilter<
	ItemType = any,
	KeyType = any
> extends BaseFilter<ItemType> {
	private _selectedKeys: KeyType[];

	constructor(fieldName: string, public name: string) {
		super(fieldName, name);
	}

	/**
	 * Intialize the MonthFilter
	 *
	 * @param items - Items
	 */
	public initialize(items: ItemType[]): IFilter {
		const values = unique(items.map(e => getValue(e, this.fieldName, null)));
		const monthNames = DateUtils.getMonthNames();
		const _items = monthNames
			.filter((_, idx) => contains(values, idx + 1))
			.map(value => ({key: indexOf(monthNames, value) + 1, value}));
		return {
			key: this.fieldName,
			name: this.name,
			items: _items,
			selected: _items.filter(i => contains(this._selectedKeys, i.key))
		};
	}

	public setDefaults(values: Record<string, KeyType[]>) {
		this._selectedKeys = getValue(values, this.fieldName) ?? [];
		return this;
	}
}
