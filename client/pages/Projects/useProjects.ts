import { useMemo } from 'react'
import { IProjectsContext } from './context'
import { useProjectsReducer } from './reducer'
import { useProjectList } from './useProjectList'
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
  const listProps = useProjectList(context)
  const renderDetails = !!state.selected

  return { listProps, context, renderDetails }
}
