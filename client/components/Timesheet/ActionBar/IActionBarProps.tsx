import { ITimesheetScope, ITimesheetState } from '../types';
import { TimesheetPeriod } from '../TimesheetPeriod';

/**
 * @category Timesheet
 */
export interface IActionBarProps {
    /**
     * State of the Timesheet component
     */
    timesheet: ITimesheetState;

    /**
     * Selected period 
     */
    selectedPeriod?: TimesheetPeriod;

    /**
     * On change scope callback (passing empty object defaults to current week)
     */
    onChangeScope: (scope: ITimesheetScope) => void;

    /**
     * On change period callback
     */
    onChangePeriod: (periodId: string) => void;

    /**
     * On confirm period callback
     */
    onConfirmPeriod: () => void;

    /**
     * On unconfirm period callback
     */
    onUnconfirmPeriod: () => void;
}
