import { useAppContext } from 'AppContext'
import { usePermissions } from 'hooks'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { IUserSettingDropdown, IUserSettingInput } from './types'

export function useSettingsConfiguration() {
  const { t } = useTranslation()
  const [, hasPermission] = usePermissions()
  const { pages } = useAppContext()
  return new Set<IUserSettingInput>([
    {
      key: 'startPage',
      label: t('common.startPageLabel'),
      type: 'dropdown',
      options: pages
        .filter(({ permission }) => permission && hasPermission(permission))
        .map(({ displayName, path }) => ({
          key: path,
          text: displayName
        })),
      reloadAfterSave: true
    } as IUserSettingDropdown,
    {
      key: 'preferredLanguage',
      label: t('common.preferredLanguageLabel'),
      description: t('common.preferredLanguageDescription'),
      type: 'dropdown',
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
      reloadAfterSave: true,
      defaultValue: 'en-GB'
    } as IUserSettingDropdown,
    {
      key: ['configuration', 'ui', 'stickyNavigation'],
      label: t('common.stickyNavigationLabel'),
      description: t('common.stickyNavigationDescription'),
      type: 'bool',
      hidden: isMobile,
      reloadAfterSave: true
    },
    {
      key: ['configuration', 'ui', 'theme'],
      label: t('common.uiThemeLabel'),
      type: 'dropdown',
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
      reloadAfterSave: true
    }
  ])
}
