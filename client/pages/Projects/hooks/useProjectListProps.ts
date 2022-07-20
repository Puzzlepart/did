/* eslint-disable react-hooks/exhaustive-deps */
import { SelectionMode } from '@fluentui/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Project } from 'types'
import { IProjectsContext } from '../context'
import { IProjectListProps } from '../ProjectList/types'
import { SET_SELECTED_PROJECT } from '../reducer/actions'

/**
 * Hook that returns props for `<ProjectList />` component
 * 
 * @param context - Context
 * @param enableShimmer - Enable shimmer (normally while loading)
 * @returns Props for `<ProjectList />` component
 */
export function useProjectListProps(context: IProjectsContext, enableShimmer: boolean) {
  const { t } = useTranslation()
  return useMemo<IProjectListProps>(
    () => ({
      items: [],
      enableShimmer,
      searchBox: {
        placeholder:
          context.state.view === 'my'
            ? t('projects.myProjectsSearchPlaceholder')
            : t('common.searchPlaceholder'),
        onChange: () => context.dispatch(SET_SELECTED_PROJECT({ project: null }))
      },
      selectionProps: {
        mode: SelectionMode.single,
        onChanged: (project: Project) => {
          if (!project) return
          context.dispatch(SET_SELECTED_PROJECT({ project }))
        }
      }
    }),
    [context.state]
  )
}
