import { useMutation } from '@apollo/client'
import { AppContext } from 'AppContext'
import $addOrUpdateUser from 'pages/Admin/Users/UserForm/addOrUpdateUser.gql'
import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSettingsConfiguration } from './useSettingsConfiguration'

export function useUserSettings() {
  const { t } = useTranslation()
  const { user } = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(false)
  const [addOrUpdateUser] = useMutation($addOrUpdateUser)

  /**
   * On update user settings
   *
   * @param key - Key
   * @param value - Value
   * @param reloadAfterSave - Reload after save
   */
  const onUpdateUserSettings = async (
    key: string,
    value: string | boolean,
    reloadAfterSave = false
  ) => {
    await addOrUpdateUser({
      variables: {
        user: { id: user.id, [key]: value },
        update: true
      }
    })
    if (reloadAfterSave) location.reload()
  }

  const settings = useSettingsConfiguration()

  return {
    t,
    context: { onUpdateUserSettings },
    openPanel: () => setIsOpen(true),
    dismissPanel: () => setIsOpen(false),
    isOpen,
    user,
    settings
  }
}
