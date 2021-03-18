/* eslint-disable react-hooks/exhaustive-deps */
import DateUtils from 'DateUtils'
import {
  IColumn,
  IDetailsColumnRenderTooltipProps
} from 'office-ui-fabric-react'
import React, { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { User } from 'types'
import { ReportsContext } from '../../context'
import { ColumnHeader } from '../ColumnHeader'
import { UserColumn } from '../UserColumn'
import { WeekColumn } from '../WeekColumn'

/**
 * Columns hook for SummaryView
 */
export function useColumns(): IColumn[] {
  const { t } = useTranslation()
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
          name: t('common.weekColumnTooltipTitle', { week: p.join('/') }),
          minWidth: 100,
          onRender: (item: any, _index: number, column: IColumn) => (
            <WeekColumn user={item.user} periods={item[column.fieldName]} />
          ),
          data: {
            subText: DateUtils.getTimespanString({
              week,
              year,
              monthFormat: 'MMM'
            }),
            onRenderColumnHeader: (props: IDetailsColumnRenderTooltipProps) => (
              <ColumnHeader {...props} />
            )
          }
        } as IColumn
      })
    )
    return columns
  }, [periods])
}
