import { TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'

/**
 * Mail column definition for reports list
 */
export const mailColumn: CreateColumnDefFunction = (t) =>
  createColumnDef<TimeEntry>('resource.mail', t('common.mailLabel'), {
    minWidth: 100,
    maxWidth: 100,
    data: { hidden: true }
  })
