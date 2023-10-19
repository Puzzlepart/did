import { useContext, useEffect, useState } from 'react'
import { useBoolean } from 'usehooks-ts'
import { CustomersContext } from '../context'
import { useColumns } from './useColumns'

/**
 * Component logic for `<CustomerList />`. This hook is used to
 * manage the state and actions of the `<CustomerList />` component.
 * It handles the filtering of customers based on the `showInactive`
 * prop. It also handles the columns for the table, using the
 * `useColumns` hook.
 *
 * @category Customers
 */
export const useCustomerList = () => {
  const context = useContext(CustomersContext)
  const [customers, setCustomers] = useState([...context.state.customers])
  const showInactive = useBoolean(false)
  const columns = useColumns()

  useEffect(
    () =>
      setCustomers(
        [...context.state.customers].filter(
          (p) => showInactive.value || !p.inactive
        )
      ),
    [context.state.customers, showInactive.value]
  )

  const inactiveCustomers = context.state.customers.filter(
    ({ inactive }) => inactive
  )

  return {
    customers,
    inactiveCustomers,
    columns,
    showInactive
  }
}
