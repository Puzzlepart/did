import get from 'get-value'
import _ from 'underscore'
import { BaseFilter } from './BaseFilter'
import { IFilter } from './types'

/**
 * @category FilterPanel
 */
export class YearFilter extends BaseFilter {
  /**
   * Constructor for `YearFilter`
   *
   * @param name - Filter name
   * @param keyFieldName - Field name for the item key
   */
  constructor(name: string, keyFieldName: string) {
    super(name, keyFieldName)
  }

  /**
   * Intialize the `YearFilter`
   *
   * @param items - Items
   */
  public initialize(items: any[]): IFilter {
    const years = _.unique(
      items.map((item_) => get(item_, this.keyFieldName))
    ).sort()
    const _items = years.map((year) => ({
      key: year,
      value: year
    }))
    return super.initialize(_items)
  }
}
