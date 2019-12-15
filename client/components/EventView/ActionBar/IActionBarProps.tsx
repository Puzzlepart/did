import { TypedHash } from '@pnp/common';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { IEventViewPeriod } from '../IEventViewPeriod';

export interface IActionBarProps {
    onClick: TypedHash<any>;
    disabled: TypedHash<boolean>;
    period: IEventViewPeriod;
    groupBy?: IContextualMenuItem;
    onChangeWeek: (yearNumber: number, weekNumber: number) => void;
    onGroupByChanged: (groupBy: IContextualMenuItem) => void;
}
