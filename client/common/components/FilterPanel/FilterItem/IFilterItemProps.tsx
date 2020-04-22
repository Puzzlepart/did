import { IFilter, IFilterItem } from '../Filters';
export interface IFilterItemProps {
    filter: IFilter;
    onFilterUpdated: (filter: IFilter, item: IFilterItem, checked: boolean) => void;
}
