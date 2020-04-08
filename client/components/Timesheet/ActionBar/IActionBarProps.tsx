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
     * On change scope callback (passing empty object defaults to current week)
     */
    onChangeScope: (scope: ITimesheetScope) => void;

    /**
     * On confirm period callback
     */
    onConfirmPeriod: () => void;

    /**
     * On unconfirm period callback
     */
    onUnconfirmPeriod: () => void;

    /**
     * Disabled actions
     */
    disabled: TypedHash<boolean>;
}
