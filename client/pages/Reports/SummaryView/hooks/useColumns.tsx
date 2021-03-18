/* eslint-disable react-hooks/exhaustive-deps */
import { IListColumn, IListColumnData } from 'components/List/types'
import DateUtils from 'DateUtils'
import {
  IColumn,
  IDetailsColumnRenderTooltipProps
} from 'office-ui-fabric-react'
import React, { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { first } from 'underscore'
import { ReportsContext } from '../../context'
import { ColumnHeader } from '../ColumnHeader'
import { useUserListColumn } from '../UserColumn/useUserListColumn'
import { WeekColumn } from '../WeekColumn'

/**
 * Columns hook for SummaryView
 */
export function useColumns(): IListColumn[] {
  const { t } = useTranslation()
  const { state } = useContext(ReportsContext)
  const periods: any[] = state.preset?.periods || []
  const userColumn = useUserListColumn()
  return useMemo(() => {
    const columns: IListColumn[] = [userColumn]
    columns.push(
      ...periods.map((period) => {
        const key = period.join('_')
        const [week, year] = period
        const name = t('common.weekColumnTooltipTitle', { week: first(period) })
        const data: IListColumnData = {}
        data.subText = DateUtils.getTimespanString({
          week,
          year,
          monthFormat: 'MMM'
        })
        data.onRenderColumnHeader = (
          props: IDetailsColumnRenderTooltipProps
        ) => <ColumnHeader {...props} />
        return {
          key,
          fieldName: key,
          name,
          minWidth: 100,
          data,
          onRender: (item: any, _index: number, column: IColumn) => (
            <WeekColumn user={item.user} periods={item[column.fieldName]} />
          )
        } as IListColumn
      })
    )
    return columns
  }, [periods])
}
