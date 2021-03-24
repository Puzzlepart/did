import { useAppContext } from 'AppContext'
import { useUpdateUserConfiguration } from 'hooks/user/useUpdateUserConfiguration'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isArray } from 'underscore'
import { IUserSettingInput } from './types'
import { useSettingsConfiguration } from './useSettingsConfiguration'

export function useUserSettings() {
  const { t } = useTranslation()
  const { user } = useAppContext()
  const [isOpen, setIsOpen] = useState(false)
  const {
    updateConfiguration,
    updatePreferredLanguage,
    updateStartPage
  } = useUpdateUserConfiguration()

  /**
   * On update user
   *
   * @param setting - Setting
   * @param value - Value
   * @param reloadAfterSave - Reload after save
   */
  const onUpdateUser = async (
    setting: IUserSettingInput,
    value: string | boolean,
    reloadAfterSave = false
  ) => {
    switch (setting.key) {
      case 'preferredLanguage':
        await updatePreferredLanguage(value as string)
        break
      case 'startPage':
        await updateStartPage(value as string)
        break
      default: {
        if (isArray(setting.key)) {
          const key = setting.key.splice(1).join('.')
          await updateConfiguration({ [key]: value })
        }
      }
    }
    if (reloadAfterSave) location.reload()
  }

  const settings = useSettingsConfiguration()

  return {
    t,
    context: { onUpdateUser },
    openPanel: () => setIsOpen(true),
    dismissPanel: () => setIsOpen(false),
    isOpen,
    user,
    settings
  }
}
