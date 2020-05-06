import * as helpers from 'helpers';
import moment from 'moment';

/**
 * Handles a scope, the timing between a startDateTime and endDateTime
 * 
 * @category Timesheet
 */
export class TimesheetScope {
    private _startDateTime?: moment.Moment;
    private _endDateTime?: moment.Moment;

    /**
     * Intializes a scope with a new startDateTime
     * 
     * @param {string | Date} startDateTime Start date time
     */
    constructor(startDateTime?: string | Date) {
        const startIsValid = !isNaN(Date.parse(startDateTime as string));
        let start = moment();
        if (startIsValid) start = moment(startDateTime);
        this._update(start);
    }

    public get iso() {
        return {
            startDateTime: this._startDateTime.toISOString(),
            endDateTime: this._endDateTime.toISOString(),
        }
    }

    public get date() {
        return {
            startDateTime: this._startDateTime.toDate(),
            endDateTime: this._endDateTime.toDate(),
        }
    }

    private _update(start: moment.Moment) {
        this._startDateTime = helpers.startOfWeek(start);
        this._endDateTime = helpers.endOfWeek(start);
    }

    public add(amount: number, unit: any): TimesheetScope {
        const start = this._startDateTime.clone();
        start.add(amount, unit);
        const n = new TimesheetScope();
        n._update(start);
        return n;
    }


    public getDay(index: number) {
        return this._startDateTime.clone().add(index, 'days' as moment.DurationInputArg2);
    }

    public get isCurrentWeek() {
        return this._startDateTime.week() === moment().week();
    }

    public weekdays(dateFormat = 'dddd DD') {
        return helpers.getWeekdays(this._startDateTime, dateFormat);
    }

    public get timespan() {
        return helpers.getTimespanString(this._startDateTime, this._endDateTime);
    }
}