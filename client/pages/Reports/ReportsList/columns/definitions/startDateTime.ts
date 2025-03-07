/* eslint-disable unicorn/consistent-function-scoping */
import $date from 'DateUtils'
import { TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'
import { DateTimeColumnOptions } from './DateTimeColumnOptions'

/**
 * Start date time column definition for reports list
 */
export const startDateTimeColumn =
  ({
    key = 'startDateTime',
    name,
    template = 'MMM DD, HH:mm',
    hiddenFromExport = false
  }: DateTimeColumnOptions = {}): CreateColumnDefFunction =>
  (t) =>
    createColumnDef<TimeEntry>(key, name ?? t('common.startTimeLabel'), {
      minWidth: 125,
      maxWidth: 125,
      data: { excelColFormat: 'date', hidden: true, hiddenFromExport },
      onRender: ({ startDateTime }) => $date.formatDate(startDateTime, template)
    })
