import { useCallback, useContext, useEffect, useState } from 'react'
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

  useEffect(
    () =>
      setItems(
        [...state.customers].filter((p) => (showInactive ? true : !p.inactive))
      ),
    [state.customers, showInactive]
  )

  const setSelectedCustomer = useCallback((customer: Customer) => {
    if (customer) dispatch(SET_SELECTED_CUSTOMER({ customer }))
  }, [])

  const columns = useColumns({ setSelectedCustomer })

  return {
    state,
    loading,
    items,
    columns,
    showInactive,
    setShowInactive,
    setSelectedCustomer
  }
}
