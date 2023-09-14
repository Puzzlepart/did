import { useToggle } from 'hooks'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Customer } from 'types'
import { CustomersContext } from '../context'
import { SET_SELECTED_CUSTOMER } from '../reducer/actions'
import { useColumns } from './useColumns'

/**
 * Component logic for `<CustomerList />`
 *
 * @category Customers
 */
export const useCustomerList = () => {
  const { dispatch, state, loading } = useContext(CustomersContext)
  const [items, setItems] = useState([...state.customers])
  const [showInactive, toggleInactive] = useToggle(false)
  const setSelectedCustomer = useCallback((customer: Customer) => {
    if (customer) dispatch(SET_SELECTED_CUSTOMER({ customer }))
  }, [])
  const columns = useColumns({ setSelectedCustomer })

  useEffect(
    () =>
      setItems([...state.customers].filter((p) => showInactive || !p.inactive)),
    [state.customers, showInactive]
  )

  return {
    state,
    loading,
    items,
    columns,
    toggleInactive,
    setSelectedCustomer
  }
}
