/* eslint-disable @typescript-eslint/no-var-requires */
import { calendar_v3, google } from 'googleapis'
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import DateUtils, { $dayjs } from '../../../shared/utils/date'
import { EventObject } from '../../graphql'
import { environment } from '../../utils/environment'

@Service({ global: false })
class GoogleCalendarService {
  private _cal: calendar_v3.Calendar

  constructor(@Inject('REQUEST') private readonly _request: any) {
    const client = new google.auth.OAuth2({
      clientId: environment('GOOGLE_CLIENT_ID'),
      clientSecret: environment('GOOGLE_CLIENT_SECRET'),
      redirectUri: environment('GOOGLE_REDIRECT_URI')
    })
    client.setCredentials({
      access_token: this._request.user['tokenParams']['access_token']
    })
    this._cal = new calendar_v3.Calendar({
      auth: client
    })
  }

  public async getEvents(startDate: string, endDate: string, tzOffset: number) {
    try {
      const query = {
        timeMin: DateUtils.toISOString(`${startDate}:00:00:00.000`, tzOffset),
        timeMax: DateUtils.toISOString(`${endDate}:23:59:59.999`, tzOffset),
        calendarId: 'primary'
      }
      const { data } = await this._cal.events.list(query)
      return data.items.map(
        ({
          id,
          summary: title,
          description: body,
          organizer,
          start,
          end,
          htmlLink: webLink
        }) => {
          const startDateTime = $dayjs
            .tz(
              $dayjs(start.dateTime).format('YYYY-MM-DD HH:mm:ss'),
              start.timeZone
            )
            .toDate()
          const endDateTime = $dayjs
            .tz(
              $dayjs(end.dateTime).format('YYYY-MM-DD HH:mm:ss'),
              end.timeZone
            )
            .toDate()
          return new EventObject({
            id,
            title,
            body,
            categories: [],
            isOrganizer: organizer.self,
            startDateTime,
            endDateTime,
            webLink,
            duration: DateUtils.getDurationHours(startDateTime, endDateTime)
          })
        }
      )
    } catch (error) {
      throw error
    }
  }
}

export default GoogleCalendarService
