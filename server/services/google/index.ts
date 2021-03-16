/* eslint-disable @typescript-eslint/no-var-requires */
import { calendar_v3, google } from 'googleapis'
import 'reflect-metadata'
import { EventObject } from '../../graphql'
import { Inject, Service } from 'typedi'
import DateUtils from '../../../shared/utils/date'
import { environment } from '../../utils/environment'

@Service({ global: false })
class GoogleCalendarService {
  private _cal: calendar_v3.Calendar

  constructor(@Inject('REQUEST') private readonly _request: any) {
    const client = new google.auth.OAuth2({
      clientId: environment('GOOGLE_CLIENT_ID'),
      clientSecret: environment('GOOGLE_CLIENT_SECRET'),
      redirectUri: environment('GOOGLE_REDIRECT_URI'),
    })
    client.setCredentials({
      access_token: this._request.user['tokenParams']['accessToken']
    })
    this._cal = new calendar_v3.Calendar({
      auth: client
    })
  }

  public async getEvents(
    startDate: string,
    endDate: string,
    tzOffset: number
  ) {
    try {
      const query = {
        timeMin: DateUtils.toISOString(
          `${startDate}:00:00:00.000`,
          tzOffset
        ),
        timeMax: DateUtils.toISOString(
          `${endDate}:23:59:59.999`,
          tzOffset
        ),
        calendarId: 'primary'
      }
      const { data } = await this._cal.events.list(query)
      return data.items.map(({
        id,
        summary,
        description,
        organizer,
        start,
        end,
        htmlLink
      }) => new EventObject({
        id,
        title: summary,
        body: description,
        isOrganizer: organizer.self,
        startDateTime: new Date(start.dateTime),
        endDateTime: new Date(end.dateTime),
        webLink: htmlLink
      }))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      return await Promise.resolve([])
    }
  }
}

export default GoogleCalendarService
