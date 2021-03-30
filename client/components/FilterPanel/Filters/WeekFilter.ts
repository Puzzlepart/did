/* eslint-disable tsdoc/syntax */
import get from 'get-value'
import _ from 'underscore'
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
    const weeks = _.unique(
      items.map((item_) => get(item_, this.keyFieldName))
    ).sort((a, b) => a - b)
    const _items = weeks.map((week) => ({
      key: week,
      value: week
    }))
    return super.initialize(_items)
  }
}
