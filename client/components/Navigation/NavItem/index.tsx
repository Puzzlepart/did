/* eslint-disable tsdoc/syntax */
import { AppContext } from 'AppContext'
import { Icon } from 'office-ui-fabric-react'
import React, { FunctionComponent, useContext } from 'react'
import { isMobile } from 'react-device-detect'
import { NavLink } from 'react-router-dom'
import styles from './NavItem.module.scss'
import { INavItemProps } from './types'

/**
 * @category Navigation
 */
export const NavItem: FunctionComponent<INavItemProps> = (props: INavItemProps) => {
  const { user } = useContext(AppContext)
  if (!user.hasPermission(props.permission)) return null
  let className = styles.root
  if (isMobile) className += ` ${styles.mobile}`
  return (
    <li className={className}>
      <NavLink
        to={props.to}
        className={styles.link}
        activeClassName={styles.active}>
        <Icon iconName={props.iconName} className={styles.navIcon} />
        <span className={styles.navText}>{props.text}</span>
      </NavLink>
    </li>
  )
}

export * from './types'
