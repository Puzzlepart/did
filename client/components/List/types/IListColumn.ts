import { IColumn } from '@fluentui/react'
import { IListColumnData } from './IListColumnData'

/**
 * @category List
 */

export interface IListColumn extends IColumn {
  /**
   * Data for the column - `IListColumnData`
   */
  data?: IListColumnData

  /**
   * The column should be hidden
   */
  hidden?: boolean

  /**
   * How to render the column
   *
   * - `timeFromNow` - render the column as a time from now
   */
  renderAs?: 'timeFromNow'
}
