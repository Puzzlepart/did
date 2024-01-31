import { CheckboxProps, SliderProps } from '@fluentui/react-components'
import { useAppContext } from 'AppContext'
import { DateObject } from 'DateUtils'
import { useTranslation } from 'react-i18next'
import { SubscriptionSettings } from 'types'
import { ISettingsSectionProps } from './SettingsSection/types'
import { SubscriptionSettingField } from './types'
import { useTheme } from '@fluentui/react'

/**
 * Component logic for `SubscriptionSettings` component. Handles the
 * configuration of the subscription settings sections and input fields.
 *
 * @category SubscriptionSettings
 */
export function useSubscriptionConfig() {
  const { subscription } = useAppContext()
  const theme = useTheme()
  const { t } = useTranslation()
  return [
    {
      id: 'info',
      text: t('admin.subscriptionInfoHeader'),
      icon: 'Info',
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
      id: 'brand',
      text: t('admin.subscriptionBrandHeader'),
      icon: 'Color',
      fields: [
        {
          id: 'navBackground',
          type: 'text',
          props: {
            label: t('admin.subscriptionSettings.navBackgroundLabel'),
            description: t('admin.subscriptionSettings.navBackgroundDescription'),
            defaultValue: theme?.semanticColors?.menuHeader
          }
        },
        {
          id: 'logoSrc',
          type: 'text',
          props: {
            label: t('admin.subscriptionSettings.companyLogoLabel'),
            description: t('admin.subscriptionSettings.companyLogoDescription'),
            defaultValue: ''
          }
        } as SubscriptionSettingField
      ]
    },
    {
      id: 'timesheet',
      icon: 'Timeline',
      text: t('admin.timesheet'),
      fields: [
        {
          id: 'dayFormat',
          type: 'text',
          props: {
            label: t('admin.timesheetDayFormatLabel'),
            description: t('admin.timesheetDayFormatDescription'),
            defaultValue: 'dddd DD',
            getContentAfter: (value: string) => new DateObject().format(value)
          }
        },
        {
          id: 'timeFormat',
          type: 'text',
          props: {
            label: t('admin.timesheetTimeFormatLabel'),
            description: t('admin.timesheetTimeFormatDescription'),
            defaultValue: 'HH:mm',
            getContentAfter: (value: string) => new DateObject().format(value)
          }
        }
      ]
    },
    {
      id: 'adsync',
      icon: 'PersonSync',
      text: t('admin.adsync'),
      fields: [
        {
          id: 'enabled',
          type: 'bool',
          props: {
            label: t('admin.adUserSyncEnabledLabel'),
            description: t('admin.adUserSyncEnabledDescription')
          }
        } as SubscriptionSettingField<CheckboxProps>,
        {
          id: 'properties',
          type: 'checkboxmulti',
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
        } as SubscriptionSettingField<CheckboxProps>
      ]
    },
    {
      id: 'forecast',
      icon: 'Timeline',
      text: t('admin.forecasting'),
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
        } as SubscriptionSettingField<SliderProps>
      ]
    },
    {
      id: 'vacation',
      text: t('admin.vacation'),
      icon: 'WeatherSunnyLow',
      fields: [
        {
          id: 'totalDays',
          type: 'number',
          props: {
            label: t('admin.vacationTotalDaysLabel'),
            description: t('admin.vacationTotalDaysDescription'),
            min: 20,
            max: 40,
            step: 1
          }
        } as SubscriptionSettingField,
        {
          id: 'eventCategory',
          type: 'text',
          props: {
            label: t('admin.vacationEventCategoryLabel'),
            description: t('admin.vacationEventCategoryDescription')
          }
        } as SubscriptionSettingField
      ]
    },
    {
      id: 'teams',
      text: t('admin.teams'),
      icon: 'PeopleTeam',
      fields: [
        {
          id: 'enabled',
          type: 'bool',
          props: {
            label: t('admin.teamsEnabledLabel'),
            description: t('admin.teamsEnabledDescription')
          }
        }
      ]
    }
  ] as ISettingsSectionProps[]
}
