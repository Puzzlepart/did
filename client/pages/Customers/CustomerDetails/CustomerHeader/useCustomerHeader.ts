/* eslint-disable unicorn/prevent-abbreviations */
import { useBreadcrumb } from 'hooks/useBreadcrumb'
import { ICustomersUrlParameters } from 'pages/Customers/types'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { CustomersContext } from '../../context'
import { SET_SELECTED_CUSTOMER } from '../../reducer/actions'

export function useCustomerHeader() {
  const { t } = useTranslation()
  const { state, dispatch } = useContext(CustomersContext)
  const history = useHistory()
  const urlParams = useParams<ICustomersUrlParameters>()
  const breadcrumb = useBreadcrumb([
    {
      key: 'back',
      text: t('navigation.CustomersPage'),
      onClick: () => {
        dispatch(SET_SELECTED_CUSTOMER(null))
        history.replace(`/customers/${urlParams.currentTab ?? 's'}`)
      }
    },
    {
      key: 'selected',
      text: state.selected?.name,
      isCurrentItem: true
    }
  ])
  return { breadcrumb }
}
