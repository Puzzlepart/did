import { SelectionMode } from 'office-ui-fabric-react'
import { useMemo } from 'react'
import { Project } from 'types'
import { IProjectListProps } from '../ProjectList/types'
import { SET_SELECTED_PROJECT } from '../reducer/actions'

/**
 * Use Project list
 */
export function useProjectList({ state, dispatch, loading, t }) {
  const listProps = useMemo<IProjectListProps>(
    () => ({
      items: null,
      enableShimmer: loading,
      searchBox: {
        placeholder:
          state.view === 'my'
            ? t('projects.myProjectsSearchPlaceholder')
            : t('common.searchPlaceholder'),
        onChange: () => dispatch(SET_SELECTED_PROJECT({ project: null }))
      },
      selectionProps: {
        mode: SelectionMode.single,
        onChanged: (project: Project) => {
          dispatch(SET_SELECTED_PROJECT({ project }))
        }
      },
      height: state.selected && 400
    }),
    [state, dispatch, loading, t]
  )

  return { listProps }
}
