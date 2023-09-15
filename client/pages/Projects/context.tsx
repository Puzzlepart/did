import { ApolloQueryResult } from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
import { createContext, useContext } from 'react'
import { IProjectListProps } from './ProjectList'
import { IProjectsState } from './types'

/**
 * @category Projects
 */
export interface IProjectsContext {
  state: IProjectsState
  dispatch: React.Dispatch<AnyAction>
  refetch(variables?: any): Promise<ApolloQueryResult<any>>
  loading: boolean
  listProps?: IProjectListProps
}

/**
 * Context object for the Projects component.
 */
export const ProjectsContext = createContext<IProjectsContext>(null)

/**
 * Returns the current value of the ProjectsContext.
 *
 * @returns The current value of the ProjectsContext.
 */
export const useProjectsContext = (): IProjectsContext => {
  const context = useContext(ProjectsContext)
  if (!context) {
    return {
      state: null,
      dispatch: () => null,
      refetch: () => null,
      loading: false
    }
  }
  return context
}
