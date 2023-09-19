import { useAppContext } from 'AppContext'
import { usePermissions } from 'hooks'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import {
  IUserSetting,
  UserSettingDropdown,
  UserSettingNumber,
  UserSettingToggle
} from './types'

/**
 * Hook for getting the user settings configuration for the current user. This
 * hook is used by the UserSettings component.
 *
 * @returns An array of user settings (`IUserSetting`)
 */
export function useSettingsConfiguration(): IUserSetting[] {
  const { t } = useTranslation()
  const [, hasPermission] = usePermissions()
  const { pages, getUserConfiguration, user } = useAppContext()
  const vacationTotalDaysKey = `vacation.totalDays.${new Date().getFullYear()}`
  return [
    UserSettingDropdown('startPage', {
      label: t('common.startPageLabel'),
      options: [
        {
          key: '/',
          text: t('common.homePage')
        },
        ...pages
          .filter(({ permission }) => permission && hasPermission(permission))
          .map(({ displayName, path }) => ({
            key: path,
            text: displayName
          }))
      ],
      defaultSelectedKey: user.startPage
    }),
    UserSettingDropdown('preferredLanguage', {
      label: t('common.preferredLanguageLabel'),
      description: t('common.preferredLanguageDescription'),
      options: [
        {
          key: 'en-GB',
          text: 'English (United Kingdom)'
        },
        {
          key: 'nb',
          text: 'Norsk (bokmål)'
        },
        {
          key: 'nn',
          text: 'Norsk (nynorsk)'
        }
      ],
      defaultSelectedKey: user.preferredLanguage ?? 'en-GB'
    }),
    UserSettingToggle('ui.stickyNavigation', {
      label: t('common.stickyNavigationLabel'),
      description: t('common.stickyNavigationDescription'),
      hidden: isMobile,
      defaultChecked: getUserConfiguration('ui.stickyNavigation')
    }),
    UserSettingDropdown('ui.theme', {
      label: t('common.uiThemeLabel'),
      options: [
        {
          key: 'light',
          text: t('common.light-theme')
        },
        {
          key: 'dark',
          text: t('common.dark-theme')
        },
        {
          key: 'auto',
          text: t('common.auto-theme')
        }
      ],
      defaultSelectedKey: getUserConfiguration('ui.theme'),
      disabled: true
    }),
    UserSettingNumber(vacationTotalDaysKey, {
      label: t('common.vacationTotalDaysLabel'),
      description: t('common.vacationTotalDaysDescription'),
      min: 0,
      max: 50,
      defaultValue: getUserConfiguration(vacationTotalDaysKey)
    }),
    UserSettingDropdown('vacation.calculationType', {
      label: t('common.vacationCalculationTypeLabel'),
      options: [
        {
          key: 'planned',
          text: t('common.vacationCalculationTypePlanned'),
          data: {
            iconProps: {
              iconName: 'DietPlanNotebook',
              styles: { root: { fontSize: 18, color: 'blue' } }
            },
            description: t('common.vacationCalculationTypePlannedDescription')
          }
        },
        {
          key: 'confirmed',
          text: t('common.vacationCalculationTypeConfirmed'),
          data: {
            iconProps: {
              iconName: 'WaitlistConfirm',
              styles: { root: { fontSize: 18, color: 'green' } }
            },
            description: t('common.vacationCalculationTypeConfirmedDescription')
          }
        }
      ],
      defaultSelectedKey: getUserConfiguration('vacation.calculationType'),
      styles: {
        dropdownItem: { minHeight: 60 },
        dropdownItemSelected: { minHeight: 60 }
      }
    }),
    UserSettingToggle('timesheet.roundUpEvents', {
      label: t('common.roundUpEventsLabel'),
      description: t('common.roundUpEventsDescription'),
      postSaveMessage: t('common.roundUpEventsPostSaveMessage'),
      defaultChecked: getUserConfiguration('timesheet.roundUpEvents')
    })
  ]
}
