import { getValue } from 'helpers'
import { unique } from 'underscore'
import { BaseFilter, IFilter } from './BaseFilter'

export class ResourceFilter<T = any> extends BaseFilter<T> {
  private _selectedKeys: string[]

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
    public name: string,
  ) {
    super(keyFieldName, name)
  }

  /**
   * Intialize the ResourceFilter
   *
   * @param {T[]} entries Entries
   */
  public initialize(entries: T[]): IFilter {
    const items = unique(
      entries.map((e) => ({
        key: getValue(e, this.keyFieldName, null),
        value: getValue(e, this.valueFieldName, null),
      })),
      item => item.key
    ).sort((a, b) => {
      if (a.value < b.value) return -1
      if (a.value > b.value) return 1
      return 0
    })
    return {
      key: this.keyFieldName,
      name: this.name,
      items,
      selected: items.filter(i => this._selectedKeys.indexOf(i.key) !== -1)
    }
  }

  public setDefaults(values: any) {
    this._selectedKeys = getValue(values, this.keyFieldName) ?? []
    return this
  }
}
