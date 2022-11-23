import { DateRangeType, IColumn } from '@fluentui/react'
import $date from 'DateUtils'
import { TFunction, useTranslation } from 'react-i18next'
import { EventObject, Project } from 'types'
import _ from 'underscore'
import { useTimesheetContext } from '../../context'
import { ISummaryViewRow } from './types'

/**
 * Get unique project rows from `events`.
 *
 * @param events - Events
 * @param t - Translate function (needs to be passed as a parameter since this is not a hook)
 */
function getUniqueProjectRows(events: EventObject[], t: TFunction): any[] {
  return [
    ..._.unique(
      _.filter(
        events.map((event_) => event_.project),
        (p) => !!p
      ),
      (p: Project) => p?.tag
    ),
    { name: t('common.unconfirmedHours') }
  ]
}

export function useRowGenerator(columns: IColumn[]) {
  const { t } = useTranslation()
  const { state } = useTimesheetContext()

  function generateTotalRow(): ISummaryViewRow {
    switch (state.dateRangeType) {
      case DateRangeType.Week: {
        const events = state.selectedPeriod?.getEvents() || []
        return [...columns].splice(1, columns.length - 2).reduce(
          (row, col) => {
            const sum = [...events]
              .filter(
                (event) =>
                  $date.formatDate(event.startDateTime, 'YYYY-MM-DD') ===
                  col.fieldName
              )
              .reduce((sum, event) => (sum += event.duration), 0)
            row[col.fieldName] = sum
            row.sum += sum
            return row
          },
          { label: t('common.sumLabel'), sum: 0 }
        )
      }
      case DateRangeType.Month: {
        return state.periods.reduce(
          (row, period) => {
            const sum = period
              .getEvents()
              .reduce((sum, event) => (sum += event.duration), 0)
            row[period.id] = sum
            row.sum += sum
            return row
          },
          { label: t('common.sumLabel'), sum: 0 }
        )
      }
    }
  }

  function generateRows(): ISummaryViewRow[] {
    switch (state.dateRangeType) {
      case DateRangeType.Week: {
        const events = state.selectedPeriod?.getEvents() || []
        const projectRows = getUniqueProjectRows(events, t)
        const rows = projectRows.map((project) => {
          const projectEvents = events.filter(
            (event) =>
              event.project?.tag === project.tag ||
              (!project.tag && !event.project)
          )
          return [...columns].splice(1, columns.length - 2).reduce(
            (object, col) => {
              const sum = [...projectEvents]
                .filter(
                  (event) =>
                    $date.formatDate(event.startDateTime, 'YYYY-MM-DD') ===
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
        }).filter(row => row.sum > 0)
        return rows
      }
      case DateRangeType.Month: {
        const events: EventObject[] = state.periods.flatMap((period) =>
          period.getEvents()
        )
        const projectRows = getUniqueProjectRows(events, t)
        const rows = projectRows.map((project) =>
          state.periods.reduce(
            (row, period) => {
              const sum = period
                .getEvents()
                .filter(
                  (event) =>
                    event.project?.tag === project.tag ||
                    (!project.tag && !event.project)
                )
                .reduce((sum, event) => (sum += event.duration), 0)
              row[period.id] = sum
              row.sum += sum
              return row
            },
            {
              sum: 0,
              project,
              customer: project.customer
            }
          )
        )
        return rows
      }
    }
  }

  return { generateTotalRow, generateRows } as const
}
