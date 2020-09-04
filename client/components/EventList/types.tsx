import { ITypedHash } from '@pnp/common'
import { IListGroups } from 'components/List/types'
import { ITimeEntry } from 'interfaces/ITimeEntry'
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList'

/**
 * @category EventList
 */
export interface IEventListProps extends React.HTMLProps<HTMLDivElement> {
    /**
     * List of events
     */
    events: ITimeEntry[];


    /**
     * Enable shimmer
     */
    enableShimmer?: boolean;

    /**
     * An array of additional columns to add
     */
    additionalColumns?: IColumn[];

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

    /**
     * Resizable columns
     */
    resizableColumns?: boolean;
}
