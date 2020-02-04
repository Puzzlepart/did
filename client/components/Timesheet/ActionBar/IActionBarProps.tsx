import { TypedHash } from '@pnp/common';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { ITimesheetPeriod } from '../ITimesheetPeriod';

export interface IActionBarProps {
    onClick: TypedHash<any>;
    disabled: TypedHash<boolean>;
    period: ITimesheetPeriod;
    groupBy?: IContextualMenuItem;
    onChangePeriod: (period: ITimesheetPeriod) => void;
    onGroupByChanged: (groupBy: IContextualMenuItem) => void;
}
