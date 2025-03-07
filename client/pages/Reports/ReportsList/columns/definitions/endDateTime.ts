import $date from 'DateUtils'
import { TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'

/**
 * End date time column definition for reports list
 */
export const endDateTimeColumn: CreateColumnDefFunction = (t) =>
  createColumnDef<TimeEntry>('endDateTime', t('common.endTimeLabel'), {
    minWidth: 125,
    maxWidth: 125,
    data: { excelColFormat: 'date', hidden: true },
    onRender: ({ endDateTime }) =>
      $date.formatDate(endDateTime, 'MMM DD, YYYY HH:mm')
  })
