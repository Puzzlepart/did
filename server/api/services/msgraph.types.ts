import { $dayjs, default as DateUtils } from '../../../shared/utils/date'
import { stripHtmlString } from '../../utils'

export interface MSGraphEventOptions {
  /**
   * Timezone offset on the client
   */
  tzOffset: number

  /**
   * Return ISO dates
   *
   * If false, JS date objects are returned
   */
  returnIsoDates?: boolean
}

export default class MSGraphEvent {
  public id: string
  public title: string
  public body: string
  public isOrganizer: boolean
  public categories: string[]
  public webLink: string
  public startDateTime: string | Date
  public endDateTime: string | Date
  public duration: number

  /**
   * Constructs a new MSGraphEvent
   *
   * @param {any} event Event data
   * @param {MSGraphEventOptions} options Options
   */
  constructor(event: any, { returnIsoDates = true }: MSGraphEventOptions) {
    this.id = event.id
    this.title = event.subject
    this.body = stripHtmlString(event.body.content)
    this.isOrganizer = event.isOrganizer
    this.categories = event.categories
    this.webLink = event.webLink
    const startDateTime = $dayjs.tz(
      $dayjs(event.start.dateTime).format('YYYY-MM-DD HH:mm:ss'),
      event.start.timeZone
    )
    const endDateTime = $dayjs.tz(
      $dayjs(event.end.dateTime).format('YYYY-MM-DD HH:mm:ss'),
      event.end.timeZone
    )
    this.startDateTime = returnIsoDates ? startDateTime.toISOString() : startDateTime.toDate()
    this.endDateTime = returnIsoDates ? endDateTime.toISOString() : endDateTime.toDate()
    this.duration = DateUtils.getDurationHours(event.start.dateTime, event.end.dateTime)
  }
}
