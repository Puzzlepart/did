const stripHtml = require('string-strip-html')
const utils = require('../utils')

class MSGraphEvent {
  constructor(evt) {
    this.id = evt.id
    this.title = evt.subject
    this.body = stripHtml(evt.body.content)
    this.isOrganizer = evt.isOrganizer
    this.categories = evt.categories
    this.webLink = evt.webLink
    this.startDateTime = evt.start.dateTime
    this.endDateTime = evt.end.dateTime
    this.duration = utils.getDurationHours(evt.start.dateTime, evt.end.dateTime)
  }
}

module.exports = MSGraphEvent
