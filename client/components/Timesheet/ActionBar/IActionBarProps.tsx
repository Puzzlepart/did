import { TypedHash } from '@pnp/common';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { ITimesheetPeriod } from '../ITimesheetPeriod';
import { TimesheetView } from '../ITimesheetState';

export interface IActionBarProps {
    /**
     * Period
     */
    period: ITimesheetPeriod;

    /**
     * Group by
     */
    groupBy?: IContextualMenuItem;

    /**
     * The selected view
     */
    selectedView?: TimesheetView;

    /**
     * On change group by callback
     */
    onChangeGroupBy: (groupBy: IContextualMenuItem) => void;

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
