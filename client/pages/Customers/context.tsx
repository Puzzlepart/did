import { ApolloQueryResult } from '@apollo/client'
import { createContext } from 'react'
import { CustomersAction } from './reducer'
import { ICustomersState } from './types'

export interface ICustomersContext {
  state: ICustomersState
  dispatch: React.Dispatch<CustomersAction>
  refetch(variables?: any): Promise<ApolloQueryResult<any>>
  loading?: boolean
}

export const CustomersContext = createContext<ICustomersContext>(null)
