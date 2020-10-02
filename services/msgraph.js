global.fetch = require('node-fetch')
const TokenService = require('./tokens')
const utils = require('../utils')
const log = require('debug')('services/msgraph')
const Event = require('./msgraph.event')

class MSGraphService {
  constructor(req) {
    this.req = req
    this.oauthToken = this.req.user.oauthToken
  }

  /**
   * Gets a Microsoft Graph Client using the auth token from the class
   */
  getClient() {
    const client = require('@microsoft/microsoft-graph-client').Client.init({
      authProvider: done => {
        done(null, this.oauthToken.access_token)
      },
    })
    return client
  }

  /**
   * Get users
   */
  async getUsers() {
    try {
      log('Querying Graph /users')
      const { value } = await this.getClient()
        .api('/users')
        .filter("userType eq 'Member'")
        .select('id', 'givenName', 'surname', 'jobTitle', 'displayName', 'mobilePhone', 'mail', 'preferredLanguage')
        .top(999)
        .get()
      return value
    } catch (error) {
      console.log(error.message)
      switch (error.statusCode) {
        case 401: {
          this.oauthToken = await TokenService.refreshAccessToken(this.req)
          return this.getUsers()
        }
        default: {
          throw new Error()
        }
      }
    }
  }

  /**
   * Create Outlook category
   *
   * @param category Category
   */
  async createOutlookCategory(category) {
    try {
      const colorIdx = utils.generateInt(category, 24)
      const content = JSON.stringify({
        displayName: category,
        color: `preset${colorIdx}`
      })
      log('POST Graph /me/outlook/masterCategories: %s', content)
      const res = await this.getClient().api('/me/outlook/masterCategories').post(content)
      return res
    } catch (error) {
      switch (error.statusCode) {
        case 401: {
          this.oauthToken = await TokenService.refreshAccessToken(this.req)
          return this.createOutlookCategory(category)
        }
        default: {
          throw new Error()
        }
      }
    }
  }

  /**
   * Get Outlook categories
   */
  async getOutlookCategories() {
    try {
      log('Querying Graph /me/outlook/masterCategories')
      const { value } = await this.getClient().api('/me/outlook/masterCategories').get()
      return value
    } catch (error) {
      switch (error.statusCode) {
        case 401: {
          this.oauthToken = await TokenService.refreshAccessToken(this.req)
          return this.getOutlookCategories()
        }
        default: {
          throw new Error()
        }
      }
    }
  }

  /**
   * Get events for the specified period using Microsoft Graph endpoint /me/calendar/calendarView
   *
   * @param startDateTime Start date time in ISO format
   * @param endDateTime End date time in ISO format
   * @param maxDurationHours Max duration hours (defaults to 24)
   */
  async getEvents(startDateTime, endDateTime, maxDurationHours = 24) {
    try {
      log(
        'Querying Graph /me/calendar/calendarView: %s',
        JSON.stringify({
          startDateTime,
          endDateTime,
          maxDurationHours
        })
      )
      const { value } = await this.getClient()
        .api('/me/calendar/calendarView')
        .query({ startDateTime, endDateTime })
        .select('id,subject,body,start,end,lastModifiedDateTime,categories,webLink,isOrganizer')
        .filter(`sensitivity ne 'private' and isallday eq false and iscancelled eq false`)
        .orderby('start/dateTime asc')
        .top(500)
        .get()
      log('Retrieved %s events from /me/calendar/calendarView', value.length)
      const events = value
        .filter(evt => evt.subject)
        .map(evt => new Event(evt))
        .filter(evt => evt.duration <= maxDurationHours)
      return events
    } catch (error) {
      switch (error.statusCode) {
        case 401: {
          this.oauthToken = await TokenService.refreshAccessToken(this.req)
          return this.getEvents(startDateTime, endDateTime)
        }
        default: {
          throw new Error()
        }
      }
    }
  }
}

module.exports = MSGraphService
