import { useQuery } from '@apollo/client'
import { useContext, useRef } from 'react'
import { CustomersContext } from '../context'
import $projects from './projects.gql'

export function useCustomerList() {
  const ref = useRef<HTMLDivElement>()
  const { state, loading } = useContext(CustomersContext)
  const query = useQuery($projects, {
    variables: {
      customerKey: state.selected?.key
    },
    skip: !state.selected
  })
  return {
    ...query,
    ref,
    loading: loading || query.loading,
    projects: query?.data?.projects ?? []
  } as const
}
