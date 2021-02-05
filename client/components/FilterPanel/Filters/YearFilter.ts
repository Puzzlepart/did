import { getValue } from 'helpers'
import _ from 'underscore'
import { BaseFilter, IFilter } from './BaseFilter'

export class YearFilter<T = any> extends BaseFilter<T> {
  constructor(public fieldName: string, public name: string) {
    super(fieldName, name)
  }

  /**
   * Intialize the YearFilter
   *
   * @param {T[]} entries Entries
   */
  public initialize(entries: T[]): IFilter {
    const years = _.unique(entries.map((e) => getValue(e, this.fieldName, null))).sort()
    const items = years.map((year) => ({
      key: year,
      value: year
    }))
    return {
      key: this.fieldName,
      name: this.name,
      items,
      selected: []
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public setDefaults(values: any) {
    return this
  }
}
