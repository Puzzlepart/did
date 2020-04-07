import * as moment from 'moment';
import { ITimeEntry } from 'interfaces';

export type TimesheetView = 'overview' | 'summary' | 'allocation';

export interface ITimesheetProps {
    groupHeaderDateFormat?: string;
}

export interface ITimesheetState {
    /**
     * Data loading
     */
    loading?: boolean;

    /**
     * The selected view/tab
     */
    selectedView?: TimesheetView;

    /**
     * Scope
     */
    scope: ITimesheetScope;

    /**
     * Periods
     */
    periods?: ITimesheetPeriod[];

    /**
     * Selected period id
     */
    selectedPeriodId?: string;
}

export interface ITimesheetScope {
    startDateTime?: moment.Moment;
    endDateTime?: moment.Moment;
    uiMatchedEventsStorageKey?: string;
    uiIgnoredEventsStorageKey?: string;
}

export interface ITimesheetPeriod {
    id?: string;
    name?: string;  
    startDateTime?: string;
    endDateTime?: string;
    events: ITimeEntry[];
    totalDuration?: number;
    confirmedDuration?: number;
    isConfirmed?: boolean;
    errors?: Error[];
  }  