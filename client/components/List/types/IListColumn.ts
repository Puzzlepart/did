import { ReactNode } from 'react'
import { ItemColumnRenderType } from '../ItemColumn'
import { IListColumnData } from './IListColumnData'

/**
 * @category List
 */

export interface IListColumn<T extends object = any, P extends object = any> {
  /**
   * Unique key for the column.
   */
  key: string

  /**
   * The display name for the column header.
   */
  name: string

  /**
   * The field name to read from the row item.
   */
  fieldName: string

  /**
   * Minimum width for the column.
   */
  minWidth?: number

  /**
   * Maximum width for the column.
   */
  maxWidth?: number

  /**
   * Allow resizing (NOT IMPLEMENTED in v9 migration).
   * This property is accepted for backwards compatibility but has no effect.
   * Column resizing is not currently supported in the DataGrid implementation.
   */
  isResizable?: boolean

  /**
   * Allow multiline content.
   */
  isMultiline?: boolean

  /**
   * Custom class name for the column cells.
   */
  className?: string

  /**
   * Custom render callback.
   */
  onRender?: (item?: T, index?: number, column?: IListColumn<T, P>) => ReactNode
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
