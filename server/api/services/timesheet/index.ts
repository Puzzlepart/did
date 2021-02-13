
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { MSGraphService } from '..'
import { DateObject, default as DateUtils } from '../../../../shared/utils/date'
import { Context } from '../../graphql/context'
import { TimesheetPeriodObject } from '../../graphql/resolvers/timesheet/types'
import MatchingEngine from './matching'

@Service({ global: false })
export class TimesheetService {
    private _matching_engine: MatchingEngine

    /**
     * Constructor
     *
     * @param {Context} context Context
     * @param {MSGraphService} _msgraph MSGraphService
     */
    constructor(
        @Inject('CONTEXT') private readonly context: Context,
        private _msgraph: MSGraphService
    ) {
        this._matching_engine = new MatchingEngine([], [], [])
        // eslint-disable-next-line no-console
        console.log(this.context.userId)
    }

    private _getPeriods(
        startDate: string,
        endDate: string,
        locale: string
    ): TimesheetPeriodObject[] {
        const isSplit = !DateUtils.isSameMonth(startDate, endDate)
        const periods: TimesheetPeriodObject[] = [
            new TimesheetPeriodObject(
                startDate,
                isSplit ? new DateObject(startDate).endOfMonth.format('YYYY-MM-DD') : endDate,
                locale
            )
        ]
        if (isSplit) {
            periods.push(
                new TimesheetPeriodObject(
                    new DateObject(endDate).startOfMonth.format('YYYY-MM-DD'),
                    endDate,
                    locale
                )
            )
        }

        return periods
    }

    /**
     * Get timesheet
     */
    public async getTimesheet({ startDate, endDate, locale, dateFormat, tzOffset }: any): Promise<any[]> {
        const periods = this._getPeriods(startDate, endDate, locale)
        for (let i = 0; i < periods.length; i++) {
            const events = await this._msgraph.getEvents(
                startDate,
                endDate,
                tzOffset
            )
            periods[i].events = this._matching_engine.matchEvents(events).map(event => ({
                ...event,
                date: DateUtils.formatDate(event.startDateTime, dateFormat, locale)
            }))
        }
        return periods
    }
}