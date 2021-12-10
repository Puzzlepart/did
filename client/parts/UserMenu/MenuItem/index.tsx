/* eslint-disable tsdoc/syntax */
import { Icon } from '@fluentui/react'
import React from 'react'
import styles from './MenuItem.module.scss'
import { IMenuItemProps } from './types'

/**
 * @category UserMenu
 */
export const MenuItem: React.FC<IMenuItemProps> = (props) => {
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
    <div
      className={className.join(' ')}
      title={props.title}
      style={props.style}
      onClick={onClick}
    >
      {props.iconProps && (
        <Icon
          {...props.iconProps}
          style={props.style}
          className={props.iconClassName || styles.icon}
        />
      )}
      {props.text && (
        <span style={props.textStyle} hidden={props.hideText}>
          {props.text}
        </span>
      )}
      {props.children}
    </div>
  )
}
