import { IDatePeriod } from 'DateUtils'
import { User } from 'types'
import _ from 'underscore'
import { arrayMap } from 'utils'
import { IMissingSubmissionUser } from './MissingSubmissionUser'
import { IMissingSubmissionPeriod } from './types'
import { useWeekStatusQuery } from './useWeekStatusQuery'

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
 * @param data - Data returned by `useWeekStatusQuery`
 * @param datePeriods - Date periods
 */
export const getPeriodsWithMissingSubmissions = (
  [periods, users]: ReturnType<typeof useWeekStatusQuery>,
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
export const getUsersWithMissingPeriods = (
  [periods, users]: ReturnType<typeof useWeekStatusQuery>,
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
