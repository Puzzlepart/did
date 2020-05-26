import { AppContext } from 'AppContext'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { contains } from 'underscore'
import styles from './NavItem.module.scss'
import { INavItemProps } from './types'
import { isMobile } from 'react-device-detect'

export const NavItem = (props: INavItemProps) => {
    const { user } = React.useContext(AppContext)
    if (props.permission && !contains(user.role.permissions, props.permission)) return null
    let className = styles.root
    if (isMobile) className += ` ${styles.mobile}`
    return (
        <li className={className}>
            <NavLink
                to={props.to}
                className={styles.link}
                activeClassName={styles.active} >
                <Icon iconName={props.iconName} className={styles.navIcon} />
                <span className={styles.navText}>
                    {props.text}
                </span>
            </NavLink>
        </li>
    )
}