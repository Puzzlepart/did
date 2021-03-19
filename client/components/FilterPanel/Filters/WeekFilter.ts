/* eslint-disable tsdoc/syntax */
import { getValue } from 'helpers'
import { unique } from 'underscore'
import { BaseFilter } from './BaseFilter'
import { IFilter } from './types'

/**
 * @extends BaseFilter
 * @category FilterPanel
 */
export class WeekFilter extends BaseFilter {
  /**
   * Constructor for `WeekFilter`
   *
   * @param name - Name
   * @param keyFieldName - Field name for the item key
   */
  constructor(name: string, keyFieldName: string) {
    super(name, keyFieldName)
  }

  /**
   * Intialize the `WeekFilter`
   *
   * @param items - Items
   */
  public initialize(items: any[]): IFilter {
    const weeks = unique(
      items.map((item_) => getValue(item_, this.keyFieldName, null))
    ).sort((a, b) => a - b)
    const _items = weeks.map((week) => ({
      key: week,
      value: week
    }))
    return super.initialize(_items)
  }
}
