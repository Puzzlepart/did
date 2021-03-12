import { DateObject } from 'DateUtils'
import { IColumn } from 'office-ui-fabric-react'

/**
 * Columns hook for SummaryView
 */
export function useColumns({ onRender }): IColumn[] {
  const columns: IColumn[] = []
  let now = new DateObject()
  for (let index = 0; index < 8; index++) {
    now = now.add('-1w')
    const { week, year } = now.toObject()
    columns.unshift({
      key: `${week}_${year}`,
      fieldName: `${week}_${year}`,
      name: `${week}/${year}`,
      minWidth: 100,
      onRender
    })
  }
  return [
    {
      key: 'user',
      fieldName: 'user',
      name: null,
      minWidth: 180
    },
    ...columns
  ]
}
