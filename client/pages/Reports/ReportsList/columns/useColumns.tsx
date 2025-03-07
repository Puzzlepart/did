/* eslint-disable unicorn/prevent-abbreviations */
import $date, { DateObject } from 'DateUtils'
import { ICustomerLinkProps, IListColumn, IProjectLinkProps, IProjectTagProps, UserColumn } from 'components'
import {
  CustomerFilter,
  ProjectFilter,
  ResourceFilter
} from 'components/FilterPanel'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TimeEntry } from 'types'
import { createColumnDef, CreateColumnDefFunction } from 'utils'


const titleColumn:CreateColumnDefFunction = t => createColumnDef<TimeEntry>('title', t('common.titleLabel'), {
  minWidth: 100,
  maxWidth: 150,
  data: {
    required: true,
  }
})

const projectNameColumn:CreateColumnDefFunction = t => createColumnDef<TimeEntry, IProjectLinkProps>(
  'project.name',
  t('common.project'),
  {
    minWidth: 100,
    maxWidth: 140,
    renderAs: 'projectLink',
    createRenderProps: ({ project }) => ({
      project,
      showIcon: false
    }),
    data: {
      isSortable: true,
      isGroupable: true,
      isFilterable: true,
      filterType: ProjectFilter
    }
  }
)

const customerNameColumn:CreateColumnDefFunction = t => createColumnDef<TimeEntry, ICustomerLinkProps>(
  'customer.name',
  t('common.customer'),
  {
    minWidth: 100,
    maxWidth: 140,
    renderAs: 'customerLink',
    createRenderProps: ({ customer }) => ({
      customer
    }),
    data: {
      isSortable: true,
      isGroupable: true,
      isFilterable: true,
      filterType: CustomerFilter
    }
  }
)

const parentProjectColumn:CreateColumnDefFunction = t => createColumnDef<TimeEntry, IProjectLinkProps>(
  'project.parent.name',
  t('common.parentProject'),
  {
    minWidth: 100,
    maxWidth: 140,
    renderAs: 'projectLink',
    createRenderProps: ({ project }) => ({
      project: project.parent,
      showIcon: false
    }),
    data: {
      isSortable: true,
      isGroupable: true,
      isFilterable: true,
      filterType: ProjectFilter
    }
  }
)

const projectTagColumn:CreateColumnDefFunction = t => createColumnDef<TimeEntry, IProjectTagProps>(
  'project.tag',
  t('projects.keyFieldLabel'),
  {
    minWidth: 180,
    maxWidth: 200,
    renderAs: 'projectTag',
    createRenderProps: ({ project }) => ({
      project,
      size: 'small',
      displayIcon: true
    }),
    data: {
      isSortable: true
    }
  }
)

const roleColumn:CreateColumnDefFunction = t => createColumnDef<TimeEntry>('role.name', t('projects.roleFieldLabel'), {
  minWidth: 100,
  maxWidth: 140,
  data: { hidden: true }
})

const hourlyRateColumn:CreateColumnDefFunction = t => createColumnDef<TimeEntry>('role.hourlyRate', t('common.hourlyRateLabel'), {  
  minWidth: 100,
  maxWidth: 140,
  data: { hidden: true }
})

const startEndDateTimeColumn:CreateColumnDefFunction = t => createColumnDef<TimeEntry>(
  'startEndDateTime',
  t('common.timeLabel'),
  {
    minWidth: 125,
    maxWidth: 170,
    data: {
      hiddenFromExport: true
    }
  },
  ({ startDateTime, endDateTime }) =>
    $date.getTimespanString({
      startDate: new DateObject(startDateTime),
      endDate: new DateObject(endDateTime),
      dayFormat: 'DD.',
      includeTime: 'HH:mm',
      includeMonth: {
        startDate: true,
        endDate: false
      }
    })
)

const durationColumn:CreateColumnDefFunction = t => createColumnDef<TimeEntry>('duration', t('common.durationLabel'), {
  minWidth: 60,
  maxWidth: 60
})

const startDateTimeColumn:CreateColumnDefFunction = t => createColumnDef<TimeEntry>(
  'startDateTime',
  t('common.startTimeLabel'),
  {
    minWidth: 125,
    maxWidth: 125,
    data: { excelColFormat: 'date', hidden: true },
    onRender: ({ startDateTime }) =>
      $date.formatDate(startDateTime, 'MMM DD, YYYY HH:mm')
  }
)

const endDateTimeColumn:CreateColumnDefFunction = t => createColumnDef<TimeEntry>('endDateTime', t('common.endTimeLabel'), {
  minWidth: 125,
  maxWidth: 125,
  data: { excelColFormat: 'date', hidden: true },
  onRender: ({ endDateTime }) =>
    $date.formatDate(endDateTime, 'MMM DD, YYYY HH:mm')
})

const resourceColumn:CreateColumnDefFunction = t => createColumnDef<TimeEntry>(
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

const surnameColumn:CreateColumnDefFunction = t => createColumnDef<TimeEntry>('resource.surname', t('common.surnameLabel'), {
  minWidth: 100,
  maxWidth: 100,
  data: { hidden: true }
})

const givenNameColumn:CreateColumnDefFunction = t => createColumnDef<TimeEntry>('resource.givenName', t('common.givenNameLabel'), {
  minWidth: 100,
  maxWidth: 100,
  data: { hidden: true }
})

const managerColumn:CreateColumnDefFunction = t => createColumnDef<TimeEntry>(
  'resource.manager.displayName',
  t('common.managerLabel'),
  {
    minWidth: 100,
    maxWidth: 175,
    onRender: ({ resource }) => <UserColumn user={resource.manager} />,
    data: { hidden: true }
  }
)

const mailColumn:CreateColumnDefFunction = t => createColumnDef<TimeEntry>('resource.mail', t('common.mailLabel'), {
  minWidth: 100,
  maxWidth: 100,
  data: { hidden: true }
})

const periodColumn:CreateColumnDefFunction = t => createColumnDef<TimeEntry>('period', t('common.periodLabel'), {
  minWidth: 100,
  maxWidth: 100,
  data: { hiddenFromExport: true },
}, (item) => `${item.week}/${item.month}/${item.year}`)

const weekColumn:CreateColumnDefFunction = t => createColumnDef<TimeEntry>('week', t('common.weekLabel'), {
  minWidth: 50,
  maxWidth: 50,
  data: {
    hidden: true,
    isGroupable: true
  }
})

const monthColumn:CreateColumnDefFunction = t => createColumnDef<TimeEntry>('month', t('common.monthLabel'), {
  minWidth: 60,
  maxWidth: 60,
  data: {
    hidden: true,
    isGroupable: true
  }
}, (item) => $date.getMonthNames()[item.month - 1])

const yearColumn:CreateColumnDefFunction = t => createColumnDef<TimeEntry>('year', t('common.yearLabel'), {
  minWidth: 60,
  maxWidth: 60,
  data: {
    hidden: true,
    isGroupable: true
  }
})

/**
 * Columns hook for the `ReportsList` component.
 *
 * @category Reports Hooks
 */
export function useColumns() {
  const { t } = useTranslation()
  return useMemo<IListColumn[]>(
    () =>
      [
        titleColumn,
        parentProjectColumn,
        projectNameColumn,
        customerNameColumn,
        projectTagColumn,
        roleColumn,
        hourlyRateColumn,
        startEndDateTimeColumn,
        durationColumn,
        startDateTimeColumn,
        endDateTimeColumn,
        resourceColumn,
        surnameColumn,
        givenNameColumn,
        managerColumn,
        mailColumn,
        periodColumn,
        weekColumn,
        monthColumn,
        yearColumn,
      ]
      .map(col => col(t))
      .map<IListColumn>((col) => ({ ...col, isResizable: true })),
    []
  )
}
