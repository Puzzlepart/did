import get from 'get-value'
import { TFunction } from 'react-i18next'
import { EventObject } from 'types'
import _ from 'underscore'
import { ChartDataItem, IChartConfig } from './types'

/**
 * Get data for chart
 *
 * @param events - Events
 * @param ignoredEvents - Ignored events
 * @param chart - Chart
 * @param width - Client width
 * @param t - Translation function
 */
export function getDataForChart(
  events: EventObject[] = [],
  ignoredEvents: EventObject[] = [],
  chart: IChartConfig,
  width: number,
  t: TFunction
): ChartDataItem[] {
  if (!width || _.isEmpty(events)) return []
  const items: ChartDataItem[] = events.reduce((_items, entry) => {
    const data = get(entry, chart.key)
    if (!data) return _items
    const item = _.find(_items, ({ id }) => id === data[chart.idKey])
    const value = get(entry, chart.valueKey)
    if (item) item.value += value
    else
      _items.push({
        id: data[chart.idKey],
        chart,
        data,
        value,
        url: chart.getUrl(data)
      })
    return _items
  }, [])
  const unconfirmedHours: number = events
    .filter((entry) => !get(entry, chart.key))
    .reduce((sum, entry) => sum + get(entry, chart.valueKey), 0)
  const ignoredHours = ignoredEvents.reduce(
    (sum, entry) => sum + get(entry, chart.valueKey),
    0
  )
  items.push(
    {
      id: t('common.unconfirmedHours'),
      name: t('common.unconfirmedHours'),
      teritaryText: t('timesheet.allocation.unconfirmedHoursDescription'),
      value: unconfirmedHours,
      chart,
      fill: 'rgb(255, 208, 137)'
    },
    {
      id: t('common.ignoredHours'),
      name: t('common.ignoredHours'),
      teritaryText: t('timesheet.allocation.ignoredHoursDescription'),
      value: ignoredHours,
      chart,
      fill: 'rgb(237, 134, 106)'
    }
  )
  return items
    .map((item) => ({
      ...item,
      name: item.name ?? get(item.data, chart.textKey),
      secondaryText:
        item.secondaryText ??
        (chart.secondaryTextKey && get(item.data, chart.secondaryTextKey)),
      teritaryText:
        item.teritaryText ??
        (chart.teritaryTextKey && get(item.data, chart.teritaryTextKey)),
      value: Number.parseFloat(item.value.toFixed(1))
    }))
    .filter((index) => index.value > 0)
}
