/* eslint-disable tsdoc/syntax */

import { useAppContext } from 'AppContext'
import { useTranslation } from 'react-i18next'
import { SubscriptionSettings } from 'types'
import { ISettingsSectionProps } from './SettingsSection/types'
import { SubscriptionSettingField } from './types'

/**
 * Subscription config hook
 *
 * @ignore
 */
export function useSubscriptionConfig() {
  const { subscription } = useAppContext()
  const { t } = useTranslation()
  return [
    {
      itemKey: 'info',
      headerText: t('admin.subscriptionInfoHeader'),
      fields: [
        {
          id: 'name',
          type: 'text',
          props: {
            label: t('common.nameLabel'),
            defaultValue: subscription.name
          },
          disabledIf: () => true
        } as SubscriptionSettingField,
        {
          id: 'owner',
          type: 'text',
          props: {
            label: t('common.ownerLabel'),
            defaultValue: subscription.owner
          },
          disabledIf: () => true
        } as SubscriptionSettingField
      ]
    },
    {
      itemKey: 'adsync',
      headerText: t('admin.adsync'),
      fields: [
        {
          id: 'enabled',
          type: 'bool',
          props: {
            label: t('admin.adUserSyncEnabledLabel'),
            description: t('admin.adUserSyncEnabledDescription')
          }
        } as SubscriptionSettingField,
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
        } as SubscriptionSettingField,
        {
          id: 'syncUserPhoto',
          type: 'bool',
          props: {
            label: t('admin.adUserSyncUserPhotoLabel'),
            description: t('admin.adUserSyncUserPhotoDescription')
          },
          hiddenIf: (settings: SubscriptionSettings) =>
            !settings?.adsync?.enabled
        } as SubscriptionSettingField
      ]
    },
    {
      itemKey: 'forecast',
      headerText: t('admin.forecasting'),
      fields: [
        {
          id: 'enabled',
          type: 'bool',
          props: {
            label: t('admin.forecastEnabledLabel'),
            description: t('admin.forecastEnabledDescription')
          }
        } as SubscriptionSettingField,
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
        } as SubscriptionSettingField
      ]
    }
  ] as ISettingsSectionProps[]
}
