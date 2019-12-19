import { TypedHash } from '@pnp/common';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { IEventViewPeriod } from '../IEventViewPeriod';

export interface IActionBarProps {
    onClick: TypedHash<any>;
    disabled: TypedHash<boolean>;
    period: IEventViewPeriod;
    groupBy?: IContextualMenuItem;
    onChangeWeek: (period: IEventViewPeriod) => void;
    onGroupByChanged: (groupBy: IContextualMenuItem) => void;
}
