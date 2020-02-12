import { ITimeEntry } from 'models';
import { ITimesheetPeriod } from '../ITimesheetPeriod';

export interface IEventOverviewProps {
    events: ITimeEntry[];
    period: ITimesheetPeriod;
    isConfirmed?: boolean;
    enableShimmer?: boolean;
}
