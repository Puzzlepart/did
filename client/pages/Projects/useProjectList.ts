import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Project } from 'types'
import { IProjectsContext } from './context'
import { IProjectListProps } from './ProjectList/types'
import { SET_SELECTED_PROJECT } from './reducer/actions'

/**
 * Component logic hook for the ProjectList component.
 *
 * @param context Context
 */
export function useProjectList(context: IProjectsContext): IProjectListProps {
  const { t } = useTranslation()
  const listProps = useMemo<IProjectListProps>(
    () => ({
      items: null,
      enableShimmer: context.loading,
      renderLink: true,
      linkOnClick: (project: Project) =>
        context.dispatch(SET_SELECTED_PROJECT({ project })),
      searchBox: {
        placeholder:
          context.state.currentTab === 'm'
            ? t('projects.myProjectsSearchPlaceholder')
            : t('common.searchPlaceholder'),
        onChange: () =>
          context.dispatch(SET_SELECTED_PROJECT({ project: null }))
      }
    }),
    [context, t]
  )

  return listProps
}
