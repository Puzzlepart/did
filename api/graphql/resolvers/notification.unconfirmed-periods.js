const utils = require('!utils')
const { unique, difference, filter, find, first, last, union } = require('underscore')
const format = require('string-format')
const { getPeriods } = require('./timesheet.utils')

module.exports = async function ({ template, ctx, locale }) {
  const currentWeek = utils.getWeek()
  const periods = []
  const unconfirmedPeriods = []

  for (let i = 5; i > 0; i--) {
    periods.push(...getPeriods(utils.startOfWeek(currentWeek - i), utils.endOfWeek(currentWeek - i), locale))
  }

  var confirmedPeriods = await ctx.services.azstorage.getConfirmedPeriods({
    resourceId: ctx.user.id,
    year: utils.getYear(),
  })

  periods.forEach(period => {
    if (!find(confirmedPeriods, cp => cp.periodId === period.id)) {
      unconfirmedPeriods.push(period)
    }
  })

  return unconfirmedPeriods.map(period => ({
    id: `unconfirmed_period_${period.id}`,
    type: 0,
    severity: 2,
    text: format(template, period.week, period.month),
    moreLink: ['', 'timesheet/overview', ...period.id.split('_')].join('/'),
  }))
}
