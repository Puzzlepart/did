global['fetch'] = require('node-fetch')
import createDebug from 'debug'
const debug = createDebug('services/msgraph')
import * as appInsights from 'applicationinsights'
import { performance, PerformanceObserver } from 'perf_hooks'
import { first } from 'underscore'
import * as utils from '../utils'
import env from '../utils/env'
import MSGraphEvent from './msgraph.event'
import TokenService from './tokens'
import get from 'get-value'
import { Request } from 'express'
import { Client as MSGraphClient } from '@microsoft/microsoft-graph-client'

class MSGraphService {
  public observer: PerformanceObserver
  public request: Request
  public oauthToken: any

  /**
   * Constructs a new MSGraphService
   */
  constructor() {
    appInsights.setup(env('APPINSIGHTS_INSTRUMENTATIONKEY'))
    this.observer = new PerformanceObserver(list => {
      const { name, duration } = first(list.getEntries())
      appInsights.defaultClient.trackMetric({
        name,
        value: duration,
      })
    })
    this.observer.observe({ entryTypes: ['measure'], buffered: true })
  }

  /**
   * Initializes the MS Graph Service
   *
   * @param {Request} req Request
   */
  init(req: Request): MSGraphService {
    this.request = req
    this.oauthToken = get(this.request, 'user.oauthToken')
    return this
  }

  /**
   * Starts a performance mark
   *
   * @param {string} measure
   */
  startMark(measure: string): void {
    performance.mark(`${measure}-init`)
  }

  /**
   * Ends a performance mark
   *
   * @param {string} measure
   */
  endMark(measure: string): void {
    performance.mark(`${measure}-end`)
    performance.measure(`GraphService.${measure}`, `${measure}-init`, `${measure}-end`)
  }

  /**
   * Gets a Microsoft Graph Client using the auth token from the class
   */
  getClient(): MSGraphClient {
    const client = MSGraphClient.init({
      authProvider: (done: (arg0: any, arg1: any) => void) => {
        done(null, this.oauthToken.access_token)
      },
    })
    return client
  }

  /**
   * Get users
   */
  async getUsers(): Promise<any> {
    try {
      this.startMark('getUsers')
      const { value } = await this.getClient()
        .api('/users')
        // eslint-disable-next-line quotes
        .filter("userType eq 'Member'")
        .select(['id', 'givenName', 'surname', 'jobTitle', 'displayName', 'mobilePhone', 'mail', 'preferredLanguage'])
        .top(999)
        .get()
      this.endMark('getUsers')
      return value
    } catch (error) {
      switch (error.statusCode) {
        case 401: {
          this.oauthToken = await TokenService.refreshAccessToken(this.request)
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
   * @param {string} category Category
   */
  async createOutlookCategory(category: string): Promise<any> {
    try {
      this.startMark('createOutlookCategory')
      const colorIdx = utils.generateInt(category, 24)
      const content = JSON.stringify({
        displayName: category,
        color: `preset${colorIdx}`,
      })
      const client = this.getClient()
      const res = await client.api('/me/outlook/masterCategories').post(content)
      this.endMark('createOutlookCategory')
      return res
    } catch (error) {
      switch (error.statusCode) {
        case 401: {
          this.oauthToken = await TokenService.refreshAccessToken(this.request)
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
  async getOutlookCategories(): Promise<any[]> {
    try {
      this.startMark('getOutlookCategories')
      debug('Querying Graph /me/outlook/masterCategories')
      const { value } = await this.getClient().api('/me/outlook/masterCategories').get()
      this.endMark('getOutlookCategories')
      return value
    } catch (error) {
      switch (error.statusCode) {
        case 401: {
          this.oauthToken = await TokenService.refreshAccessToken(this.request)
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
   * @param {string} startDateTime Start date time in ISO format
   * @param {string} endDateTime End date time in ISO format
   * @param {number} maxDurationHours Max duration hours (defaults to 24)
   */
  async getEvents(startDateTime: string, endDateTime: string, maxDurationHours = 24): Promise<MSGraphEvent[]> {
    try {
      this.startMark('getEvents')
      debug(
        'Querying Graph /me/calendar/calendarView: %s',
        JSON.stringify({
          startDateTime,
          endDateTime,
          maxDurationHours,
        })
      )
      const { value } = await this.getClient()
        .api('/me/calendar/calendarView')
        .query({ startDateTime, endDateTime })
        .select(['id', 'subject', 'body', 'start', 'end', 'categories', 'webLink', 'isOrganizer'])
        // eslint-disable-next-line quotes
        .filter("sensitivity ne 'private' and isallday eq false and iscancelled eq false")
        .orderby('start/dateTime asc')
        .top(500)
        .get()
      let events = value.filter((evt: { subject: any }) => evt.subject).map((evt: any) => new MSGraphEvent(evt))
      events = events.filter((evt: { duration: number }) => evt.duration <= maxDurationHours)
      this.endMark('getEvents')
      return events
    } catch (error) {
      switch (error.statusCode) {
        case 401: {
          this.oauthToken = await TokenService.refreshAccessToken(this.request)
          return this.getEvents(startDateTime, endDateTime)
        }
        default: {
          throw error
        }
      }
    }
  }
}

export default MSGraphService
