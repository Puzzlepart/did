import { createContext } from 'react'
import { IUserSetting } from './types'

export const UserSettingsContext = createContext<{
  onUpdateUser: (
    setting: IUserSetting,
    value: string | boolean,
    reloadAfterSave?: boolean
  ) => void
}>(null)
