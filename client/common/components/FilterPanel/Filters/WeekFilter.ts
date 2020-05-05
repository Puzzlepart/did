import { getValueTyped as value } from 'helpers';
import resource from 'i18n';
import _ from 'underscore';
import { BaseFilter, IFilter } from './BaseFilter';

/**
 * @category FilterPanel
 */
export class WeekFilter extends BaseFilter {
    constructor(fieldName: string) {
        super(fieldName);
    }

    /**
     * Intialize the WeekFilter
     * 
     * @param {any[]} entries Entries
     */
    public initialize(entries: any[]): IFilter {
        const weeks = _.unique(entries.map(e => value(e, this.fieldName, null))).sort((a, b) => a - b);
        const items = weeks.map(week => ({
            key: week,
            value: week,
        }));
        return {
            key: this.fieldName,
            name: resource('COMMON.WEEK_NUMER_LABEL'),
            items,
            selected: [],
        }
    }
}