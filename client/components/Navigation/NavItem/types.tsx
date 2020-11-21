import { PERMISSION } from 'config/security'
import { NavLinkProps } from 'react-router-dom'

export interface INavItemProps extends NavLinkProps {
  text: string
  iconName: string
  permission?: PERMISSION
}
