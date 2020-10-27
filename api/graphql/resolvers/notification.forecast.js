const utils = require('../../../utils')
const { unique, difference, filter, find, first, last, union } = require('underscore')
const format = require('string-format')
const { getPeriods } = require('./timesheet.utils')
const get = require('get-value')

module.exports = async function ({ template, ctx, locale }) {
  if (!get(ctx, 'user.subscription.settings.forecast.enabled', { default: false })) return []
  const currentWeek = utils.getWeek()
  const periods = []
  const unforecastedPeriods = []

  for (let i = 1; i <= get(ctx, 'user.subscription.settings.forecast.notifications', { default: 2 }); i++) {
    periods.push(...getPeriods(utils.startOfWeek(currentWeek + i), utils.endOfWeek(currentWeek + i), locale))
  }

  var forecastedPeriods = await ctx.services.azstorage.getForecastedPeriods({
    resourceId: ctx.user.id,
    year: utils.getYear(),
  })

  periods.forEach(period => {
    if (!find(forecastedPeriods, cp => cp.periodId === period.id)) {
      unforecastedPeriods.push(period)
    }
  })

  return unforecastedPeriods.map(period => ({
    id: `forecast_${period.id}`,
    type: 1,
    severity: 2,
    text: format(template, period.week, period.month),
    moreLink: ['', 'timesheet/overview', ...period.id.split('_')].join('/'),
  }))
}
