import get from 'get-value'
import { useMemo } from 'react'
import { TFunction, useTranslation } from 'react-i18next'
import _ from 'underscore'
import s from 'underscore.string'
import { EventObject } from '../../../../server/graphql/resolvers/types'
import { useTimesheetContext } from '../context'
import { IChartConfig } from './types'

/**
 * Get data for chart
 *
 * @param events - Events
 * @param chart - Chart
 * @param width - Client width
 * @param t - Translate function
 */
function getDataForChart(
  events: EventObject[] = [],
  chart: IChartConfig,
  width: number,
  t: TFunction
) {
  if (!width) return []
  const items = events.reduce((_items, entry) => {
    const data = get(entry, chart.key)
    if (!data) return _items
    const item = _.find(_items, ({ id }) => id === data[chart.idKey])
    const value = get(entry, chart.valueKey)
    if (item) item.value += value
    else _items.push({ id: data[chart.idKey], chart, data, value })
    return _items
  }, [])
  const unconfirmedHours: number = events
    .filter((entry) => !get(entry, chart.key))
    .reduce((sum, entry) => sum + get(entry, chart.valueKey), 0)
  items.push({
    id: t('common.unconfirmedHours'),
    data: { name: t('common.unconfirmedHours') },
    value: unconfirmedHours,
    chart
  })
  const truncateLength = width / (items.length ?? 1) / 6
  return items.map((index) => ({
    ...index,
    label: s.prune(index.data[chart.textKey], truncateLength),
    value: Number.parseFloat(index.value.toFixed(1))
  }))
}

type ChartData<T> = { [key: string]: [string, T[]] }

/**
 * Hook for chart data
 *
 * @param charts - Charts
 * @param container - HTML container
 */
export function useChartData<T = any>(
  charts: IChartConfig[],
  container: HTMLDivElement
): ChartData<T> {
  const { t } = useTranslation()
  const { state } = useTimesheetContext()
  return useMemo(
    () =>
      charts.reduce((_data, chart) => {
        const d = getDataForChart(
          state.selectedPeriod?.getEvents(true),
          chart,
          container?.clientWidth,
          t
        )
        return {
          ..._data,
          [chart.key]: [`${chart.key}_${d.length}`, d]
        }
      }, {}),
    [charts, container?.clientWidth, state.selectedPeriod, t]
  )
}
