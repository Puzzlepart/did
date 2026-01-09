import { Inject, Service } from 'typedi'
import { RequestContext } from '../../graphql/requestContext'
import { environment } from '../../utils'
import { MongoDocumentService } from './document'
import DateUtils, { DateObject } from '../../../shared/utils/date'
import { HolidayObject } from '../../graphql/resolvers/timesheet/types/HolidayObject'
import { TimesheetPeriodObject } from '../../graphql/resolvers/timesheet/types/TimesheetPeriodObject'
import { SubscriptionHolidaySettings } from '../../graphql/resolvers/subscription/types/SubscriptionHolidaySettings'

/**
 * Holidays service
 *
 * @extends MongoDocumentService
 * @category Injectable Container Service
 */
@Service({ global: false })
export class HolidaysService extends MongoDocumentService<any> {
  /**
   * Constructor for `HolidaysService`
   *
   * @param context - Injected context through `typedi`
   */
  constructor(@Inject('CONTEXT') readonly context: RequestContext) {
    super(
      context,
      'holidays',
      null,
      context?.mcl?.db(environment('MONGO_DB_DB_NAME'))
    )
  }

  public buildSubscriptionHolidayMap(
    periods: TimesheetPeriodObject[],
    settings?: SubscriptionHolidaySettings
  ): Map<string, HolidayObject[]> {
    if (!settings?.enabled || !settings.holidays?.length) {
      return new Map()
    }

    return periods.reduce((map, period) => {
      map.set(period.id, this._expandHolidaysForPeriod(period, settings))
      return map
    }, new Map<string, HolidayObject[]>())
  }

  public mergePeriodHolidays(
    periodHolidays: HolidayObject[],
    subscriptionHolidays: HolidayObject[]
  ): HolidayObject[] {
    const merged = new Map<string, HolidayObject>()
    const addHoliday = (holiday: HolidayObject) => {
      const dateStr = new DateObject(holiday.date).format('YYYY-MM-DD')
      const key = dateStr
      if (!merged.has(key)) {
        merged.set(key, holiday)
      }
    }

    for (const holiday of subscriptionHolidays) {
      addHoliday(holiday)
    }
    for (const holiday of periodHolidays) {
      addHoliday(holiday)
    }
    return [...merged.values()]
  }

  private _expandHolidaysForPeriod(
    period: TimesheetPeriodObject,
    settings: SubscriptionHolidaySettings
  ): HolidayObject[] {
    const start = new DateObject(period.startDate)
    const end = new DateObject(period.endDate)
    if (!this._isValidDate(start) || !this._isValidDate(end)) {
      return []
    }

    const startYear = DateUtils.getYear(start.jsDate)
    const endYear = DateUtils.getYear(end.jsDate)
    const results: HolidayObject[] = []
    const seen = new Set<string>()

    for (const holiday of settings.holidays || []) {
      if (!holiday?.date || !holiday?.name) continue

      const baseDate = new DateObject(holiday.date)
      if (!this._isValidDate(baseDate)) continue

      const monthStr = baseDate.format('MM')
      const dayStr = baseDate.format('DD')
      const isRecurring = holiday.recurring ?? true
      const years = isRecurring
        ? Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)
        : [DateUtils.getYear(baseDate.jsDate)]

      for (const year of years) {
        if (monthStr === '02' && dayStr === '29' && !this._isLeapYear(year)) {
          continue
        }

        const dateStr = isRecurring
          ? `${year}-${monthStr}-${dayStr}`
          : baseDate.format('YYYY-MM-DD')
        const holidayDate = new DateObject(dateStr)
        if (!this._isValidDate(holidayDate)) continue

        if (!start.isBeforeOrSame(holidayDate)) continue
        if (!holidayDate.isBeforeOrSame(end)) continue

        const key = `${dateStr}-${holiday.name}`
        if (seen.has(key)) continue
        seen.add(key)

        results.push({
          _id: this._buildHolidayId(period.id, dateStr, holiday.name),
          date: holidayDate.jsDate,
          name: holiday.name,
          hoursOff: holiday.hoursOff ?? 8,
          recurring: isRecurring,
          notes: holiday.notes,
          periodId: period.id
        })
      }
    }

    return results
  }

  private _buildHolidayId(periodId: string, date: string, name: string): string {
    return `${periodId}-${date}-${encodeURIComponent(name)}`
  }

  private _isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  }

  private _isValidDate(date: DateObject): boolean {
    return !Number.isNaN(date.jsDate.getTime())
  }
}
