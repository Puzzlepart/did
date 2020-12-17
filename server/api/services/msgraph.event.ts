import { stripHtmlString } from '../../utils'
import { getDurationHours } from '../../utils/date'

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

  constructor(event: any) {
    this.id = event.id
    this.title = event.subject
    this.body = stripHtmlString(event.body.content)
    this.isOrganizer = event.isOrganizer
    this.categories = event.categories
    this.webLink = event.webLink
    this.startDateTime = `${event.start.dateTime}Z`
    this.endDateTime = `${event.end.dateTime}Z`
    this.duration = getDurationHours(event.start.dateTime, event.end.dateTime)
  }
}
