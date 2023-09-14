import { IBreadcrumbProps } from '@fluentui/react'
import { CustomersContext } from 'pages/Customers/context'
import { SET_SELECTED_CUSTOMER } from 'pages/Customers/reducer/actions'
import { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

export function useHeader() {
  const { t } = useTranslation()
  const { state, dispatch } = useContext(CustomersContext)
  const history = useHistory()
  const breadcrumb = useMemo<IBreadcrumbProps>(
    () => ({
      styles: { 
        root: { margin: 0 },
        itemLink: { fontSize: 14 },
        item: { fontSize: 14 },
        chevron: { fontSize: 14 }
       },
      items: [
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
      ]
    }),
    [state.selected]
  )
  return { breadcrumb } as const
}
