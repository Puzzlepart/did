import { DurationColumn } from 'components/DurationColumn'
import { LabelColumn } from 'components/LabelColumn'
import List from 'components/List'
import { EventObject, Project } from 'types'
import { MessageBar, IColumn } from 'office-ui-fabric'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { unique } from 'underscore'
import { capitalize } from 'underscore.string'
import DateUtils from 'utils/date'
import { TimesheetContext } from '../'
import { TimesheetScope } from '../TimesheetScope'
import styles from './SummaryView.module.scss'
import { isMobile } from 'react-device-detect'
import { ILabelColumnProps } from 'components/LabelColumn'

/**
 * Creates columns from scope
 *
 * @param {TimesheetScope} scope Timesheet scope
 */
function createColumns(scope: TimesheetScope) {
  const onRender = (row: any, _index: number, col: IColumn) => <DurationColumn row={row} column={col} />
  const columns = Array.from(Array(7).keys()).map((i) => {
    const day = scope.getDay(i)
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
      onRender: (row: ILabelColumnProps) => <LabelColumn {...row} />
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
 * @param {EventObject[]} events Events
 * @param {IColumn[]} columns Columns
 */
function generateRows(events: EventObject[], columns: IColumn[]) {
  const projects = unique(
    events.map((e) => e.project),
    (p: Project) => p.id
  )
  return projects.map((project) => {
    const projectEvents = events.filter((event) => event.project.id === project.id)
    return [...columns].splice(1, columns.length - 2).reduce(
      (obj, col) => {
        const sum = [...projectEvents]
          .filter((event) => DateUtils.formatDate(event.startDateTime, 'YYYY-MM-DD') === col.fieldName)
          .reduce((sum, event) => (sum += event.duration), 0)
        obj[col.fieldName] = sum
        obj.sum += sum
        return obj
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
 * @param {any[]} events Events
 * @param {IColumn[]} columns Columns
 * @param {string} label Label
 */
function generateTotalRow(events: any[], columns: IColumn[], label: string) {
  return [...columns].splice(1, columns.length - 2).reduce(
    (obj, col) => {
      const sum = [...events]
        .filter((event) => DateUtils.formatDate(event.startDateTime, 'YYYY-MM-DD') === col.fieldName)
        .reduce((sum, event) => (sum += event.duration), 0)
      obj[col.fieldName] = sum
      obj.sum += sum
      return obj
    },
    { label, sum: 0 }
  )
}

export const SummaryView = () => {
  const { t } = useTranslation()
  if (isMobile) {
    return <MessageBar styles={{ root: { marginTop: 8 } }}>{t('common.deviceViewNotSupported')}</MessageBar>
  } else {
    const context = useContext(TimesheetContext)
    const columns = createColumns(context.scope)
    const events = (context.selectedPeriod?.getEvents() || []).filter((e) => !!e.project)
    const items = [...generateRows(events, columns), generateTotalRow(events, columns, t('common.sumLabel'))]

    return (
      <div key={`summary_${context.selectedPeriod?.id}`} className={styles.root}>
        <List items={items} columns={columns} enableShimmer={!!context?.loading} />
      </div>
    )
  }
}
