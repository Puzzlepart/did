import { value as value } from 'helpers';
import { unique } from 'underscore';
import { capitalize } from 'underscore.string';
import dateUtils from 'utils/date';
import { BaseFilter, IFilter } from './BaseFilter';


/**
 * @category FilterPanel
 */
export class MonthFilter extends BaseFilter {
    constructor(public fieldName: string, public name: string) {
        super(fieldName);
    }

    /**
     * Intialize the MonthFilter
     * 
     * @param {any[]} entries Entries
     */
    public initialize(entries: any[]): IFilter {
        let months: string[] = unique(entries.map(e => value(e, this.fieldName, null)));
        months = dateUtils.getMonthNames()
            .filter(m => months.indexOf(m) !== -1)
            .map(m => capitalize(m))
        const items = months.map(month => ({ key: month, value: month, }));
        return {
            key: this.fieldName,
            name: this.name,
            items,
            selected: [],
        };
    }
}