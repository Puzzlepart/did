import { useSubscriptionSettings } from 'AppContext'
import { useMemo } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { IProjectsContext } from './context'
import { useProjectsReducer } from './reducer'
import { useProjectsQuery } from './useProjectsQuery'

/**
 * Component logic for `Projects`. Setting up the `reducer` and `query` for the component,
 * aswell as the `context` object that will be passed down to the children. Also handling
 * the default tab to be shown based on the subscription setting `projects.showMyProjectsByDefault`.
 */
export function useProjects() {
  const { params } = useRouteMatch<{ currentTab: string }>()
  const showMyProjectsByDefault = useSubscriptionSettings(
    'projects.showMyProjectsByDefault'
  )
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
  const renderDetails =
    params.currentTab?.includes('_') || Boolean(state.selected)
  const defaultTab = showMyProjectsByDefault ? 'm' : 's'

  return { context, renderDetails, defaultTab }
}
