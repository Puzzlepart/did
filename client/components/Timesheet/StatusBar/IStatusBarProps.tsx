import { ITimeEntry } from 'models';

export interface IStatusBarProps {
    loading: boolean;
    isConfirmed: boolean;
    events: ITimeEntry[];
    ignoredEvents: string[];
    onClearIgnores: () => void;
}
