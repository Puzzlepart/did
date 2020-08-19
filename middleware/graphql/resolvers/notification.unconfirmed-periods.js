const utils = require('../../../utils')
const { unique, difference, filter, find, first, last, union } = require('underscore')
const format = require('string-format')
const { getPeriods } = require('./timesheet.utils')

module.exports = async function ({ template, ctx }) {
    const currentWeek = utils.getWeek();
    let periods = [];

    for (let i = 5; i > 0; i--) {
        periods.push(
            ...getPeriods(
                utils.startOfWeek(currentWeek - i),
                utils.endOfWeek(currentWeek - i),
                ctx.user.locale,
            )
        )
    }

    var confirmedPeriods = await ctx.services.storage.getConfirmedPeriods({
        resourceId: ctx.user.id,
        year: utils.getYear(),
    })

    let unconfirmedPeriods = []

    periods.forEach(period => {
        var _ = find(confirmedPeriods, cp =>  cp.periodId === period.id)
        console.log(!_)
        if(!_) unconfirmedPeriods.push(period)
    })

    console.log(unconfirmedPeriods)

    return unconfirmedPeriods.map(period => ({
        id: `unconfirmed_period_${period.id}`,
        type: 0,
        severity: 2,
        text: format(template, period.week, period.month),
        moreLink: ['', 'timesheet/overview', ...period.id.split('_')].join('/')
    }))
}