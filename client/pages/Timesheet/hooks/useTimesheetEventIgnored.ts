import { useMutation } from '@apollo/client'
import { generateOpId } from 'hooks'
import { useCallback } from 'react'
import $clearTimesheetIgnoredEvents from './clearTimesheetIgnoredEvents.gql'
import $ignoreAllTimesheetEvents from './ignoreAllTimesheetEvents.gql'
import $setTimesheetEventIgnored from './setTimesheetEventIgnored.gql'

/**
 * Result of the setTimesheetEventIgnored mutation
 */
interface SetIgnoredResult {
  success: boolean
  opId?: string
  duplicate?: boolean
}

/**
 * Hook for setting an event as ignored or not ignored.
 * Persists the ignore state to the server with idempotency support.
 *
 * @category Timesheet Hooks
 */
export function useTimesheetEventIgnored() {
  const [setTimesheetEventIgnored] = useMutation($setTimesheetEventIgnored)
  const [ignoreAllMutation] = useMutation($ignoreAllTimesheetEvents)
  const [clearIgnoredMutation] = useMutation($clearTimesheetIgnoredEvents)

  /**
   * Set an event as ignored or un-ignored
   *
   * @param periodId - The period ID
   * @param eventId - The event ID
   * @param ignored - Whether to ignore (true) or un-ignore (false)
   *
   * @returns The mutation result
   */
  const setIgnored = useCallback(
    async (
      periodId: string,
      eventId: string,
      ignored: boolean
    ): Promise<SetIgnoredResult> => {
      const opId = generateOpId()
      try {
        const { data } = await setTimesheetEventIgnored({
          variables: {
            opId,
            input: { periodId, eventId, ignored }
          }
        })
        return {
          success: data?.result?.success ?? false,
          opId: data?.result?.opId,
          duplicate: data?.result?.duplicate
        }
      } catch {
        return { success: false }
      }
    },
    [setTimesheetEventIgnored]
  )

  /**
   * Ignore multiple events at once (e.g., for "Ignore All" functionality)
   *
   * @param periodId - The period ID
   * @param eventIds - Array of event IDs to ignore
   *
   * @returns The mutation result
   */
  const ignoreAll = useCallback(
    async (periodId: string, eventIds: string[]): Promise<SetIgnoredResult> => {
      const opId = generateOpId()
      try {
        const { data } = await ignoreAllMutation({
          variables: {
            opId,
            input: { periodId, eventIds }
          }
        })
        return {
          success: data?.result?.success ?? false,
          opId: data?.result?.opId,
          duplicate: data?.result?.duplicate
        }
      } catch {
        return { success: false }
      }
    },
    [ignoreAllMutation]
  )

  /**
   * Clear all ignored events for a period
   *
   * @param periodId - The period ID
   *
   * @returns The mutation result
   */
  const clearIgnored = useCallback(
    async (periodId: string): Promise<SetIgnoredResult> => {
      const opId = generateOpId()
      try {
        const { data } = await clearIgnoredMutation({
          variables: {
            opId,
            periodId
          }
        })
        return {
          success: data?.result?.success ?? false,
          opId: data?.result?.opId,
          duplicate: data?.result?.duplicate
        }
      } catch {
        return { success: false }
      }
    },
    [clearIgnoredMutation]
  )

  return { setIgnored, ignoreAll, clearIgnored }
}
