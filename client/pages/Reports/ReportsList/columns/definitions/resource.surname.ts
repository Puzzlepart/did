import { TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'

/**
 * Surname column definition for reports list
 */
export const surnameColumn: CreateColumnDefFunction = (t) =>
  createColumnDef<TimeEntry>('resource.surname', t('common.surnameLabel'), {
    minWidth: 100,
    maxWidth: 100,
    data: { hidden: true }
  })
