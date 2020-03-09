import * as moment from 'moment';

export interface ITimesheetPeriod {
    startDateTime?: moment.Moment;
    endDateTime?: moment.Moment;
    ignoredKey?: string;
    resolvedKey?: string;
}
