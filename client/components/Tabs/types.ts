import { FunctionComponent } from 'react'
import { PermissionScope } from 'security'

/**
 * Props for the Tabs component.
 */
export interface ITabsProps {
  /**
   * An object containing the items to be rendered as tabs.
   * The keys are the tab labels, and the values are tuples containing the component to render and an optional icon.
   */
  items: Record<string, [FunctionComponent, string]>

  /**
   * The level in the navigation hierarchy.
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
