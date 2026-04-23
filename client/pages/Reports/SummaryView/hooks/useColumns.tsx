import { DateObject } from 'DateUtils'
import {
  IListColumn,
  IListColumnData,
  ListColumnHeaderRenderProps
} from 'components/List/types'
import { useUserListColumn } from 'components/UserColumn'
import React from 'react'
import { useReportsContext } from '../../context'
import { ColumnHeader } from '../ColumnHeader'
import { PeriodColumn } from '../PeriodColumn'

/**
 * Format a date range as a compact string, e.g. "23-29.03"
 */
function formatCompactDateRange(startDate: any, endDate: any): string {
  const start = new DateObject(startDate)
  const end = new DateObject(endDate)
  const startDay = start.format('D')
  const endDay = end.format('D')
  const endMonth = end.format('MM')

  if (start.isSameMonth(end)) {
    return `${startDay}-${endDay}.${endMonth}`
  }
  const startMonth = start.format('MM')
  return `${startDay}.${startMonth}-${endDay}.${endMonth}`
}

/**
 * Columns hook for SummaryView
 */
export function useColumns(): IListColumn[] {
  const { queryPreset } = useReportsContext()
  const periods = (queryPreset?.periods ?? []) as any[]
  const userColumn = useUserListColumn(undefined, { minWidth: 190 })
  const columns: IListColumn[] = [userColumn]
  for (const p of periods) {
    const data: IListColumnData = {}
    data.subText = formatCompactDateRange(p.startDate, p.endDate)
    data.onRenderColumnHeader = ({
      column,
      className
    }: ListColumnHeaderRenderProps) => (
      <ColumnHeader
        hostClassName={className}
        text={column.name}
        subText={column.data?.subText}
      />
    )
    columns.push({
      key: p.id,
      fieldName: p.id,
      name: p.name,
      minWidth: 60,
      maxWidth: 100,
      data,
      onRender: (item: any, _index: number, column: IListColumn) => (
        <PeriodColumn user={item.user} periods={item[column.fieldName]} />
      )
    } as IListColumn)
  }
  return columns
}
