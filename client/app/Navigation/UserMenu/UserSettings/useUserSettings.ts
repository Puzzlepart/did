/* eslint-disable unicorn/prevent-abbreviations */
import { useUpdateUserConfiguration } from 'hooks/user/useUpdateUserConfiguration'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSettingsConfiguration } from './useSettingsConfiguration'

export function useUserSettings() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const {
    updateConfiguration,
    updatePreferredLanguage,
    updateStartPage
  } = useUpdateUserConfiguration()

  /**
   * On update
   *
   * @param key - Key
   * @param value - Value
   */
  const onUpdate = async (key: string, value: string | boolean) => {
    switch (key) {
      case 'preferredLanguage':
        await updatePreferredLanguage(value as string)
        break
      case 'startPage':
        await updateStartPage(value as string)
        break
      default: {
        await updateConfiguration({ [key]: value })
      }
    }
    location.reload()
  }

  const settings = useSettingsConfiguration()

  return {
    t,
    context: { onUpdate },
    openPanel: () => setIsOpen(true),
    dismissPanel: () => setIsOpen(false),
    isOpen,
    settings
  }
}
