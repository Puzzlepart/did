import { TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'

export const titleColumn: CreateColumnDefFunction = (t) =>
  createColumnDef<TimeEntry>('title', t('common.titleLabel'), {
    minWidth: 100,
    maxWidth: 150,
    data: {
      required: true
    }
  })
