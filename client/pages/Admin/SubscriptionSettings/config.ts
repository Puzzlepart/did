import { TFunction } from 'i18next'
import { SubscriptionSettings } from '../../../../server/api/graphql/resolvers/types'
import { SubscriptionSetting } from './types'

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
export const SUBSCRIPTION_SETTINGS = (t: TFunction): { [section: string]: SubscriptionSetting[] } => ({
  [t('admin.forecasting')]: [
    {
      key: 'forecast.enabled',
      type: 'bool',
      props: new Map<string, any>([
        ['label', t('admin.forecastEnabledLabel')],
        ['description', t('admin.forecastEnabledDescription')]
      ])
    },
    {
      key: 'forecast.notifications',
      type: 'number',
      props: new Map([
        ['label', t('admin.forecastNotificationsLabel')],
        ['description', t('admin.forecastNotificationsDescription')],
        ['defaultValue', 1],
        ['min', 1],
        ['max', 8],
        ['step', 1]
      ]),
      disabledIf: (settings: SubscriptionSettings) => !settings.forecast.enabled
    }
  ]
})
