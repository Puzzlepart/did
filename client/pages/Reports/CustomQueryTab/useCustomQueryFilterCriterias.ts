import { useFormControlModel } from 'components'
import { useEffect } from 'react'
import { ReportsQuery } from 'types'
import _ from 'underscore'
import { getUrlState, persistUrlState } from 'utils'

/**
 * Custom hook to manage filter criteria for custom queries in reports.
 *
 * This hook initializes the filter criteria from the URL state and persists
 * any changes back to the URL. It uses a form control model to manage the
 * state of the filter criteria.
 *
 * @param param - The URL parameter to use for the filter criteria.
 * @param id - The unique identifier for the filter criteria.
 *
 * @returns The filter criteria form control model.
 */
export const useCustomQueryFilterCriterias = (param: string, id: string) => {
  const filterCriterias = useFormControlModel<
    keyof ReportsQuery,
    ReportsQuery
  >()

  useEffect(() => {
    const [, f] = id.split('_')
    if (f) {
      filterCriterias.$set(
        new Map(Object.entries(JSON.parse(window.atob(f))) as any)
      )
      return
    }
    filterCriterias.$set(
      new Map(Object.entries(getUrlState(param, 'hash', true))) as any
    )
  }, [id])

  useEffect(() => {
    persistUrlState<ReportsQuery>(
      _.isEmpty(filterCriterias.value()) ? undefined : filterCriterias.value(),
      param,
      'hash',
      false
    )
  }, [filterCriterias])
  return filterCriterias
}
