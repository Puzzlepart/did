import get from 'get-value'
import _ from 'underscore'
import { BaseFilter } from './BaseFilter'
import { IFilter } from './types'

/**
 * @extends BaseFilter
 * @category FilterPanel
 */
export class ResourceFilter extends BaseFilter {
  /**
   * Constructor for `ResourceFilter`
   *
   * @param name - Filter name
   * @param keyFieldName - Field name for the item key
   * @param valueFieldName - Field name for the item value
   */
  constructor(name: string, keyFieldName: string, valueFieldName: string) {
    super(name, keyFieldName, valueFieldName)
  }

  /**
   * Intialize the `ResourceFilter`
   *
   * @param items - Items
   */
  public initialize(items: any[]): IFilter {
    const filterItems = _.unique(
      items.map((item_) => ({
        key: get(item_, this.keyFieldName),
        value: get(item_, this.valueFieldName)
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
