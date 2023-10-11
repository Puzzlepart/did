import { OperationVariables, QueryResult } from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
import { createContext, Dispatch, useContext } from 'react'
import { IUsersState } from './types'

/**
 * Represents the context object for the Users page.
 */
export interface IUsersContext extends QueryResult<any, OperationVariables> {
  /**
   * The current state of the Users component.
   */
  state: IUsersState

  /**
   * A function to dispatch actions to the Users reducer.
   */
  dispatch: Dispatch<AnyAction>
}

export const UsersContext = createContext<IUsersContext>(null)

/**
 * Returns the current value of the `UsersContext`.
 */
export const useUsersContext = () => useContext(UsersContext)
