import * as utils from '../../utils/date'

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

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(event: any) {
    this.id = event.id
    this.title = event.subject
    this.body = utils.stripHtmlString(event.body.content)
    this.isOrganizer = event.isOrganizer
    this.categories = event.categories
    this.webLink = event.webLink
    this.startDateTime = event.start.dateTime
    this.endDateTime = event.end.dateTime
    this.duration = utils.getDurationHours(event.start.dateTime, event.end.dateTime)
  }
}
