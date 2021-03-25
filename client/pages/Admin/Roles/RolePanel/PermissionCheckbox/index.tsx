import { Checkbox, Icon } from '@fluentui/react-react'
import React from 'react'
import styles from './PermissionCheckbox.module.scss'
import { IPermissionCheckboxProps } from './types'

export const PermissionCheckbox: React.FC<IPermissionCheckboxProps> = (
  props
) => {
  return (
    <div className={styles.root} style={{ opacity: props.checked ? 1 : 0.6 }}>
      <Checkbox
        className={styles.checkBox}
        disabled={props.disabled}
        checked={props.checked}
        onChange={(_event, checked_) =>
          props.onToggle(props.permission.id, checked_)
        }
      />
      <div onClick={() => props.onToggle(props.permission.id, !props.checked)}>
        <div title={props.permission.description}>
          <Icon className={styles.icon} iconName={props.permission.iconName} />
          <span>{props.permission.name}</span>
        </div>
        <div
          hidden={!props.permission.description}
          className={styles.description}>
          <span>{props.permission.description}</span>
        </div>
      </div>
    </div>
  )
}
