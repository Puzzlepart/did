import { IFilter } from 'components/FilterPanel'
import { ColumnHeaderContextMenu } from './ColumnHeaderContextMenu'
import { IListColumn } from './IListColumn'

/**
 * @category List
 */

export interface IListState<T = any> {
  /**
   * Search term
   */
  searchTerm?: string

  /**
   * Original items
   */
  origItems?: T[]

  /**
   * Current items
   */
  items?: T[]

  /**
   * Current filters
   */
  filters?: IFilter[]

  /**
   * Column header context menu `column` and `targetElement`
   */
  columnHeaderContextMenu?: ColumnHeaderContextMenu

  /**
   * Group by column
   */
  groupBy?: IListColumn

  /**
   * Filter by column
   */
  filterBy?: IListColumn

  /**
   * Is filter panel open
   */
  isFilterPanelOpen?: boolean
}
