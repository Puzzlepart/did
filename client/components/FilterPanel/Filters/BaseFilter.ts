/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable tsdoc/syntax */
import { getValue as get } from 'helpers'
import { contains } from 'underscore'
import { IFilter, IFilterItem } from './types'

/**
 * @category FilterPanel
 */
export class BaseFilter {
  public selectedKeys: string[]

  /**
   * Constructor for `BaseFilter`
   *
   * @param name - Filter name
   * @param keyFieldName - Field name for the item key
   * @param valueFieldName - Field name for the item value
   */
  constructor(
    public name: string,
    public keyFieldName: string,
    public valueFieldName?: string
  ) {
    this.valueFieldName = valueFieldName || keyFieldName
  }

  /**
   * Initializes the filter returning `IFilter`
   *
   * @param filterItems - Filter items
   * @returns `IFilter`
   */
  public initialize(filterItems: IFilterItem[]): IFilter {
    return {
      key: this.keyFieldName,
      name: this.name,
      items: filterItems,
      selected: filterItems.filter((item) =>
        contains(this.selectedKeys, item.key)
      )
    }
  }

  /**
   * Set defaults (`selectedKeys`) for the filter
   *
   * @param values - Values
   * @returns this
   */
  public setDefaults(values: any) {
    this.selectedKeys = get(values, this.keyFieldName) ?? []
    return this
  }
}
