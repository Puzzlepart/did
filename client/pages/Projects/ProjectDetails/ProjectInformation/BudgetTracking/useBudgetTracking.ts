import { useQuery } from '@apollo/client'
import _ from 'lodash'
import { useProjectsContext } from '../../../context'
import timeentriesQuery from './timeentries.gql'
import { BudgetTracking } from './types'

/**
 * Custom hook for budget tracking. Queries GraphQL API with the
 * query specified in `timeentries.gql` and calculates the used
 * hours.
 *
 * @returns An object containing budget tracking information.
 */
export const useBudgetTracking = () => {
  const context = useProjectsContext()
  const tracking = _.get(
    context.state,
    'selected.properties.budgetTracking',
    {}
  ) as BudgetTracking
  const { loading, data } = useQuery(timeentriesQuery, {
    variables: {
      query: { projectId: context.state.selected?.tag }
    },
    skip: !context.state.selected
  })

  const hours = (data?.timeEntries ?? []).reduce(
    (duration: number, entry: { duration: number }) =>
      duration + entry.duration,
    0
  )

  let used = Number.parseFloat((hours / tracking.hours).toFixed(2))
  used = used > 1 ? 1 : used
  const getValidationStateFromThreshold = () => {
    if (used > tracking.criticalThreshold) return 'error'
    if (used > tracking.warningThreshold) return 'warning'
    return 'none'
  }
  return {
    loading,
    budgetTrackingEnabled: tracking.trackingEnabled,
    hours,
    budget: tracking.hours,
    used,
    getValidationStateFromThreshold
  }
}
