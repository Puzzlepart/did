import { ApolloQueryResult, OperationVariables } from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
import { createContext, Dispatch } from 'react'
import { IUsersState } from './types'

/**
 * Represents the context object for the Users page.
 */
export interface IUsersContext {
  /**
   * The current state of the Users component.
   */
  state: IUsersState

  /**
   * A function to dispatch actions to the Users reducer.
   */
  dispatch: Dispatch<AnyAction>

  /**
   * A function to refetch the users query.
   */
  refetch: (
    variables?: Partial<OperationVariables>
  ) => Promise<ApolloQueryResult<any>>
}

export const UsersContext = createContext<IUsersContext>(null)
