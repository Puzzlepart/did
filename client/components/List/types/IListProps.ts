import {
  ICommandBarProps,
  IDetailsGroupRenderProps,
  IDetailsHeaderProps,
  IRenderFunction,
  IShimmeredDetailsListProps,
  SelectionMode
} from '@fluentui/react'
import { SearchBoxProps } from '@fluentui/react-search-preview'
import { CSSProperties, HTMLProps } from 'react'
import { ListMenuItem } from '../ListToolbar'
import { IListColumn } from './IListColumn'
import { IListGroupProps } from './IListGroupProps'
import { ListFilterState } from './ListFilterState'

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
  searchBox?: SearchBoxProps

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

  /**
   * Menu items to show in `<Toolbar />` if using the preview mode.
   */
  menuItems?: ListMenuItem[]

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
}
