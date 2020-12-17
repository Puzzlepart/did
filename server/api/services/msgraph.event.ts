import { template } from 'underscore'
import { stripHtmlString } from '../../utils'
import { getDurationHours, $dayjs } from '../../utils/date'

export default class MSGraphEvent {
  public id: string
  public title: string
  public body: string
  public isOrganizer: boolean
  public categories: string[]
  public webLink: string
  public startDateTime: string
  public endDateTime: string
  public duration: number

  /**
   * Constructs a new MSGraphEvent
   * 
   * @param {any} event Event data
   * @param {string} template Date template
   */
  constructor(event: any, template = 'YYYY-MM-DD HH:mm:ss') {
    this.id = event.id
    this.title = event.subject
    this.body = stripHtmlString(event.body.content)
    this.isOrganizer = event.isOrganizer
    this.categories = event.categories
    this.webLink = event.webLink
    this.startDateTime = $dayjs.tz($dayjs(event.start.dateTime).format(template), event.start.timeZone).toISOString()
    this.endDateTime = $dayjs.tz($dayjs(event.end.dateTime).format(template), event.end.timeZone).toISOString()
    this.duration = getDurationHours(event.start.dateTime, event.end.dateTime)
  }
}
