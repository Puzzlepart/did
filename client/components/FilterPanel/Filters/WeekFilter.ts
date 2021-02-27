import { getValue } from 'helpers'
import { unique, contains } from 'underscore'
import { BaseFilter, IFilter } from './BaseFilter'

export class WeekFilter<
  ItemType = any,
  KeyType = any
> extends BaseFilter<ItemType> {
  private _selectedKeys: KeyType[]

  constructor(fieldName: string, public name: string) {
    super(fieldName, name)
  }

  /**
   * Intialize the WeekFilter
   *
   * @param {ItemType[]} items Items
   */
  public initialize(items: ItemType[]): IFilter {
    const weeks = unique(
      items.map((e) => getValue(e, this.fieldName, null))
    ).sort((a, b) => a - b)
    const _items = weeks.map((week) => ({
      key: week,
      value: week
    }))
    return {
      key: this.fieldName,
      name: this.name,
      items: _items,
      selected: _items.filter((i) => contains(this._selectedKeys, i.key))
    }
  }

  public setDefaults(values: { [key: string]: KeyType[] }) {
    this._selectedKeys = getValue(values, this.fieldName) ?? []
    return this
  }
}
