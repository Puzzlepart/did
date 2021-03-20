import { List } from 'components'
import { Checkbox, SelectionMode } from 'office-ui-fabric-react'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { filter, isEmpty } from 'underscore'
import { useCustomerList } from './useCustomerList'

export const CustomerList = () => {
  const { t } = useTranslation()
  const {
    state,
    loading,
    items,
    columns,
    showInactive,
    setShowInactive,
    setSelectedCustomer
  } = useCustomerList()

  return (
    <List
      searchBox={{ placeholder: t('common.searchPlaceholder') }}
      selectionProps={{
        mode: SelectionMode.single,
        onChanged: setSelectedCustomer
      }}
      height={state.selected && 400}
      enableShimmer={loading}
      items={items}
      columns={columns}
      commandBar={{
        items: [
          {
            key: 'TOGGLE_INACTIVE',
            onRender: () => (
              <div hidden={isMobile}>
                <Checkbox
                  styles={{ root: { margin: '6px 0 0 8px' } }}
                  disabled={isEmpty(
                    filter(state.customers, (index) => index.inactive)
                  )}
                  checked={showInactive}
                  label={t('common.toggleInactiveText')}
                  onChange={(_event, checked) => setShowInactive(checked)}
                />
              </div>
            )
          }
        ],
        farItems: []
      }}
    />
  )
}
