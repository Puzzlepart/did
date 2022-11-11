import { Checkbox, Icon } from '@fluentui/react'
import { SubText } from 'components'
import React, { FC } from 'react'
import styles from './PermissionCheckbox.module.scss'
import { IPermissionCheckboxProps } from './types'

export const PermissionCheckbox: FC<IPermissionCheckboxProps> = (
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
        <SubText text={props.permission.description} />
      </div>
    </div>
  )
}
