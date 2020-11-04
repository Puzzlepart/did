import { ITypedHash } from '@pnp/common'
import { IListGroups } from 'components/List/types'
import { EventObject } from 'types'
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList'


export interface IEventListProps extends React.HTMLProps<HTMLDivElement> {
    /**
     * List of events
     */
    events: EventObject[];


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
     * Column width overrides
     */
    columnWidths?: ITypedHash<number>;

    /**
     * Resizable columns
     */
    resizableColumns?: boolean;
}
