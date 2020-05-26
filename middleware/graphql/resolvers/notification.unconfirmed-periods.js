const utils = require('../../../utils')
const uuidv4 = require('uuid').v4
const { unique, difference, filter, find, first, last } = require('underscore')
const format = require('string-format')
const { getPeriods } = require('./timesheet.utils')

module.exports = async function ({ template, user, StorageService }) {
    const currentWeek = utils.getWeek();
    const periods = [];

    for (let i = 1; i <= 5; i++) {
        periods.push(
            ...getPeriods(
                utils.startOfWeek(currentWeek - i),
                utils.endOfWeek(currentWeek - i),
                user.locale,
            )
        )
    }

    var confirmedPeriods = await StorageService.getConfirmedPeriods({
        resourceId: user.id,
        year: utils.getYear(),
    })

    const ucPeriods = filter(
        periods,
        period => !find(confirmedPeriods, cp => cp.periodId === period.id)
    )

    return ucPeriods.map(period => ({
        id: `unconfirmed_period_${period.id}`,
        type: 0,
        severity: 2,
        text: format(template, period.week, period.month),
        moreLink: ['', 'timesheet', ...period.id.split('_')].join('/')
    }))
}