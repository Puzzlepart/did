import { QueryResult } from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
import get from 'get-value'
import { createContext, Dispatch, useContext } from 'react'
import { Customer } from 'types'
import { ICustomersState } from './types'

/**
 * Interface for the Customers context object.
 */
export interface ICustomersContext
  extends QueryResult<{ customers: Customer }> {
  /**
   * The current state of the Customers component.
   */
  state: ICustomersState

  /**
   * The dispatch function for the Customers component.
   */
  dispatch: Dispatch<AnyAction>
}

export const CustomersContext = createContext<ICustomersContext>(null)

/**
 * Use this hook to access the Customers context. Optionally, you can pass a path
 * to a specific property in the context. E.g. `useCustomersContext('state.loading')`.
 *
 * @param path Optional path to a specific property in the context.
 */
export function useCustomersContext<T = ICustomersContext>(path?: string): T {
  const context = useContext(CustomersContext)
  if (path) return get(context, path, { default: null }) as T
  return context as T
}
