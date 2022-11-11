/* eslint-disable tsdoc/syntax */
import {
  Dropdown,
  IDropdownProps,
  ITextFieldProps,
  IToggleProps,
  TextField,
  Toggle
} from '@fluentui/react'
import { SubText } from 'components'
import React, { FC, useContext } from 'react'
import { UserSettingsContext } from '../context'
import { IUserSetting, UserSettingInputType } from '../types'
import styles from './UserSettingInput.module.scss'

/**
 * @category UserMenu
 */
export const UserSettingInput: FC<{ setting: IUserSetting }> = ({
  setting
}) => {
  const { onUpdate } = useContext(UserSettingsContext)
  let element: JSX.Element
  switch (setting.type) {
    case UserSettingInputType.Dropdown:
      {
        element = (
          <Dropdown
            {...(setting as IDropdownProps)}
            onChange={(_event, option) =>
              onUpdate(setting, option.key.toString())
            }
          />
        )
      }
      break
    case UserSettingInputType.Toggle:
      {
        element = (
          <Toggle
            {...(setting as IToggleProps)}
            onChange={(_event, bool) => onUpdate(setting, bool)}
          />
        )
      }
      break
    case UserSettingInputType.Number:
      {
        element = (
          <TextField
            {...(setting as Omit<ITextFieldProps, 'type'>)}
            description={null}
            onChange={(_event, value) =>
              onUpdate(setting, Number.parseInt(value) ?? 0)
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
      <SubText text={setting.description} />
    </div>
  )
}
