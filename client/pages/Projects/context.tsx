import { ApolloQueryResult } from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
import { createContext } from 'react'
import { IProjectsState } from './types'

/**
 * @category Projects
 */
export interface IProjectsContext {
  state: IProjectsState
  dispatch: React.Dispatch<AnyAction>
  refetch(variables?: any): Promise<ApolloQueryResult<any>>
  loading: boolean
}

/**
 * @category Projects
 */
export const ProjectsContext = createContext<IProjectsContext>(null)
