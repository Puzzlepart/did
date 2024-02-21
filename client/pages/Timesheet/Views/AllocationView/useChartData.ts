import { DateRangeType } from '@fluentui/react'
import { GetEventsOption } from 'pages/Timesheet/types'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useTimesheetContext } from '../../context'
import { getDataForChart } from './getDataForChart'
import { ChartData, ChartDataItem, IChartConfig } from './types'

/**
 * Hook for chart data
 *
 * @param charts - Charts
 * @param container - HTML container
 */
export function useChartData(
  charts: IChartConfig[],
  container: HTMLDivElement
): ChartData<ChartDataItem> {
  const { t } = useTranslation()
  const { state } = useTimesheetContext()
  let events = state.selectedPeriod?.getEvents()
  let ignoredEvents = state.selectedPeriod?.getEvents(
    GetEventsOption.IgnoredEvents
  )
  if (state.dateRangeType === DateRangeType.Month) {
    events = state.periods.flatMap((period) => period.getEvents())
    ignoredEvents = state.periods.flatMap((period) =>
      period.getEvents(GetEventsOption.IgnoredEvents)
    )
  }
  return useMemo(
    () =>
      charts.reduce((_data, chart) => {
        const entries = getDataForChart(
          events,
          ignoredEvents,
          chart,
          container?.clientWidth,
          t
        )
        return {
          ..._data,
          [chart.key]: entries
        }
      }, {}),
    [charts, container?.clientWidth, state.selectedPeriod, events]
  )
}
