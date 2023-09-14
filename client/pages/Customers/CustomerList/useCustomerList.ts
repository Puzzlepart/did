import { useToggle } from 'hooks'
import { useContext, useEffect, useState } from 'react'
import { CustomersContext } from '../context'
import { useColumns } from './useColumns'

/**
 * Component logic for `<CustomerList />`
 *
 * @category Customers
 */
export const useCustomerList = () => {
  const context = useContext(CustomersContext)
  const [items, setItems] = useState([...context.state.customers])
  const [showInactive, toggleInactive] = useToggle(false)
  const columns = useColumns()

  useEffect(
    () =>
      setItems(
        [...context.state.customers].filter((p) => showInactive || !p.inactive)
      ),
    [context.state.customers, showInactive]
  )

  return {
    items,
    columns,
    toggleInactive
  }
}
