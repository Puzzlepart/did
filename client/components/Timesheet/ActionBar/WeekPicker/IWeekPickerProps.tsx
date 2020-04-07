import { ITimesheetScope } from "components/Timesheet/types";

export interface IWeekPickerProps {
    scope: ITimesheetScope;
    onChange: (scope: ITimesheetScope) => void;
}
