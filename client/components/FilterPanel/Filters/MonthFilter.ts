import { value as value } from 'helpers'
import { unique } from 'underscore'
import dateUtils from 'utils/date'
import { BaseFilter, IFilter } from './BaseFilter'


/**
 * @category FilterPanel
 */
export class MonthFilter extends BaseFilter {
    constructor(public fieldName: string, public name: string) {
        super(fieldName)
    }

    /**
     * Intialize the MonthFilter
     * 
     * @param {any[]} entries Entries
     */
    public initialize(entries: any[]): IFilter {
        const values = unique(entries.map(e => value(e, this.fieldName, null)))
        const monthNames = dateUtils.getMonthNames()
        const items = values.map(month => ({ key: month, value: monthNames[month - 1] }))
        return {
            key: this.fieldName,
            name: this.name,
            items,
            selected: [],
        }
    }
}