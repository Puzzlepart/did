import { useBoolean } from 'usehooks-ts'
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
  const showInactive = useBoolean(false)
  const columns = useColumns()

  return {
    columns,
    showInactive
  }
}
