import { TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'

/**
 * Hourly rate column definition for reports list
 */
export const hourlyRateColumn: CreateColumnDefFunction = (t) =>
  createColumnDef<TimeEntry>('role.hourlyRate', t('common.hourlyRateLabel'), {
    minWidth: 100,
    maxWidth: 140,
    data: { hidden: true }
  })
