import * as _ from 'underscore';
import { BaseFilter } from "./BaseFilter";
import { getValueTyped as value, getMonthName } from 'helpers';

/**
 * @class MonthFilter
 * @inherits BaseFilter
 */
export class MonthFilter extends BaseFilter {
    constructor(fieldName: string, name: string) {
        super(fieldName, name);
    }

    /**
     * Intialize the MonthFilter
     * 
     * @param {any[]} entries Entries
     */
    public initialize(entries: any[]) {
        const months = _.unique(entries.map(e => value(e, this.fieldName, null))).sort();
        const items = months.map(month => ({
            key: month,
            value: getMonthName(month),
        }));
        return { key: this.fieldName, name: this.name, items, selected: [] }
    }
}