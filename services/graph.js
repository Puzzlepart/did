global.fetch = require("node-fetch");
const graph = require('@microsoft/microsoft-graph-client');
const moment = require('moment');
const stripHtml = require("string-strip-html");

module.exports = {
  getUserDetails: async function (accessToken) {
    const user = await getAuthenticatedClient(accessToken).api('/me').get();
    return user;
  },

  getCalendarView: async function (accessToken, weekNumber) {
    const startOfWeek = moment().year(moment().year()).week(weekNumber).startOf('isoWeek');
    const startDateTime = startOfWeek.toISOString();
    const endDateTime = startOfWeek.endOf('week').toISOString();
    const { value: events } = await getAuthenticatedClient(accessToken)
      .api('/me/calendar/calendarView')
      .query({ startDateTime, endDateTime })
      .select('id,subject,body,start,end,categories,webLink')
      .filter(`sensitivity ne 'private' and isallday eq false and iscancelled eq false`)
      .orderby('start/dateTime asc')
      .top(50)
      .get();
    return events.map(event => ({
      id: event.id,
      subject: event.subject,
      body: stripHtml(event.body.content),
      categories: event.categories,
      webLink: event.webLink,
      startTime: event.start.dateTime,
      endTime: event.end.dateTime,
    }));
  }
};

function getAuthenticatedClient(accessToken) {
  const client = graph.Client.init({ authProvider: (done) => { done(null, accessToken); } });
  return client;
}