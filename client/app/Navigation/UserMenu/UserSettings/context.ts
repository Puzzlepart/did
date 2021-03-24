import { createContext } from 'react'
import { IUserSettingInput } from './types'

export interface IUserSettingsContext {
  onUpdate: (
    setting: IUserSettingInput,
    value: string | boolean,
    reloadAfterSave?: boolean
  ) => void
}

export const UserSettingsContext = createContext<IUserSettingsContext>(null)
