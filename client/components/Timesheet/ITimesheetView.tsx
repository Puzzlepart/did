import * as moment from 'moment';

export interface ITimesheetView {
    startDateTime?: moment.Moment;
    endDateTime?: moment.Moment;
    ignoredKey?: string;
    resolvedKey?: string;
}
