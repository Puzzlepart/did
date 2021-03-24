/* eslint-disable tsdoc/syntax */
import { Dropdown, Toggle } from 'office-ui-fabric-react'
import React, { useContext } from 'react'
import { UserSettingsContext } from '../context'
import { IUserSettingDropdown, IUserSettingInputProps } from '../types'
import styles from './UserSettingInput.module.scss'

/**
 * @category UserMenu
 */
export const UserSettingInput = ({ user, setting }: IUserSettingInputProps) => {
  const { onUpdateUser } = useContext(UserSettingsContext)
  const defaultValue = user[setting.key] || setting.defaultValue
  let element: JSX.Element
  switch (setting.type) {
    case 'dropdown':
      {
        element = (
          <Dropdown
            {...(setting as IUserSettingDropdown)}
            onChange={(_event, option) =>
              onUpdateUser(
                setting,
                option.key.toString(),
                setting.reloadAfterSave
              )
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
            defaultValue={defaultValue}
            onChange={(_event, bool) =>
              onUpdateUser(setting, bool, setting.reloadAfterSave)
            }
          />
        )
      }
      break
    default:
      element = null
  }

  return (
    <div className={styles.root}>
      {element}
      <div className={styles.description}>{setting.description}</div>
    </div>
  )
}
