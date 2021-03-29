import getValue from 'get-value'
import { useMemo } from 'react'
import _  from 'underscore'
import { truncateString } from 'utils/truncateString'
import { EventObject } from '../../../../server/graphql/resolvers/types'
import { useTimesheetContext } from '../context'
import { IChartConfig } from './types'

function getDataForChart(
  events: EventObject[] = [],
  chart: IChartConfig,
  width: number
) {
  if (!width) return []
  const items = events.reduce((_items, entry) => {
    const data = getValue(entry, chart.key, null)
    if (!data) return _items
    const item = _.find(_items, ({ id }) => id === data[chart.idKey])
    const value = getValue(entry, chart.valueKey)
    if (item) item.value += value
    else _items.push({ id: data[chart.idKey], chart, data, value })
    return _items
  }, [])
  // eslint-disable-next-line unicorn/explicit-length-check
  const truncateLength = width / (items.length || 1) / 6
  return items.map((index) => ({
    ...index,
    label: truncateString(index.data[chart.textKey], truncateLength),
    value: Number.parseFloat(index.value.toFixed(1))
  }))
}

type ChartData<T> = { [key: string]: [string, T[]] }

/**
 * Hook for chart data
 */
export function useChartData<T = any>(
  charts: IChartConfig[],
  container: HTMLDivElement
): ChartData<T> {
  const { state } = useTimesheetContext()
  return useMemo(
    () =>
      charts.reduce((_data, chart) => {
        const d = getDataForChart(
          state.selectedPeriod?.getEvents(),
          chart,
          container?.clientWidth
        )
        return {
          ..._data,
          [chart.key]: [`${chart.key}_${d.length}`, d]
        }
      }, {}),
    [charts, container?.clientWidth, state.selectedPeriod]
  )
}
