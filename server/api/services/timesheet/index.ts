import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { find, pick } from 'underscore'
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
    }

    private _getPeriods(startDate: string, endDate: string, locale: string): TimesheetPeriodObject[] {
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
    public async getTimesheet({
        startDate,
        endDate,
        locale,
        dateFormat,
        tzOffset
    }: any): Promise<any[]> {
        try {
            const periods = this._getPeriods(startDate, endDate, locale)
            for (let i = 0; i < periods.length; i++) {
                const p = await this.context.client
                    .db('test')
                    .collection('confirmed_periods')
                    .findOne({ id: periods[i].id, userId: this.context.userId })
                if (p) {
                    periods[i] = {
                        ...p,
                        isConfirmed: true,
                        isForecasted: true,
                        events: p.entries.map((event) => ({
                            ...event,
                            date: DateUtils.formatDate(event.startDateTime, dateFormat, locale)
                        }))
                    }
                } else {
                    const events = await this._msgraph.getEvents(startDate, endDate, { tzOffset, returnIsoDates: false })
                    periods[i] = {
                        ...periods[i],
                        startDate: new Date(startDate),
                        endDate: new Date(endDate),
                        events: this._matching_engine.matchEvents(events).map((event) => ({
                            ...event,
                            date: DateUtils.formatDate(event.startDateTime, dateFormat, locale)
                        }))
                    }
                }
            }
            return periods
        } catch (error) {
            throw error
        }
    }

    /**
     * Submit period
     */
    public async submitPeriod({ period, tzOffset }: any) {
        try {
            const { matchedEvents } = period
            // TODO: Decide if we want to fetch the events again, or let the client send the full event data
            const events = await this._msgraph.getEvents(period.startDate, period.endDate, {
                tzOffset,
                returnIsoDates: false
            })
            const [week, month, year] = period.id.split('_').map((p) => parseInt(p, 10))
            period = {
                ...pick(period, 'id'),
                startDate: new Date(period.startDate),
                endDate: new Date(period.endDate),
                userId: this.context.userId,
                week,
                month,
                year,
                forecastedHours: period.forecastedHours || 0,
                entries: []
            }
            period.hours = matchedEvents.reduce((hours, m: any) => {
                const event = find(events, ({ id }) => id === m.id)
                if (!event) return null
                period.entries.push({ ...m, ...event })
                return hours + event.duration
            }, 0)
            return await this.context.client.db('test').collection('confirmed_periods').insertOne(period)
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
            throw error
        }
    }

    /**
     * Unsubmit period
     */
    public async unsubmitPeriod({ period }: any) {
        return await this.context.client
            .db('test')
            .collection('confirmed_periods')
            .deleteOne({ id: period.id, userId: this.context.userId })
    }
}
