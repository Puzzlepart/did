import $date, { DateObject } from 'DateUtils'
import { TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'

/**
 * Start and end date time column definition for reports list
 */
export const startEndDateTimeColumn: CreateColumnDefFunction = (t) =>
  createColumnDef<TimeEntry>(
    'startEndDateTime',
    t('common.timeLabel'),
    {
      minWidth: 125,
      maxWidth: 170,
      data: {
        hiddenFromExport: true
      }
    },
    ({ startDateTime, endDateTime }) =>
      $date.getTimespanString({
        startDate: new DateObject(startDateTime),
        endDate: new DateObject(endDateTime),
        dayFormat: 'DD.',
        includeTime: 'HH:mm',
        includeMonth: {
          startDate: true,
          endDate: false
        }
      })
  )
