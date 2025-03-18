import { DateRangeType, useTheme } from '@fluentui/react'
import { EventList, IListColumn, ProjectPopover } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import s from 'underscore.string'
import { useTimesheetContext } from '../../context'
import { CHANGE_PERIOD, CHANGE_VIEW } from '../../reducer/actions'
import { Overview } from '../Overview'
import { DurationColumn } from './DurationColumn'
import { ILabelColumnProps, LabelColumn } from './LabelColumn'
import styles from './SummaryView.module.scss'
import { mergeClasses } from '@fluentui/react-components'

/**
 * A custom hook that generates and returns a list of columns for a timesheet summary view.
 * The columns are dynamically created based on the current date range type (week or month)
 * and include additional configurations for rendering, styling, and interactivity.
 *
 * @returns An array of column definitions for the timesheet summary view.
 *
 * @remarks
 * - For the `Week` date range type, columns are generated for each day in the selected period,
 *   with headers styled to indicate national holidays.
 * - For the `Month` date range type, columns are generated for each period, with clickable headers
 *   that allow switching views and periods.
 * - Includes a "label" column for displaying project-related information with optional popovers
 *   and an "event list" for associated events.
 * - Includes a "sum" column for displaying aggregated data.
 */
export function useColumns(): IListColumn[] {
  const { t } = useTranslation()
  const theme = useTheme()
  const context = useTimesheetContext()
  const onRender = (row: any, _index: number, col: IListColumn) => (
    <DurationColumn row={row} column={col} />
  )
  let columns: IListColumn[] = []
  switch (context.state.dateRangeType) {
    case DateRangeType.Week: {
      {
        for (
          let i = context.state.selectedPeriod?.startDateIndex;
          i <= context.state.selectedPeriod?.endDateIndex;
          i++
        ) {
          const day = context.state.dateRange.getDay(i)
          columns.push({
            key: day.format('YYYY-MM-DD'),
            fieldName: day.format('YYYY-MM-DD'),
            name: s.capitalize(day.format('ddd DD')),
            minWidth: 70,
            maxWidth: 70,
            onRender,
            onRenderHeader: (props, defaultRender) => {
              const holiday = day.isNationalHoliday(
                context.state.selectedPeriod?.holidays
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
        columns = context.state.periods.map<IListColumn>((period) => ({
          key: period.id,
          fieldName: period.id,
          name: period.getName(t),
          minWidth: 70,
          maxWidth: 70,
          onRender,
          styles: { root: { cursor: 'pointer' } },
          onColumnClick: () => {
            context.dispatch(CHANGE_VIEW({ view: Overview }))
            context.dispatch(CHANGE_PERIOD({ id: period.id }))
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
        if (!row.project?.tag) return <LabelColumn {...row} />
        const items = context.state.selectedPeriod
          ?.getEvents()
          .filter((event) => event.project?.tag === row.project.tag)
        return (
          <ProjectPopover
            width={450}
            project={row.project}
            content={
              <div className={mergeClasses(styles.popoverContent, styles.eventList)}>
                <EventList
                  items={items}
                  dateFormat='MMM DD HH:mm'
                  columnWidths={{ title: 90, time: 180, duration: 50 }}
                  durationColumn={{ showModifiedDurationTooltip: false }}
                />
              </div>
            }
          >
            <LabelColumn {...row} />
          </ProjectPopover>
        )
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
    } as IListColumn
  ]
}
