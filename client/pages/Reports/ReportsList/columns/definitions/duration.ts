import $date from 'DateUtils'
import { TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'

/**
 * Duration column definition for reports list. Uses the
 * `getDurationString` function from the `DateUtils` module
 * to format the duration.
 */
export const durationColumn: CreateColumnDefFunction = (t) => {
    const renderFunction = ({ duration }: TimeEntry) =>  $date.getDurationString(duration, t)
    return createColumnDef<TimeEntry>('duration', t('common.durationLabel'), {
        minWidth: 60,
        maxWidth: 60
    }, renderFunction)
}