/* eslint-disable tsdoc/syntax */
import $date from 'DateUtils'
import { getValue } from 'helpers'
import { contains, indexOf, unique } from 'underscore'
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
    const values = unique(
      items.map((item_) => getValue(item_, this.keyFieldName, null))
    )
    const monthNames = $date.getMonthNames()
    const filterItems = monthNames
      .filter((_, index) => contains(values, index + 1))
      .map((value) => ({ key: indexOf(monthNames, value) + 1, value }))
    return super.initialize(filterItems)
  }
}
