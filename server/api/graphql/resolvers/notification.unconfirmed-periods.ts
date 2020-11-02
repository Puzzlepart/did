import * as utils from '../../../utils'
import { find } from 'underscore'
import format from 'string-format'
import { getPeriods } from './timesheet.utils'

/**
 * Get notifications for unconfirmed periods
 *
 * @param {*} param0 {template, ctx, locale}
 */
export default async function ({ template, ctx, locale }) {
  const currentWeek = utils.getWeek()
  const periods = []
  const unconfirmedPeriods = []

  for (let i = 5; i > 0; i--) {
    periods.push(...getPeriods(utils.startOfWeek(currentWeek - i), utils.endOfWeek(currentWeek - i), locale))
  }

  const confirmedPeriods = await ctx.services.azstorage.getConfirmedPeriods({
    resourceId: ctx.user.id,
    year: utils.getYear(),
  }) as any[]

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
