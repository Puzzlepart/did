import { ITimeEntry } from 'interfaces';

export interface IStatusBarProps {
    /**
     * Is the parent currently loading
     */
    loading: boolean;

    /**
     * Is the period confirmed
     */
    isConfirmed: boolean;

    /**
     * Events
     */
    events: ITimeEntry[];

    /**
     * Ignored events
     */
    ignoredEvents: string[];

    /**
     * On clear ignores handler
     */
    onClearIgnores: () => void;

    /**
     * Errors
     */
    errors?: Error[];
}
