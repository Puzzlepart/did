import { Button } from '@fluentui/react-components'
import React, { FC, MouseEventHandler } from 'react'
import styles from './MenuItem.module.scss'
import { IMenuItemProps } from './types'

/**
 * @category UserMenu
 */
export const MenuItem: FC<IMenuItemProps> = (props) => {
  const className = [styles.root]
  let onClick: MouseEventHandler<any> = props.onClick
  if (props.href) {
    onClick = () => {
      window.location.replace(props.href)
    }
  }

  return (
    <div
      className={className.join(' ')}
      title={props.title}
      style={{
        ...props.style,
        position: 'relative'
      }}
    >
      {onClick ? (
        <Button
          appearance='subtle'
          onClick={onClick}
          icon={props.icon}
          style={{ width: '100%' }}
        >
          {props.text}
        </Button>
      ) : (
        <span
          className={styles.text}
          style={props.textStyle}
          hidden={props.hideText}
        >
          {props.icon && <span>{props.icon}</span>}
          {props.text}
        </span>
      )}
      {props.children}
    </div>
  )
}
