import * as utils from '../../../utils'
import format from 'string-format'
import { getPeriods } from './timesheet.utils'
import get from 'get-value'
import { find } from 'underscore'

/**
 * Get notifications for missing forecasts
 *
 * Checks subscription settings
 *
 * * forecast.enabled
 * * forecast.notifications
 *
 * @param {*} param0 {template, ctx, locale}
 */
export default async function ({ template, ctx, locale }) {
  if (!get(ctx, 'user.subscription.settings.forecast.enabled', { default: false })) return []
  const currentWeek = utils.getWeek()
  const periods = []
  const unforecastedPeriods = []

  for (let i = 1; i <= get(ctx, 'user.subscription.settings.forecast.notifications', { default: 2 }); i++) {
    periods.push(...getPeriods(utils.startOfWeek(currentWeek + i), utils.endOfWeek(currentWeek + i), locale))
  }

  const forecastedPeriods = (await ctx.services.azstorage.getForecastedPeriods({
    resourceId: ctx.user.id,
    year: utils.getYear(),
  })) as any[]

  periods.forEach(period => {
    if (!find(forecastedPeriods, cp => cp.periodId === period.id)) unforecastedPeriods.push(period)
  })

  return unforecastedPeriods.map(period => ({
    id: `forecast_${period.id}`,
    type: 1,
    severity: 2,
    text: format(template, period.week, period.month),
    moreLink: ['', 'timesheet/overview', ...period.id.split('_')].join('/'),
  }))
}
