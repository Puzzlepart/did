import { createContext } from 'react'
import { IUserSettingInput } from './types'

export const UserSettingsContext = createContext<{
  onUpdateUser: (
    setting: IUserSettingInput,
    value: string | boolean,
    reloadAfterSave?: boolean
  ) => void
}>(null)
