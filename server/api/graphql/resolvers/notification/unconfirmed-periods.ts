// import DateUtils, { DateObject } from '../../../../../shared/utils/date'
// import { find } from 'underscore'
// import format from 'string-format'
// import { Context } from '../context'

// /**
//  * Get notifications for unconfirmed periods
//  *
//  * @param {Context} ctx Context
//  * @param {AzStorageService} azstorage Azure Table Storage service
//  * @param {string} template Template
//  * @param {string} locale Locale
//  */
// export default async function (
//   ctx: Context,
//   azstorage: AzStorageService,
//   template: string,
//   locale: string
// ) {
//   const periods = []
//   const unconfirmedPeriods = []
//   let currentDate = new DateObject().add('-1w')

//   for (let i = 0; i <= 5; i++) {
//     const startOfWeek = currentDate.startOfWeek.format('YYYY-MM-DD')
//     const endOfWeek = currentDate.endOfWeek.format('YYYY-MM-DD')
//     periods.push(...getPeriods(startOfWeek, endOfWeek, locale))
//     currentDate = currentDate.add('-1w')
//   }

//   const confirmedPeriods = await azstorage.getConfirmedPeriods({
//     resourceId: ctx.userId,
//     minYear: currentDate.startOfWeek.toObject().year,
//     maxYear: DateUtils.getYear()
//   })

//   periods.forEach((period) => {
//     if (!find(confirmedPeriods, (cp) => cp.periodId === period.id)) {
//       unconfirmedPeriods.push(period)
//     }
//   })

//   return unconfirmedPeriods.map((period) => ({
//     id: `unconfirmed_period_${period.id}`,
//     type: 0,
//     severity: 2,
//     text: format(template, period.week, period.month),
//     moreLink: ['', 'timesheet/overview', ...period.id.split('_')].join('/')
//   }))
// }
