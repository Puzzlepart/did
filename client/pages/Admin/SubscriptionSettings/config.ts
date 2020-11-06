import { TFunction } from 'i18next'
import { SubscriptionForecastSettingsInput, SubscriptionSettings } from '../../../../server/api/graphql/resolvers/types'
import { ISettingsSectionProps } from './SettingsSection/types'
/**
 * Subscription settings
 *
 * Consists of the following properties:
 *
 * * key
 * * type
 * * propsx
 * * optional disabledIf
 * * optional hiddenIf
 *
 * @param {TFunction} t Translate function
 */
export const SUBSCRIPTION_SETTINGS = (t: TFunction): ISettingsSectionProps[] => ([
{
  key: 'forecast',
  name:t('admin.forecasting'),
  fields: [
    {
      key: 'enabled',
      type: 'bool',
      props: new Map<string, any>([
        ['label', t('admin.forecastEnabledLabel')],
        ['description', t('admin.forecastEnabledDescription')]
      ])
    },
    {
      key: 'notifications',
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
