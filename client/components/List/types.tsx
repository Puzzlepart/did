/* eslint-disable tsdoc/syntax */
import {
  CheckboxVisibility,
  IColumn,
  ICommandBarProps,
  IDetailsColumnRenderTooltipProps,
  IDetailsGroupRenderProps,
  IDetailsHeaderProps,
  IRenderFunction,
  ISearchBoxProps,
  IShimmeredDetailsListProps,
  SelectionMode
} from '@fluentui/react'
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
   * Callback to render a tooltip for the column header
   */
  onRenderColumnHeader?: (
    props: IDetailsColumnRenderTooltipProps
  ) => JSX.Element
}

/**
 * @category List
 */
export interface IListColumn<T = IListColumnData> extends IColumn {
  /**
   * Data for the column - `IListColumnData`
   */
  data?: T
}

/**
 * @category List
 */
export interface IListProps<T = any> extends IShimmeredDetailsListProps {
  /**
   * Items
   */
  items: T[]

  /**
   * Columns
   */
  columns?: IListColumn[]

  /**
   * Enable shimmer (normally while loading)
   */
  enableShimmer?: boolean

  /**
   * Fixed height
   */
  height?: number

  /**
   * Search box props
   */
  searchBox?: ISearchBoxProps

  /**
   * Selection
   */
  selectionProps?: IListSelectionProps

  /**
   * Group props
   */
  listGroupProps?: IListGroupProps

  /**
   * Group render props
   */
  listGroupRenderProps?: IDetailsGroupRenderProps

  /**
   * On render details header
   */
  onRenderDetailsHeader?: IRenderFunction<IDetailsHeaderProps>

  /**
   * Command bar props
   */
  commandBar?: ICommandBarProps

  /**
   * Check box visibility
   */
  checkboxVisibility?: CheckboxVisibility

  /**
   * Callback to render the column header
   */
  onRenderColumnHeader?: IRenderFunction<IDetailsColumnRenderTooltipProps>

  /**
   * Filters
   */
  filters?: { [key: string]: any }

  /**
   * Hidden
   */
  hidden?: boolean

  /**
   * Overriding class name for header
   */
  headerClassName?: string
}

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
}

/**
 * @category List
 */
export interface IListSelectionProps<T = any> {
  mode: SelectionMode
  onChanged: (selected: T) => void
}

/**
 * @category List
 */
export interface IListGroupProps {
  fieldName: string
  groupNames?: string[]
  emptyGroupName?: string
  totalFunc?: (items: any[]) => string
}
