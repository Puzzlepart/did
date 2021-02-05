import { getValue } from 'helpers'
import _ from 'underscore'
import { BaseFilter, IFilter } from './BaseFilter'

export class WeekFilter<T = any> extends BaseFilter<T> {
  constructor(fieldName: string, public name: string) {
    super(fieldName, name)
  }

  /**
   * Intialize the WeekFilter
   *
   * @param {T[]} entries Entries
   */
  public initialize(entries: T[]): IFilter {
    const weeks = _.unique(entries.map((e) => getValue(e, this.fieldName, null))).sort(
      (a, b) => a - b
    )
    const items = weeks.map((week) => ({
      key: week,
      value: week
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
