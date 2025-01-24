import { createContext, useContext } from 'react'
import { LockedPeriod } from 'types'

export interface IWeekStatusContext {
  /**
   * Locked periods.
   */
  lockedPeriods: LockedPeriod[]

  /**
   * On lock period handler.
   *
   * @param periodId Period ID
   * @param reason The reason for locking the period
   */
  onLockPeriod: (periodId: string, reason?: string) => Promise<void>
}

export const WeekStatusContext = createContext<IWeekStatusContext>(null)
export const useWeekStatusContext = () => useContext(WeekStatusContext)
