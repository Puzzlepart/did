import { ITypedHash } from '@pnp/common';
import { IListGroups } from 'common/components/List/IListGroups';
import { IProject, ITimeEntry } from 'interfaces';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';

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
     * Callback for when a project is manually matched for an event
     */
    onManualMatch?: (event: ITimeEntry, project: IProject) => void;

    /**
     * Callback for when the project for an event is unmatched
     */
    onClearManualMatch?: (event: ITimeEntry) => void;

    /**
     * Callback for when the project for an event is ignored
     */
    onIgnoreEvent?: (event: ITimeEntry) => void;

    /**
     * Enable shimmer
     */
    enableShimmer?: boolean;

    /**
     * An array of additional columns to add
     */
    additionalColumns?: IColumn[];

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
     * Show empty days
     */
    showEmptyDays?: boolean;

    /**
     * Column widths
     */
    columnWidths?: ITypedHash<number>;
}
