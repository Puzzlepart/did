import { NavLinkProps } from 'react-router-dom'

export interface INavItemProps extends NavLinkProps {
    text: string;
    iconName: string;
    permissionId?: string;
}
