import { TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'

/**
 * Duration column definition for reports list
 */
export const durationColumn: CreateColumnDefFunction = (t) =>
  createColumnDef<TimeEntry>('duration', t('common.durationLabel'), {
    minWidth: 60,
    maxWidth: 60
  })
