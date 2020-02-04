import { ITimeEntry } from 'models';
import { IEventViewPeriod } from '../ITimesheetPeriod';

export interface IEventOverviewProps {
    events: ITimeEntry[];
    period: IEventViewPeriod;
    isConfirmed?: boolean;
    enableShimmer?: boolean;
}
