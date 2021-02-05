import { getValue } from 'helpers'
import { unique } from 'underscore'
import { BaseFilter, IFilter } from './BaseFilter'

export class ResourceFilter<T = any> extends BaseFilter<T> {
  constructor(
    public fieldName: string,
    public name: string
  ) {
    super(fieldName)
  }

  /**
   * Intialize the ResourceFilter
   *
   * @param {T[]} entries Entries
   */
  public initialize(entries: T[]): IFilter {
    const resources = unique(entries.map((e) => getValue(e, this.fieldName, null))).sort()
    const items = resources.map((resource) => ({
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
