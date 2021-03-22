/* eslint-disable tsdoc/syntax */
/* eslint-disable @typescript-eslint/no-var-requires */
import get from 'get-value'
import { calendar_v3, google } from 'googleapis'
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { EventObject } from '../../graphql'
import { environment } from '../../utils/environment'

/**
 * Google calendar service
 *
 * @category Injectable Container Service
 */
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
        access_token: get(this._request, 'user.tokenParams.access_token')
      })
      this._cal = new calendar_v3.Calendar({
        auth: client
      })
    }
  }

  /**
   * Get calendars
   *
   * @param accessRole - Access role
   * @returns Calendars with the specified `accessRole`
   */
  public async getCalendars(accessRole = 'owner') {
    const calendarList = await this._cal.calendarList.list()
    const calendars = calendarList.data.items.filter(
      (cal) => cal.accessRole === accessRole
    )
    return calendars
  }

  /**
   * Get events for the specified period using Google APIs
   *
   * @param startDateTimeIso - Start date time in `ISO format`
   * @param endDateTimeIso - End date time in `ISO format`
   */
  public async getEvents(startDateTimeIso: string, endDateTimeIso: string) {
    try {
      const query = {
        timeMin: startDateTimeIso,
        timeMax: endDateTimeIso
      }
      const calendars = await this.getCalendars()
      const data = await Promise.all(
        calendars.map((cal) =>
          this._cal.events.list({
            ...query,
            calendarId: cal.id
          })
        )
      )

      const events = []
      for (const [index, calendar] of calendars.entries()) {
        events.push(
          ...data[index].data.items
            .filter((event) => event.start && event.end)
            .map((event) => {
              return new EventObject(
                event.id,
                event.summary,
                [event.description, calendar.description].join(' '),
                event.organizer.self,
                event.start,
                event.end,
                event.htmlLink,
                [calendar.summary]
              )
            })
        )
      }
      return events
    } catch (error) {
      throw error
    }
  }
}

export default GoogleCalendarService
