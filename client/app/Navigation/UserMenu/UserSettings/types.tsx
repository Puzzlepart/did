import { IDropdownOption } from 'office-ui-fabric-react'

export interface IUserSettingInputProps {
  user: any
  setting: IUserSetting
}

export interface IUserSetting {
  key: string
  label: string
  type: 'dropdown' | 'bool'
  description?: string
  defaultValue?: any
  reloadAfterSave?: boolean
}

export interface IUserSettingDropdown extends IUserSetting {
  options: IDropdownOption[]
}
