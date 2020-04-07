import { TypedHash } from '@pnp/common';
import { ITimesheetView } from '../ITimesheetView';
import { TimesheetView } from '../ITimesheetState';

export interface IActionBarProps {
    /**
     * View
     */
    view: ITimesheetView;

    /**
     * The selected view
     */
    selectedView?: TimesheetView;

    /**
     * On change view callback
     */
    onChangePeriod: (view: ITimesheetView) => void;

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
