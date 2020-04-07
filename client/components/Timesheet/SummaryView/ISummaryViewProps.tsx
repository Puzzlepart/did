import { ITimesheetScope } from '../ITimesheetScope';
import { SummaryViewType } from './SummaryViewType';

export interface ISummaryViewProps {
    events: any[];
    scope?: ITimesheetScope;
    isConfirmed?: boolean;
    enableShimmer?: boolean;
    type: SummaryViewType;
    range?: number;
    exportFileNameTemplate?: string;
}
