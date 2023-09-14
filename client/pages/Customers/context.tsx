import { ApolloQueryResult } from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
import { createContext, Dispatch, useContext } from 'react'
import { ICustomersState } from './types'

/**
 * Interface for the Customers context object.
 */
export interface ICustomersContext {
  /**
   * The current state of the Customers component.
   */
  state: ICustomersState

  /**
   * The dispatch function for the Customers component.
   */
  dispatch: Dispatch<AnyAction>

  /**
   * Refetches the query.
   */
  refetch(variables?: any): Promise<ApolloQueryResult<any>>

  /**
   * Whether the component is loading.
   */
  loading?: boolean
}

export const CustomersContext = createContext<ICustomersContext>(null)

export const useCustomersContext = () => useContext(CustomersContext)
