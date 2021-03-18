/* eslint-disable react-hooks/exhaustive-deps */
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
        onRender: ({ user }: { user: Pick<User, 'displayName' | 'mail'> }) => <UserColumn user={user} />
      }
    ]
    columns.push(
      ...periods.map((p) => ({
        key: p.join('_'),
        fieldName: p.join('_'),
        name: p.join('/'),
        minWidth: 100,
        onRender: (item: any, _index: number, column: IColumn) => (
          <WeekColumn
            user={item.user}
            periods={item[column.fieldName]} />
        )
      }))
    )
    return columns
  }, [periods])
}
