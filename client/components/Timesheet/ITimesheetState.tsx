import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { IGetEventData } from './GET_EVENT_DATA';
import { ITimesheetPeriod } from './ITimesheetPeriod';

export type TimesheetView = 'overview' | 'summary' | 'allocation';

export interface ITimesheetState {
    /**
     * Data loading
     */
    loading?: boolean;

    /**
     * The selected view
     */
    selectedView?: TimesheetView;

    /**
     * Period
     */
    period: ITimesheetPeriod;

    /**
     * Is the week confirmed
     */
    isConfirmed?: boolean;

    /**
     * Data
     */
    data?: IGetEventData;

    /**
     * Group by
     */
    groupBy: IContextualMenuItem;
}