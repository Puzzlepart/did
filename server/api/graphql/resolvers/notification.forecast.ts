import DateUtils, { DateObject } from '../../../../shared/utils/date'
import format from 'string-format'
import { getPeriods } from './timesheet.utils'
import get from 'get-value'
import { find } from 'underscore'
import { Context } from '../context'
import { AzStorageService } from '../../services'

/**
 * Get notifications for missing forecasts
 *
 * Checks subscription settings
 *
 * * forecast.enabled
 * * forecast.notifications
 *
 * @param {Context} ctx Context
 * @param {AzStorageService} azstorage Azure Table Storage service
 * @param {string} template Template
 * @param {string} locale Locale
 */
export default async function (
  ctx: Context,
  azstorage: AzStorageService,
  template: string,
  locale: string
) {
  if (!get(ctx, 'subscription.settings.forecast.enabled', { default: false })) return []
  const periods = []
  const unforecastedPeriods = []
  let currentDate = new DateObject().add('1w')

  for (
    let i = 1;
    i <= get(ctx, 'subscription.settings.forecast.notifications', { default: 2 });
    i++
  ) {
    const startOfWeek = currentDate.startOfWeek.format('YYYY-MM-DD')
    const endOfWeek = currentDate.endOfWeek.format('YYYY-MM-DD')
    periods.push(...getPeriods(startOfWeek, endOfWeek, locale))
    currentDate = currentDate.add('1w')
  }

  const forecastedPeriods = await azstorage.getForecastedPeriods({
    resourceId: ctx.userId,
    year: DateUtils.getYear()
  })

  periods.forEach((period) => {
    if (!find(forecastedPeriods, (cp) => cp.periodId === period.id))
      unforecastedPeriods.push(period)
  })

  return unforecastedPeriods.map((period) => ({
    id: `forecast_${period.id}`,
    type: 1,
    severity: 2,
    text: format(template, period.week, period.month),
    moreLink: ['', 'timesheet/overview', ...period.id.split('_')].join('/')
  }))
}
