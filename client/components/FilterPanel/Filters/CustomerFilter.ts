/* eslint-disable tsdoc/syntax */
import { getValue } from 'helpers'
import { contains, unique } from 'underscore'
import { BaseFilter, IFilter } from './BaseFilter'

/**
 * @category FilterPanel
 */
export class CustomerFilter<
  ItemType = any,
  KeyType = any
> extends BaseFilter<ItemType> {
  private _selectedKeys: KeyType[]

  constructor(public fieldName: string, public name: string) {
    super(fieldName, name)
  }

  /**
   * Intialize the CustomerFilter
   *
   * @param items - Items
   */
  public initialize(items: ItemType[]): IFilter {
    const customers = unique(
      items.map((item_) => getValue(item_, this.fieldName, null))
    ).sort()
    const _items = customers.map((resource) => ({
      key: resource,
      value: resource
    }))
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
