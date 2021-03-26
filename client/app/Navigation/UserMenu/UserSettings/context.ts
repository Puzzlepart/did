import { createContext } from 'react'

export interface IUserSettingsContext {
  onUpdate: (key: string, value: string | boolean) => void
}

export const UserSettingsContext = createContext<IUserSettingsContext>(null)
