import { IDropdownOption } from 'office-ui-fabric-react'

export interface IUserSettingInputProps {
  user: any
  setting: IUserSettingInput
}

export interface IUserSettingInput {
  key: string
  label: string
  type: 'dropdown' | 'bool'
  description?: string
  defaultValue?: any
  configuration?: boolean
  reloadAfterSave?: boolean
}

export interface IUserSettingDropdown extends IUserSettingInput {
  options: IDropdownOption[]
}
