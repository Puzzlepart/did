import { ITimesheetPeriod } from '../../ITimesheetPeriod';

export interface IWeekPickerProps {
    period: ITimesheetPeriod;
    onChange: (period: ITimesheetPeriod) => void;
}
