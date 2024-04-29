import { createContext, useContext } from 'react'
import { useUserPicker } from './useUserPicker'

export interface IUserPickerContext extends ReturnType<typeof useUserPicker> {}

export const UserPickerContext = createContext<IUserPickerContext>(null)

export const useUserPickerContext = () => useContext(UserPickerContext)
