/* eslint-disable tsdoc/syntax */
import { getValue } from 'helpers'
import { unique } from 'underscore'
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
    const years = unique(
      items.map((item_) => getValue(item_, this.keyFieldName, null))
    ).sort()
    const _items = years.map((year) => ({
      key: year,
      value: year
    }))
    return super.initialize(_items)
  }
}
