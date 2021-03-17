/* eslint-disable tsdoc/syntax */
/* eslint-disable @typescript-eslint/no-var-requires */
global['fetch'] = require('node-fetch')
import { Client as MSGraphClient } from '@microsoft/microsoft-graph-client'
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { sortBy } from 'underscore'
import { EventObject } from '../../graphql'
import { Context } from '../../graphql/context'
import { environment } from '../../utils'
import { CacheScope, CacheService } from '../cache'
import OAuthService, { AccessTokenOptions } from '../oauth'
import { MSGraphOutlookCategory } from './types'

/**
 * Microsoft Graph service
 *
 * @category Injectable Container Service
 */
@Service({ global: false })
class MSGraphService {
  private _cache: CacheService = null
  private _accessTokenOptions: AccessTokenOptions = {
    clientId: environment('MICROSOFT_CLIENT_ID'),
    clientSecret: environment('MICROSOFT_CLIENT_SECRET'),
    tokenHost: 'https://login.microsoftonline.com/common/',
    authorizePath: 'oauth2/v2.0/authorize',
    tokenPath: 'oauth2/v2.0/token'
  }

  constructor(
    private _oauthService: OAuthService,
    private _access_token?: string,
    @Inject('CONTEXT') readonly context?: Context
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
      authProvider: (done: (error: Error, token: any) => void) => {
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
      const client = await this._getClient()
      const value = await client.api('/me').select(properties).get()
      return value
    } catch (error) {
      throw new Error(`MSGraphService.getCurrentUser: ${error.message}`)
    }
  }

  /**
   * Get Azure Active Directory users
   */
  public getUsers(): Promise<any> {
    try {
      return this._cache.usingCache(
        async () => {
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
          return users
        },
        { key: 'getusers' }
      )
    } catch (error) {
      throw new Error(`MSGraphService.getUsers: ${error.message}`)
    }
  }

  /**
   * Create Outlook category
   *
   * @param category - Category
   */
  public async createOutlookCategory(
    category: string
  ): Promise<MSGraphOutlookCategory> {
    try {
      const colorIndex =
        category
          .split('')
          .map((c) => c.charCodeAt(0))
          .reduce((a, b) => a + b) % 24
      const content = JSON.stringify({
        displayName: category,
        color: `preset${colorIndex}`
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
  public getOutlookCategories(): Promise<any[]> {
    try {
      return this._cache.usingCache(
        async () => {
          const client = await this._getClient()
          const { value } = await client
            .api('/me/outlook/masterCategories')
            .get()
          return value
        },
        { key: 'getoutlookcategories', expiry: 1800, scope: CacheScope.USER }
      )
    } catch (error) {
      throw new Error(`MSGraphService.getOutlookCategories: ${error.message}`)
    }
  }

  /**
   * Get events for the specified period using Microsoft Graph endpoint /me/calendar/calendarView
   *
   * @param startDateTimeIso - Start date time in `ISO format`
   * @param endDateTimeIso - End date time in `ISO format`
   */
  public async getEvents(
    startDateTimeIso: string,
    endDateTimeIso: string
  ): Promise<EventObject[]> {
    try {
      const cacheOptions = {
        key: ['events', startDateTimeIso, endDateTimeIso],
        scope: CacheScope.USER
      }
      const events = await this._cache.usingCache(async () => {
        const query = {
          startDateTime: startDateTimeIso,
          endDateTime: endDateTimeIso
        }
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
            // eslint-disable-next-line quotes
            "sensitivity ne 'private' and isallday eq false and iscancelled eq false"
          )
          .orderby('start/dateTime asc')
          .top(500)
          .get()) as { value: any[] }
        return value.filter((event) => !!event.subject)
      }, cacheOptions)
      return events
        .map(
          (event) =>
            new EventObject(
              event.id,
              event.subject,
              event.body.content,
              event.isOrganizer,
              event.start,
              event.end,
              event.webLink,
              event.categories
            )
        )
        .filter((event: EventObject) => event.duration <= 24)
    } catch (error) {
      throw new Error(`MSGraphService.getEvents: ${error.message}`)
    }
  }
}

export default MSGraphService
