import { ITimesheetPeriod } from '../../ITimesheetPeriod';

export interface IWeekPickerProps {
    period: ITimesheetPeriod;
    onChangeWeek: (period: ITimesheetPeriod) => void;
}
