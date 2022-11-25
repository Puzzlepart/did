import {
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
import { BaseFilter, IFilter } from 'components/FilterPanel'
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
  filterType?: new () => BaseFilter

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
export interface IListColumn extends IColumn {
  /**
   * Data for the column - `IListColumnData`
   */
  data?: IListColumnData

  /**
   * The column should be hidden
   */
  hidden?: boolean
}

export type ListFilterState = { filters: IFilter[]; isFiltered: boolean }

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
   * Command bar props
   */
  commandBar?: ICommandBarProps

  /**
   * Filters
   */
  filters?: { [key: string]: any }

  /**
   * Hidden
   */
  hidden?: boolean

  /**
   * Column header
   */
  columnHeaderProps?: {
    className?: string
    onRender?: IRenderFunction<IDetailsHeaderProps>
  }

  /**
   * Export file name. Set this property to enable Excel export of the
   * list data.
   */
  exportFileName?: string

  /**
   * Default search box width
   *
   * @default 500
   */
  defaultSearchBoxWidth?: number

  /**
   * Filter panel actions
   */
  filterPanelActions?: JSX.Element | JSX.Element[]

  /**
   * On filter callback returning `filters` and `isFiltered`.
   */
  onFilter?: (filterState: ListFilterState) => void

  /**
   * Filter values
   */
  filterValues?: Record<string, any>
}

export type ColumnHeaderContextMenu = {
  column: IListColumn
  target: EventTarget & HTMLElement
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
  isFilterPanelOpen?: boolean
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
  groupData?: any[]
  emptyGroupName?: string
  totalFunc?: (items: any[]) => string
}
