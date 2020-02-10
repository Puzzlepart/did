global.fetch = require("node-fetch");
const { refreshAccessToken } = require('./tokens');
const stripHtml = require("string-strip-html");
const utils = require('../utils');
const log = require('debug')('services/graph');

function GraphService(req) {
  this.req = req;
  this.oauthToken = this.req.user.oauthToken;
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
  console.log(this.oauthToken);
  const client = require('@microsoft/microsoft-graph-client').Client.init({ authProvider: (done) => { done(null, this.oauthToken.access_token); } });
  return client;
}

/**
 * Get events for the specified week
 * 
 * @param {*} startDateTime 
 * @param {*} endDateTime 
 */
GraphService.prototype.getEvents = async function (startDateTime, endDateTime) {
  try {
    log('Querying Graph /me/calendar/calendarView: %s', JSON.stringify({ startDateTime, endDateTime }));
    const { value } = await this.getClient()
      .api('/me/calendar/calendarView')
      .query({ startDateTime, endDateTime })
      .select('id,subject,body,start,end,lastModifiedDateTime,categories,webLink,isOrganizer')
      .filter(`sensitivity ne 'private' and isallday eq false and iscancelled eq false`)
      .orderby('start/dateTime asc')
      .top(50)
      .get();
    log('Retrieved %s events from /me/calendar/calendarView', value.length);
    let events = value
      .filter(evt => evt.subject)
      .map(evt => ({
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
  } catch (error) {
    switch (error.statusCode) {
      case 401: {
        this.oauthToken = await refreshAccessToken(this.req);
        return this.getEvents(startDateTime, endDateTime);
      }
    }
  }
};


module.exports = GraphService;