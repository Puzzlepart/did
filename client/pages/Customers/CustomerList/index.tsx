import { SelectionMode } from '@fluentui/react'
import { List, TabComponent } from 'components'
import { ListMenuItem } from 'components/List/ListToolbar'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useCustomerList } from './useCustomerList'

// TODO: Add TOGGLE_INACTIVE action to menuItems

// commandBar={{
//   items: [
//     {
//       key: 'TOGGLE_INACTIVE',
//       onRender: () => (
//         <div
//           hidden={
//             isMobile ||
//             !_.any(state.customers, (index) => index.inactive)
//           }
//         >
//           <Checkbox
//             styles={{ root: { margin: '6px 0 0 8px' } }}
//             checked={showInactive}
//             label={t('common.toggleInactiveText')}
//             onChange={(_event, checked) => setShowInactive(checked)}
//           />
//         </div>
//       )
//     }
//   ],
//   farItems: []
// }}

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
