import { List } from 'components'
import { ListMenuItem } from 'components/List/ListToolbar'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useCustomerList } from './useCustomerList'

export const CustomerList: TabComponent = (props) => {
  const { t } = useTranslation()
  const { loading, items, columns } = useCustomerList()

  return (
    <>
      <List
        searchBox={{ placeholder: t('common.searchPlaceholder') }}
        enableShimmer={loading}
        items={items}
        columns={columns}
        menuItems={[new ListMenuItem().setDisabled(true)]}
      />
      {props.children}
    </>
  )
}
