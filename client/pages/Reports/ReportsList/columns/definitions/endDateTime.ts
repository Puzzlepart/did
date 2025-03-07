import $date from 'DateUtils'
import { TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'
import { DateTimeColumnOptions } from './DateTimeColumnOptions'

/**
 * End date time column definition for reports list
 */
export const endDateTimeColumn =
  ({
    key = 'endDateTime',
    name,
    template = 'MMM DD, HH:mm',
    hiddenFromExport = false
  }: DateTimeColumnOptions = {}): CreateColumnDefFunction =>
  (t) =>
    createColumnDef<TimeEntry>(key, name ?? t('common.endTimeLabel'), {
      minWidth: 125,
      maxWidth: 125,
      data: { excelColFormat: 'date', hidden: true, hiddenFromExport },
      onRender: ({ endDateTime }) => $date.formatDate(endDateTime, template)
    })
