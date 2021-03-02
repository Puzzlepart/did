import { DurationColumn, List, ProjectTooltip } from 'components'
import DateUtils from 'DateUtils'
import { IColumn, MessageBar } from 'office-ui-fabric-react'
import React, { useContext } from 'react'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { EventObject, Project } from 'types'
import { unique } from 'underscore'
import { capitalize } from 'underscore.string'
import { TimesheetContext } from '../context'
import { TimesheetScope } from '../TimesheetScope'
import { ILabelColumnProps, LabelColumn } from './LabelColumn'
import styles from './SummaryView.module.scss'

/**
 * Creates columns from scope
 *
 * @param scope - Timesheet scope
 */
function createColumns(scope: TimesheetScope): IColumn[] {
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

/**
 * Generate rows from events and columns
 *
 * @param events - Events
 * @param columns - Columns
 */
function generateRows(events: EventObject[], columns: IColumn[]) {
  const projects = unique(
    events.map((event_) => event_.project),
    (p: Project) => p.tag
  )
  return projects.map((project) => {
    const projectEvents = events.filter(
      (event) => event.project.tag === project.tag
    )
    return [...columns].splice(1, columns.length - 2).reduce(
      (object, col) => {
        const sum = [...projectEvents]
          .filter(
            (event) =>
              DateUtils.formatDate(event.startDateTime, 'YYYY-MM-DD') ===
              col.fieldName
          )
          .reduce((sum, event) => (sum += event.duration), 0)
        object[col.fieldName] = sum
        object.sum += sum
        return object
      },
      {
        sum: 0,
        project,
        customer: project.customer
      }
    )
  })
}

/**
 * Generate total row
 *
 * @param events - Events
 * @param columns - Columns
 * @param label - Label
 */
function generateTotalRow(events: any[], columns: IColumn[], label: string) {
  return [...columns].splice(1, columns.length - 2).reduce(
    (object, col) => {
      const sum = [...events]
        .filter(
          (event) =>
            DateUtils.formatDate(event.startDateTime, 'YYYY-MM-DD') ===
            col.fieldName
        )
        .reduce((sum, event) => (sum += event.duration), 0)
      object[col.fieldName] = sum
      object.sum += sum
      return object
    },
    { label, sum: 0 }
  )
}

export const SummaryView = () => {
  const { t } = useTranslation()
  const context = useContext(TimesheetContext)
  if (isMobile) {
    return (
      <MessageBar styles={{ root: { marginTop: 8 } }}>
        {t('common.deviceViewNotSupported')}
      </MessageBar>
    )
  } else {
    const columns = createColumns(context.scope)
    const events = context.selectedPeriod?.getEvents(false) || []
    const items = [
      ...generateRows(events, columns),
      generateTotalRow(events, columns, t('common.sumLabel'))
    ]

    return (
      <div
        key={`summary_${context.selectedPeriod?.id}`}
        className={styles.root}>
        <List
          items={items}
          columns={columns}
          enableShimmer={!!context?.loading}
        />
      </div>
    )
  }
}
