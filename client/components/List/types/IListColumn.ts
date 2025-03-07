import { IColumn } from '@fluentui/react'
import { ItemColumnRenderType } from '../ItemColumn'
import { IListColumnData } from './IListColumnData'

/**
 * @category List
 */

export interface IListColumn<T extends object = any, P extends object = any>
  extends IColumn {
  /**
   * The label of the column (can differ from the name). This
   * will be preferred in the [ViewColumnsPanel](../ViewColumnsPanel/ViewColumnsPanel.tsx) 
   * component.
   */
  label?: string

  /**
   * The description of the column
   */
  description?: string

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
