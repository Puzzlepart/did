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
export abstract class BaseFilter {
  public name: string

  constructor(public fieldName: string) {}

  public abstract initialize(entries: any[]): IFilter
}
