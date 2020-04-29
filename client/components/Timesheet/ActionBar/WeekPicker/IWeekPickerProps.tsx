import { ITimesheetScope } from "components/Timesheet/types";

/**
 * @category Timesheet
 */
export interface IWeekPickerProps {
    scope: ITimesheetScope;
    onChange: (scope: ITimesheetScope) => void;
}
