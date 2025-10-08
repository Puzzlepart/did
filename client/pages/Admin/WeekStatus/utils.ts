import { IDatePeriod } from 'DateUtils'
import { User } from 'types'
import _ from 'underscore'
import { arrayMap } from 'utils'
import { IMissingSubmissionUser } from './MissingSubmissionUser'
import { IMissingSubmissionPeriod } from './types'
import { useWeekStatusQuery } from './useWeekStatusQuery'

/**
 * Check if a user's employment period overlaps with a given date period
 *
 * @param user - User with employment dates
 * @param datePeriod - Date period to check against
 */
const isUserEmployedDuringPeriod = (
  user: User,
  datePeriod: IDatePeriod
): boolean => {
  // If user has no employment start/end dates, assume they should be included
  if (!user.employmentStartDate && !user.employmentEndDate) {
    return true
  }

  const periodStart = datePeriod.startDate.$.toDate()
  const periodEnd = datePeriod.endDate.$.toDate()

  // Check if user employment period overlaps with the date period
  const employmentStart = user.employmentStartDate
    ? new Date(user.employmentStartDate)
    : null
  const employmentEnd = user.employmentEndDate
    ? new Date(user.employmentEndDate)
    : null

  // If only start date is set, check if period end is after employment start
  if (employmentStart && !employmentEnd) {
    return periodEnd >= employmentStart
  }

  // If only end date is set, check if period start is before employment end
  if (!employmentStart && employmentEnd) {
    return periodStart <= employmentEnd
  }

  // If both dates are set, check for overlap
  if (employmentStart && employmentEnd) {
    return periodStart <= employmentEnd && periodEnd >= employmentStart
  }

  return true
}

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
          isUserEmployedDuringPeriod(user, p) &&
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
      (datePeriod) =>
        isUserEmployedDuringPeriod(user, datePeriod) &&
        !_.any(
          periods,
          ({ userId, week, month, year }) =>
            userId === user.id &&
            [week, month, year].join('_') === datePeriod.id
        )
    )
    return missingPeriods.length > 0 && mapUser(user, missingPeriods)
  })
