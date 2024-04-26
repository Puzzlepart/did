import { QueryResult } from '@apollo/client'
import { AnyAction } from '@reduxjs/toolkit'
import { createContext, useContext } from 'react'
import { IProjectsState } from './types'

/**
 * The context object for the `Projects` component.
 *
 * @category Projects
 */
export interface IProjectsContext
  extends Partial<
    QueryResult<Pick<IProjectsState, 'projects' | 'outlookCategories'>>
  > {
  /**
   * The current state of the `Projects` component.
   */
  state: IProjectsState

  /**
   * A dispatch function to update the state of the `Projects` component.
   * This might not be available in the context when used outside of the
   * `Projects` component.
   */
  dispatch?: React.Dispatch<AnyAction>
}

/**
 * Context object for the Projects component.
 */
export const ProjectsContext = createContext<IProjectsContext>(null)

/**
 * Returns the current value of the `ProjectsContext` or
 * a default value if the context is not set or available.
 *
 * @returns The current value of the `ProjectsContext`.
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
