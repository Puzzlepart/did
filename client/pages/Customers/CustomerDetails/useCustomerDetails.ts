import { useQuery } from '@apollo/client'
import { useContext } from 'react'
import { CustomersContext } from '../context'
import $projects from './projects.gql'

export function useCustomerDetails() {
  const { state, loading } = useContext(CustomersContext)
  const selected = state.selected
  const query = useQuery($projects, {
    variables: {
      customerKey: selected?.key
    },
    skip: !selected
  })
  return {
    ...query,
    loading: loading || query.loading,
    projects: query?.data?.projects ?? [],
    selected
  } as const
}
