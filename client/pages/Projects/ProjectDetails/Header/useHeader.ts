import { IBreadcrumbProps } from '@fluentui/react'
import { SET_SELECTED_PROJECT } from 'pages/Projects/reducer/actions'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { ProjectsContext } from '../../context'

export function useHeader() {
  const { t } = useTranslation()
  const { state, dispatch } = useContext(ProjectsContext)
  const history = useHistory()
  const breadcrumb: IBreadcrumbProps = {
    items: [
      {
        key: 'back',
        text:
          state.view === 'search'
            ? t('navigation.ProjectsPage')
            : t('projects.myProjectsText'),
        onClick: () => {
          dispatch(SET_SELECTED_PROJECT({ project: null }))
          history.replace(
            history.location.pathname.split('/').slice(0, -1).join('/')
          )
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
  }
  return { breadcrumb } as const
}
