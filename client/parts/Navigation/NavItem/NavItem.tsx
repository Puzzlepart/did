import { Icon } from '@fluentui/react'
import { mergeClasses } from '@fluentui/react-components'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { NavLink } from 'react-router-dom'
import { StyledComponent } from 'types'
import styles from './NavItem.module.scss'
import { INavItemProps } from './types'
import { useNavItem } from './useNavItem'

/**
 * @category Navigation
 */
export const NavItem: StyledComponent<INavItemProps> = (props) => {
  const { onClick, isActive, shouldRender } = useNavItem(props)
  return (
    shouldRender && (
      <li
        className={mergeClasses(NavItem.className, isMobile && styles.mobile)}
      >
        {isActive ? (
          <span className={mergeClasses(styles.link, styles.active)}>
            <span className={styles.text}>{props.text}</span>
          </span>
        ) : (
          <NavLink to={props.to} className={styles.link} onClick={onClick}>
            <Icon iconName={props.iconName} className={styles.icon} />
            <span className={styles.text}>{props.text}</span>
          </NavLink>
        )}
      </li>
    )
  )
}

NavItem.displayName
NavItem.className = styles.navItem
