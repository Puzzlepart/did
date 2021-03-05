/* eslint-disable react-hooks/exhaustive-deps */
import { CustomerLink } from 'components/CustomerLink'
import { ProjectLink } from 'components/ProjectLink'
import DateUtils from 'DateUtils'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ExcelColumnType } from 'utils/exportExcel'

export function useColumns() {
  const { t } = useTranslation()
  return useMemo(
    () => [
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
        onRender: ({ startDateTime }) =>
          DateUtils.formatDate(startDateTime, 'MMM DD, YYYY HH:mm')
      },
      {
        key: 'endDateTime',
        fieldName: 'endDateTime',
        name: t('common.endTimeLabel'),
        minWidth: 100,
        data: { excelColFormat: 'date' as ExcelColumnType },
        onRender: ({ endDateTime }) =>
          DateUtils.formatDate(endDateTime, 'MMM DD, YYYY HH:mm')
      },
      {
        key: 'week',
        fieldName: 'week',
        name: t('common.weekLabel'),
        minWidth: 100
      },
      {
        key: 'month',
        fieldName: 'month',
        name: t('common.monthLabel'),
        minWidth: 100,
        onRender: ({ month }) => DateUtils.getMonthNames()[month - 1]
      },
      {
        key: 'year',
        fieldName: 'year',
        name: t('common.yearLabel'),
        minWidth: 100
      }
    ],
    []
  )
}
