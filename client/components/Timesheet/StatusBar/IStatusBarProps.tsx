import { ITimeEntry } from 'models';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';

export interface IStatusBarProps {
    loading: boolean;
    isConfirmed: boolean;
    scope: IContextualMenuItem;
    events: ITimeEntry[];
    ignoredEvents: string[];
    onClearIgnores: () => void;
}
