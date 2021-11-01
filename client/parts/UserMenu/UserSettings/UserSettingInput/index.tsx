/* eslint-disable tsdoc/syntax */
import { Dropdown, IDropdownProps, ITextField, ITextFieldProps, IToggleProps, TextField, Toggle } from '@fluentui/react'
import { SubText } from 'components'
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
    case 'number':
      {
        element = (
          <TextField
            {...(setting as ITextFieldProps)}
            onChange={(_event, value) => onUpdate(setting.fieldName, Number.parseInt(value) ?? 0, true)}
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
      <SubText text={setting.description} />
    </div>
  )
}
