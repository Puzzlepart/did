/* eslint-disable tsdoc/syntax */
import { NavLinkProps } from 'react-router-dom'
import { PermissionScope } from 'security'

/**
 * @category Navigation
 */
export interface INavItemProps extends NavLinkProps {
  text: string
  iconName: string
  permission?: PermissionScope
}
