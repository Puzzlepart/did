import { SubscriptionSettingField } from '../types'

export interface ISettingsSectionProps {
  id: string
  name: string
  fields: SubscriptionSettingField[]
  settings?: Record<string, any>
  defaultExpanded?: boolean
}
