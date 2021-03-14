/* eslint-disable tsdoc/syntax */
import { usePermissions } from 'hooks'
import { Icon } from 'office-ui-fabric-react'
import React, { FunctionComponent, useRef } from 'react'
import { isMobile } from 'react-device-detect'
import { NavLink } from 'react-router-dom'
import styles from './NavItem.module.scss'
import { INavItemProps } from './types'

/**
 * @category Navigation
 */
export const NavItem: FunctionComponent<INavItemProps> = (
  props: INavItemProps
) => {
  const { hasPermission } = usePermissions()
  const target = useRef(null)
  if (!hasPermission(props.permission)) return null
  let className = styles.root
  if (isMobile) className += ` ${styles.mobile}`
  return (
    <li className={className}>
      <NavLink
        ref={target}
        to={props.to}
        className={styles.link}
        activeClassName={styles.active}>
        <Icon iconName={props.iconName} className={styles.navIcon} />
        <span ref={target} className={styles.navText}>
          {props.text}
        </span>
      </NavLink>
    </li>
  )
}

export * from './types'
