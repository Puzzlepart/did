import $date from 'DateUtils'
import { TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'

/**
 * Period column definition for reports list
 */
export const periodColumn: CreateColumnDefFunction = (t) =>
  createColumnDef<TimeEntry>(
    'period',
    t('common.periodLabel'),
    {
      description: t('reports.periodColumnDescription'),
      minWidth: 100,
      maxWidth: 100,
      data: { hiddenFromExport: true }
    },
    (item) => `${item.week}/${item.month}/${item.year}`
  )

/**
 * Week column definition for reports list
 */
export const weekColumn: CreateColumnDefFunction = (t) =>
  createColumnDef<TimeEntry>('week', t('common.weekLabel'), {
    minWidth: 50,
    maxWidth: 50,
    data: {
      hidden: true,
      isGroupable: true
    }
  })

/**
 * Month column definition for reports list
 */
export const monthColumn: CreateColumnDefFunction = (t) =>
  createColumnDef<TimeEntry>(
    'month',
    t('common.monthLabel'),
    {
      minWidth: 60,
      maxWidth: 60,
      data: {
        hidden: true,
        isGroupable: true
      }
    },
    (item) => $date.getMonthNames()[item.month - 1]
  )

/**
 * Year column definition for reports list
 */
export const yearColumn: CreateColumnDefFunction = (t) =>
  createColumnDef<TimeEntry>('year', t('common.yearLabel'), {
    minWidth: 60,
    maxWidth: 60,
    data: {
      hidden: true,
      isGroupable: true
    }
  })
