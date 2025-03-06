import { useBreadcrumb, useSwitchCase } from 'hooks'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { createRouterLink } from 'utils'
import { useProjectsContext } from '../../context'
import { SET_SELECTED_PROJECT } from '../../reducer/actions'
import { IProjectsUrlParameters } from '../../types'

/**
 * A hook that returns the breadcrumb items for the project header.
 *
 * @returns An object containing the breadcrumb items.
 */
export function useProjectHeaderBreadcrumb() {
  const { t } = useTranslation()
  const { state, dispatch } = useProjectsContext()
  const urlParameters = useParams<IProjectsUrlParameters>()
  const history = useHistory()
  const detailsTab = useSwitchCase(urlParameters.detailsTab, {
    projects: t('customers.projectsHeaderText'),
    default: t('customers.informationHeaderText')
  })

  return useBreadcrumb(
    [
      {
        value: t('navigation.ProjectsPage'),
        onClick: () => {
          history.replace('/projects/s')
          dispatch(SET_SELECTED_PROJECT(null))
        }
      },
      {
        value: state.selected?.customer.name ?? '...',
        onClick: Boolean(state.selected) && (() =>
          history.replace(
            createRouterLink('/customers/{{key}}', state.selected?.customer)
          )
        )
      },
      {
        value: state.selected?.name ?? '...',
      },
      {
        value: detailsTab
      }
    ],
    [state.selected, detailsTab]
  )
}
