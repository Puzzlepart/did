import { NavLinkProps } from 'react-router-dom'
import { PermissionScope } from 'security'
import { FluentIconName } from 'utils'

/**
 * @category Navigation
 */
export interface INavItemProps extends NavLinkProps {
  text: string
  iconName?: FluentIconName
  permission?: PermissionScope
}
