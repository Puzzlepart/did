import $date from 'DateUtils'
import { TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'

/**
 * Start date time column definition for reports list
 */
export const startDateTimeColumn: CreateColumnDefFunction = (t) =>
  createColumnDef<TimeEntry>('startDateTime', t('common.startTimeLabel'), {
    minWidth: 125,
    maxWidth: 125,
    data: { excelColFormat: 'date', hidden: true },
    onRender: ({ startDateTime }) =>
      $date.formatDate(startDateTime, 'MMM DD, YYYY HH:mm')
  })
