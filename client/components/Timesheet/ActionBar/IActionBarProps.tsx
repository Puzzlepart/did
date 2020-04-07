import { TypedHash } from '@pnp/common';
import { ITimesheetScope } from '../ITimesheetScope';
import { TimesheetView } from '../ITimesheetState';

export interface IActionBarProps {
    /**
     * Scope
     */
    scope: ITimesheetScope;

    /**
     * The selected view
     */
    selectedView?: TimesheetView;

    /**
     * On change scope callback
     */
    onChangeScope: (scope: ITimesheetScope) => void;

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
