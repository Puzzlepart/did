/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable tsdoc/syntax */
/* eslint-disable react-hooks/exhaustive-deps */
import { CustomerLink } from 'components/CustomerLink'
import { IListColumn } from 'components/List/types'
import { ProjectLink } from 'components/ProjectLink'
import $date, { DateObject } from 'DateUtils'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { UserColumn } from '../../../components/UserColumn'

/**
 * Columns hook
 *
 * @category Reports Hooks
 */
export function useColumns(): IListColumn[]  {
  const { t } = useTranslation()
  return [
    {
      key: 'title',
      fieldName: 'title',
      name: t('common.titleLabel'),
      minWidth: 100,
      maxWidth: 150
    } as IListColumn,
    {
      key: 'project',
      fieldName: 'project.name',
      name: t('common.project'),
      minWidth: 100,
      maxWidth: 140,
      onRender: ({ project }) => <ProjectLink project={project} />
    } as IListColumn,
    {
      key: 'customer',
      fieldName: 'customer.name',
      name: t('common.customer'),
      minWidth: 100,
      maxWidth: 140,
      onRender: ({ customer }) => <CustomerLink customer={customer} />
    } as IListColumn,
    {
      key: 'startEndDateTime',
      fieldName: 'startEndDateTime',
      name: t('common.timeLabel'),
      minWidth: 125,
      maxWidth: 170,
      data: {
        hiddenFromExport: true
      },
      onRender: ({ startDateTime, endDateTime }) =>
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
    } as IListColumn,
    {
      key: 'duration',
      fieldName: 'duration',
      name: t('common.durationLabel'),
      minWidth: 60,
      maxWidth: 60
    } as IListColumn,
    {
      key: 'startDateTime',
      fieldName: 'startDateTime',
      name: t('common.startTimeLabel'),
      minWidth: 125,
      data: { excelColFormat: 'date', hidden: true },
      onRender: ({ startDateTime }) =>
        $date.formatDate(startDateTime, 'MMM DD, YYYY HH:mm')
    } as IListColumn,
    {
      key: 'endDateTime',
      fieldName: 'endDateTime',
      name: t('common.endTimeLabel'),
      minWidth: 125,
      data: { excelColFormat: 'date', hidden: true },
      onRender: ({ endDateTime }) =>
        $date.formatDate(endDateTime, 'MMM DD, YYYY HH:mm')
    } as IListColumn,
    {
      key: 'resource.displayName',
      fieldName: 'resource.displayName',
      name: t('common.employeeLabel'),
      minWidth: 120,
      maxWidth: 175,
      onRender: ({ resource }) => <UserColumn user={resource} />
    } as IListColumn,
    {
      key: 'resource.surname',
      fieldName: 'resource.surname',
      name: t('common.surnameLabel'),
      minWidth: 100,
      data: { hidden: true }
    } as IListColumn,
    {
      key: 'resource.givenName',
      fieldName: 'resource.givenName',
      name: t('common.givenNameLabel'),
      minWidth: 100,
      data: { hidden: true }
    } as IListColumn,
    {
      key: 'resource.mail',
      fieldName: 'resource.mail',
      name: t('common.mailLabel'),
      minWidth: 100,
      data: { hidden: true }
    } as IListColumn,
    {
      key: 'week',
      fieldName: 'week',
      name: t('common.weekLabel'),
      minWidth: 50,
      maxWidth: 50
    } as IListColumn,
    {
      key: 'month',
      fieldName: 'month',
      name: t('common.monthLabel'),
      minWidth: 60,
      maxWidth: 60,
      onRender: ({ month }) => $date.getMonthNames()[month - 1]
    } as IListColumn,
    {
      key: 'year',
      fieldName: 'year',
      name: t('common.yearLabel'),
      minWidth: 60,
      maxWidth: 60
    } as IListColumn
  ].map((col: IListColumn) => ({ ...col, isResizable: true }))
}
