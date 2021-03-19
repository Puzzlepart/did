/* eslint-disable tsdoc/syntax */

/**
 * @category FilterPanel
 */
export interface IFilterItem {
  key: string | number
  value: string
}

/**
 * @category FilterPanel
 */
export interface IFilter {
  key: string
  name: string
  items: IFilterItem[]
  selected: IFilterItem[]
}

/**
 * @category FilterPanel
 */
export abstract class BaseFilter<ItemType = any> {
  constructor(public fieldName: string, public name: string) {}
  public abstract initialize(items: ItemType[]): IFilter
  public abstract setDefaults(values: any): BaseFilter<ItemType>
}
