import { TabListProps } from '@fluentui/react-components'
import { FunctionComponent, HTMLProps } from 'react'
import { PermissionScope } from 'security'
import { StyledComponent } from 'types'
import { FluentIconName } from 'utils'
import { ITabHeaderProps } from './TabHeader'

export type TabHeader = string | ITabHeaderProps

/**
 * A tuple representing a tab in the `Tabs` component.
 *
 * - The first item is the component to render.
 * - The second item is the label for the tab.
 * - The third item is an optional object containing additional props for the tab component.
 *
 * @template T The type of the tab's additional props, if any.
 */
type Tab<T extends ITabProps = any> = [FunctionComponent, TabHeader, T?]

/**
 * A record of `Tab` objects, keyed by a string identifier.
 */
export type TabItems = Record<string, Tab<any>>

/**
 * Props for the Tabs component.
 */
export interface ITabsProps extends Omit<TabListProps, 'onTabSelect'> {
  /**
   * An object containing the items to be rendered as tabs.
   * The keys are the tab labels, and the values are tuples containing the component to render and an optional icon.
   */
  items: TabItems

  /**
   * The level in the navigation hierarchy. Used to update the breadcrumb for mobile devices.
   *
   * @default 2
   */
  level?: number
  /**
   * An optional callback function to be called when a tab is selected.
   */
  onTabSelect?: (key: string) => void

  /**
   * An optional flag indicating whether or not to render the tabs with
   * experimental features and styles enabled.
   */
  experimental?: boolean
}

/**
 * Props for a single tab in a tabbed interface.
 */
export interface ITabProps extends HTMLProps<HTMLDivElement> {
  /**
   * An optional ID for the tab.
   */
  id?: string

  /**
   * An optional text for the tab to display in the tab list header.
   */
  text?: string

  /**
   * An optional description for the tab to display in the tab list header.
   */
  description?: string

  /**
   * Icon to display for the tab in the tab list header.
   */
  icon?: FluentIconName | string

  /**
   * Permission scope required to view the tab.
   */
  permission?: PermissionScope
}

/**
 * A type representing a functional component that accepts props of type `T`
 * which should extend `ITabProps`.
 *
 * @template T The type of props that the component accepts.
 */
export type TabComponent<T extends ITabProps = ITabProps> = StyledComponent<T>
