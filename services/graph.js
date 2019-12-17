global.fetch = require("node-fetch");
const moment = require('moment-timezone');
const stripHtml = require("string-strip-html");
const utils = require('../utils');
const log = require('debug')('services/graph');
require('moment/locale/en-gb');

function GraphService(oauthToken) {
  this.oauthToken = oauthToken;
}

/**
 * Renoves ignored events from the collection
 * 
 * @param {*} events 
 */
GraphService.prototype.removeIgnoredEvents = function (events) {
  return events.filter(evt => {
    let content = [evt.title, evt.body, JSON.stringify(evt.categories)].join(' ').toUpperCase();
    return content.indexOf('IGNORE') === -1;
  });
}

/**
 * Gets a Microsoft Graph Client using the auth token from the class
 */
GraphService.prototype.getClient = function () {
  const client = require('@microsoft/microsoft-graph-client').Client.init({ authProvider: (done) => { done(null, this.oauthToken.access_token); } });
  return client;
}

/**
 * Get events for the specified week
 * 
 * @param {*} weekNumber 
 */
GraphService.prototype.getEvents = async function (weekNumber) {
  const startOfWeek = moment({ year: moment().year() }).week(weekNumber).startOf('week');
  const endOfWeek = moment({ year: moment().year() }).week(weekNumber).endOf('week');
  const startDateTime = startOfWeek.toISOString();
  const endDateTime = endOfWeek.toISOString();
  log('Querying Graph /me/calendar/calendarView: %s', JSON.stringify({ startDateTime, endDateTime, weekNumber }));
  const { value } = await this.getClient()
    .api('/me/calendar/calendarView')
    .query({ startDateTime, endDateTime })
    .select('id,subject,body,start,end,lastModifiedDateTime,categories,webLink,isOrganizer')
    .filter(`sensitivity ne 'private' and isallday eq false and iscancelled eq false`)
    .orderby('start/dateTime asc')
    .top(50)
    .get();
    log('Retrieved %s events from /me/calendar/calendarView', value.length);
  let events = value.map(evt => ({
    id: evt.id,
    title: evt.subject,
    body: stripHtml(evt.body.content),
    isOrganizer: evt.isOrganizer,
    categories: evt.categories,
    webLink: evt.webLink,
    lastModifiedDateTime: new Date(evt.lastModifiedDateTime).toISOString(),
    startTime: new Date(evt.start.dateTime).toISOString(),
    endTime: new Date(evt.end.dateTime).toISOString(),
    durationHours: utils.getDurationHours(evt.start.dateTime, evt.end.dateTime),
    durationMinutes: utils.getDurationMinutes(evt.start.dateTime, evt.end.dateTime),
  }));
  events = this.removeIgnoredEvents(events);
  return events;
};


module.exports = GraphService;