import * as moment from 'moment-timezone';

export interface ITimesheetPeriod {
    startDateTime?: moment.Moment;
    endDateTime?: moment.Moment;
    ignoredKey?: string;
    resolvedKey?: string;
}
