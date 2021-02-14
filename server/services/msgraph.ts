global['fetch'] = require('node-fetch')
import { Client as MSGraphClient } from '@microsoft/microsoft-graph-client'
import * as appInsights from 'applicationinsights'
import createDebug from 'debug'
import { performance, PerformanceObserver } from 'perf_hooks'
import 'reflect-metadata'
import { Service } from 'typedi'
import { first, sortBy } from 'underscore'
import env from '../utils/env'
import DateUtils from '../../shared/utils/date'
import MSGraphEvent, { MSGraphEventOptions } from './msgraph.types'
import OAuthService, { AccessTokenOptions } from './oauth'
const debug = createDebug('services/msgraph')

@Service({ global: false })
class MSGraphService {
  private _perf: PerformanceObserver
  private _accessTokenOptions: AccessTokenOptions = {
    clientId: env('OAUTH_APP_ID'),
    clientSecret: env('OAUTH_APP_PASSWORD'),
    tokenHost: 'https://login.microsoftonline.com/common/',
    authorizePath: 'oauth2/v2.0/authorize',
    tokenPath: 'oauth2/v2.0/token'
  }

  /**
   * Constructs a new MSGraphService
   *
   * @param {OAuthService} _oauthService OAuth service
   * @param {string} access_token Access token
   */
  constructor(private _oauthService: OAuthService, private _access_token?: string) {
    if (!env('APPINSIGHTS_INSTRUMENTATIONKEY')) return
    appInsights.setup(env('APPINSIGHTS_INSTRUMENTATIONKEY'))
    this._perf = new PerformanceObserver((list) => {
      const { name, duration } = first(list.getEntries())
      appInsights.defaultClient.trackMetric({
        name,
        value: duration
      })
    })
    this._perf.observe({ entryTypes: ['measure'], buffered: true })
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
  private async _getClient(): Promise<MSGraphClient> {
    this._access_token = (
      await this._oauthService.getAccessToken(this._accessTokenOptions)
    ).access_token
    const client = MSGraphClient.init({
      authProvider: (done: (arg0: any, arg1: any) => void) => {
        done(null, this._access_token)
      }
    })
    return client
  }

  /**
   * Get current user properties
   *
   * @param {string[]} properties Properties to retrieve
   */
  async getCurrentUser(properties: string[]): Promise<any> {
    try {
      this.startMark('getCurrentUser')
      debug('Querying Graph /me: %s', JSON.stringify({ select: properties }))
      const client = await this._getClient()
      const value = await client
        .api('/me')
        .select(['id', ...properties])
        .get()
      this.endMark('getCurrentUser')
      return value
    } catch (error) {
      throw new Error(`MSGraphService.getCurrentUser: ${error.message}`)
    }
  }

  /**
   * Get Azure Active Directory users
   *
   * @param {string} orderBy Order by
   */
  async getUsers(orderBy: string): Promise<any> {
    try {
      this.startMark('getUsers')
      const client = await this._getClient()
      const { value: users } = await client
        .api('/users')
        // eslint-disable-next-line quotes
        .filter("userType eq 'Member'")
        .select([
          'id',
          'givenName',
          'surname',
          'jobTitle',
          'displayName',
          'mobilePhone',
          'mail',
          'preferredLanguage'
        ])
        .top(999)
        .get()
      this.endMark('getUsers')
      return sortBy(users, orderBy)
    } catch (error) {
      throw new Error(`MSGraphService.getUsers: ${error.message}`)
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
      // returns a pseudorandom color index from 0 to 24 based on category name
      const colorIdx =
        category
          .split('')
          .map((c) => c.charCodeAt(0))
          .reduce((a, b) => a + b) % 24
      const content = JSON.stringify({
        displayName: category,
        color: `preset${colorIdx}`
      })
      const client = await this._getClient()
      const result = await client.api('/me/outlook/masterCategories').post(content)
      this.endMark('createOutlookCategory')
      return result
    } catch (error) {
      throw new Error(`MSGraphService.createOutlookCategory: ${error.message}`)
    }
  }

  /**
   * Get Outlook categories
   */
  async getOutlookCategories(): Promise<any[]> {
    try {
      this.startMark('getOutlookCategories')
      debug('Querying Graph /me/outlook/masterCategories')
      const client = await this._getClient()
      const { value } = await client.api('/me/outlook/masterCategories').get()
      this.endMark('getOutlookCategories')
      return value
    } catch (error) {
      throw new Error(`MSGraphService.getOutlookCategories: ${error.message}`)
    }
  }

  /**
   * Get events for the specified period using Microsoft Graph endpoint /me/calendar/calendarView
   *
   * @param {string} startDate Start date (YYYY-MM-DD)
   * @param {string} endDate End date (YYYY-MM-DD)
   * @param {MSGraphEventOptions} options Options
   */
  async getEvents(
    startDate: string,
    endDate: string,
    options: MSGraphEventOptions
  ): Promise<MSGraphEvent[]> {
    try {
      this.startMark('getEvents')
      const query = {
        startDateTime: DateUtils.toISOString(`${startDate}:00:00:00.000`, options.tzOffset),
        endDateTime: DateUtils.toISOString(`${endDate}:23:59:59.999`, options.tzOffset)
      }
      debug('Querying Graph /me/calendar/calendarView: %s', JSON.stringify({ query }))
      const client = await this._getClient()
      const { value } = (await client
        .api('/me/calendar/calendarView')
        .query(query)
        .select(['id', 'subject', 'body', 'start', 'end', 'categories', 'webLink', 'isOrganizer'])
        // eslint-disable-next-line quotes
        .filter("sensitivity ne 'private' and isallday eq false and iscancelled eq false")
        .orderby('start/dateTime asc')
        .top(500)
        .get()) as { value: any[] }
      const events = value
        .filter((event) => !!event.subject)
        .map((event) => new MSGraphEvent(event, options))
        .filter((event: MSGraphEvent) => event.duration <= 24)
      this.endMark('getEvents')
      return events
    } catch (error) {
      throw new Error(`MSGraphService.getEvents: ${error.message}`)
    }
  }
}

export default MSGraphService
