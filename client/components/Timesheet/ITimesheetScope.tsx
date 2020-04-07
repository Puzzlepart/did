import * as moment from 'moment';

export interface ITimesheetScope {
    startDateTime?: moment.Moment;
    endDateTime?: moment.Moment;
    ignoredKey?: string;
    resolvedKey?: string;
}
