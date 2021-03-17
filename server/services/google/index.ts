/* eslint-disable @typescript-eslint/no-var-requires */
import { calendar_v3, google } from 'googleapis'
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import DateUtils from '../../../shared/utils/date'
import { EventObject } from '../../graphql'
import { environment } from '../../utils/environment'

@Service({ global: false })
class GoogleCalendarService {
  private _cal: calendar_v3.Calendar

  constructor(@Inject('REQUEST') private readonly _request: any) {
    if (this._request.user) {
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
  }

  /**
   * Get events for the specified period using Google APIs
   *
   * @param startDate - Start date (YYYY-MM-DD)
   * @param endDate - End date (YYYY-MM-DD)
   * @param tzOffset - Timezone offset
   */
  public async getEvents(startDate: string, endDate: string, tzOffset: number) {
    try {
      const query = {
        timeMin: DateUtils.toISOString(`${startDate}:00:00:00.000`, tzOffset),
        timeMax: DateUtils.toISOString(`${endDate}:23:59:59.999`, tzOffset),
        calendarId: 'primary'
      }
      const { data } = await this._cal.events.list(query)
      return data.items
        .filter((event) => event.start && event.end)
        .map((event) => {
          return new EventObject(
            event.id,
            event.summary,
            event.description,
            event.organizer.self,
            event.start,
            event.end,
            event.htmlLink,
            []
          )
        })
    } catch (error) {
      throw error
    }
  }
}

export default GoogleCalendarService
