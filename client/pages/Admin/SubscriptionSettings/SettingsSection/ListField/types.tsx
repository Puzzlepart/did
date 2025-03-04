import { ISubscriptionSettingList } from '../../types'

export interface IListFieldProps extends ISubscriptionSettingList {
  /**
   * Settings key to use for the list field
   */
  settingsKey: string
}
