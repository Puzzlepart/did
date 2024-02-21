import { IColumn } from '@fluentui/react'
import { ItemColumnRenderType } from '../ItemColumn'
import { IListColumnData } from './IListColumnData'

/**
 * @category List
 */

export interface IListColumn<T extends object = any, P extends object = any>
  extends IColumn {
  /**
   * Data for the column - `IListColumnData`
   */
  data?: IListColumnData

  /**
   * The column should be hidden
   */
  hidden?: boolean

  /**
   * How to render the column.
   */
  renderAs?: ItemColumnRenderType

  /**
   * Create render props to send to the component rendering the column.
   * E.g. `ProjectLink` or `CustomerLink`.
   */
  createRenderProps?: (item: T) => Partial<P>
}
