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

export abstract class BaseFilter<ItemType = any> {
  constructor(public fieldName: string, public name: string) {}
  public abstract initialize(items: ItemType[]): IFilter
  public abstract setDefaults(values: any): BaseFilter<ItemType>
}
