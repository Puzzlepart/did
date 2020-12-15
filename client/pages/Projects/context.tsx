import { ApolloQueryResult } from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
import { createContext } from 'react'
import { IProjectsState, ProjectsQueryResult } from './types'

export interface IProjectsContext {
  state: IProjectsState
  dispatch: React.Dispatch<AnyAction>
  refetch(variables?: any): Promise<ApolloQueryResult<ProjectsQueryResult>>
}

export const ProjectsContext = createContext<IProjectsContext>(null)
