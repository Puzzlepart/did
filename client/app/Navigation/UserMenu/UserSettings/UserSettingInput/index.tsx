/* eslint-disable tsdoc/syntax */
import { Dropdown, IDropdownProps, IToggleProps, Toggle } from '@fluentui/react'
import React, { useContext } from 'react'
import { UserSettingsContext } from '../context'
import { IUserSetting } from '../types'
import styles from './UserSettingInput.module.scss'

/**
 * @category UserMenu
 */
export const UserSettingInput: React.FC<{ setting: IUserSetting }> = ({
  setting
}) => {
  const { onUpdate } = useContext(UserSettingsContext)
  let element: JSX.Element
  switch (setting.type) {
    case 'dropdown':
      {
        element = (
          <Dropdown
            {...(setting as IDropdownProps)}
            onChange={(_event, option) =>
              onUpdate(setting.fieldName, option.key.toString())
            }
          />
        )
      }
      break
    case 'toggle':
      {
        element = (
          <Toggle
            {...(setting as IToggleProps)}
            onChange={(_event, bool) => onUpdate(setting.fieldName, bool)}
          />
        )
      }
      break
    default:
      element = null
  }

  return (
    <div className={styles.root} hidden={setting.hidden}>
      {element}
      <div className={styles.description}>{setting.description}</div>
    </div>
  )
}
