/* eslint-disable tsdoc/syntax */
import { useAppContext } from 'AppContext'
import { usePermissions } from 'hooks'
import { Icon } from 'office-ui-fabric-react'
import React, { FunctionComponent } from 'react'
import { isMobile } from 'react-device-detect'
import { NavLink } from 'react-router-dom'
import { PAGE_NAVIGATE } from '../../reducer'
import styles from './NavItem.module.scss'
import { INavItemProps } from './types'

/**
 * @category Navigation
 */
export const NavItem: FunctionComponent<INavItemProps> = (
  props: INavItemProps
) => {
  const { dispatch } = useAppContext()
  const { hasPermission } = usePermissions()
  let className = styles.root
  if (isMobile) className += ` ${styles.mobile}`
  if (!hasPermission(props.permission)) return null
  return (
    <li className={className}>
      <NavLink
        to={props.to}
        className={styles.link}
        activeClassName={styles.active}
        onClick={() => dispatch(PAGE_NAVIGATE())}>
        <Icon iconName={props.iconName} className={styles.navIcon} />
        <span className={styles.navText}>{props.text}</span>
      </NavLink>
    </li>
  )
}

export * from './types'
