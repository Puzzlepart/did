import { createContext } from 'react'
import { IUserSetting } from './types'

export interface IUserSettingsContext {
  onUpdate: (
    setting: IUserSetting ,
    value: string | number | boolean,
    skipReload?: boolean
  ) => void
}

export const UserSettingsContext = createContext<IUserSettingsContext>(null)
