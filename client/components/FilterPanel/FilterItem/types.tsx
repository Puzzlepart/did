import { IFilter, IFilterItem } from '../Filters'

export interface IFilterItemProps {
  /**
   * Filter
   */
  filter: IFilter

  /**
   * On filter updated
   */
  onFilterUpdated: (filter: IFilter, item: IFilterItem, checked: boolean) => void

  /**
   * Number of items to show by default (can show all with Show all link)
   */
  shortListCount: number
}
