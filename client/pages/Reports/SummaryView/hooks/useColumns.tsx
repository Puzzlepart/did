/* eslint-disable react-hooks/exhaustive-deps */
import DateUtils from 'DateUtils'
import { IColumn } from 'office-ui-fabric-react'
import React, { useContext, useMemo } from 'react'
import { User } from 'types'
import { ReportsContext } from '../../context'
import { UserColumn } from '../UserColumn'
import { WeekColumn } from '../WeekColumn'

/**
 * Columns hook for SummaryView
 */
export function useColumns(): IColumn[] {
  const { state } = useContext(ReportsContext)
  const periods: any[] = state.preset?.periods || []
  return useMemo(() => {
    const columns: IColumn[] = [
      {
        key: 'user',
        fieldName: 'user',
        name: null,
        minWidth: 180,
        onRender: ({ user }: { user: Pick<User, 'displayName' | 'mail'> }) => (
          <UserColumn user={user} />
        )
      }
    ]
    columns.push(
      ...periods.map((p) => {
        const [week, year] = p
        return {
          key: p.join('_'),
          fieldName: p.join('_'),
          name: DateUtils.getTimespanString({
            week,
            year,
            monthFormat: 'MMM'
          }),
          minWidth: 100,
          onRender: (item: any, _index: number, column: IColumn) => (
            <WeekColumn user={item.user} periods={item[column.fieldName]} />
          )
        } as IColumn
      })
    )
    return columns
  }, [periods])
}
