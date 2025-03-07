import { UserColumn } from 'components'
import React from 'react'
import { TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'

/**
 * Manager column definition for reports list
 */
export const managerColumn: CreateColumnDefFunction = (t) =>
  createColumnDef<TimeEntry>(
    'resource.manager.displayName',
    t('common.managerLabel'),
    {
      minWidth: 100,
      maxWidth: 175,
      onRender: ({ resource }) => <UserColumn user={resource.manager} />,
      data: { hidden: true }
    }
  )
