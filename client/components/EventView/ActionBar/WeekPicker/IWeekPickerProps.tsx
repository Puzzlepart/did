import { IEventViewPeriod } from '../../IEventViewPeriod';

export interface IWeekPickerProps {
    period: IEventViewPeriod;
    onChangeWeek: (period: IEventViewPeriod) => void;
}
