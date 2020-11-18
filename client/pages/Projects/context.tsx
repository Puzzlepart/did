import { ApolloQueryResult } from '@apollo/client'
import { createContext } from 'react'
import { ProjectsAction } from './reducer'
import { IProjectsState, ProjectsQueryResult } from './types'

export interface IProjectsContext {
  state: IProjectsState;
  dispatch: React.Dispatch<ProjectsAction>;
  refetch(variables?: any): Promise<ApolloQueryResult<ProjectsQueryResult>>
}

export const ProjectsContext = createContext<IProjectsContext>(null)
