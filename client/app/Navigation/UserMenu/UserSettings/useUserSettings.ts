import { useMutation } from '@apollo/client'
import { useAppContext } from 'AppContext'
import $addOrUpdateUser from 'pages/Admin/Users/UserForm/addOrUpdateUser.gql'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IUserSettingInput } from './types'
import { useSettingsConfiguration } from './useSettingsConfiguration'

export function useUserSettings() {
  const { t } = useTranslation()
  const { user } = useAppContext()
  const [isOpen, setIsOpen] = useState(false)
  const [addOrUpdateUser] = useMutation($addOrUpdateUser)

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
    if (setting.configuration) {
      // Handle configuration update
    } else {
      await addOrUpdateUser({
        variables: {
          user: { id: user.id, [setting.key]: value },
          update: true
        }
      })
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
