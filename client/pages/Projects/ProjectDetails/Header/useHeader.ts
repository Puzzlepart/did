/* eslint-disable react-hooks/exhaustive-deps */
import { IBreadcrumbProps } from '@fluentui/react'
import { SET_SELECTED_PROJECT } from 'pages/Projects/reducer/actions'
import { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { ProjectsContext } from '../../context'

export function useHeader() {
  const { t } = useTranslation()
  const { state, dispatch } = useContext(ProjectsContext)
  const history = useHistory()
  const breadcrumb = useMemo<IBreadcrumbProps>(
    () => ({
      styles: { root: { margin: 0 } },
      items: [
        {
          key: 'back',
          text:
            state.view === 'search'
              ? t('navigation.ProjectsPage')
              : t('projects.myProjectsText'),
          onClick: () => {
            history.replace(`/projects/${state.view}`)
            dispatch(SET_SELECTED_PROJECT({ project: null }))
          }
        },
        {
          key: 'customer',
          text: state.selected?.customer.name,
          onClick: () =>
            history.replace(`/customers/search/${state.selected?.customer.key}`)
        },
        {
          key: 'selected',
          text: state.selected?.name,
          isCurrentItem: true
        }
      ]
    }),
    [state.selected]
  )
  return { breadcrumb } as const
}
