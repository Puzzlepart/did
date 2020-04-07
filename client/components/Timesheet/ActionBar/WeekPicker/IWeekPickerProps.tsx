import { ITimesheetScope } from '../../ITimesheetScope';

export interface IWeekPickerProps {
    scope: ITimesheetScope;
    onChange: (scope: ITimesheetScope) => void;
}
