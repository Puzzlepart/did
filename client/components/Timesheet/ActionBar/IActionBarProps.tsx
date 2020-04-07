import { ITimesheetScope, ITimesheetState, ITimesheetPeriod } from "../types";

export interface IActionBarProps {

    /**
     * State of the Timesheet component
     */
    timesheet: ITimesheetState;

    /**
     * Selected period 
     */
    selectedPeriod?: ITimesheetPeriod;

    /**
     * On change scope callback (passing empty object defaults to current week)
     */
    onChangeScope: (scope: ITimesheetScope) => void;

    /**
     * On change period callback
     */
    onChangePeriod: (period:ITimesheetPeriod) => void;

    /**
     * On confirm period callback
     */
    onConfirmPeriod: () => void;

    /**
     * On unconfirm period callback
     */
    onUnconfirmPeriod: () => void;
}
