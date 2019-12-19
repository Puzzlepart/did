import { ITimeEntry } from 'models';
import { IEventViewPeriod } from '../IEventViewPeriod';

export interface IEventOverviewProps {
    events: ITimeEntry[];
    period: IEventViewPeriod;
    isConfirmed?: boolean;
    enableShimmer?: boolean;
}
