import {
  SelectionMode,
  IColumn,
  ISearchBoxProps,
  IDetailsGroupRenderProps,
  IRenderFunction,
  IDetailsHeaderProps,
  ICommandBarProps,
  CheckboxVisibility
} from 'office-ui-fabric'
import { BrowserStorage } from 'utils/browserStorage'

export interface IListProps<T = any> extends React.HTMLProps<HTMLDivElement> {
  /**
   * Items
   */
  items?: T[]

  /**
   * Columns
   */
  columns?: IColumn[]

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
  selection?: IListSelection

  /**
   * Groups
   */
  groups?: IListGroups

  /**
   * Group props
   */
  groupProps?: IDetailsGroupRenderProps

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
   * Fade in props
   *
   * [delay, transitionDuration]
   */
  fadeIn?: [number, number]

  /**
   * Filters
   */
  filters?: { [key: string]: any }

  /**
   * Browser storage instance for persisting column widths
   */
  persistsColumnWidths?: BrowserStorage<Record<string,number>>
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

export interface IListSelection {
  mode: SelectionMode
  defaultSelectedKey?: string
  onChanged: (selected: any) => void
}

export interface IListGroups {
  fieldName: string
  groupNames?: string[]
  emptyGroupName?: string
  totalFunc?: (items: any[]) => string
}
