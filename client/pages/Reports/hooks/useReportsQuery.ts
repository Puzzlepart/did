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
 * Hook for Reports Query.
 *
 * Using `useLazyQuery` and `useLayoutEffect` and dispatches
 * `DATA_UPDATED` action on query changes. Also fetches report links
 * using `useQuery`.
 *
 * @param param0 - `state` and `dispatch` from `useReportsReducer`, aswell
 * as `fetchPolicy` for `useLazyQuery` with default value `'no-cache'`
 *
 * @returns `query` from `useLazyQuery`. A callback function that
 * executes the query. It takes an optional `QueryLazyOptions` object
 * as an argument.
 *
 * @category Reports Hooks
 */
export function useReportsQuery({
  state,
  dispatch,
  queryPreset
}: IReportsContext) {
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
    const reportLinks =
      (queryPreset &&
        state.data.reportLinks.filter(
          ({ linkRef }) => linkRef === queryPreset.reportLinkRef
        )) ??
      []
    if (_.isEmpty(reportLinks)) {
      query({ variables: queryPreset?.variables })
    }
  }, [queryPreset])
}
