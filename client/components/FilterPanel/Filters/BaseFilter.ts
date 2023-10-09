/* eslint-disable unicorn/prevent-abbreviations */
import { IListColumn } from 'components/List/types'
import get from 'get-value'
import _ from 'underscore'
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
    public name?: string,
    public keyFieldName?: string,
    public valueFieldName?: string
  ) {
    this.valueFieldName = valueFieldName ?? keyFieldName
  }

  public fromColumn(column: IListColumn) {
    this.name = column.name
    this.keyFieldName = column.fieldName
    this.valueFieldName = column.fieldName
    return this
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
        _.contains(this.selectedKeys, item.key)
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
