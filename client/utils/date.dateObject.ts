import dayjs from 'dayjs'
import { DateUtils, DateInput } from './date'

export class DateObject {
    public _: dayjs.Dayjs;
    public jsDate: Date
    public endOfWeek: DateInput
    public isCurrentWeek: boolean;

    constructor(date: DateInput, private _dateUtils: DateUtils) {
        this._ = dayjs(date)
        this.jsDate = this._.toDate()
        this.endOfWeek = _dateUtils.endOfWeek(date)
        this.isCurrentWeek = _dateUtils.isCurrentWeek(date)
    }

    /**
     * Get the formatted date according to the string of tokens passed in.
     * 
     * To escape characters, wrap them in square brackets (e.g. [MM]).
     * 
     * @param {string} template Template
     */
    public format(template?: string) {
        return this._.format(template)
    }

    public get iso() {
        return this._dateUtils.toISOString(this._)
    }
}
