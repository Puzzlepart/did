import { SummaryViewType } from './SummaryViewType';

/**
 * @category Timesheet
 */
export interface ISummaryViewProps {
    type: SummaryViewType;
    entries?: any[];
    range?: number;
    exportFileNameTemplate?: string;
}
