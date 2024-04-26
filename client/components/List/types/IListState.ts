import { IFilter, IFilterPanelProps } from 'components/FilterPanel'
import { ColumnHeaderContextMenu } from './ColumnHeaderContextMenu'
import { IListColumn } from './IListColumn'
import { IListProps } from './IListProps'

/**
 * @category List
 */

export interface IListState<T = any> extends Pick<IListProps, 'filterValues'> {
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
   * Items before filters are applied,
   * but after search term is applied.
   */
  itemsPreFilter?: T[]

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
  filterPanel?: Pick<IFilterPanelProps, 'open'>
}
