import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { ACTIONBAR_ICON_PROPS } from './ACTIONBAR_ICON_PROPS';

export const SCOPE_MONTH: IContextualMenuItem = {
    key: 'SCOPE_MONTH',
    name: 'Month',
    iconProps: { iconName: 'Calendar', ...ACTIONBAR_ICON_PROPS },
};