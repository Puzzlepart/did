import List from 'components/List'
import { Checkbox, SelectionMode } from 'office-ui-fabric'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { filter, isEmpty } from 'underscore'
import { CustomersContext } from '../context'
import { columns } from './columns'

export const CustomerList = () => {
  const { t } = useTranslation()
  const { dispatch, state, loading } = useContext(CustomersContext)
  const [items, setItems] = useState([...state.customers])
  const [showInactive, setShowInactive] = useState(false)

  useEffect(
    () => setItems([...state.customers].filter((p) => (showInactive ? true : !p.inactive))),
    [state.customers, showInactive]
  )

  return (
    <List
      searchBox={{ placeholder: t('common.searchPlaceholder') }}
      selection={{
        mode: SelectionMode.single,
        onChanged: (selected) => dispatch({ type: 'SET_SELECTED_CUSTOMER', customer: selected })
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
                disabled={isEmpty(filter(state.customers, (i) => i.inactive))}
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
