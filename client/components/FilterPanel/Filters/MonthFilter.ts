/* eslint-disable tsdoc/syntax */
import $date from 'DateUtils'
import { getValue } from 'helpers'
import { contains, indexOf, unique } from 'underscore'
import { BaseFilter, IFilter } from './BaseFilter'

/**
 * @category FilterPanel
 */
export class MonthFilter<
  ItemType = any,
  KeyType = any
> extends BaseFilter<ItemType> {
  private _selectedKeys: KeyType[]

  constructor(fieldName: string, public name: string) {
    super(fieldName, name)
  }

  /**
   * Intialize the MonthFilter
   *
   * @param items - Items
   */
  public initialize(items: ItemType[]): IFilter {
    const values = unique(
      items.map((item_) => getValue(item_, this.fieldName, null))
    )
    const monthNames = $date.getMonthNames()
    const _items = monthNames
      .filter((_, index) => contains(values, index + 1))
      .map((value) => ({ key: indexOf(monthNames, value) + 1, value }))
    return {
      key: this.fieldName,
      name: this.name,
      items: _items,
      selected: _items.filter((index) =>
        contains(this._selectedKeys, index.key)
      )
    }
  }

  public setDefaults(values: { [key: string]: KeyType[] }) {
    this._selectedKeys = getValue(values, this.fieldName) ?? []
    return this
  }
}
