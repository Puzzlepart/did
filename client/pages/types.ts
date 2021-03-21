/* eslint-disable tsdoc/syntax */
import { TabItem } from 'components'
import { IPivotItemProps } from 'office-ui-fabric-react'
import { FunctionComponent } from 'react'
import { PermissionScope } from 'security'

/**
 * Defines a page section component
 *
 * @category Pages
 */
export interface IPageSectionComponent extends IPivotItemProps {
  component: TabItem
  permission?: PermissionScope
}

/**
 * Page component
 *
 * @category Pages
 */
export interface PageComponent extends FunctionComponent {
  /**
   * Icon that describe the page
   *
   * @see https://developer.microsoft.com/en-us/fluentui#/styles/web/icons
   */
  iconName?: string

  /**
   * Path for routing
   */
  path?: string

  /**
   * Permision required to access the page
   */
  permission?: PermissionScope
}
