import { Checkbox, SelectionMode } from '@fluentui/react'
import { List, TabComponent } from 'components'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { useCustomerList } from './useCustomerList'

export const CustomerList: TabComponent = (props) => {
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
        commandBar={{
          items: [
            {
              key: 'TOGGLE_INACTIVE',
              onRender: () => (
                <div
                  hidden={
                    isMobile ||
                    !_.any(state.customers, (index) => index.inactive)
                  }
                >
                  <Checkbox
                    styles={{ root: { margin: '6px 0 0 8px' } }}
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
        usePreview
      />
      {props.children}
    </>
  )
}
