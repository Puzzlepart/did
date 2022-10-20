import { useSetTimeout } from '@fluentui/react-hooks'
import { useUpdateUserConfiguration } from 'hooks/user/useUpdateUserConfiguration'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { sleep } from 'utils'
import { IUserSetting } from './types'
import { useSettingsConfiguration } from './useSettingsConfiguration'

export function useUserSettings() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const { updateConfiguration, updatePreferredLanguage, updateStartPage } =
    useUpdateUserConfiguration()
  const { setTimeout, clearTimeout } = useSetTimeout()
  const timeout: Record<string, number> = {}

  /**
   * On update
   *
   * @param setting - Setting
   * @param value - Value
   */
  const onUpdate = (
    setting: IUserSetting,
    value: string | number | boolean
  ) => {
    clearTimeout(timeout[setting.fieldName])
    timeout[setting.fieldName] = setTimeout(async () => {
      switch (setting.fieldName) {
        case 'preferredLanguage':
          await updatePreferredLanguage(value as string)
          break
        case 'startPage':
          await updateStartPage(value as string)
          break
        default: {
          await updateConfiguration({ [setting.fieldName]: value })
        }
      }
      if (setting.postSaveMessage) {
        sessionStorage.setItem(
          'did_on_load_user_menu_mesage',
          setting.postSaveMessage
        )
      }
    }, 1500)
  }

  const settings = useSettingsConfiguration()

  return {
    t,
    context: { onUpdate },
    openPanel: () => setIsOpen(true),
    dismissPanel: async () => {
      setIsOpen(false)
      await sleep(1)
      location.reload()
    },
    isOpen,
    settings
  } as const
}
