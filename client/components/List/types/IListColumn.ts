import { IColumn } from '@fluentui/react'
import { IListColumnData } from './IListColumnData'

/**
 * @category List
 */

export interface IListColumn<T extends object = any> extends IColumn {
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
   * - `customerLink` - render the column as a customer link
   */
  renderAs?: 'timeFromNow' | 'customerLink' | 'projectLink'

  /**
   * Create render props to send to the component rendering the column.
   * E.g. `ProjectLink` or `CustomerLink`.
   */
  createRenderProps?: (item: T) => any
}