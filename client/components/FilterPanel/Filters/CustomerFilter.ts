/* eslint-disable tsdoc/syntax */
import { getValue } from 'helpers'
import _  from 'underscore'
import { BaseFilter } from './BaseFilter'
import { IFilter } from './types'

/**
 * @extends BaseFilter
 * @category FilterPanel
 */
export class CustomerFilter extends BaseFilter {
  /**
   * Constructor for `CustomerFilter`
   *
   * @param name - Name
   * @param keyFieldName - Field name for the item key
   * @param valueFieldName - Field name for the item value
   */
  constructor(name: string, keyFieldName: string, valueFieldName: string) {
    super(name, keyFieldName, valueFieldName)
  }

  /**
   * Intialize the `CustomerFilter`
   *
   * @param items - Items
   */
  public initialize(items: any[]): IFilter {
    const filterItems = _.unique(
      items.map((item_) => ({
        key: getValue(item_, this.keyFieldName, null),
        value: getValue(item_, this.valueFieldName, null)
      })),
      (item) => item.key
    ).sort((a, b) => {
      if (a.value < b.value) return -1
      if (a.value > b.value) return 1
      return 0
    })
    return super.initialize(filterItems)
  }
}
