import {
  IDetailsColumnRenderTooltipProps,
  PersonaSize
} from '@fluentui/react'
import $date from 'DateUtils'
import { IListColumn, IListColumnData } from 'components/List/types'
import { useUserListColumn } from 'components/UserColumn'
import { useReportsQueryPreset } from 'pages/Reports/hooks'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { ColumnHeader } from '../ColumnHeader'
import { PeriodColumn } from '../PeriodColumn'

/**
 * Columns hook for SummaryView
 */
export function useColumns(): IListColumn[] {
  const queryPreset = useReportsQueryPreset()
  const periods = (queryPreset?.periods ?? []) as any[]
  const userColumn = useUserListColumn({
    size: PersonaSize.size24,
    hidePersonaDetails: isMobile
  })
  const columns: IListColumn[] = [userColumn]
  for (const p of periods) {
    const data: IListColumnData = {}
    data.subText = $date.getTimespanString({
      startDate: p.startDate,
      endDate: p.endDate,
      monthFormat: 'MMM',
      includeMonth: {
        startDate: false,
        endDate: true
      }
    })
    data.onRenderColumnHeader = (props: IDetailsColumnRenderTooltipProps) => (
      <ColumnHeader
        hostClassName={props.hostClassName}
        text={props.column.name}
        subText={props.column.data?.subText}
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
