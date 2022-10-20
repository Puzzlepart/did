import { IDropdownProps, ITextFieldProps, IToggleProps } from '@fluentui/react'

export interface IUserSetting
  extends Pick<React.HtmlHTMLAttributes<HTMLDivElement>, 'hidden'> {
  fieldName?: string
  type?: UserSettingInputType
  description?: string
  postSaveMessage?: string
}

export interface IUserSettingDropdown extends IDropdownProps, IUserSetting {}
export interface IUserSettingToggle extends IToggleProps, IUserSetting {}
export interface IUserSettingNumber
  extends Omit<ITextFieldProps, 'type'>,
    IUserSetting {}

export const UserSettingDropdown = (
  fieldName: string,
  props: IUserSettingDropdown
): IUserSettingDropdown => {
  return {
    fieldName,
    type: UserSettingInputType.Dropdown,
    ...props
  }
}

export const UserSettingToggle = (
  fieldName: string,
  props: IUserSettingToggle
): IUserSettingToggle => {
  return {
    fieldName,
    type: UserSettingInputType.Toggle,
    ...props
  }
}

export const UserSettingNumber = (
  fieldName: string,
  props: IUserSettingNumber
): IUserSettingNumber => {
  return {
    fieldName,
    type: UserSettingInputType.Number,
    ...props
  }
}

export enum UserSettingInputType {
  Dropdown,
  Toggle,
  Number
}
