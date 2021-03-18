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
} from 'office-ui-fabric-react'

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
   * Callback to render a tooltip for the column header
   */
  onRenderColumnHeader?: (
    props: IDetailsColumnRenderTooltipProps
  ) => JSX.Element
}

export interface IListColumn<T = IListColumnData> extends IColumn {
  /**
   * Data for the column - `IListColumnData`
   */
  data?: T
}

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
   * Fade in properties used by the FadeIn component (react-fade-in)
   *
   * [delay, transitionDuration]
   */
  fadeIn?: [number, number]

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

export interface IListSelectionProps<T = any> {
  mode: SelectionMode
  onChanged: (selected: T) => void
}

export interface IListGroupProps {
  fieldName: string
  groupNames?: string[]
  emptyGroupName?: string
  totalFunc?: (items: any[]) => string
}
