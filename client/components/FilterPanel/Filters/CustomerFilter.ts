import { getValue } from 'helpers'
import _ from 'underscore'
import { BaseFilter, IFilter } from './BaseFilter'

export class CustomerFilter<T = any> extends BaseFilter<T> {
  constructor(public fieldName: string, public name: string) {
    super(fieldName, name)
  }

  /**
   * Intialize the ResourceFilter
   *
   * @param {T[]} entries Entries
   */
  public initialize(entries: T[]): IFilter {
    const customers = _.unique(entries.map((e) => getValue(e, this.fieldName, null))).sort()
    const items = customers.map((resource) => ({
      key: resource,
      value: resource
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
