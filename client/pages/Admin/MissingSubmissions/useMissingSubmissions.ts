import { TabItems } from 'components/Tabs'
import { IDatePeriod } from 'DateUtils'
import { ComponentLogicHook, useTimesheetPeriods } from 'hooks'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { User } from 'types'
import _ from 'underscore'
import * as s from 'underscore.string'
import { arrayMap } from 'utils'
import { List } from './List'
import { IMissingSubmissionUser } from './MissingSubmissionUser'
import { IMissingSubmissionPeriod } from './types'
import { useMissingSubmissionsQuery } from './useMissingSubmissionsQuery'

/**
 * Maps `User` to `IMissingSubmissionUser`. We don't want to extend
 * classes that have the `ObjectType` decorator.
 *
 * @param user - User
 * @param periods - Date periods
 */
const mapUser = (
  user: User,
  periods?: IDatePeriod[]
): IMissingSubmissionUser => ({
  name: user.displayName,
  secondaryText: user.mail,
  avatar: {
    image: {
      src: user.photo?.base64
    }
  },
  email: user.mail,
  periods
})

/**
 * Get date periods with missing submissions.
 *
 * @param data - Data returned by `useMissingSubmissionsQuery`
 * @param datePeriods - Date periods
 */
const getPeriodsWithMissingSubmissions = (
  [periods, users]: ReturnType<typeof useMissingSubmissionsQuery>,
  datePeriods: IDatePeriod[]
): IMissingSubmissionPeriod[] =>
  datePeriods.map((p) => ({
    ...p,
    users: users
      .filter(
        (user) =>
          !_.any(
            periods,
            ({ userId, week, month, year }) =>
              userId === user.id && [week, month, year].join('_') === p.id
          )
      )
      .map((user) => mapUser(user))
  }))

/**
 * Get users and their missing confirmed periods
 *
 * @param data - Data returned by `useMissingSubmissionsQuery`
 * @param datePeriods - Date periods
 */
const getUsersWithMissingPeriods = (
  [periods, users]: ReturnType<typeof useMissingSubmissionsQuery>,
  datePeriods: IDatePeriod[]
) =>
  arrayMap<User, IMissingSubmissionUser>(users, (user) => {
    const missingPeriods = datePeriods.filter(
      ({ id }) =>
        !_.any(
          periods,
          ({ userId, week, month, year }) =>
            userId === user.id && [week, month, year].join('_') === id
        )
    )
    return missingPeriods.length > 0 && mapUser(user, missingPeriods)
  })

/**
 * Component logic hook for `<MissingSubmissions />`
 */
export const useMissingSubmissions: ComponentLogicHook<
  null,
  {
    tabs: TabItems
    defaultSelectedTab: string
  }
> = () => {
  const { t } = useTranslation()
  const { periods: datePeriods } = useTimesheetPeriods()
  const data = useMissingSubmissionsQuery()
  const periods = getPeriodsWithMissingSubmissions(data, datePeriods)
  const users = getUsersWithMissingPeriods(data, datePeriods)
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
            iconName: 'CalendarWorkWeek'
          },
          { period }
        ]
        return tabs
      }, {})
    }),
    [periods, users]
  )
  return { tabs, defaultSelectedTab: periods[0]?.id }
}
