/* eslint-disable tsdoc/syntax */
import { Icon } from 'office-ui-fabric-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NavItem.module.scss'
import { INavItemProps } from './types'
import { useNavItem } from './useNavItem'

/**
 * @category Navigation
 */
export const NavItem: React.FC<INavItemProps> = (props) => {
  const { className, onClick, shouldRender } = useNavItem(props)
  return (
    shouldRender && (
      <li className={className}>
        <NavLink
          to={props.to}
          className={styles.link}
          activeClassName={styles.active}
          onClick={onClick}>
          <Icon iconName={props.iconName} className={styles.icon} />
          <span className={styles.text}>{props.text}</span>
        </NavLink>
      </li>
    )
  )
}

export * from './types'
