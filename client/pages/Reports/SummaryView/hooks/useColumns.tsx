/* eslint-disable react-hooks/exhaustive-deps */
import { IListColumn, IListColumnData } from 'components/List/types'
import { useUserListColumn } from 'components/UserColumn'
import $date from 'DateUtils'
import {
  IColumn,
  IDetailsColumnRenderTooltipProps,
  PersonaSize
} from '@fluentui/react'
import React, { useContext, useMemo } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { first } from 'underscore'
import { ReportsContext } from '../../context'
import { ColumnHeader } from '../ColumnHeader'
import { WeekColumn } from '../WeekColumn'

/**
 * Columns hook for SummaryView
 */
export function useColumns(): IListColumn[] {
  const { t } = useTranslation()
  const { state } = useContext(ReportsContext)
  const periods: any[] = state.preset?.periods || []
  const userColumn = useUserListColumn({
    size: PersonaSize.size24,
    hidePersonaDetails: isMobile
  })
  return useMemo(() => {
    const columns: IListColumn[] = [userColumn]
    columns.push(
      ...periods.map((period) => {
        const key = period.join('_')
        const [week, year] = period
        const name = t('common.weekColumnTooltipTitle', { week: first(period) })
        const data: IListColumnData = {}
        data.subText = $date.getTimespanString({
          week,
          year,
          monthFormat: 'MMM',
          includeMonth: {
            startDate: false,
            endDate: true
          }
        })
        data.onRenderColumnHeader = (
          props: IDetailsColumnRenderTooltipProps
        ) => <ColumnHeader {...props} />
        return {
          key,
          fieldName: key,
          name,
          minWidth: 60,
          maxWidth: 100,
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
