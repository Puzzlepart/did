import { value as value } from 'helpers'
import _ from 'underscore'
import { BaseFilter, IFilter } from './BaseFilter'

/**
 * @category FilterPanel
 */
export class ProjectFilter extends BaseFilter {
    constructor(public fieldName: string, public name: string) {
        super(fieldName)
    }

    /**
     * Intialize the ResourceFilter
     * 
     * @param {any[]} entries Entries
     */
    public initialize(entries: any[]): IFilter {
        const projects = _.unique(entries.map(e => value(e, this.fieldName, null))).sort()
        const items = projects.map(resource => ({
            key: resource,
            value: resource,
        }))
        return {
            key: this.fieldName,
            name: this.name,
            items,
            selected: [],
        }
    }
}