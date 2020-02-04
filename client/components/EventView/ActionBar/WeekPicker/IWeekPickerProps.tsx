import { IEventViewPeriod } from '../../ITimesheetPeriod';

export interface IWeekPickerProps {
    period: IEventViewPeriod;
    onChangeWeek: (period: IEventViewPeriod) => void;
}
