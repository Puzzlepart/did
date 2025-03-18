import { DateRangeType } from '@fluentui/react'
import $date from 'DateUtils'
import { IListColumn } from 'components/List/types'
import { TFunction, useTranslation } from 'react-i18next'
import { Customer, EventObject, Project } from 'types'
import _ from 'underscore'
import { useTimesheetContext } from '../../context'
import { ISummaryViewRow } from './types'

/**
 * Project row type for summary view
 */
type ProjectRow = Project | { name: string; tag?: string; customer?: Customer }

/**
 * Get unique project rows from `events`.
 *
 * @param events - Events
 * @param t - Translate function (needs to be passed as a parameter since this is not a hook)
 * @returns Array of unique projects and an unconfirmed hours entry
 */
function getUniqueProjectRows(
  events: EventObject[],
  t: TFunction
): ProjectRow[] {
  return [
    ..._.unique(
      _.filter(
        events.map((event) => event.project),
        Boolean
      ),
      (p: Project) => p?.tag
    ),
    { name: t('common.unconfirmedHours') }
  ]
}

/**
 * Helper function to sum event durations
 *
 * @param events - Events to sum durations for
 * @returns Total duration
 */
function sumEventDurations(events: EventObject[]): number {
  return events.reduce((sum, event) => sum + event.duration, 0)
}

/**
 * Hook to generate rows for the Summary View in Timesheet
 *
 * @param columns - List columns configuration
 * @returns Functions to generate rows and totals
 */
export function useRowGenerator(columns: IListColumn[]) {
  const { t } = useTranslation()
  const { state } = useTimesheetContext()

  /**
   * Generates the total row for the summary view
   *
   * @returns Summary view total row
   */
  function generateTotalRow(): ISummaryViewRow {
    switch (state.dateRangeType) {
      case DateRangeType.Week: {
        const events = state.selectedPeriod?.getEvents() || []
        const columnsTrimmed = columns.slice(1, -1)

        return columnsTrimmed.reduce(
          (row, col) => {
            const filteredEvents = events.filter(
              (event) =>
                $date.formatDate(event.startDateTime, 'YYYY-MM-DD') ===
                col.fieldName
            )
            const sum = sumEventDurations(filteredEvents)
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
            const sum = sumEventDurations(period.getEvents())
            row[period.id] = sum
            row.sum += sum
            return row
          },
          { label: t('common.sumLabel'), sum: 0 }
        )
      }
      default: {
        return { label: t('common.sumLabel'), sum: 0 }
      }
    }
  }

  /**
   * Generates all data rows for the summary view
   *
   * @returns Array of summary view rows
   */
  function generateRows(): ISummaryViewRow[] {
    switch (state.dateRangeType) {
      case DateRangeType.Week: {
        const events = state.selectedPeriod?.getEvents() || []
        const projectRows = getUniqueProjectRows(events, t)
        const columnsTrimmed = columns.slice(1, -1)

        const rows = projectRows
          .map((project) => {
            const projectEvents = events.filter(
              ({project}) =>
                project?.tag === project.tag ||
                (!project.tag && !project)
            )

            return columnsTrimmed.reduce(
              (object, col) => {
                const filteredEvents = projectEvents.filter(
                  (event) =>
                    $date.formatDate(event.startDateTime, 'YYYY-MM-DD') ===
                    col.fieldName
                )
                const sum = sumEventDurations(filteredEvents)
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
          .filter((row) => row.sum > 0)
        return rows
      }
      case DateRangeType.Month: {
        const events: EventObject[] = state.periods.flatMap((period) =>
          period.getEvents()
        )
        const projectRows = getUniqueProjectRows(events, t)

        const rows = projectRows
          .map((project) =>
            state.periods.reduce(
              (row, period) => {
                const periodEvents = period
                  .getEvents()
                  .filter(
                    (event) =>
                      event.project?.tag === project.tag ||
                      (!project.tag && !event.project)
                  )
                const sum = sumEventDurations(periodEvents)
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
          .filter((row) => row.sum > 0)
        return rows
      }
      default: {
        return []
      }
    }
  }

  return { generateTotalRow, generateRows } as const
}
