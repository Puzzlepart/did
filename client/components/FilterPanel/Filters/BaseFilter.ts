/* eslint-disable unicorn/prevent-abbreviations */
import { IListColumn } from 'components/List/types'
import get from 'get-value'
import { IFilter, IFilterItem } from './types'

/**
 * @category FilterPanel
 */
export class BaseFilter {
  private _selectedKeys: Set<string> = new Set()

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
   * @param filterItems - Filter items to initialize with
   */
  public initialize(filterItems: IFilterItem[]): IFilter {
    return {
      key: this.keyFieldName,
      name: this.name,
      items: filterItems,
      selected: this._selectedKeys
    }
  }

  /**
   * Set defaults selected keys for the filter.
   *
   * @param values - Values
   */
  public setDefaults(values: any) {
    this._selectedKeys = new Set(get(values, this.keyFieldName) ?? [])
    return this
  }
}
