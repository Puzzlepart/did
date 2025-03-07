/* eslint-disable unicorn/prevent-abbreviations */
import { IFilter, IFilterPanelProps } from 'components/FilterPanel'
import { ColumnHeaderContextMenu } from './ColumnHeaderContextMenu'
import { IListColumn } from './IListColumn'
import { IListProps } from './IListProps'
import { IPanelProps } from 'components/Panel'

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
   * Columns
   */
  columns?: IListColumn[]

  /**
   * Items before filters are applied, but after
   * search term is applied.
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
   * Group by options - column
   */
  groupBy?: IListColumn

  /**
   * Filter by options - column
   */
  filterBy?: IListColumn

  /**
   * Sort by options - column and direction
   */
  sortOpts?: SortOptions

  /**
   * Properties for the filter panel. For now
   * all we need is if it's open or not.
   */
  filterPanel?: Pick<IFilterPanelProps, 'open'>

  /**
   * Properties for the view columns panel. For now
   * all we need is if it's open or not.
   */
  viewColumnsPanel?: Pick<IPanelProps, 'open'>
}

export type SortOptions = [string, 'asc' | 'desc']
