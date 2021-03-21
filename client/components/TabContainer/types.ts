/* eslint-disable tsdoc/syntax */
import { IPivotItemProps, IPivotProps } from 'office-ui-fabric-react'
import { FC } from 'react'
import { PermissionScope } from 'security'

export interface ITabContainerProps extends IPivotProps {
  /**
   * Fixed link width
   *
   * Either specify boolean `true` or `false` or
   * specify the actual width. If `true` is specified
   * **45%** is used as the fixed width.
   *
   * @default false
   */
  fixedLinkWidth?: boolean | string | number

  /**
   * Hide icons on mobile devices
   *
   * @default true
   */
  hideIconsMobile?: boolean

  /**
   * Link height on mobile devices
   *
   * @default 30
   */
  linkHeight?: string | number

  /**
   * Item properties that will be shared between
   * all items in the pivot
   */
  itemProps?: IPivotItemProps

  /**
   * Optionally provide the item that are rendered
   * inside the Pivot. This can be used instead of
   * using `useRef` and `children` when that doesn't
   * work as expected.
   */
  items?: IPivotItemProps[]
}

export interface ITabItemProps extends Omit<IPivotItemProps, 'hidden'> {
  /**
   * The item key can be provided if you want to
   * override the key retrieved from the component
   * name.
   */
  itemKey?: string

  /**
   * The text for the tab link
   */
  headerText?: string

  /**
   * An optional icon to show next to the tab link.
   */
  iconName?: string

  /**
   * Permission required to show the tab link and the tab
   * content
   *
   * If not provided it will be accessible to all users
   */
  permission?: PermissionScope
}

export type TabContainerComponent = FC<ITabContainerProps>

export type TabComponent<T extends ITabItemProps = ITabItemProps> = FC<T>
