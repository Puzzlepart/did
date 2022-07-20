import { SelectionMode } from '@fluentui/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Project } from 'types'
import { IProjectListProps } from '../ProjectList/types'
import { SET_SELECTED_PROJECT } from '../reducer/actions'

/**
 * Use Project list
 */
export function useProjectList({ state, dispatch, loading }) {
  const { t } = useTranslation()
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
      }
    }),
    [state, dispatch, loading, t]
  )

  return { listProps }
}
