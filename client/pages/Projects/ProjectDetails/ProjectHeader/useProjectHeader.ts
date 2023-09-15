import { useBreadcrumb } from 'hooks/useBreadcrumb'
import { SET_SELECTED_PROJECT } from 'pages/Projects/reducer/actions'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useProjectsContext } from '../../context'

export function useProjectHeader() {
  const { t } = useTranslation()
  const { state, dispatch } = useProjectsContext()
  const history = useHistory()
  const breadcrumb = useBreadcrumb([
    {
      key: 'back',
      text:
        state.currentTab === 's'
          ? t('navigation.ProjectsPage')
          : t('projects.myProjectsText'),
      onClick: () => {
        history.replace(`/projects/${state.currentTab}`)
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
  ])
  return { breadcrumb }
}
