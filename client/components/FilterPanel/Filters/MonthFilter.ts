import { value as value } from 'helpers';
import resource from 'i18n';
import { unique } from 'underscore';
import { capitalize } from 'underscore.string';
import { getMonthNames } from 'utils/date';
import { BaseFilter, IFilter } from './BaseFilter';


/**
 * @category FilterPanel
 */
export class MonthFilter extends BaseFilter {
    constructor(fieldName: string) {
        super(fieldName);
    }

    /**
     * Intialize the MonthFilter
     * 
     * @param {any[]} entries Entries
     */
    public initialize(entries: any[]): IFilter {
        let months: string[] = unique(entries.map(e => value(e, this.fieldName, null)));
        months = getMonthNames()
            .filter(m => months.indexOf(m) !== -1)
            .map(m => capitalize(m))
        const items = months.map(month => ({ key: month, value: month, }));
        return {
            key: this.fieldName,
            name: resource('COMMON.MONTH_LABEL'),
            items,
            selected: [],
        };
    }
}