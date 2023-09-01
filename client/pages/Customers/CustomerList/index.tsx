import { SelectionMode } from '@fluentui/react'
import { List } from 'components'
import { ListMenuItem } from 'components/List/ListToolbar'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useCustomerList } from './useCustomerList'
import { TabComponent } from 'components/Tabs'

export const CustomerList: TabComponent = (props) => {
  const { t } = useTranslation()
  const { loading, items, columns, setSelectedCustomer } = useCustomerList()

  return (
    <>
      <List
        searchBox={{ placeholder: t('common.searchPlaceholder') }}
        selectionProps={{
          mode: SelectionMode.single,
          onChanged: setSelectedCustomer
        }}
        enableShimmer={loading}
        items={items}
        columns={columns}
        menuItems={[new ListMenuItem().setDisabled(true)]}
      />
      {props.children}
    </>
  )
}
