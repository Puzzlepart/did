import { config } from 'package'
import { usePages } from 'pages/usePages'
import { useTranslation } from 'react-i18next'
import { IUserSetting, IUserSettingDropdown } from './types'

export function useSettingsConfiguration() {
  const { t } = useTranslation()
  const { nav } = usePages()
  return new Set<IUserSetting>([
    {
      key: 'startPage',
      label: t('common.startPageLabel'),
      type: 'dropdown',
      options: nav
        .filter(({ hidden }) => !hidden)
        .map(({ text, to }) => ({
          key: to,
          text
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
    } as IUserSettingDropdown
  ])
}
