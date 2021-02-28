import {PERMISSION} from 'config/security';
import {NavLinkProps} from 'react-router-dom';

/**
 * @category Navigation
 */
export interface INavItemProps extends NavLinkProps {
	text: string;
	iconName: string;
	permission?: PERMISSION;
}
