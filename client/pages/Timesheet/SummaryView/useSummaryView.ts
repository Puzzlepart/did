/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable tsdoc/syntax */
/* eslint-disable unicorn/no-array-reduce */
import { IListProps } from 'components/List/types'
import { useTranslation } from 'react-i18next'
import { useTimesheetContext } from '../context'
import { createColumns } from './createColumns'
import { generateRows } from './generateRows'
import { generateTotalRow } from './generateTotalRow'

/**
 * Component logic for `<SummaryView />`
 *
 * @returns `IListProps`
 *
 * @category Timesheet
 */
export function useSummaryView(): IListProps {
  const { t } = useTranslation()
  const { state } = useTimesheetContext()
  const columns = createColumns(state.scope)
  const events = state.selectedPeriod?.getEvents(false) || []
  const items = [
    ...generateRows(events, columns),
    generateTotalRow(events, columns, t('common.sumLabel'))
  ]
  return {
    enableShimmer: !!state.loading,
    items,
    columns
  }
}
