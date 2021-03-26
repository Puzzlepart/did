import { useAppContext } from 'AppContext'
import { usePermissions } from 'hooks'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { IUserSetting, UserSettingDropdown, UserSettingToggle } from './types'

export function useSettingsConfiguration(): IUserSetting[] {
  const { t } = useTranslation()
  const [, hasPermission] = usePermissions()
  const { pages, getUserConfiguration, user } = useAppContext()
  return [
    UserSettingDropdown('startPage', {
      label: t('common.startPageLabel'),
      options: pages
        .filter(({ permission }) => permission && hasPermission(permission))
        .map(({ displayName, path }) => ({
          key: path,
          text: displayName
        })),
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
      defaultSelectedKey: user.preferredLanguage || 'en-GB'
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
      hidden: true
    })
  ]
}
