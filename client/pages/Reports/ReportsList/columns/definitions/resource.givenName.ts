import { TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'

/**
 * Given name column definition for reports list
 */
export const givenNameColumn: CreateColumnDefFunction = (t) =>
  createColumnDef<TimeEntry>('resource.givenName', t('common.givenNameLabel'), {
    minWidth: 100,
    maxWidth: 100,
    data: { hidden: true }
  })
