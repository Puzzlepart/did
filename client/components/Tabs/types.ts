import { TabListProps } from '@fluentui/react-components'
import { FunctionComponent } from 'react'
import { PermissionScope } from 'security'

/**
 * A tuple representing a tab in the `Tabs` component.
 *
 * - The first item is the component to render.
 * - The second item is the label for the tab.
 * - The third item is an optional object containing additional props for the tab component.
 *
 * @template T The type of the tab's additional props, if any.
 */
type Tab<T extends ITabProps = any> = [FunctionComponent, string, T?]

/**
 * Props for the Tabs component.
 */
export interface ITabsProps extends Pick<TabListProps, 'vertical'> {
  /**
   * An object containing the items to be rendered as tabs.
   * The keys are the tab labels, and the values are tuples containing the component to render and an optional icon.
   */
  items: Record<string, Tab<any>>

  /**
   * The level in the navigation hierarchy. Used to update the breadcrumb for mobile devices.
   *
   * @default 2
   */
  level?: number
}

/**
 * Props for a single tab in a tabbed interface.
 */
export interface ITabProps {
  /**
   * An optional ID for the tab.
   */
  id?: string

  /**
   * Permission scope required to view the tab.
   */
  permission?: PermissionScope
}
