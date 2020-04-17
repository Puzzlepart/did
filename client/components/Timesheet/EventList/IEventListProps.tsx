import { ITimeEntry, IProject } from 'interfaces';
import { IListGroups } from 'components/List/IListGroups';
import { ITypedHash } from '@pnp/common';

export interface IEventListProps {
    /**
     * List of events
     */
    events: ITimeEntry[];

    /**
     * Wether the event list is locked (adjustments can be done to project matching)
     */
    isLocked?: boolean;

    /**
     * Callback for when a project is selected for an event
     */
    onProjectSelected?: (event: ITimeEntry, project: IProject) => void;

    /**
     * Callback for when the project for an event is cleared
     */
    onProjectClear?: (event: ITimeEntry) => void;

    /**
     * Callback for when the project for an event is ignored
     */
    onProjectIgnore?: (event: ITimeEntry) => void;

    /**
     * Enable shimmer
     */
    enableShimmer?: boolean;

    /**
     * An array of columns to hide from the view
     */
    hideColumns?: string[];

    /**
     * Date format
     */
    dateFormat?: string;

    /**
     * Groups to render
     */
    groups?: IListGroups;

    /**
     * Column widths
     */
    columnWidths?: ITypedHash<number>;
}
