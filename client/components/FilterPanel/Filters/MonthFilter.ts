import { getValue } from 'helpers'
import { unique, contains, indexOf } from 'underscore'
import DateUtils from 'DateUtils'
import { BaseFilter, IFilter } from './BaseFilter'

export class MonthFilter<T = any> extends BaseFilter<T> {
  constructor(fieldName: string, public name: string) {
    super(fieldName)
  }

  /**
   * Intialize the MonthFilter
   *
   * @param {T[]} entries Entries
   */
  public initialize(entries: T[]): IFilter {
    const values = unique(entries.map((e) => getValue(e, this.fieldName, null)))
    const monthNames = DateUtils.getMonthNames()
    const items = monthNames
      .filter((_, idx) => contains(values, idx + 1))
      .map((value) => ({ key: indexOf(monthNames, value) + 1, value }))
    return {
      key: this.fieldName,
      name: this.name,
      items,
      selected: []
    }
  }
}
