/* eslint-disable unicorn/prevent-abbreviations */
import { IListColumn } from 'components'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  customerNameColumn,
  durationColumn,
  endDateTimeColumn,
  givenNameColumn,
  hourlyRateColumn,
  monthColumn,
  parentProjectColumn,
  periodColumn,
  projectNameColumn,
  projectTagColumn,
  resourceColumn,
  roleColumn,
  startDateTimeColumn,
  startEndDateTimeColumn,
  surnameColumn,
  titleColumn,
  weekColumn,
  yearColumn,
  mailColumn,
  managerColumn
} from './definitions'

/**
 * Columns hook for the `ReportsList` component.
 *
 * @category Reports Hooks
 */
export function useColumns() {
  const { t } = useTranslation()
  const definitions = [
    titleColumn,
    parentProjectColumn,
    projectNameColumn,
    customerNameColumn,
    projectTagColumn,
    roleColumn,
    hourlyRateColumn,
    startEndDateTimeColumn,
    durationColumn,
    startDateTimeColumn(),
    startDateTimeColumn({
      key: 'startDateTimeShort',
      name: t('common.startTimeLabel_MMM_DD'),
      template: 'MMM DD',
      hiddenFromExport: true
    }),
    endDateTimeColumn(),
    endDateTimeColumn({
      key: 'endDateTimeShort',
      name: t('common.endTimeLabel_MMM_DD'),
      template: 'MMM DD',
      hiddenFromExport: true
    }),
    resourceColumn(),
    resourceColumn({
      key: 'resource.displayNameWithRole',
      label: t('common.employeeWithRoleLabel'),
      description: t('common.employeeWithRoleDescription'),
      includeRoleDetails: true,
      hidden: true
    }),
    surnameColumn,
    givenNameColumn,
    managerColumn,
    mailColumn,
    periodColumn,
    weekColumn,
    monthColumn,
    yearColumn
  ]
  return useMemo<IListColumn[]>(
    () =>
      definitions
        .map((col) => col(t))
        .map<IListColumn>((col) => ({ ...col, isResizable: true })),
    []
  )
}
