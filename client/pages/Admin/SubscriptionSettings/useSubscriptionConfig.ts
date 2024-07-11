import { useTheme } from '@fluentui/react'
import { CheckboxProps, SliderProps } from '@fluentui/react-components'
import { useAppContext } from 'AppContext'
import { DateObject } from 'DateUtils'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { SubscriptionSettings } from 'types'
import { ISettingsSectionProps } from './SettingsSection/types'
import { SubscriptionSettingField } from './types'

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
            description: t(
              'admin.subscriptionSettings.navBackgroundDescription'
            ),
            defaultValue: theme?.semanticColors?.menuHeader
          }
        },
        {
          id: 'logoSrc',
          type: 'image',
          props: {
            label: t('admin.subscriptionSettings.companyLogoLabel'),
            description: t('admin.subscriptionSettings.companyLogoDescription')
          }
        } as SubscriptionSettingField
      ]
    },
    {
      id: 'customers',
      text: t('admin.customersHeader'),
      icon: 'Apps',
      fields: [
        {
          id: 'keyMaxLength',
          type: 'number',
          props: {
            label: t('admin.subscriptionSettings.customerKeyMaxLengthLabel'),
            description: t(
              'admin.subscriptionSettings.customerKeyMaxLengthDescription'
            ),
            defaultValue: 12
          }
        }
      ]
    },
    {
      id: 'projects',
      text: t('admin.projectsHeader'),
      icon: 'Briefcase',
      fields: [
        {
          id: 'showMyProjectsByDefault',
          type: 'bool',
          props: {
            label: t('admin.subscriptionSettings.showMyProjectsByDefaultLabel'),
            description: t(
              'admin.subscriptionSettings.showMyProjectsByDefaultDescription'
            )
          }
        },
        {
          id: 'keyMaxLength',
          type: 'number',
          props: {
            label: t('admin.subscriptionSettings.projectKeyMaxLengthLabel'),
            description: t(
              'admin.subscriptionSettings.projectKeyMaxLengthDescription'
            ),
            defaultValue: 12
          }
        },
        {
          id: 'enableResourceManagement',
          type: 'bool',
          props: {
            label: t(
              'admin.subscriptionSettings.enableResourceManagementLabel'
            ),
            description: t(
              'admin.subscriptionSettings.enableResourceManagementDescription'
            )
          }
        },
        {
          id: 'resourceMetadata',
          type: 'checkboxmulti',
          options: {
            projectRole: t('common.projectRole'),
            hourlyRate: t('common.hourlyRate')
          },
          hiddenIf: (settings: SubscriptionSettings) =>
            !_.get(settings, 'projects.enableResourceManagement'),
          props: {
            label: t('admin.subscriptionSettings.resourceMetadataLabel'),
            description: t(
              'admin.subscriptionSettings.resourceMetadataDescription'
            )
          }
        },
        {
          id: 'enableProjectRoles',
          type: 'bool',
          props: {
            label: t('admin.subscriptionSettings.enableProjectRolesLabel'),
            description: t(
              'admin.subscriptionSettings.enableProjectRolesDescription'
            )
          }
        }
      ]
    },
    {
      id: 'security',
      text: t('admin.security'),
      icon: 'LockOpen',
      fields: [
        {
          id: 'securityGroupEnabled',
          type: 'bool',
          props: {
            label: t('admin.securityGroupEnabledLabel'),
            description: t('admin.securityGroupEnabledDescription')
          }
        },
        {
          id: 'securityGroupId',
          type: 'text',
          hiddenIf: (settings: SubscriptionSettings) =>
            !_.get(settings, 'security.securityGroupEnabled'),
          props: {
            label: t('admin.securityGroupIdLabel'),
            description: t('admin.securityGroupIdDescription')
          }
        },
        {
          id: 'domainRestrictionEnabled',
          type: 'bool',
          disabledIf: (settings: SubscriptionSettings) =>
            !_.get(settings, 'security.securityGroupEnabled'),
          props: {
            label: t('admin.domainRestrictionEnabledLabel'),
            description: t('admin.domainRestrictionEnabledDescription')
          }
        },
        {
          id: 'domainRestriction',
          type: 'text',
          disabledIf: (settings: SubscriptionSettings) =>
            !_.get(settings, 'security.securityGroupEnabled'),
          hiddenIf: (settings: SubscriptionSettings) =>
            !_.get(settings, 'security.domainRestrictionEnabled'),
          props: {
            label: t('admin.domainRestrictionLabel'),
            description: t('admin.domainRestrictionDescription'),
            contentBefore: '@'
          }
        }
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
        },
        {
          id:'timebankEnabled',
          type: 'bool',
          props: {
            label: t('admin.timesheetTimebankEnabledLabel'),
            description: t('admin.timesheetTimebankEnabledDescription')
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
      id: 'budgetTracking',
      text: t('admin.budgetTracking'),
      icon: 'ChartMultiple',
      fields: [
        {
          id: 'enabled',
          type: 'bool',
          props: {
            label: t('admin.budgetTrackingEnabledLabel'),
            description: t('admin.budgetTrackingEnabledDescription')
          }
        }
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
        },
        {
          id: 'missingSubmissionsEnabled',
          type: 'bool',
          hiddenIf: (settings: SubscriptionSettings) =>
            !settings?.teams?.enabled,
          props: {
            label: t('admin.teamsMissingSubmissionsEnabledLabel'),
            description: t('admin.teamsMissingSubmissionsEnabledDescription')
          }
        },
        {
          id: 'missingSubmissionsSinglePeriodText',
          type: 'text',
          hiddenIf: (settings: SubscriptionSettings) =>
            !settings?.teams?.missingSubmissionsEnabled ||
            !settings?.teams?.enabled,
          props: {
            label: t('admin.teamsMissingSubmissionsSinglePeriodText'),
            description: t(
              'admin.teamsMissingSubmissionsSinglePeriodTextDescription'
            ),
            rows: 2
          }
        },
        {
          id: 'missingSubmissionsMultiplePeriodsText',
          type: 'text',
          hiddenIf: (settings: SubscriptionSettings) =>
            !settings?.teams?.missingSubmissionsEnabled ||
            !settings?.teams?.enabled,
          props: {
            label: t('admin.teamsMissingSubmissionsMultiplePeriodsText'),
            description: t(
              'admin.teamsMissingSubmissionsMultiplePeriodsTextDescription'
            ),
            rows: 2
          }
        }
      ]
    }
  ] as ISettingsSectionProps[]
}
