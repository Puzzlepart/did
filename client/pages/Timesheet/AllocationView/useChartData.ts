import getValue from 'get-value'
import { useContext, useMemo } from 'react'
import { find } from 'underscore'
import { truncateString } from 'utils/truncateString'
import { TimesheetContext } from '..'
import { EventObject } from '../../../../server/graphql/resolvers/types'
import { IChartConfig } from './types'

function getDataForChart(events: EventObject[] = [], chart: IChartConfig, width: number) {
  if (!width) return []
  const items = events.reduce((_items, entry) => {
    const data = getValue(entry, chart.key, null)
    if (!data) return _items
    const item = find(_items, ({ id }) => id === data[chart.idKey])
    const value = getValue(entry, chart.valueKey)
    if (item) item.value += value
    else _items.push({ id: data[chart.idKey], chart, data, value })
    return _items
  }, [])
  const truncateLength = width / (items.length || 1) / 6
  return items.map((i) => ({
    ...i,
    label: truncateString(i.data[chart.textKey], truncateLength),
    value: parseFloat(i.value.toFixed(1))
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
  const { selectedPeriod } = useContext(TimesheetContext)
  return useMemo(
    () =>
      charts.reduce((_data, chart) => {
        const d = getDataForChart(selectedPeriod?.getEvents(), chart, container?.clientWidth)
        return {
          ..._data,
          [chart.key]: [`${chart.key}_${d.length}`, d]
        }
      }, {}),
    [charts, container?.clientWidth, selectedPeriod]
  )
}
