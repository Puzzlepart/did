import { createContext } from 'react'
import { IUserSetting } from './types'

export const UserSettingsContext = createContext<{
  onUpdateUserSettings: (
    setting: IUserSetting,
    value: string | boolean,
    reloadAfterSave?: boolean
  ) => void
}>(null)
