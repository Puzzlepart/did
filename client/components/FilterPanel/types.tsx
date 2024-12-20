import { IListColumn } from 'components/List/types'
import { IPanelProps } from 'components/Panel'
import { BaseFilter, IFilter } from './Filters'

/**
 * @category FilterPanel
 */
export interface IFilterPanelProps extends IPanelProps {
  /**
   * Filters to show
   */
  filters: BaseFilter[]

  /**
   * Items to filter
   */
  items: any[]

  /**
   * On filters updated
   */
  onFiltersUpdated: (filters: IFilter[]) => void

  /**
   * Number of items to show by default (can show all with Show all link)
   *
   * @default 10
   */
  shortListCount?: number

  /**
   * Selected filter
   */
  selectedFilter?: IListColumn
}
