import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { IGetEventData } from './GET_EVENT_DATA';
import { ITimesheetPeriod } from './ITimesheetPeriod';

export interface ITimesheetState {
    /**
     * Data loading
     */
    loading?: boolean;

    /**
     * The selected view
     */
    selectedView?: string;

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

    /**
     * Scope
     */
    scope: IContextualMenuItem;
}