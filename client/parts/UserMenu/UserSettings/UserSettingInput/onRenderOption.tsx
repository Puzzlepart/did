import { Icon, IDropdownOption } from '@fluentui/react'
import React from 'react'
import styles from './UserSettingInput.module.scss'

export function onRenderOption(option: IDropdownOption): JSX.Element {
  return (
    <div className={styles.dropdownOption}>
      {option.data?.iconProps && (
        <div className={styles.iconContainer}>
          <Icon {...option.data?.iconProps} aria-hidden='true' />
        </div>
      )}
      <div>
        <div>
          <span>{option.text}</span>
        </div>
        {option.data?.description && (
          <div className={styles.description}>
            <span>{option.data.description}</span>
          </div>
        )}
      </div>
    </div>
  )
}
