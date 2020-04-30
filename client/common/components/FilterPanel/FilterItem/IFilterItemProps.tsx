import { IFilter, IFilterItem } from '../Filters';

/**
 * @category FilterPanel
 */
export interface IFilterItemProps {
    filter: IFilter;
    onFilterUpdated: (filter: IFilter, item: IFilterItem, checked: boolean) => void;
}
