import { BaseFilter } from 'components/FilterPanel'
import { ExcelColumnType } from 'utils/exportExcel'
import { IListGroupProps } from './IListGroupProps'
import type { IListColumn } from './IListColumn'

export type ListColumnHeaderRenderProps = {
  column: IListColumn
  className?: string
  sortDirection?: 'asc' | 'desc' | null
}

/**
 * @category List
 */

export interface IListColumnData {
  /**
   * Hidden column. For List instances that have customizable columns,
   * this property is used to determine if the column should be hidden
   * in the list instance by default.
   */
  hidden?: boolean

  /**
   * Required column
   */
  required?: boolean

  /**
   * Optional sub text
   */
  subText?: string

  /**
   * Excel column format
   */
  excelColFormat?: ExcelColumnType

  /**
   * Custom render function for the column
   * in Excel exports.
   *
   * @param fieldValue Field value
   */
  excelRenderFunction?: (fieldValue: any) => string | number

  /**
   * Hidden from Excel exports
   */
  hiddenFromExport?: boolean

  /**
   * Is the column sortable?
   */
  isSortable?: boolean

  /**
   * Is the column filterable?
   */
  isFilterable?: boolean

  /**
   * Is the column groupable?
   */
  isGroupable?: boolean

  /**
   * Group options
   */
  groupOptions?: Partial<IListGroupProps>

  /**
   * Filter type. Should be a class that extends `BaseFilter`
   */
  filterType?: new (
    name?: string,
    keyFieldName?: string,
    valueFieldName?: string
  ) => BaseFilter

  /**
   * Callback to render custom column header content.
   */
  onRenderColumnHeader?: (props: ListColumnHeaderRenderProps) => JSX.Element

  /**
   * Hide the mobile label for this column.
   */
  hideMobileLabel?: boolean

}
