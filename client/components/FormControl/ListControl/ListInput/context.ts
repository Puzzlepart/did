import { createContext, useContext } from 'react'
import { useListInput } from './useListInput'

export interface IListInputContext extends ReturnType<typeof useListInput> {}

export const ListInputContext = createContext<IListInputContext>(null)

export const useListInputContext = () => useContext(ListInputContext)
