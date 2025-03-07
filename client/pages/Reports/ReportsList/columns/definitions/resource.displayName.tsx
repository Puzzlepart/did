import { UserColumn } from 'components'
import { ResourceFilter } from 'components/FilterPanel'
import React from 'react'
import { TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'

/**
 * Resource column definition for reports list
 */
export const resourceColumn: CreateColumnDefFunction = (t) =>
  createColumnDef<TimeEntry>(
    'resource.displayName',
    t('common.employeeLabel'),
    {
      minWidth: 120,
      maxWidth: 175,
      data: {
        isGroupable: true,
        isFilterable: true,
        filterType: ResourceFilter
      }
    },
    ({ resource, role }) => <UserColumn user={resource} role={role} />
  )
