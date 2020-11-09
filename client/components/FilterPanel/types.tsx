import { IPanelProps } from 'office-ui-fabric'
import { BaseFilter, IFilter } from './Filters'

export interface IFilterPanelProps extends IPanelProps {
    /**
     * Filters to show
     */
    filters: BaseFilter[];

    /**
     * Items to filter
     */
    items: any[];

    /**
     * On filters updated
     */
    onFilterUpdated: (filters: IFilter[]) => void;

    /**
     * Number of items to show by default (can show all with Show all link)
     */
    shortListCount: number;
}
