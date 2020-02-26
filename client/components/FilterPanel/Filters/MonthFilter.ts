import * as _ from 'underscore';
import { BaseFilter, IFilter } from "./BaseFilter";
import { getValueTyped as value } from 'helpers';

const MONTH_NAMES = Array.apply(0, Array(12)).map((_, i) => require('moment')().month(i).format('MMMM'));

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
    public initialize(entries: any[]): IFilter {
        let months: string[] = _.unique(entries.map(e => value(e, this.fieldName, null)));
        months = MONTH_NAMES.filter(m => months.indexOf(m) !== -1);
        const items = months.map(month => ({ key: month, value: month, }));
        return { key: this.fieldName, name: this.name, items, selected: [] }
    }
}