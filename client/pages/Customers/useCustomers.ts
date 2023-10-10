/* eslint-disable unicorn/prevent-abbreviations */
import { useAppContext } from 'AppContext'
import { useEffect, useMemo } from 'react'
import { UPDATE_BREADCRUMB } from '../../app/reducer'
import { ICustomersContext } from './context'
import { useCustomersReducer } from './reducer'
import { useCustomersQuery } from './useCustomersQuery'
import { useParams } from 'react-router-dom'
import { ICustomersUrlParameters } from './types'

/**
 * Component logic hook for `<Customers />`
 *
 * * Using `useCustomersReducer`
 * * Querying customers using `useQuery`
 * * Dispatching `DATA_UPDATED` when query changes
 * * Building our `CustomersContext` object
 */
export function useCustomers() {
  const appContext = useAppContext()
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

  useEffect(() => {
    if (state.selected) {
      window.setTimeout(() => {
        appContext.dispatch(
          UPDATE_BREADCRUMB({
            item: {
              key: state.selected.key,
              text: state.selected.name,
              level: 2
            },
            clear: false
          })
        )
      }, 1000)
    }
  }, [state.selected])

  const renderDetails = !!state.selected


  const urlParams = useParams<ICustomersUrlParameters>()

  return {
    ...urlParams,
    context,
    renderDetails
  }
}
