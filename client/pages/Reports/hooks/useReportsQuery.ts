/* eslint-disable unicorn/prevent-abbreviations */
import { useLazyQuery, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { ReportLink } from 'types'
import _ from 'underscore'
import { IReportsContext } from '../context'
import { report_links } from '../queries'
import { DATA_UPDATED } from '../reducer/actions'
import { default_query } from './useReportsQueries'

/**
 * Responsible for fetching data for `Reports` component.
 *
 * Using `useLazyQuery` and `useEffect` and dispatches
 * `DATA_UPDATED` action on query changes. Also fetches report links
 * using `useQuery`.
 *
 * @category Reports Hooks
 */
export function useReportsQuery({ dispatch, queryPreset }: IReportsContext) {
  const [query, { data, loading }] = useLazyQuery(
    queryPreset?.query || default_query,
    {
      fetchPolicy: 'no-cache'
    }
  )

  const reportLinksQuery = useQuery<{ reportLinks: ReportLink[] }>(
    report_links,
    {
      fetchPolicy: 'cache-and-network'
    }
  )

  useEffect(
    () =>
      dispatch(
        DATA_UPDATED({
          ...data,
          ...reportLinksQuery.data,
          loading
        })
      ),
    [loading, reportLinksQuery.loading]
  )

  useEffect(() => {
    if (!queryPreset) return
    if (!_.isEmpty(queryPreset?.reportLinks)) return
    query({ variables: queryPreset?.variables })
  }, [queryPreset])
}
