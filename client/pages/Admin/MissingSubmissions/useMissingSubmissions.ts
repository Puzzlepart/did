import { IDatePeriod } from 'DateUtils'
import { useTimesheetPeriods } from 'hooks'
import { User } from 'types'
import { any } from 'underscore'
import { IMissingSubmissionUser } from './MissingSubmissionUser'
import { useMissingSubmissionsQuery } from './useMissingSubmissionsQuery'

interface IMissingSubmissionPeriod extends IDatePeriod {
  users?: User[]
}

/**
 * Component logic hook for `<MissingSubmissions />`
 */
export function useMissingSubmissions() {
  const { periods: _periods } = useTimesheetPeriods()
  const data = useMissingSubmissionsQuery()
  const periods: IMissingSubmissionPeriod[] = _periods.map((p) => {
    return {
      ...p,
      users: data.users.filter(({ id }) => {
        return !any(
          data.periods,
          ({ userId, week, month, year }) =>
            userId === id && [week, month, year].join('_') === p.id
        )
      })
    }
  })
  const users: IMissingSubmissionUser[] = data.users.map((user) => {
    const userMissingPeriods = _periods.filter(
      ({ id }) =>
        !any(
          data.periods,
          ({ userId, week, month, year }) =>
            userId === user.id && [week, month, year].join('_') === id
        )
    )
    return {
      text: user.displayName,
      secondaryText: user.mail,
      imageUrl: user.photo?.base64,
      email: user.mail,
      periods: userMissingPeriods
    }
  })
  return { periods, users } as const
}
