import {
  ICommandBarProps,
  IDetailsGroupRenderProps,
  IDetailsHeaderProps,
  IRenderFunction,
  IShimmeredDetailsListProps,
  SelectionMode
} from '@fluentui/react'
import { SearchBoxProps } from '@fluentui/react-components'
import { CSSProperties, HTMLProps } from 'react'
import { ListMenuItem } from '../ListHeader'
import { IListColumn } from './IListColumn'
import { IListGroupProps } from './IListGroupProps'
import { IFilter, IFilterPanelProps } from 'components/FilterPanel'
import { IListContext } from '../context'
import { IListState } from './IListState'

export type ListFilterState = {
  filters: IFilter[]
  isFiltered: boolean
}

interface SearchBox
  extends Omit<SearchBoxProps, 'placeholder' | 'contentAfter'> {
  /**
   * Enable full width for the `SearchBox`. It will be standalone
   * and full width, not inside the `ToolBar`.
   */
  fullWidth?: boolean

  /**
   * Persist the search term in the URL hash.
   */
  persist?: boolean

  /**
   * Placeholder text or function that returns the placeholder text.
   */
  placeholder?:
    | SearchBoxProps['placeholder']
    | ((state: IListState<any>) => SearchBoxProps['placeholder'])

  /**
   * Content after the search box or function that returns the content.
   */
  contentAfter?:
    | SearchBoxProps['contentAfter']
    | ((state: IListState<any>) => SearchBoxProps['contentAfter'])

  /**
   * Delay in milliseconds before executing the search (default: 300).
   */
  searchDelayMs?: number
}

/**
 * @category List
 */

export interface IListProps<T = any>
  extends Pick<HTMLProps<HTMLDivElement>, 'className'>,
    Omit<IShimmeredDetailsListProps, 'selectionMode'> {
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
  searchBox?: SearchBox

  /**
   * Selection props
   */
  selectionProps?: [SelectionMode, ((selected: T | T[]) => void)?]

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
   * Hidden state of the list
   */
  hidden?: boolean

  /**
   * Column header props
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
   * Filter panel props
   */
  filterPanel?: Pick<IFilterPanelProps, 'headerActions' | 'headerElements'>

  /**
   * On filter callback returning `filters` and `isFiltered`.
   */
  onFilter?: (filterState: ListFilterState) => void

  /**
   * Filter values to apply to the list.
   */
  filterValues?: Record<string, any>

  /**
   * Menu items to show in `<Toolbar />` if using the preview mode.
   * This can also be a function that returns the menu items.
   */
  menuItems?: ListMenuItem[] | ((context: IListContext) => ListMenuItem[])

  /**
   * Hide the toolbar
   */
  hideToolbar?: boolean

  /**
   * Get column style for the specified item
   */
  getColumnStyle?: (item: T) => CSSProperties

  /**
   * Use minimal header columns. Styled with small font size,
   * uppercase letters, some letter spacing and text shadows.
   */
  minmalHeaderColumns?: boolean

  /**
   * Always hide the empty message, even if there are no items.
   */
  hideEmptyMessage?: boolean

  /**
   * Empty message to show when there are no items.
   */
  emptyMessage?: string

  /**
   * Enable view columns edit mode in the view columns panel.
   * This feature is (for now) not enabled by default.
   */
  enableViewColumnsEdit?: boolean

  /**
   * Persist view columns in the local storage
   * using the provided key.
   */
  persistViewColumns?: string

  /**
   * Enable filtering of the list.
   */
  filters?: boolean

  /**
   * Error state. If set, the list will display an error message.
   */
  error?: Error
}
