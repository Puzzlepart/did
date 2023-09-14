import { Icon } from '@fluentui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { StyledComponent } from 'types'
import styles from './NavItem.module.scss'
import { INavItemProps } from './types'
import { useNavItem } from './useNavItem'

/**
 * @category Navigation
 */
export const NavItem: StyledComponent<INavItemProps> = (props) => {
  const { className, onClick, shouldRender } = useNavItem(props)
  return (
    shouldRender && (
      <li className={className}>
        <NavLink
          to={props.to}
          className={styles.link}
          activeClassName={styles.active}
          onClick={onClick}
        >
          <Icon iconName={props.iconName} className={styles.icon} />
          <span className={styles.text}>{props.text}</span>
        </NavLink>
      </li>
    )
  )
}

NavItem.className = styles.navItem

export * from './types'
