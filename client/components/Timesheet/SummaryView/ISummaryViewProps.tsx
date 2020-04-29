import { SummaryViewType } from './SummaryViewType';
import { ITimesheetScope } from '../types';

/**
 * @category Timesheet
 */
export interface ISummaryViewProps {
    events: any[];
    scope?: ITimesheetScope;
    isConfirmed?: boolean;
    enableShimmer?: boolean;
    type: SummaryViewType;
    range?: number;
    exportFileNameTemplate?: string;
}
