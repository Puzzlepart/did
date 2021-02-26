import { SelectionMode } from 'office-ui-fabric'
import { useMemo } from 'react'
import { IProjectListProps } from '../ProjectList/types'
import { SET_SELECTED_PROJECT } from '../reducer/actions'

/**
 * Use Project list
 */
export function useProjectList({ state, dispatch, loading, t }) {
  const listProps = useMemo<IProjectListProps>(
    () => ({
      enableShimmer: loading,
      searchBox: {
        placeholder:
          state.view === 'my'
            ? t('projects.myProjectsSearchPlaceholder')
            : t('common.searchPlaceholder'),
        onChange: () => dispatch(SET_SELECTED_PROJECT({ project: null }))
      },
      selection: {
        mode: SelectionMode.single,
        onChanged: (selected) => {
          dispatch(SET_SELECTED_PROJECT({ project: selected }))
        }
      },
      height: state.selected && 400
    }),
    [state]
  )

  return { listProps }
}
