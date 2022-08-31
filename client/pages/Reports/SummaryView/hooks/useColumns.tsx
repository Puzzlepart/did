/* eslint-disable react-hooks/exhaustive-deps */
import {
  IColumn,
  IDetailsColumnRenderTooltipProps,
  PersonaSize
} from '@fluentui/react'
import { IListColumn, IListColumnData } from 'components/List/types'
import { useUserListColumn } from 'components/UserColumn'
import $date from 'DateUtils'
import React, { useContext, useMemo } from 'react'
import { isMobile } from 'react-device-detect'
import { ReportsContext } from '../../context'
import { ColumnHeader } from '../ColumnHeader'
import { PeriodColumn } from '../PeriodColumn'

/**
 * Columns hook for SummaryView
 */
export function useColumns(): IListColumn[] {
  const { state } = useContext(ReportsContext)
  const periods = (state.preset?.periods || []) as any[]
  const userColumn = useUserListColumn({
    size: PersonaSize.size24,
    hidePersonaDetails: isMobile
  })
  return useMemo(() => {
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
        <ColumnHeader {...props} />
      )
      columns.push({
        key: p.id,
        fieldName: p.id,
        name: p.name,
        minWidth: 60,
        maxWidth: 100,
        data,
        onRender: (item: any, _index: number, column: IColumn) => (
          <PeriodColumn user={item.user} periods={item[column.fieldName]} />
        )
      } as IListColumn)
    }
    return columns
  }, [periods])
}
