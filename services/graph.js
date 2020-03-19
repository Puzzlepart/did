global.fetch = require("node-fetch");
const {
  refreshAccessToken
} = require('./tokens');
const stripHtml = require("string-strip-html");
const utils = require('../utils');
const log = require('debug')('services/graph');

class GraphService {
  constructor(req) {
    this.req = req;
    this.oauthToken = this.req.user.oauthToken;
  }

  /**
   * Renoves ignored events from the collection
   *
   * Checks (case-insensitive) if title, body or categories contains (IGNORE), {IGNORE} or [IGNORE] or if there's a category ignore
   *
   * @param {*} events
   */
  removeIgnoredEvents(events) {
    let ignoreRegex = /[(\[\{]IGNORE[)\]\}]/gi;
    return events.filter(evt => {
      let categories = evt.categories.join(' ').toLowerCase();
      let content = [evt.title, evt.body, categories].join(' ').toLowerCase();
      return content.match(ignoreRegex) == null && categories.indexOf('ignore') === -1;
    });
  }

  /**
   * Gets a Microsoft Graph Client using the auth token from the class
   */
  getClient() {
    const client = require('@microsoft/microsoft-graph-client').Client.init({
      authProvider: (done) => {
        done(null, this.oauthToken.access_token);
      }
    });
    return client;
  }

  async createOutlookCategory(category) {
    log('Querying Graph /me/outlook/masterCategories');
    const res = await this.getClient()
      .api('/me/outlook/masterCategories')
      .post(JSON.stringify(category));
    return res;
  }

  /**
   * Get  categories
   */
  async getOutlookCategories() {
    log('Querying Graph /me/outlook/masterCategories');
    const {
      value
    } = await this.getClient()
      .api('/me/outlook/masterCategories')
      .get();
    return value;
  }

  /**
   * Get events for the specified week
   *
   * @param {*} startDateTime  Start time (iso)
   * @param {*} endDateTime End time (iso)
   * @param {*} maxDurationHrs Max duration in hours
   */
  async getEvents(startDateTime, endDateTime, maxDurationHrs) {
    try {
      log('Querying Graph /me/calendar/calendarView: %s', JSON.stringify({
        startDateTime,
        endDateTime
      }));
      const {
        value
      } = await this.getClient()
        .api('/me/calendar/calendarView')
        .query({
          startDateTime,
          endDateTime
        })
        .select('id,subject,body,start,end,lastModifiedDateTime,categories,webLink,isOrganizer')
        .filter(`sensitivity ne 'private' and isallday eq false and iscancelled eq false`)
        .orderby('start/dateTime asc')
        .top(500)
        .get();
      log('Retrieved %s events from /me/calendar/calendarView', value.length);
      let events = value
        .filter(evt => evt.subject)
        .map(evt => {
          return ({
            id: evt.id,
            title: evt.subject,
            body: stripHtml(evt.body.content),
            isOrganizer: evt.isOrganizer,
            categories: evt.categories,
            webLink: evt.webLink,
            lastModifiedDateTime: evt.lastModifiedDateTime,
            startTime: evt.start.dateTime,
            endTime: evt.end.dateTime,
            durationHours: utils.getDurationHours(evt.start.dateTime, evt.end.dateTime),
            durationMinutes: utils.getDurationMinutes(evt.start.dateTime, evt.end.dateTime),
          })
        });
      events = this.removeIgnoredEvents(events);
      events = events.filter(evt => evt.durationHours <= maxDurationHrs);
      return events;
    } catch (error) {
      switch (error.statusCode) {
        case 401: {
          this.oauthToken = await refreshAccessToken(this.req);
          return this.getEvents(startDateTime, endDateTime, maxDurationHrs);
        }
        default: {
          throw new Error();
        }
      }
    }
  }
}





module.exports = GraphService;