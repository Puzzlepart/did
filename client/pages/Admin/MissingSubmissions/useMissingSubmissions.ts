import { IDatePeriod } from 'DateUtils'
import { TabItems } from 'components/Tabs'
import { ComponentLogicHook, useTimesheetPeriods } from 'hooks'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { User } from 'types'
import { any } from 'underscore'
import { List } from './List'
import { IMissingSubmissionUser } from './MissingSubmissionUser'
import { useMissingSubmissionsQuery } from './useMissingSubmissionsQuery'

export interface IMissingSubmissionPeriod extends IDatePeriod {
  users?: IMissingSubmissionUser[]
}

/**
 * Maps `User` to `IMissingSubmissionUser`. We don't want to extend
 * classes that have the `ObjectType` decorator.
 *
 * @param user - User
 * @param periods - Date periods
 * @returns
 */
function mapUser(user: User, periods?: IDatePeriod[]): IMissingSubmissionUser {
  return {
    name: user.displayName,
    secondaryText: user.mail,
    imageUrl: user.photo?.base64,
    email: user.mail,
    periods
  } as IMissingSubmissionUser
}

/**
 * Get date periods with missing submissions.
 *
 * @param data - Data returned by `useMissingSubmissionsQuery`
 * @param datePeriods - Date periods
 */
function getPeriodsWithMissingSubmissions(
  data: ReturnType<typeof useMissingSubmissionsQuery>,
  datePeriods: IDatePeriod[]
): IMissingSubmissionPeriod[] {
  return datePeriods.map((p) => {
    return {
      ...p,
      users: data.users
        .filter((user) => {
          return !any(
            data.periods,
            ({ userId, week, month, year }) =>
              userId === user.id && [week, month, year].join('_') === p.id
          )
        })
        .map((user) => mapUser(user))
    }
  })
}

/**
 * Get users and their missing confirmed periods
 *
 * @param data - Data returned by `useMissingSubmissionsQuery`
 * @param datePeriods - Date periods
 */
function getUsersWithMissingPeriods(
  data: ReturnType<typeof useMissingSubmissionsQuery>,
  datePeriods: IDatePeriod[]
): IMissingSubmissionUser[] {
  return data.users
    .map((user) => {
      const missingPeriods = datePeriods.filter(
        ({ id }) =>
          !any(
            data.periods,
            ({ userId, week, month, year }) =>
              userId === user.id && [week, month, year].join('_') === id
          )
      )
      return missingPeriods.length > 0 && mapUser(user, missingPeriods)
    })
    .filter(Boolean)
}

/**
 * Component logic hook for `<MissingSubmissions />`
 */
export const useMissingSubmissions: ComponentLogicHook<null, {
  tabs: TabItems
}> = () => {
  const { t } = useTranslation()
  const { periods: datePeriods } = useTimesheetPeriods()
  const data = useMissingSubmissionsQuery()
  const periods = getPeriodsWithMissingSubmissions(data, datePeriods)
  const users = getUsersWithMissingPeriods(data, datePeriods)
  const tabs = useMemo<TabItems>(() => ({
    all: [List, t('common.allWeeks'), { users }],
    ...periods.reduce<TabItems>((tabs, period) => {
      tabs[period.id] = [List, period.name, {   period  }]
      return tabs
    }, {})
  }), [periods, users])
  return { tabs } as const
}
