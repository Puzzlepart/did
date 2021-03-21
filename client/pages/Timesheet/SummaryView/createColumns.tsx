import { ProjectTooltip } from 'components'
import { IColumn } from 'office-ui-fabric-react'
import React from 'react'
import { capitalize } from 'underscore.string'
import { TimesheetScope } from '../TimesheetScope'
import { DurationColumn } from './DurationColumn'
import { ILabelColumnProps, LabelColumn } from './LabelColumn'

/**
 * Creates columns from scope
 *
 * @param scope - Timesheet scope
 */
export function createColumns(scope: TimesheetScope): IColumn[] {
  const onRender = (row: any, _index: number, col: IColumn) => (
    <DurationColumn row={row} column={col} />
  )
  const columns = [...Array.from({ length: 7 }).keys()].map((index) => {
    const day = scope.getDay(index)
    return {
      key: day.format('YYYY-MM-DD'),
      fieldName: day.format('YYYY-MM-DD'),
      name: capitalize(day.format('ddd DD')),
      minWidth: 70,
      maxWidth: 70,
      onRender
    }
  })
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
