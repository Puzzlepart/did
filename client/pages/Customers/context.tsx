import { ApolloQueryResult } from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
import { createContext } from 'react'
import { ICustomersState } from './types'

export interface ICustomersContext {
  state: ICustomersState
  dispatch: React.Dispatch<AnyAction>
  refetch(variables?: any): Promise<ApolloQueryResult<any>>
  loading?: boolean
}

export const CustomersContext = createContext<ICustomersContext>(null)
