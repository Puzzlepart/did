import { useBreadcrumb, useSwitchCase } from 'hooks'
import { ICustomersUrlParameters } from 'pages/Customers/types'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { CustomersContext } from '../../context'
import { SET_SELECTED_CUSTOMER } from '../../reducer/actions'

/**
 * A hook that returns an array of breadcrumb items for the customer header.
 *
 * @returns An array of breadcrumb items.
 */
export function useCustomerHeaderBreadcrumb() {
  const { t } = useTranslation()
  const { state, dispatch } = useContext(CustomersContext)
  const history = useHistory()
  const urlParameters = useParams<ICustomersUrlParameters>()
  const detailsTab = useSwitchCase(urlParameters.detailsTab, {
    projects: t('projects.timeEntriesHeaderText'),
    default: t('projects.informationHeaderText')
  })

  const breadcrumbItems = useBreadcrumb(
    [
      {
        value: t('navigation.CustomersPage'),
        onClick: () => {
          dispatch(SET_SELECTED_CUSTOMER(null))
          history.replace('/customers')
        }
      },
      {
        value: state.selected?.name
      },
      {
        value: detailsTab
      }
    ],
    [state.selected, detailsTab]
  )

  return breadcrumbItems
}
