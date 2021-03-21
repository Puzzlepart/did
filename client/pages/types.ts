/* eslint-disable tsdoc/syntax */
import { FunctionComponent } from 'react'
import { PermissionScope } from 'security'

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
