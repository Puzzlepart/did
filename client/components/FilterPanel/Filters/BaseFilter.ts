export interface IFilterItem {
  key: string | number
  value: string
}

export interface IFilter {
  key: string
  name: string
  items: IFilterItem[]
  selected: IFilterItem[]
}

export abstract class BaseFilter<T = any> {
  public name: string

  constructor(public fieldName: string) { }

  public abstract initialize(entries: T[]): IFilter
}
