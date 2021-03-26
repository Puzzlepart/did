import { IDropdownProps, IToggleProps } from '@fluentui/react'

export interface IUserSetting extends Pick<React.HtmlHTMLAttributes<HTMLDivElement>, 'hidden'> {
  fieldName?: string
  type?: string
  description?: string
}

export interface IUserSettingDropdown extends IDropdownProps, IUserSetting { }
export interface IUserSettingToggle extends IToggleProps, IUserSetting { }

export const UserSettingDropdown = (fieldName: string, props: IUserSettingDropdown): IUserSettingDropdown => {
  return {
    fieldName,
    type: 'dropdown',
    ...props
  }
}

export const UserSettingToggle = (fieldName: string, props: IUserSettingToggle): IUserSettingToggle => {
  return {
    fieldName,
    type: 'toggle',
    ...props
  }
}
