import * as utils from '../utils'

export default class MSGraphEvent {
  public id: any
  public title: any
  public body: any
  public isOrganizer: any
  public categories: any
  public webLink: any
  public startDateTime: any
  public endDateTime: any
  public duration: any

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(evt: any) {
    this.id = evt.id
    this.title = evt.subject
    this.body = utils.stripHtmlString(evt.body.content)
    this.isOrganizer = evt.isOrganizer
    this.categories = evt.categories
    this.webLink = evt.webLink
    this.startDateTime = evt.start.dateTime
    this.endDateTime = evt.end.dateTime
    this.duration = utils.getDurationHours(evt.start.dateTime, evt.end.dateTime)
  }
}
