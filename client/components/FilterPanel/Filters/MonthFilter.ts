import $date from 'DateUtils'
import get from 'get-value'
import _ from 'underscore'
import { BaseFilter } from './BaseFilter'
import { IFilter } from './types'

/**
 * @extends BaseFilter
 * @category FilterPanel
 */
export class MonthFilter extends BaseFilter {
  /**
   * Constructor for `MonthFilter`
   *
   * @param name - Name
   * @param keyFieldName - Field name for the item key
   */
  constructor(name: string, keyFieldName: string) {
    super(name, keyFieldName)
  }

  /**
   * Intialize the `MonthFilter`
   *
   * @param items - Items
   */
  public initialize(items: any[]): IFilter {
    const values = _.unique(items.map((item_) => get(item_, this.keyFieldName)))
    const monthNames = $date.getMonthNames()
    const filterItems = monthNames
      .filter((_item, index) => _.contains(values, index + 1))
      .map((value) => ({ key: _.indexOf(monthNames, value) + 1, value }))
    return super.initialize(filterItems)
  }
}
