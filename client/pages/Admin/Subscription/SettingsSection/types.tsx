import { ITabItemProps } from 'components'
import { SubscriptionSettingField } from '../types'

export interface ISettingsSectionProps extends ITabItemProps {
  fields: SubscriptionSettingField[]
}
