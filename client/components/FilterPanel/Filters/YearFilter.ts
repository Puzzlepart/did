import { getValueTyped as value } from 'helpers';
import * as _ from 'underscore';
import { BaseFilter } from "./BaseFilter";

/**
 * @class YearFilter
 * @inherits BaseFilter
 */
export class YearFilter extends BaseFilter {
    constructor(fieldName: string, name: string) {
        super(fieldName, name);
    }

    /**
     * Intialize the MonthFilter
     * 
     * @param {any[]} entries YearFilter
     */
    public initialize(entries: any[]) {
        const years = _.unique(entries.map(e => value(e, this.fieldName, null))).sort();
        const items = years.map(year => ({
            key: year,
            value: year,
        }));
        return { key: this.fieldName, name: this.name, items, selected: [] }
    }
}