import moment from 'moment';
import * as helpers from 'helpers';

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

    //TODO: Add comment
    public get iso() {
        return {
            startDateTime: this._startDateTime.toISOString(),
            endDateTime: this._endDateTime.toISOString(),
        }
    }

    //TODO: Add comment
    public get date() {
        return {
            startDateTime: this._startDateTime.toDate(),
            endDateTime: this._endDateTime.toDate(),
        }
    }

    //TODO: Add comment
    private _update(start: moment.Moment) {
        this._startDateTime = helpers.startOfWeek(start);
        this._endDateTime = helpers.endOfWeek(start);
    }

    //TODO: Add comment
    public add(amount: number, unit: any): TimesheetScope {
        const start = this._startDateTime.clone();
        start.add(amount, unit);
        const n = new TimesheetScope();
        n._update(start);
        return n;
    }

    //TODO: Add comment
    public getDay(index: number) {
        return this._startDateTime.clone().add(index, 'days' as moment.DurationInputArg2);
    }

    //TODO: Add comment
    public get isCurrentWeek() {
        return this._startDateTime.week() === moment().week();
    }

    //TODO: Add comment
    public weekdays(dateFormat = 'dddd DD') {
        return helpers.getWeekdays(this._startDateTime, dateFormat);
    }

    //TODO: Add comment
    public get timespan() {
        return helpers.getTimespanString(this._startDateTime, this._endDateTime);
    }
}