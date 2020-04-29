import { ITypedHash } from '@pnp/common';
import { IListGroups } from 'common/components/List/IListGroups';
import { ITimeEntry } from 'interfaces/ITimeEntry';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { IProjectColumnProps } from './ProjectColumn/types';

/**
 * @category EventList
 */
export interface IEventListProps {
    /**
     * List of events
     */
    events: ITimeEntry[];

    /**
     * Props for ProjectColumn
     */
    projectColumn?: Partial<IProjectColumnProps>;

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
