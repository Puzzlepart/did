import $date, { DateObject } from 'DateUtils'
import { IProjectTagProps } from 'components'
import { ICustomerLinkProps } from 'components/CustomerLink'
import {
  CustomerFilter,
  ProjectFilter,
  ResourceFilter
} from 'components/FilterPanel'
import { IListColumn } from 'components/List/types'
import { IProjectLinkProps } from 'components/ProjectLink/types'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TimeEntry } from 'types'
import { createColumnDef } from 'utils'
import { UserColumn } from '../../../components/UserColumn'

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
        createColumnDef<TimeEntry>('title', t('common.titleLabel'), {
          minWidth: 100,
          maxWidth: 150
        }),
        createColumnDef<TimeEntry, IProjectLinkProps>(
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
              isGroupable: true,
              isFilterable: true,
              filterType: ProjectFilter
            }
          }
        ),
        createColumnDef<TimeEntry, ICustomerLinkProps>(
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
              isGroupable: true,
              isFilterable: true,
              filterType: CustomerFilter
            }
          }
        ),
        createColumnDef<TimeEntry, IProjectTagProps>(
          'project.tag',
          t('projects.keyFieldLabel'),
          {
            minWidth: 160,
            maxWidth: 180,
            renderAs: 'projectTag',
            createRenderProps: ({ project }) => ({
              project,
              displayIcon: true
            })
          }
        ),
        createColumnDef<TimeEntry>(
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
        ),
        createColumnDef<TimeEntry>('duration', t('common.durationLabel'), {
          minWidth: 60,
          maxWidth: 60
        }),
        createColumnDef<TimeEntry>(
          'startDateTime',
          t('common.startTimeLabel'),
          {
            minWidth: 125,
            data: { excelColFormat: 'date', hidden: true },
            onRender: ({ startDateTime }) =>
              $date.formatDate(startDateTime, 'MMM DD, YYYY HH:mm')
          }
        ),
        createColumnDef<TimeEntry>('endDateTime', t('common.endTimeLabel'), {
          minWidth: 125,
          data: { excelColFormat: 'date', hidden: true },
          onRender: ({ endDateTime }) =>
            $date.formatDate(endDateTime, 'MMM DD, YYYY HH:mm')
        }),
        createColumnDef<TimeEntry>(
          'resource.displayName',
          t('common.employeeLabel'),
          {
            minWidth: 120,
            maxWidth: 175,
            onRender: ({ resource }) => <UserColumn user={resource} />,
            data: {
              isGroupable: true,
              isFilterable: true,
              filterType: ResourceFilter
            }
          }
        ),
        createColumnDef<TimeEntry>(
          'resource.surname',
          t('common.surnameLabel'),
          {
            minWidth: 100,
            data: { hidden: true }
          }
        ),
        createColumnDef<TimeEntry>(
          'resource.givenName',
          t('common.givenNameLabel'),
          {
            minWidth: 100,
            data: { hidden: true }
          }
        ),
        createColumnDef<TimeEntry>('resource.mail', t('common.mailLabel'), {
          minWidth: 100,
          data: { hidden: true }
        }),
        createColumnDef<TimeEntry>('week', t('common.weekLabel'), {
          minWidth: 50,
          maxWidth: 50,
          data: {
            isGroupable: true
          }
        }),
        createColumnDef<TimeEntry>('month', t('common.monthLabel'), {
          minWidth: 60,
          maxWidth: 60,
          onRender: ({ month }) => $date.getMonthNames()[month - 1]
        }),
        createColumnDef<TimeEntry>('year', t('common.yearLabel'), {
          minWidth: 60,
          maxWidth: 60,
          data: {
            isGroupable: true
          }
        })
      ].map<IListColumn>((col) => ({ ...col, isResizable: true })),
    []
  )
}
