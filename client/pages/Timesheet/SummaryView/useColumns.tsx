import { DateRangeType, IColumn } from '@fluentui/react'
import { ProjectTooltip } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import s from 'underscore.string'
import { useTimesheetContext } from '../context'
import { TimesheetScope } from '../TimesheetScope'
import { DurationColumn } from './DurationColumn'
import { ILabelColumnProps, LabelColumn } from './LabelColumn'

/**
 * Columns hook for `<SummaryView />`
 */
export function useColumns(): IColumn[] {
  const { t } = useTranslation()
  const { state } = useTimesheetContext()
  const onRender = (row: any, _index: number, col: IColumn) => (
    <DurationColumn row={row} column={col} />
  )
  let columns = []
  switch (state.dateRangeType) {
    case DateRangeType.Week: {
      columns = [...Array.from({ length: 7 }).keys()].map((index) => {
        const day = state.scope.getDay(index)
        return {
          key: day.format('YYYY-MM-DD'),
          fieldName: day.format('YYYY-MM-DD'),
          name: s.capitalize(day.format('ddd DD')),
          minWidth: 70,
          maxWidth: 70,
          onRender
        }
      })
    }
      break
    case DateRangeType.Month: {
      columns = state.periods.map((period) => ({
        key: period.id,
        fieldName: period.id,
        name: period.getName(t),
        minWidth: 70,
        maxWidth: 70,
        onRender
      }))
    }
      break
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
