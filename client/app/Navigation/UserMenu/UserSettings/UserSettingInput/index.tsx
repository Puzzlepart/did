/* eslint-disable tsdoc/syntax */
import get from 'get-value'
import { Dropdown, Toggle } from '@fluentui/react'
import React, { useContext } from 'react'
import { isArray } from 'underscore'
import { UserSettingsContext } from '../context'
import { IUserSettingDropdown, IUserSettingInputProps } from '../types'
import styles from './UserSettingInput.module.scss'

/**
 * @category UserMenu
 */
export const UserSettingInput = ({ user, setting }: IUserSettingInputProps) => {
  const { onUpdate } = useContext(UserSettingsContext)
  const key = isArray(setting.key) ? setting.key.join('.') : setting.key
  const defaultValue = get(user, key) || setting.defaultValue
  let element: JSX.Element
  switch (setting.type) {
    case 'dropdown':
      {
        element = (
          <Dropdown
            {...(setting as IUserSettingDropdown)}
            key={key}
            onChange={(_event, option) =>
              onUpdate(setting, option.key.toString(), setting.reloadAfterSave)
            }
            defaultSelectedKey={defaultValue}
          />
        )
      }
      break
    case 'bool':
      {
        element = (
          <Toggle
            {...setting}
            key={key}
            defaultChecked={defaultValue}
            onChange={(_event, bool) =>
              onUpdate(setting, bool, setting.reloadAfterSave)
            }
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
