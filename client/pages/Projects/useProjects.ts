import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { IProjectsContext } from './context'
import { useProjectsReducer } from './reducer'
import { IProjectsParameters } from './types'
import { useProjectList } from './useProjectList'
import { useProjectsHistory } from './useProjectsHistory'
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
  const url = useParams<IProjectsParameters>()
  const { state, dispatch } = useProjectsReducer({ url })
  const { refetch, loading } = useProjectsQuery(dispatch)

  useProjectsHistory(state)

  const context = useMemo<IProjectsContext>(
    () => ({
      state,
      dispatch,
      refetch,
      loading
    }),
    [state, dispatch, refetch, loading]
  )

  const listProps = useProjectList(context)
  const renderDetails = !!state.selected || !!url.key

  return { listProps, context, renderDetails } as const
}
