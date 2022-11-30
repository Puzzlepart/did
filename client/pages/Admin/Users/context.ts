import { AnyAction } from '@reduxjs/toolkit'
import { createContext } from 'react'
import { IUsersState } from './types'

export interface IUsersContext {
  state: IUsersState
  dispatch: React.Dispatch<AnyAction>
}

export const UsersContext = createContext<IUsersContext>(null)
