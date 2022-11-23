import { useMemo } from 'react'
import { Project } from 'types'
import { IProjectListProps } from './ProjectList/types'
import { SET_SELECTED_PROJECT } from './reducer/actions'

/**
 * Use Project list
 */
export function useProjectList({ state, dispatch, loading, t }) {
  const listProps = useMemo<IProjectListProps>(
    () => ({
      items: null,
      enableShimmer: loading,
      renderLink: true,
      linkOnClick: (project: Project) => {
        // eslint-disable-next-line no-console
        console.log(project)
        dispatch(SET_SELECTED_PROJECT({ project }))
      },
      searchBox: {
        placeholder:
          state.view === 'my'
            ? t('projects.myProjectsSearchPlaceholder')
            : t('common.searchPlaceholder'),
        onChange: () => dispatch(SET_SELECTED_PROJECT({ project: null }))
      }
    }),
    [state, dispatch, loading, t]
  )

  return { listProps }
}
