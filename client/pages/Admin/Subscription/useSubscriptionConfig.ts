/* eslint-disable tsdoc/syntax */

import { useTranslation } from 'react-i18next'
import { SubscriptionSettings } from 'types'
import { ISettingsSectionProps } from './SettingsSection/types'

/**
 * Subscription config hook
 *
 * @ignore
 */
export function useSubscriptionConfig() {
  const { t } = useTranslation()
  return [
    {
      id: 'adsync',
      name: t('admin.adsync'),
      fields: [
        {
          id: 'enabled',
          type: 'bool',
          props: {
            label: t('admin.adUserSyncEnabledLabel'),
            description: t('admin.adUserSyncEnabledDescription')
          }
        },
        {
          id: 'properties',
          type: 'checkbox',
          options: {
            givenName: t('common.givenNameLabel'),
            surname: t('common.surnameLabel'),
            jobTitle: t('common.jobTitleLabel'),
            displayName: t('common.displayNameLabel'),
            mobilePhone: t('common.mobilePhoneLabel'),
            preferredLanguage: t('common.preferredLanguageLabel'),
            department: t('common.departmentLabel'),
            officeLocation: t('common.officeLocationLabel')
          },
          props: {
            label: t('admin.adUserSyncPropertiesLabel'),
            description: t('admin.adUserSyncPropertiesDescription')
          },
          hiddenIf: (settings: SubscriptionSettings) =>
            !settings?.adsync?.enabled
        },
        {
          id: 'syncUserPhoto',
          type: 'bool',
          props: {
            label: t('admin.adUserSyncUserPhotoLabel'),
            description: t('admin.adUserSyncUserPhotoDescription')
          },
          hiddenIf: (settings: SubscriptionSettings) =>
            !settings?.adsync?.enabled
        }
      ]
    },
    {
      id: 'forecast',
      name: t('admin.forecasting'),
      fields: [
        {
          id: 'enabled',
          type: 'bool',
          props: {
            label: t('admin.forecastEnabledLabel'),
            description: t('admin.forecastEnabledDescription')
          }
        },
        {
          id: 'notifications',
          type: 'number',
          props: {
            label: t('admin.forecastNotificationsLabel'),
            description: t('admin.forecastNotificationsDescription'),
            defaultValue: 1,
            min: 1,
            max: 8,
            step: 1
          },
          hiddenIf: (settings: SubscriptionSettings) =>
            !settings?.forecast?.enabled
        }
      ]
    }
  ] as ISettingsSectionProps[]
}
