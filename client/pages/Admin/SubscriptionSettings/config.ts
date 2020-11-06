import { TFunction } from 'i18next'
import { SubscriptionForecastSettingsInput } from 'types'
import { ISettingsSectionProps } from './SettingsSection/types'

/**
 * Subscription settings
 *
 * @param {TFunction} t Translate function
 */
export const SUBSCRIPTION_SETTINGS = (t: TFunction): ISettingsSectionProps[] => ([
{
  id: 'forecast',
  name:t('admin.forecasting'),
  fields: [
    {
      id: 'enabled',
      type: 'bool',
      props: new Map<string, any>([
        ['label', t('admin.forecastEnabledLabel')],
        ['description', t('admin.forecastEnabledDescription')]
      ])
    },
    {
      id: 'notifications',
      type: 'number',
      props: new Map([
        ['label', t('admin.forecastNotificationsLabel')],
        ['description', t('admin.forecastNotificationsDescription')],
        ['defaultValue', 1],
        ['min', 1],
        ['max', 8],
        ['step', 1]
      ]),
      disabledIf: (settings: SubscriptionForecastSettingsInput) => !settings.enabled
    }
  ]
}])
