import { useMemo } from 'react'
import { ICustomersContext } from './context'
import { useCustomersReducer } from './reducer'
import { useCustomersQuery } from './useCustomersQuery'

/**
 * Component logic hook for `<Customers />`
 *
 * * Using `useCustomersReducer`
 * * Querying customers using `useQuery`
 * * Dispatching `DATA_UPDATED` when query changes
 * * Building our `CustomersContext` object
 */
export function useCustomers() {
  const [state, dispatch] = useCustomersReducer()
  const query = useCustomersQuery(dispatch)

  const context = useMemo<ICustomersContext>(
    () => ({
      ...query,
      state,
      dispatch
    }),
    [state]
  )

  const renderDetails = !!state.selected

  return {
    context,
    renderDetails
  }
}
