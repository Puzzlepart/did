/* eslint-disable quotes */
global['fetch'] = require('node-fetch')
import { Client as MSGraphClient } from '@microsoft/microsoft-graph-client'
import createDebug from 'debug'
import 'reflect-metadata'
import { Service } from 'typedi'
import { sortBy } from 'underscore'
import DateUtils from '../../../shared/utils/date'
import env from '../../utils/env'
import OAuthService, { AccessTokenOptions } from '../oauth'
import MSGraphEvent, {
  MSGraphEventOptions,
  MSGraphOutlookCategory
} from './types'
const debug = createDebug('services/msgraph')

@Service({ global: false })
class MSGraphService {
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
   * @param _oauthService - OAuth service
   * @param access_token - Access token
   */
  constructor(
    private _oauthService: OAuthService,
    private _access_token?: string
  ) {}

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
   * @param properties - Properties to retrieve
   */
  async getCurrentUser(properties: string[]): Promise<any> {
    try {
      debug('Querying Graph /me: %s', JSON.stringify({ select: properties }))
      const client = await this._getClient()
      const value = await client
        .api('/me')
        .select(['id', ...properties])
        .get()
      return value
    } catch (error) {
      throw new Error(`MSGraphService.getCurrentUser: ${error.message}`)
    }
  }

  /**
   * Get Azure Active Directory users
   */
  async getUsers(): Promise<any> {
    try {
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
      return sortBy(users, 'displayName')
    } catch (error) {
      throw new Error(`MSGraphService.getUsers: ${error.message}`)
    }
  }

  /**
   * Create Outlook category
   *
   * @param category - Category
   */
  async createOutlookCategory(
    category: string
  ): Promise<MSGraphOutlookCategory> {
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
      const result = await client
        .api('/me/outlook/masterCategories')
        .post(content)
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
      debug('Querying Graph /me/outlook/masterCategories')
      const client = await this._getClient()
      const { value } = await client.api('/me/outlook/masterCategories').get()
      return value
    } catch (error) {
      throw new Error(`MSGraphService.getOutlookCategories: ${error.message}`)
    }
  }

  /**
   * Get events for the specified period using Microsoft Graph endpoint /me/calendar/calendarView
   *
   * @param startDate - Start date (YYYY-MM-DD)
   * @param endDate - End date (YYYY-MM-DD)
   * @param options - Options
   */
  async getEvents(
    startDate: string,
    endDate: string,
    options: MSGraphEventOptions
  ): Promise<MSGraphEvent[]> {
    try {
      const query = {
        startDateTime: DateUtils.toISOString(
          `${startDate}:00:00:00.000`,
          options.tzOffset
        ),
        endDateTime: DateUtils.toISOString(
          `${endDate}:23:59:59.999`,
          options.tzOffset
        )
      }
      debug(
        'Querying Graph /me/calendar/calendarView: %s',
        JSON.stringify({ query })
      )
      const client = await this._getClient()
      const { value } = (await client
        .api('/me/calendar/calendarView')
        .query(query)
        .select([
          'id',
          'subject',
          'body',
          'start',
          'end',
          'categories',
          'webLink',
          'isOrganizer'
        ])
        .filter(
          "sensitivity ne 'private' and isallday eq false and iscancelled eq false"
        )
        .orderby('start/dateTime asc')
        .top(500)
        .get()) as { value: any[] }
      const events = value
        .filter((event) => !!event.subject)
        .map((event) => new MSGraphEvent(event, options))
        .filter((event: MSGraphEvent) => event.duration <= 24)
      return events
    } catch (error) {
      throw new Error(`MSGraphService.getEvents: ${error.message}`)
    }
  }
}

export default MSGraphService
