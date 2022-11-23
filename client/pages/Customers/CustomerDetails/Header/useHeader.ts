import { IBreadcrumbProps } from '@fluentui/react'
import { CustomersContext } from 'pages/Customers/context'
import { SET_SELECTED_CUSTOMER } from 'pages/Customers/reducer/actions'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

export function useHeader() {
  const { t } = useTranslation()
  const { state, dispatch } = useContext(CustomersContext)
  const history = useHistory()
  const breadcrumb: IBreadcrumbProps = {
    items: [
      {
        key: 'back',
        text: t('navigation.CustomersPage'),
        onClick: () => {
          dispatch(SET_SELECTED_CUSTOMER({ customer: null }))
          history.replace(
            [...history.location.pathname.split('/')].slice(0, -1).join('/')
          )
        }
      },
      {
        key: 'selected',
        text: state.selected.name,
        isCurrentItem: true
      }
    ]
  }
  return { breadcrumb } as const
}
