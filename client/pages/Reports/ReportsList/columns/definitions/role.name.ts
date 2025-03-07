import { TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'

/**
 * Role column definition for reports list
 */
export const roleColumn: CreateColumnDefFunction = (t) =>
  createColumnDef<TimeEntry>('role.name', t('projects.roleFieldLabel'), {
    minWidth: 100,
    maxWidth: 140,
    data: { hidden: true }
  })
