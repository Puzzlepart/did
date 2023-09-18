import { useMemo } from 'react'
import { IProjectsContext } from './context'
import { useProjectsReducer } from './reducer'
import { useProjectsQuery } from './useProjectsQuery'

/**
 * Component logic for `Projects`
 *
 * * Using reducer from ../reducer
 * * Using `useProjectsQuery` with `projects.gql`
 */
export function useProjects() {
  const [state, dispatch] = useProjectsReducer()
  const query = useProjectsQuery(dispatch)
  const context = useMemo<IProjectsContext>(
    () => ({
      ...query,
      state,
      dispatch
    }),
    [state, query.loading]
  )
  const renderDetails = !!state.selected

  return { context, renderDetails }
}
