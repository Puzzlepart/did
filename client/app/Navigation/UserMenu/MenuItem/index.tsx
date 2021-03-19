/* eslint-disable tsdoc/syntax */
import { Icon } from 'office-ui-fabric-react'
import React, { FunctionComponent } from 'react'
import styles from './MenuItem.module.scss'
import { IMenuItemProps } from './types'

/**
 * @category UserMenu
 */
export const MenuItem: FunctionComponent<IMenuItemProps> = (
  props: IMenuItemProps
) => {
  const className = [styles.root]
  let onClick = props.onClick
  if (props.href) {
    onClick = () => {
      window.location.replace(props.href)
    }
  }

  if (onClick) {
    className.push(styles.clickable)
  }

  return (
    <div className={className.join(' ')} style={props.style} onClick={onClick}>
      {props.iconProps && <Icon {...props.iconProps} className={styles.icon} />}
      {props.text && <span>{props.text}</span>}
      {props.children}
    </div>
  )
}
