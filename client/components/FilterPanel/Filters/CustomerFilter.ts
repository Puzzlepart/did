import { getValue } from 'helpers'
import _ from 'underscore'
import { BaseFilter, IFilter } from './BaseFilter'

export class CustomerFilter extends BaseFilter {
  constructor(public fieldName: string, public name: string) {
    super(fieldName)
  }

  /**
   * Intialize the ResourceFilter
   *
   * @param {any[]} entries Entries
   */
  public initialize(entries: any[]): IFilter {
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
}
