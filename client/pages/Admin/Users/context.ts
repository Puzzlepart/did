import { ApolloQueryResult, OperationVariables } from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
import { createContext } from 'react'
import { IUsersState } from './types'

export interface IUsersContext {
  state: IUsersState
  dispatch: React.Dispatch<AnyAction>
  refetch: (
    variables?: Partial<OperationVariables>
  ) => Promise<ApolloQueryResult<any>>
}

export const UsersContext = createContext<IUsersContext>(null)
