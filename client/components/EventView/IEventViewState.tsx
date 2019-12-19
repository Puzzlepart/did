import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { IGetEventData } from './GET_EVENT_DATA';
import { IEventViewPeriod } from './IEventViewPeriod';

export interface IEventViewState {
    /**
     * Data loading
     */
    loading?: boolean;

    /**
     * The selected view
     */
    selectedView?: string;


    period: IEventViewPeriod;

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