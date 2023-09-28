import { IBreadcrumbItem } from 'components'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { createRouterLink } from 'utils'
import { useProjectsContext } from '../../context'
import { SET_SELECTED_PROJECT } from '../../reducer/actions'

/**
 * A hook that returns the breadcrumb items for the project header.
 * 
 * @returns An object containing the breadcrumb items.
 */
export function useProjectHeader() {
  const { t } = useTranslation()
  const { state, dispatch } = useProjectsContext()
  const history = useHistory()
  const breadcrumbItems = useMemo<IBreadcrumbItem[]>(() => ([
    {
      key: 0,
      value: t('navigation.ProjectsPage'),
      onClick: () => {
        history.replace('/projects/s')
        dispatch(SET_SELECTED_PROJECT(null))
      }
    },
    {
      key: 1,
      value: state.selected?.customer.name,
      onClick: () =>
        history.replace(
          createRouterLink('/customers/{{key}}', state.selected?.customer)
        )
    },
    {
      key: 2,
      value: state.selected?.name
    }
  ]), [state.selected])
  return { breadcrumbItems }
}
