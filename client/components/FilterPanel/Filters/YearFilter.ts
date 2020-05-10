import { value as value } from 'helpers';
import resource from 'i18n';
import _ from 'underscore';
import { BaseFilter, IFilter } from './BaseFilter';

/**
 * @category FilterPanel
 */
export class YearFilter extends BaseFilter {
    constructor(fieldName: string) {
        super(fieldName);
    }

    /**
     * Intialize the YearFilter
     * 
     * @param {any[]} entries Entries
     */
    public initialize(entries: any[]): IFilter {
        const years = _.unique(entries.map(e => value(e, this.fieldName, null))).sort();
        const items = years.map(year => ({
            key: year,
            value: year,
        }));
        return {
            key: this.fieldName,
            name: resource('COMMON.YEAR_LABEL'),
            items,
            selected: [],
        }
    }
}