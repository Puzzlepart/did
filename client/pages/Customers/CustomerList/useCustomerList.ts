import { useContext, useEffect, useState } from 'react'
import { Customer } from 'types'
import { CustomersContext } from '../context'
import { SET_SELECTED_CUSTOMER } from '../reducer/actions'
import { useColumns } from './useColumns'

/**
 * Component logic for `<CustomerList />`
 */
export const useCustomerList = () => {
  const { dispatch, state, loading } = useContext(CustomersContext)
  const [items, setItems] = useState([...state.customers])
  const [showInactive, setShowInactive] = useState(false)
  const columns = useColumns()

  useEffect(
    () =>
      setItems(
        [...state.customers].filter((p) => (showInactive ? true : !p.inactive))
      ),
    [state.customers, showInactive]
  )
  return {
    state,
    loading,
    items,
    columns,
    showInactive,
    setShowInactive,
    setSelectedCustomer: (customer: Customer) =>
      dispatch(SET_SELECTED_CUSTOMER({ customer }))
  }
}
