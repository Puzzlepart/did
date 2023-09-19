/* eslint-disable tsdoc/syntax */
import { PermissionScope } from 'security'
import { StyledComponent } from 'types'

/**
 * Page component
 *
 * @category Pages
 */
export interface PageComponent extends StyledComponent {
  /**
   * Text that describe the page in the navigation
   */
  text?: string
  /**
   * Icon that describe the page in the navigation
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
