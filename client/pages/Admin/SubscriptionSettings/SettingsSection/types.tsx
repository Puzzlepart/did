import { ITabProps } from 'components/Tabs'
import { SubscriptionSettingField } from '../types'

export interface ISettingsSectionProps extends ITabProps {
  /**
   * The fields to display in this section.
   */
  fields: SubscriptionSettingField[]
}
