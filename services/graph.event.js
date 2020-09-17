const stripHtml = require('string-strip-html')
const utils = require('../utils')

class Event {
  constructor(evt) {
    this.id = evt.id
    this.title = evt.subject
    this.body = stripHtml(evt.body.content)
    this.isOrganizer = evt.isOrganizer
    this.categories = evt.categories
    this.webLink = evt.webLink
    this.lastModifiedDateTime = evt.lastModifiedDateTime
    this.startDateTime = evt.start.dateTime
    this.endDateTime = evt.end.dateTime
    this.duration = utils.getDurationHours(evt.start.dateTime, evt.end.dateTime)
  }
}

module.exports = Event
