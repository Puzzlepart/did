import { TabItems } from 'components/Tabs'
import { ComponentLogicHook, useTimesheetPeriods } from 'hooks'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as s from 'underscore.string'
import { IWeekStatusContext } from './context'
import { List } from './List/List'
import { useLockedPeriodsQuery } from './useLockedPeriodsQuery'
import { useWeekStatusQuery } from './useWeekStatusQuery'
import { getPeriodsWithMissingSubmissions, getUsersWithMissingPeriods } from './utils'
import { useAppContext } from 'AppContext'
import lockPeriodMutation from './lock-period.gql'
import { useMutation } from '@apollo/client'

/**
 * Component logic hook for `<WeekStatus />`
 */
export const useWeekStatus: ComponentLogicHook<
  null,
  {
    tabs: TabItems
    defaultSelectedTab: string
    context: IWeekStatusContext
  }
> = () => {
  const { t } = useTranslation()
  const { displayToast } = useAppContext()
  const [lockPeriod] = useMutation(lockPeriodMutation)
  const { periods: datePeriods } = useTimesheetPeriods()
  const data = useWeekStatusQuery()
  const periods = getPeriodsWithMissingSubmissions(data, datePeriods)
  const users = getUsersWithMissingPeriods(data, datePeriods)

  const [_lockedPeriods] = useLockedPeriodsQuery()
  const [lockedPeriods, setLockedPeriods] = useState([])
  useEffect(() => {
    setLockedPeriods(_lockedPeriods)
  }, [_lockedPeriods])

  const tabs = useMemo<TabItems>(
    () => ({
      all: [
        List,
        { text: t('common.allWeeks'), iconName: 'SelectAllOff' },
        { users }
      ],
      ...periods.reduce<TabItems>((tabs, period) => {
        tabs[period.id] = [
          List,
          {
            text: t('common.periodName', period),
            description: s.capitalize(period.monthName),
            iconName: lockedPeriods?.some(
              ({ periodId }) => periodId === period.id
            )
              ? 'LockClosed'
              : 'LockOpen'
          },
          { period }
        ]
        return tabs
      }, {})
    }),
    [periods, users]
  )

  /**
   * On lock period handler.
   * 
   * @param periodId Period ID
   * @param reason The reason for locking the period
   */
  const onLockPeriod = async (periodId: string, reason?: string) => {
    const period = periods.find((p) => p.id === periodId)
    const isLocked = lockedPeriods.some(p => p.periodId === periodId)

    const { data } = await lockPeriod({
      variables: {
        periodId,
        unlock: isLocked,
        reason
      }
    })

    if (!data.result?.success) return

    if(isLocked) {
      setLockedPeriods(lockedPeriods.filter(({ periodId: pId }) => pId !== periodId))
    } else {
      setLockedPeriods([...lockedPeriods, { periodId, reason, lockedAt: new Date() }])
    }

    const periodDisplay =
      period?.weekNumber +
      (period.monthName ? ` (${period.monthName})` : '')
    if (isLocked) {
      displayToast(t('admin.weekStatus.weekUnlocked', { period: periodDisplay }), 'success')
    } else {
      displayToast(t('admin.weekStatus.weekLocked', { period: periodDisplay }), 'success')
    }
  }

  return {
    tabs,
    defaultSelectedTab: periods[0]?.id,
    context: { lockedPeriods, onLockPeriod }
  }
}
