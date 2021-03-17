/* eslint-disable react-hooks/exhaustive-deps */
import { IColumn } from 'office-ui-fabric-react'
import { useContext, useMemo } from 'react'
import { User } from 'types'
import { ReportsContext } from '../../context'

/**
 * Columns hook for SummaryView
 */
export function useColumns({ onRender }): IColumn[] {
  const { state } = useContext(ReportsContext)
  const periods = state.preset?.periods || []
  return useMemo(() => {
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
    columns.push(
      ...periods.map((p) => ({
        key: p.join('_'),
        fieldName: p.join('_'),
        name: p.join('/'),
        minWidth: 100,
        onRender
      }))
    )
    return columns
  }, [periods])
}
