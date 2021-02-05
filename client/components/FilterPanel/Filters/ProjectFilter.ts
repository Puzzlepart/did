import { getValue } from 'helpers'
import _ from 'underscore'
import { BaseFilter, IFilter } from './BaseFilter'

export class ProjectFilter<T = any> extends BaseFilter<T> {
  constructor(public fieldName: string, public name: string) {
    super(fieldName)
  }

  /**
   * Intialize the ProjectFilter
   *
   * @param {T[]} entries Entries
   */
  public initialize(entries: T[]): IFilter {
    const projects = _.unique(entries.map((e) => getValue(e, this.fieldName, null))).sort()
    const items = projects.map((resource) => ({
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
