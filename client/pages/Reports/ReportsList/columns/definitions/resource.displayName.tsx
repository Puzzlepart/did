/* eslint-disable unicorn/consistent-function-scoping */
import { UserColumn } from 'components'
import { ResourceFilter } from 'components/FilterPanel'
import React from 'react'
import { TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'

type ResourceColumnOptions = {
  key?: string
  label?: string
  description?: string
  includeRoleDetails?: boolean
  hidden?: boolean
}

/**
 * Resource column definition for reports list
 */
export const resourceColumn =
  ({
    key = 'resource.displayName',
    label,
    description,
    includeRoleDetails = false,
    hidden = false
  }: ResourceColumnOptions = {}): CreateColumnDefFunction =>
  (t) =>
    createColumnDef<TimeEntry>(
      key,
      t('common.employeeLabel'),
      {
        label,
        description,
        minWidth: 120,
        maxWidth: 175,
        data: {
          isGroupable: true,
          isFilterable: true,
          hidden,
          filterType: ResourceFilter
        }
      },
      ({ resource, role }) => (
        <UserColumn user={resource} role={includeRoleDetails && role} />
      )
    )
