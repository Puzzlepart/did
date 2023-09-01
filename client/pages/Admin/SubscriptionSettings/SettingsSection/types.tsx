import { ITabProps } from 'components/Tabs'
import { SubscriptionSettingField } from '../types'

export interface ISettingsSectionProps extends ITabProps {
  fields: SubscriptionSettingField[]
}
