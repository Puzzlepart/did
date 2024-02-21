/* eslint-disable tsdoc/syntax */
import { PermissionScope } from 'security'
import { StyledComponent } from 'types'
import { FluentIconName } from 'utils'

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
   * @see https://react.fluentui.dev/?path=/docs/concepts-developer-icons-icons-catalog--page
   */
  iconName?: FluentIconName

  /**
   * Path for routing
   */
  path?: string

  /**
   * Permision required to access the page
   */
  permission?: PermissionScope
}
