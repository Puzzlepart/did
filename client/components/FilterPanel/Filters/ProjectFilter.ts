import { value } from 'helpers'
import _ from 'underscore'
import { BaseFilter, IFilter } from './BaseFilter'

export class ProjectFilter extends BaseFilter {
  constructor(public fieldName: string, public name: string) {
    super(fieldName)
  }

  /**
   * Intialize the ProjectFilter
   *
   * @param {any[]} entries Entries
   */
  public initialize(entries: any[]): IFilter {
    const projects = _.unique(entries.map(e => value(e, this.fieldName, null))).sort()
    const items = projects
      .filter(p => p)
      .map(p => ({
        key: p,
        value: p,
      }))
    return {
      key: this.fieldName,
      name: this.name,
      items,
      selected: [],
    }
  }
}
