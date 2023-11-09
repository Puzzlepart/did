import { IDetailsColumnRenderTooltipProps } from '@fluentui/react'
import { BaseFilter } from 'components/FilterPanel'
import { ExcelColumnType } from 'utils/exportExcel'

/**
 * @category List
 */

export interface IListColumnData {
  /**
   * Hidden column
   */
  hidden?: boolean

  /**
   * Optional sub text
   */
  subText?: string

  /**
   * Excel column format
   */
  excelColFormat?: ExcelColumnType

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
   * Filter type. Should be a class that extends `BaseFilter`
   */
  filterType?: new (
    name?: string,
    keyFieldName?: string,
    valueFieldName?: string
  ) => BaseFilter

  /**
   * Callback to render a tooltip for the column header
   */
  onRenderColumnHeader?: (
    props: IDetailsColumnRenderTooltipProps
  ) => JSX.Element
}
