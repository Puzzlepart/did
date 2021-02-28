import { List } from 'components'
import { Checkbox, SelectionMode } from 'office-ui-fabric-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { filter, isEmpty } from 'underscore'
import { columns } from './columns'
import { useCustomerList } from './useCustomerList'

export const CustomerList = () => {
  const { t } = useTranslation()
  const {
    state,
    loading,
    items,
    showInactive,
    setShowInactive,
    setSelectedCustomer
  } = useCustomerList()

  return (
    <List
      searchBox={{ placeholder: t('common.searchPlaceholder') }}
      selection={{
        mode: SelectionMode.single,
        onChanged: setSelectedCustomer
      }}
      height={state.selected && 400}
      enableShimmer={loading}
      items={items}
      columns={columns(t)}
      commandBar={{
        items: [
          {
            key: 'TOGGLE_INACTIVE',
            onRender: () => (
              <Checkbox
                styles={{ root: { margin: '6px 0 0 8px' } }}
                disabled={isEmpty(filter(state.customers, (index) => index.inactive))}
                checked={showInactive}
                label={t('common.toggleInactiveText')}
                onChange={(_event, checked) => setShowInactive(checked)}
              />
            )
          }
        ],
        farItems: []
      }}
    />
  )
}
