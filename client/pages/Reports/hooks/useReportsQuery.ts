/* eslint-disable unicorn/prevent-abbreviations */
import { useApolloClient, useQuery } from '@apollo/client'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { ReportLink } from 'types'
import _ from 'underscore'
import { IReportsContext } from '../context'
import {
  forecast_count,
  report_count,
  report_filter_options,
  report_links,
  report_users
} from '../queries'
import {
  DATA_UPDATED,
  PRELOAD_UPDATED,
  REPORT_CLEARED,
  REPORT_LOADED
} from '../reducer/actions'
import { default_query } from './useReportsQueries'
import { ListFilterState } from 'components/List/types'

/**
 * Responsible for fetching data for `Reports` component.
 *
 * Using `useLazyQuery` and `useEffect` and dispatches
 * `DATA_UPDATED` action on query changes. Also fetches report links
 * using `useQuery`.
 *
 * @category Reports Hooks
 */
function mapQueryPresetToReportsPreset(queryPresetId?: string) {
  switch (queryPresetId) {
    case 'last_month': {
      return 'LAST_MONTH'
    }
    case 'current_month': {
      return 'CURRENT_MONTH'
    }
    case 'last_year': {
      return 'LAST_YEAR'
    }
    case 'current_year': {
      return 'CURRENT_YEAR'
    }
    default: {
      return
    }
  }
}

function buildFilterQuery(filterState?: ListFilterState) {
  const filters = filterState?.filters ?? []
  if (filters.length === 0) return {}

  const filter = filters[0]
  const values = Array.from(filter.selected ?? [])

  if (values.length === 0) return {}

  switch (filter.key) {
    case 'project.name': {
      return { projectNames: values }
    }
    case 'project.parent.name': {
      return { parentProjectNames: values }
    }
    case 'customer.name': {
      return { customerNames: values }
    }
    case 'partner.name': {
      return { partnerNames: values }
    }
    case 'resource.displayName': {
      return { employeeNames: values }
    }
    default: {
      return {}
    }
  }
}

export function useReportsQuery({
  dispatch,
  queryPreset,
  state
}: IReportsContext) {
  const client = useApolloClient()
  const preloadRequestId = useRef(0)
  const appliedFilterQuery = useMemo(
    () => buildFilterQuery(state?.appliedFilterState),
    [state?.appliedFilterState]
  )
  const hasAppliedFilters = Object.keys(appliedFilterQuery).length > 0
  const summaryKey = useMemo(() => {
    if (queryPreset?.id !== 'summary') return ''
    return JSON.stringify(queryPreset.variables?.queries ?? [])
  }, [queryPreset?.id, queryPreset?.variables?.queries])
  const lastSummaryKey = useRef<string>('')

  const reportLinksQuery = useQuery<{ reportLinks: ReportLink[] }>(
    report_links,
    {
      fetchPolicy: 'cache-and-network'
    }
  )

  const reportUsersQuery = useQuery<{ users: any[] }>(report_users, {
    fetchPolicy: 'cache-and-network'
  })

  useEffect(() => {
    dispatch(
      DATA_UPDATED({
        ...reportLinksQuery.data
      } as any)
    )
  }, [reportLinksQuery.data, dispatch])

  useEffect(() => {
    if (!reportUsersQuery.data?.users) return
    dispatch(
      DATA_UPDATED({
        users: reportUsersQuery.data.users
      } as any)
    )
  }, [reportUsersQuery.data, dispatch])

  useEffect(() => {
    if (!queryPreset) return
    if (!_.isEmpty(queryPreset?.reportLinks)) return
    const supportsQueryFilters = [
      'last_month',
      'current_month',
      'last_year',
      'current_year'
    ].includes(queryPreset.id)
    if (!supportsQueryFilters && queryPreset.id !== 'forecast') {
      return
    }
    if (state?.isFiltersOpen) return

    preloadRequestId.current += 1
    const currentPreloadId = preloadRequestId.current
    let approxCount: number | undefined

    const updatePreload = (payload: {
      loading: boolean
      approxCount?: number
      filterOptions?: {
        projectNames: string[]
        parentProjectNames: string[]
        customerNames: string[]
        partnerNames: string[]
        employeeNames: string[]
      }
    }) => {
      if (preloadRequestId.current !== currentPreloadId) return
      dispatch(
        PRELOAD_UPDATED({
          ...payload
        })
      )
    }

    dispatch(REPORT_CLEARED())
    dispatch(
      PRELOAD_UPDATED({
        loading: true,
        approxCount: undefined,
        filterOptions: undefined
      })
    )

    const preloadReport = async () => {
      const isForecast = queryPreset.id === 'forecast'
      const preset = isForecast
        ? undefined
        : mapQueryPresetToReportsPreset(queryPreset.id)
      const query =
        supportsQueryFilters && hasAppliedFilters
          ? appliedFilterQuery
          : queryPreset.variables?.query

      try {
        const countResult = await client.query({
          query: isForecast ? forecast_count : report_count,
          variables: isForecast
            ? undefined
            : {
                preset,
                query
              },
          fetchPolicy: 'no-cache'
        })
        approxCount = countResult.data?.approxCount
      } catch {
        approxCount = undefined
      }

      updatePreload({
        loading: true,
        approxCount,
        filterOptions: undefined
      })

      try {
        const filterOptionsResult = await client.query({
          query: report_filter_options,
          variables: {
            preset,
            query,
            forecast: isForecast ? true : undefined
          },
          fetchPolicy: 'no-cache'
        })
        updatePreload({
          loading: false,
          approxCount,
          filterOptions: filterOptionsResult.data?.filterOptions
        })
      } catch {
        updatePreload({
          loading: false,
          approxCount,
          filterOptions: undefined
        })
      }
    }

    preloadReport()
  }, [
    client,
    queryPreset?.id,
    queryPreset?.reportLinks,
    queryPreset?.variables?.query,
    appliedFilterQuery,
    hasAppliedFilters,
    state?.isFiltersOpen,
    dispatch
  ])

  useEffect(() => {
    if (queryPreset?.id !== 'summary') return
    if (!summaryKey || summaryKey === lastSummaryKey.current) return
    lastSummaryKey.current = summaryKey
    dispatch(
      DATA_UPDATED({
        loading: true
      })
    )
    client
      .query({
        query: queryPreset?.query || default_query,
        variables: {
          ...queryPreset?.variables
        },
        fetchPolicy: 'no-cache'
      })
      .then((result) => {
        dispatch(
          DATA_UPDATED({
            ...result.data,
            loading: false
          })
        )
      })
      .catch(() => {
        dispatch(
          DATA_UPDATED({
            loading: false
          })
        )
      })
  }, [
    client,
    dispatch,
    queryPreset?.id,
    queryPreset?.query,
    queryPreset?.variables,
    summaryKey
  ])

  const loadReport = useCallback(() => {
    if (!queryPreset) return
    const supportsQueryFilters = [
      'last_month',
      'current_month',
      'last_year',
      'current_year'
    ].includes(queryPreset.id)
    dispatch(
      DATA_UPDATED({
        loading: true
      })
    )
    client
      .query({
        query: queryPreset?.query || default_query,
        variables: {
          ...queryPreset?.variables,
          ...(supportsQueryFilters &&
            hasAppliedFilters && {
              query: appliedFilterQuery
            })
        },
        fetchPolicy: 'no-cache'
      })
      .then((result) => {
        dispatch(
          DATA_UPDATED({
            ...result.data,
            loading: false
          })
        )
        if (result.data?.timeEntries) {
          dispatch(REPORT_LOADED())
        }
      })
      .catch(() => {
        dispatch(
          DATA_UPDATED({
            loading: false
          })
        )
      })
  }, [
    client,
    dispatch,
    queryPreset?.id,
    queryPreset?.query,
    queryPreset?.variables,
    appliedFilterQuery,
    hasAppliedFilters
  ])

  return { loadReport }
}
