import { useAppContext } from 'AppContext'
import { usePermissions } from 'hooks'
import { config } from 'package'
import { useTranslation } from 'react-i18next'
import { IUserSetting, IUserSettingDropdown } from './types'

export function useSettingsConfiguration() {
  const { t } = useTranslation()
  const [, hasPermission] = usePermissions()
  const { pages } = useAppContext()
  return new Set<IUserSetting>([
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
      defaultValue: config.app.DEFAULT_USER_LANGUAGE
    } as IUserSettingDropdown,
    {
        key: 'stickyNavigation',
        label: t('common.stickyNavigationLabel'),
        description: t('common.stickyNavigationDescription'),
        type: 'bool',
        reloadAfterSave: true,
        defaultValue: config.app.STICKY_NAVIGATION
      }
  ])
}
