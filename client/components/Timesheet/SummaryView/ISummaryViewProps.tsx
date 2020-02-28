import { ITimesheetPeriod } from '../ITimesheetPeriod';
import { SummaryViewType } from './SummaryViewType';

export interface ISummaryViewProps {
    events: any[];
    period?: ITimesheetPeriod;
    isConfirmed?: boolean;
    enableShimmer?: boolean;
    type: SummaryViewType;
    range?: number;
    exportFileNameTemplate?: string;
}
