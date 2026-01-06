/* eslint-disable unicorn/prevent-abbreviations */
import { useApolloClient, useLazyQuery, useQuery } from '@apollo/client'
import { useCallback, useEffect, useMemo } from 'react'
import { ReportLink } from 'types'
import _ from 'underscore'
import { IReportsContext } from '../context'
import { forecast_preload, report_links, report_preload } from '../queries'
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
  const appliedFilterQuery = useMemo(
    () => buildFilterQuery(state?.appliedFilterState),
    [state?.appliedFilterState]
  )
  const hasAppliedFilters = Object.keys(appliedFilterQuery).length > 0

  const [loadPreloadQuery, preloadResult] = useLazyQuery(report_preload, {
    fetchPolicy: 'no-cache'
  })

  const [loadForecastPreloadQuery, forecastPreloadResult] = useLazyQuery(
    forecast_preload,
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

  useEffect(() => {
    dispatch(
      DATA_UPDATED({
        ...reportLinksQuery.data
      } as any)
    )
  }, [reportLinksQuery.data, dispatch])

  useEffect(() => {
    if (preloadResult.data?.users) {
      dispatch(
        DATA_UPDATED({
          ...preloadResult.data
        })
      )
    }
    if (!preloadResult.called) return
    dispatch(
      PRELOAD_UPDATED({
        loading: preloadResult.loading,
        approxCount: preloadResult.data?.approxCount,
        filterOptions: preloadResult.data?.filterOptions
      })
    )
  }, [preloadResult.called, preloadResult.data, preloadResult.loading, dispatch])

  useEffect(() => {
    if (forecastPreloadResult.data?.users) {
      dispatch(
        DATA_UPDATED({
          ...forecastPreloadResult.data
        })
      )
    }
    if (!forecastPreloadResult.called) return
    dispatch(
      PRELOAD_UPDATED({
        loading: forecastPreloadResult.loading,
        approxCount: forecastPreloadResult.data?.approxCount,
        filterOptions: forecastPreloadResult.data?.filterOptions
      })
    )
  }, [
    forecastPreloadResult.called,
    forecastPreloadResult.data,
    forecastPreloadResult.loading,
    dispatch
  ])

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

    dispatch(REPORT_CLEARED())
    dispatch(
      PRELOAD_UPDATED({
        loading: true,
        approxCount: undefined
      })
    )

    if (queryPreset.id === 'forecast') {
      loadForecastPreloadQuery()
      return
    }

    const preset = mapQueryPresetToReportsPreset(queryPreset.id)
    const query = supportsQueryFilters && hasAppliedFilters
      ? appliedFilterQuery
      : queryPreset.variables?.query

    loadPreloadQuery({
      variables: {
        preset,
        query
      }
    })
  }, [
    queryPreset?.id,
    queryPreset?.reportLinks,
    queryPreset?.variables?.query,
    appliedFilterQuery,
    hasAppliedFilters,
    state?.isFiltersOpen,
    dispatch,
    loadForecastPreloadQuery,
    loadPreloadQuery
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
          ...(supportsQueryFilters && hasAppliedFilters && {
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
