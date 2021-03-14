import { DateObject } from 'DateUtils'
import { IColumn } from 'office-ui-fabric-react'
import { User } from 'types'

/**
 * Periods hook for SummaryView
 */
export function usePeriods({
  onRender,
  count = 8
}): { columns: IColumn[]; periods: number[][] } {
  const columns: IColumn[] = [
    {
      key: 'user',
      fieldName: 'user',
      name: null,
      minWidth: 180,
      onRender: ({ user }: { user: Pick<User, 'displayName' | 'mail'> }) =>
        user.displayName
    }
  ]
  const periods = []
  let now = new DateObject()
  for (let index = 0; index < count; index++) {
    now = now.add('-1w')
    const { week, year } = now.toObject()
    periods.unshift([week, year])
  }
  columns.push(
    ...periods.map((p) => ({
      key: p.join('_'),
      fieldName: p.join('_'),
      name: p.join('/'),
      minWidth: 100,
      onRender
    }))
  )
  return { columns, periods }
}
