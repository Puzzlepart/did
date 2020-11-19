import { getValue } from 'helpers'
import _ from 'underscore'
import { BaseFilter, IFilter } from './BaseFilter'

export class WeekFilter extends BaseFilter {
  constructor(fieldName: string, public name: string) {
    super(fieldName)
  }

  /**
   * Intialize the WeekFilter
   *
   * @param {any[]} entries Entries
   */
  public initialize(entries: any[]): IFilter {
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
}
