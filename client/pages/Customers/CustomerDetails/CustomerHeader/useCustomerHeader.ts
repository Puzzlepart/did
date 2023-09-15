import { useBreadcrumb } from 'hooks/useBreadcrumb'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { CustomersContext } from '../../context'
import { SET_SELECTED_CUSTOMER } from '../../reducer/actions'

export function useCustomerHeader() {
  const { t } = useTranslation()
  const { state, dispatch } = useContext(CustomersContext)
  const history = useHistory()
  const breadcrumb = useBreadcrumb([
    {
      key: 'back',
      text: t('navigation.CustomersPage'),
      onClick: () => {
        dispatch(SET_SELECTED_CUSTOMER({ customer: null }))
        history.replace(`/customers/${state.currentTab}`)
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
