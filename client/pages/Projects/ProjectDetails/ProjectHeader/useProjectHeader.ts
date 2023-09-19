import { useBreadcrumb } from 'hooks/useBreadcrumb'
import { SET_SELECTED_PROJECT } from 'pages/Projects/reducer/actions'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { createRouterLink } from 'utils'
import { useProjectsContext } from '../../context'

export function useProjectHeader() {
  const { t } = useTranslation()
  const { state, dispatch } = useProjectsContext()
  const history = useHistory()
  const breadcrumb = useBreadcrumb([
    {
      key: 'back',
      text: t('navigation.ProjectsPage'),
      onClick: () => {
        history.replace('/projects/s')
        dispatch(SET_SELECTED_PROJECT(null))
      }
    },
    {
      key: 'customer',
      text: state.selected?.customer.name,
      onClick: () =>
        history.replace(
          createRouterLink('/customers/{{key}}', state.selected?.customer)
        )
    },
    {
      key: 'selected',
      text: state.selected?.name,
      isCurrentItem: true
    }
  ])
  return { breadcrumb }
}
