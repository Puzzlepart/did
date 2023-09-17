import { QueryResult } from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
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

export const useCustomersContext = () => useContext(CustomersContext)
