import { getValue } from 'helpers'
import { contains, unique } from 'underscore'
import { BaseFilter, IFilter } from './BaseFilter'

export class ResourceFilter<
  ItemType = any,
  KeyType = any
> extends BaseFilter<ItemType> {
  private _selectedKeys: KeyType[]

  /**
   * Constructor
   *
   * @param {string} keyFieldName Field name for the item key
   * @param {string} valueFieldName Field name for the item value
   * @param {string} name Filter name
   */
  constructor(
    public keyFieldName: string,
    public valueFieldName: string,
    public name: string
  ) {
    super(keyFieldName, name)
  }

  /**
   * Intialize the ResourceFilter
   *
   * @param {ItemType[]} items Items
   */
  public initialize(items: ItemType[]): IFilter {
    const _items = unique(
      items.map((e) => ({
        key: getValue(e, this.keyFieldName, null),
        value: getValue(e, this.valueFieldName, null)
      })),
      (item) => item.key
    ).sort((a, b) => {
      if (a.value < b.value) return -1
      if (a.value > b.value) return 1
      return 0
    })
    return {
      key: this.keyFieldName,
      name: this.name,
      items: _items,
      selected: _items.filter((i) => contains(this._selectedKeys, i.key))
    }
  }

  public setDefaults(values: { [key: string]: KeyType[] }) {
    this._selectedKeys = getValue(values, this.keyFieldName) ?? []
    return this
  }
}
