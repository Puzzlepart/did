import { ITimeEntry } from 'models';
import { ITimesheetPeriod } from '../ITimesheetPeriod';

export interface ISummaryViewProps {
    events: ITimeEntry[];
    period: ITimesheetPeriod;
    isConfirmed?: boolean;
    enableShimmer?: boolean;
}
