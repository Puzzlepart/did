import { TypedHash } from '@pnp/common';
import { ITimesheetPeriod } from '../ITimesheetPeriod';
import { TimesheetView } from '../ITimesheetState';

export interface IActionBarProps {
    /**
     * Period
     */
    period: ITimesheetPeriod;

    /**
     * The selected view
     */
    selectedView?: TimesheetView;

    /**
     * On change period callback
     */
    onChangePeriod: (period: ITimesheetPeriod) => void;

    /**
     * On confirm week callback
     */
    onConfirmWeek: () => void;

    /**
     * On unconfirm week callback
     */
    onUnconfirmWeek: () => void;

    /**
     * On reload callback
     */
    onReload: () => void;

    /**
     * Disabled actions
     */
    disabled: TypedHash<boolean>;
}
