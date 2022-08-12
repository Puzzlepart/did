import { IDatePeriod } from 'DateUtils'
import { useTimesheetPeriods } from 'hooks'
import { User } from 'types'
import { any } from 'underscore'
import { IMissingSubmissionUser } from './MissingSubmissionUser'
import { useMissingSubmissionsQuery } from './useMissingSubmissionsQuery'

interface IMissingSubmissionPeriod extends IDatePeriod {
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
    text: user.displayName,
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
export function useMissingSubmissions() {
  const { periods: datePeriods } = useTimesheetPeriods()
  const data = useMissingSubmissionsQuery()
  const periods = getPeriodsWithMissingSubmissions(data, datePeriods)
  const users = getUsersWithMissingPeriods(data, datePeriods)
  return { periods, users } as const
}
