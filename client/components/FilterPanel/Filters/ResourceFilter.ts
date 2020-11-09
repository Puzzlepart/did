import { getValue } from 'helpers'
import {unique} from 'underscore'
import { BaseFilter, IFilter } from './BaseFilter'

export class ResourceFilter extends BaseFilter {
  constructor(public fieldName: string, public name: string) {
    super(fieldName)
  }

  /**
   * Intialize the ResourceFilter
   *
   * @param {any[]} entries Entries
   */
  public initialize(entries: any[]): IFilter {
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
