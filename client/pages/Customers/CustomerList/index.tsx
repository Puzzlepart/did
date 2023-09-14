import { InactiveCheckboxMenuItem, List } from 'components'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useCustomerList } from './useCustomerList'

export const CustomerList: TabComponent = (props) => {
  const { t } = useTranslation()
  const { loading, items, columns, toggleInactive } = useCustomerList()

  return (
    <>
      <List
        searchBox={{ placeholder: t('common.searchPlaceholder') }}
        enableShimmer={loading}
        items={items}
        columns={columns}
        menuItems={[
          InactiveCheckboxMenuItem(
            t('customers.toggleInactive'),
            toggleInactive
          )
        ]}
      />
      {props.children}
    </>
  )
}
