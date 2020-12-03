import { CustomerLink } from 'components/CustomerLink'
import { ProjectLink } from 'components/ProjectLink'
import { TFunction } from 'i18next'
import { IColumn } from 'office-ui-fabric'
import React from 'react'
import DateUtils from 'utils/date'
import { ExcelColumnType } from 'utils/exportExcel'

const columns = (t: TFunction): IColumn[] => [
  {
    key: 'title',
    fieldName: 'title',
    name: t('common.titleLabel'),
    minWidth: 100
  },
  {
    key: 'project',
    fieldName: 'project.name',
    name: t('common.project'),
    minWidth: 100,
    onRender: ({ project }) => <ProjectLink project={project} />
  },
  {
    key: 'customer',
    fieldName: 'customer.name',
    name: t('common.customer'),
    minWidth: 100,
    onRender: ({ customer }) => <CustomerLink customer={customer} />
  },
  {
    key: 'duration',
    fieldName: 'duration',
    name: t('common.durationLabel'),
    minWidth: 100
  },
  {
    key: 'startDateTime',
    fieldName: 'startDateTime',
    name: t('common.startTimeLabel'),
    minWidth: 100,
    data: { excelColFormat: 'date' as ExcelColumnType },
    onRender: ({ startDateTime }) => DateUtils.formatDate(startDateTime, 'MMM DD, YYYY HH:mm')
  },
  {
    key: 'endDateTime',
    fieldName: 'endDateTime',
    name: t('common.endTimeLabel'),
    minWidth: 100,
    data: { excelColFormat: 'date' as ExcelColumnType },
    onRender: ({ endDateTime }) => DateUtils.formatDate(endDateTime, 'MMM DD, YYYY HH:mm')
  },
  {
    key: 'weekNumber',
    fieldName: 'weekNumber',
    name: t('common.weekLabel'),
    minWidth: 100
  },
  {
    key: 'monthNumber',
    fieldName: 'monthNumber',
    name: t('common.monthLabel'),
    minWidth: 100,
    onRender: ({ monthNumber }) => DateUtils.getMonthNames()[monthNumber - 1]
  },
  {
    key: 'year',
    fieldName: 'year',
    name: t('common.yearLabel'),
    minWidth: 100
  },
  {
    key: 'resource.displayName',
    fieldName: 'resource.displayName',
    name: t('common.employeeLabel'),
    minWidth: 100
  },
  {
    key: 'resource.surname',
    fieldName: 'resource.surname',
    name: t('common.surnameLabel'),
    minWidth: 100,
    data: { hidden: true }
  },
  {
    key: 'resource.givenName',
    fieldName: 'resource.givenName',
    name: t('common.givenNameLabel'),
    minWidth: 100,
    data: { hidden: true }
  },
  {
    key: 'resource.mail',
    fieldName: 'resource.mail',
    name: t('common.mailLabel'),
    minWidth: 100,
    data: { hidden: true }
  }
]

export default columns
