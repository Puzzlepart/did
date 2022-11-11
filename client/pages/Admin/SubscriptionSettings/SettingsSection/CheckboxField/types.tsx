import { ISubscriptionSettingCheckbox } from '../../types'

export interface ICheckboxFieldProps extends ISubscriptionSettingCheckbox {
  settingsKey: string
  settings: Record<string, any>
}
