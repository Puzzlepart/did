import { useAppContext } from 'AppContext'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { IProjectsContext } from '../context'
import { useProjectsReducer } from '../reducer'
import { IProjectsParameters } from '../types'
import { useProjecstHistory } from './useProjecstHistory'
import { useProjectList } from './useProjectList'
import { useProjectsQuery } from './useProjectsQuery'

/**
 * Hook for Projects
 *
 * * Get history using `useHistory`
 * * Get URL params using `useParams`
 * * Using reducer from ../reducer
 * * Using `useProjectsQuery` with `projects.gql`
 * * Layout effects for initialiing `state` and updating `state`
 *   when the query is reloaded
 */
export function useProjects() {
  const { user } = useAppContext()
  const url = useParams<IProjectsParameters>()
  const { state, dispatch } = useProjectsReducer({ url })
  const { refetch, loading } = useProjectsQuery(dispatch)

  useProjecstHistory(state)

  const context = useMemo<IProjectsContext>(
    () => ({
      state,
      dispatch,
      refetch
    }),
    [state, dispatch, refetch]
  )

  const { listProps } = useProjectList({ state, dispatch, loading })

  return {
    state,
    dispatch,
    listProps,
    user,
    context
  } as const
}
