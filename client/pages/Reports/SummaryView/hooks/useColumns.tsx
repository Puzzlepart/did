/* eslint-disable react-hooks/exhaustive-deps */
import { IListColumn } from 'components/List/types'
import DateUtils from 'DateUtils'
import {
  IColumn,
  IDetailsColumnRenderTooltipProps
} from 'office-ui-fabric-react'
import React, { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { User } from 'types'
import { first } from 'underscore'
import { ReportsContext } from '../../context'
import { ColumnHeader } from '../ColumnHeader'
import { UserColumn } from '../UserColumn'
import { WeekColumn } from '../WeekColumn'

/**
 * Columns hook for SummaryView
 */
export function useColumns(): IListColumn[] {
  const { t } = useTranslation()
  const { state } = useContext(ReportsContext)
  const periods: any[] = state.preset?.periods || []
  return useMemo(() => {
    const columns: IListColumn[] = [
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
      ...periods.map((period) => {
        const key = period.join('_')
        const [week, year] = period
        const name = t('common.weekColumnTooltipTitle', { week: first(period) })
        const subText = DateUtils.getTimespanString({
          week,
          year,
          monthFormat: 'MMM'
        })
        return {
          key,
          fieldName: key,
          name,
          minWidth: 100,
          onRender: (item: any, _index: number, column: IColumn) => (
            <WeekColumn user={item.user} periods={item[column.fieldName]} />
          ),
          data: {
            subText,
            onRenderColumnHeader: (props: IDetailsColumnRenderTooltipProps) => (
              <ColumnHeader {...props} />
            )
          }
        } as IListColumn
      })
    )
    return columns
  }, [periods])
}
