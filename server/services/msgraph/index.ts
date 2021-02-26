/* eslint-disable @typescript-eslint/no-var-requires */
global['fetch'] = require('node-fetch')
import { Client as MSGraphClient } from '@microsoft/microsoft-graph-client'
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { sortBy } from 'underscore'
import DateUtils from '../../../shared/utils/date'
import { Context } from '../../graphql/context'
import env from '../../utils/env'
import { CacheScope, CacheService } from '../cache'
import OAuthService, { AccessTokenOptions } from '../oauth'
import MSGraphEvent, { MSGraphEventOptions, MSGraphOutlookCategory } from './types'
const debug = require('debug')('services/msgraph')

@Service({ global: false })
class MSGraphService {
  private _cache: CacheService = null
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
   * @param {Context} _context Context
   */
  constructor(
    private readonly _oauthService: OAuthService,
    private _access_token?: string,
    @Inject('CONTEXT') readonly context?: Context,
  ) {
    this._cache = new CacheService(context, MSGraphService.name)
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
   * Get Azure Active Directory users
   */
  async getUsers(): Promise<any> {
    try {
      const cacheValue = await this._cache.get('users')
      if (cacheValue) return cacheValue
      const client = await this._getClient()
      const { value } = await client
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
      const users = sortBy(value, 'displayName')
      await this._cache.set('users', users, 1800)
      return users
    } catch (error) {
      throw new Error(`MSGraphService.getUsers: ${error.message}`)
    }
  }

  /**
   * Create Outlook category
   *
   * @param {string} category Category
   */
  async createOutlookCategory(category: string): Promise<MSGraphOutlookCategory> {
    try {
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
      const cacheValue = await this._cache.get('outlookcategories', CacheScope.USER)
      if (cacheValue) return cacheValue
      debug('Querying Graph /me/outlook/masterCategories')
      const client = await this._getClient()
      const { value } = await client.api('/me/outlook/masterCategories').get()
      await this._cache.set('outlookcategories', value, 1800, CacheScope.USER)
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
      const cacheKeys = ['events', startDate, endDate]
      const cacheValue = await this._cache.get(cacheKeys, CacheScope.USER)
      if (cacheValue) return cacheValue
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
      await this._cache.set(cacheKeys, events, 60, CacheScope.USER)
      return events
    } catch (error) {
      throw new Error(`MSGraphService.getEvents: ${error.message}`)
    }
  }
}

export default MSGraphService
