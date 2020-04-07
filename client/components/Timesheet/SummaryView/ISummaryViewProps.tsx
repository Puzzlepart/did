import { ITimesheetView } from '../ITimesheetView';
import { SummaryViewType } from './SummaryViewType';

export interface ISummaryViewProps {
    events: any[];
    view?: ITimesheetView;
    isConfirmed?: boolean;
    enableShimmer?: boolean;
    type: SummaryViewType;
    range?: number;
    exportFileNameTemplate?: string;
}
