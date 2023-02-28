/* eslint-disable unicorn/prevent-abbreviations */
import { DateRangeType, IColumn, useTheme } from '@fluentui/react'
import { ProjectTooltip } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import s from 'underscore.string'
import { useTimesheetContext } from '../../context'
import { CHANGE_PERIOD, CHANGE_VIEW } from '../../reducer/actions'
import { TimesheetView } from '../../types'
import { DurationColumn } from './DurationColumn'
import { ILabelColumnProps, LabelColumn } from './LabelColumn'

/**
 * Columns hook for `<SummaryView />`
 */
export function useColumns(): IColumn[] {
  const { t } = useTranslation()
  const theme = useTheme()
  const { state, dispatch } = useTimesheetContext()
  const onRender = (row: any, _index: number, col: IColumn) => (
    <DurationColumn row={row} column={col} />
  )
  let columns: IColumn[] = []
  switch (state.dateRangeType) {
    case DateRangeType.Week: {
      {
        for (
          let i = state.selectedPeriod?.startDateIndex;
          i <= state.selectedPeriod?.endDateIndex;
          i++
        ) {
          const day = state.dateRange.getDay(i)
          columns.push({
            key: day.format('YYYY-MM-DD'),
            fieldName: day.format('YYYY-MM-DD'),
            name: s.capitalize(day.format('ddd DD')),
            minWidth: 70,
            maxWidth: 70,
            onRender,
            onRenderHeader: (props, defaultRender) => {
              const holiday = day.isNationalHoliday(
                state.selectedPeriod?.holidays
              )
              return (
                <div
                  title={holiday?.name}
                  style={{ color: holiday && theme.palette.red }}
                >
                  {defaultRender(props)}
                </div>
              )
            }
          })
        }
      }
      break
    }
    case DateRangeType.Month: {
      {
        columns = state.periods.map<IColumn>((period) => ({
          key: period.id,
          fieldName: period.id,
          name: period.getName(t),
          minWidth: 70,
          maxWidth: 70,
          onRender,
          styles: { root: { cursor: 'pointer' } },
          onColumnClick: () => {
            dispatch(CHANGE_VIEW({ view: TimesheetView.Overview }))
            dispatch(CHANGE_PERIOD({ id: period.id }))
          }
        }))
      }
      break
    }
  }
  return [
    {
      key: 'label',
      fieldName: 'label',
      name: '',
      minWidth: 350,
      maxWidth: 350,
      isMultiline: true,
      isResizable: true,
      onRender: (row: ILabelColumnProps) => {
        if (row.project) {
          return (
            <ProjectTooltip project={row.project}>
              <LabelColumn {...row} />
            </ProjectTooltip>
          )
        }
        return <LabelColumn {...row} />
      }
    },
    ...columns,
    {
      key: 'sum',
      fieldName: 'sum',
      name: 'Sum',
      minWidth: 50,
      maxWidth: 50,
      isResizable: false,
      data: { style: { fontWeight: 500 } },
      onRender
    }
  ]
}
