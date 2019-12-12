import { getValueTyped as value } from 'helpers';
import * as _ from 'underscore';
import { BaseFilter } from "./BaseFilter";

/**
 * @class ResourceFilter
 * @inherits BaseFilter
 */
export class ResourceFilter extends BaseFilter {
    constructor(fieldName: string, name: string) {
        super(fieldName, name);
    }

    /**
     * Intialize the ResourceFilter
     * 
     * @param {any[]} entries YearFilter
     */
    public initialize(entries: any[]) {
        const resources = _.unique(entries.map(e => value(e, this.fieldName, null))).sort();
        const items = resources.map(resource => ({
            key: resource,
            value: resource,
        }));
        return { key: this.fieldName, name: this.name, items, selected: [] }
    }
}