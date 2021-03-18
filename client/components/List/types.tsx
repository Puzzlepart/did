import {
  CheckboxVisibility,
  IColumn,
  ICommandBarProps,
  IDetailsGroupRenderProps,
  IDetailsHeaderProps,
  IRenderFunction,
  ISearchBoxProps,
  IShimmeredDetailsListProps,
  SelectionMode
} from 'office-ui-fabric-react'

export interface IListProps<T = any> extends IShimmeredDetailsListProps {
  /**
   * Items
   */
  items: T[]

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

export interface IListSelectionProps {
  mode: SelectionMode
  defaultSelectedKey?: string
  onChanged: (selected: any) => void
}

export interface IListGroupProps {
  fieldName: string
  groupNames?: string[]
  emptyGroupName?: string
  totalFunc?: (items: any[]) => string
}
