import { createContext } from 'react'

export interface IUserSettingsContext {
  onUpdate: (key: string, value: string | number | boolean, skipReload?: boolean) => void
}

export const UserSettingsContext = createContext<IUserSettingsContext>(null)
