import {getValue} from 'helpers';
import {contains, unique} from 'underscore';
import {BaseFilter, IFilter} from './BaseFilter';

/**
 * @category FilterPanel
 */
export class YearFilter<
	ItemType = any,
	KeyType = any
> extends BaseFilter<ItemType> {
	private _selectedKeys: KeyType[];

	constructor(public fieldName: string, public name: string) {
		super(fieldName, name);
	}

	/**
	 * Intialize the YearFilter
	 *
	 * @param items - Items
	 */
	public initialize(items: ItemType[]): IFilter {
		const years = unique(
			items.map(e => getValue(e, this.fieldName, null))
		).sort();
		const _items = years.map(year => ({
			key: year,
			value: year
		}));
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
