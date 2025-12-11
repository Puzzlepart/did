/* eslint-disable unicorn/no-array-callback-reference */
/* eslint-disable quotes */
global['fetch'] = require('node-fetch')
import { Client as MSGraphClient } from '@microsoft/microsoft-graph-client'
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import _ from 'underscore'
import { DateObject } from '../../../shared/utils/DateObject'
import { RequestContext } from '../../graphql/requestContext'
import { EventObject } from '../../graphql/resolvers/timesheet/types'
import { environment } from '../../utils'
import { CacheOptions, CacheScope, CacheService } from '../cache'
import MSOAuthService, { MSAccessTokenOptions } from '../msoauth'
import { MSGraphError, MSGraphOutlookCategory } from './types'

/**
 * Microsoft Graph service
 *
 * @category Injectable Container Service
 */
@Service({ global: false })
export class MSGraphService {
  private _cache: CacheService = null
  private _accessTokenOptions: MSAccessTokenOptions = {
    clientId: environment('MICROSOFT_CLIENT_ID'),
    clientSecret: environment('MICROSOFT_CLIENT_SECRET'),
    tokenHost: 'https://login.microsoftonline.com/common/',
    authorizePath: 'oauth2/v2.0/authorize',
    tokenPath: 'oauth2/v2.0/token'
  }

  constructor(
    private _msOAuthSvc: MSOAuthService,
    private _accessToken?: string,
    @Inject('CONTEXT') readonly context?: RequestContext
  ) {
    this._cache = new CacheService(context, MSGraphService.name)
  }

  /**
   * Gets a Microsoft Graph Client using the auth token from the class
   *
   * @memberof MSGraphService
   */
  private async _getClient(): Promise<MSGraphClient> {
    this._accessToken =
      // eslint-disable-next-line unicorn/no-await-expression-member
      (
        await this._msOAuthSvc.getAccessToken(this._accessTokenOptions)
      ).access_token
    const client = MSGraphClient.init({
      authProvider: (done: (error: Error, token: any) => void) => {
        done(null, this._accessToken)
      }
    })
    return client
  }

  /**
   * Get user photo in base64 format
   *
   * @param size - Photo size
   * @public
   *
   * @returns A base64 representation of the user photo, or null if
   * the user photo is not found.
   *
   * @memberof MSGraphService
   */
  public async getUserPhoto(size: string): Promise<string> {
    try {
      const client = await this._getClient()
      const blob = (await client.api(`/me/photos/${size}/$value`).get()) as Blob
      const buffer = await blob.arrayBuffer()
      return `data:${blob.type};base64,${Buffer.from(buffer).toString(
        'base64'
      )}`
    } catch {
      return null
    }
  }

  /**
   * Get vacation for the current user
   *
   * @param category - Category for vacation
   */
  public async getVacation(category: string): Promise<EventObject[]> {
    try {
      const client = await this._getClient()
      const { value } = await client
        .api('/me/calendar/calendarView')
        .query({
          startDateTime: new DateObject().$.startOf('year').toISOString(),
          endDateTime: new DateObject().$.endOf('year').toISOString()
        })
        .select(['id', 'subject', 'start', 'end', 'webLink', 'categories'])
        .filter(`categories/any(a:a+eq+\'${category}\')`)
        .top(999)
        .get()
      return value.map(
        (event: any) =>
          new EventObject(
            event.id,
            event.subject,
            '',
            true,
            event.start,
            event.end,
            event.webLink,
            event.categories
          )
      )
    } catch (error) {
      throw new MSGraphError('getVacation', error.message)
    }
  }

  /**
   * Get current user properties
   *
   * @param properties - Properties to retrieve
   *
   * @public
   *
   * @memberof MSGraphService
   */
  public async getCurrentUser(properties: string[]): Promise<any> {
    try {
      const client = await this._getClient()
      const value = await client
        .api('/me')
        .expand('manager')
        .select([...properties, 'manager'])
        .get()
      return value
    } catch (error) {
      throw new MSGraphError('getCurrentUser', error.message)
    }
  }

  /**
   * Get Azure Active Directory users. Using paging to get all users (more than 999).
   *
   * @public
   *
   * @param pageLimit - Page limit (default: 100)
   *
   * @memberof MSGraphService
   */
  public getUsers(pageLimit = 100): Promise<any> {
    try {
      return this._cache.usingCache(
        async () => {
          const client = await this._getClient()
          let response = await client
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
              'preferredLanguage',
              'accountEnabled',
              'manager'
            ])
            .expand('manager')
            .top(pageLimit)
            .get()
          let users = [...response.value]
          while (response['@odata.nextLink']) {
            response = await client.api(response['@odata.nextLink']).get()
            users = users.concat(response.value)
          }
          return _.sortBy(users, 'displayName')
        },
        { key: 'getusers_' }
      )
    } catch (error) {
      throw new MSGraphError('getUsers', error.message)
    }
  }

  /**
   * Search users from Microsoft Graph with filters.
   *
   * @param search - Search term to filter users
   * @param limit - Maximum number of results to return (default: 10)
   */
  /**
   * Escapes a string for safe use in OData string literals.
   * OData string literals are enclosed in single quotes, and single quotes are escaped by doubling them.
   */
  private escapeODataString(str: string): string {
    return String(str).replace(/'/g, "''")
  }

  public async searchUsers(search: string, limit = 10): Promise<any> {
    try {
      const client = await this._getClient()
      const safeSearch = this.escapeODataString(search)
      const response = await client
        .api('/users')
        // eslint-disable-next-line quotes
        .filter(
          `userType eq 'Member' and (startswith(displayName,'${safeSearch}') or startswith(givenName,'${safeSearch}') or startswith(surname,'${safeSearch}') or startswith(mail,'${safeSearch}'))`
        )
        .select([
          'id',
          'givenName',
          'surname',
          'jobTitle',
          'displayName',
          'mobilePhone',
          'mail',
          'preferredLanguage',
          'accountEnabled',
          'manager'
        ])
        .expand('manager')
        .top(limit)
        .get()
      return _.sortBy(response.value, 'displayName')
    } catch (error) {
      throw new MSGraphError('searchUsers', error.message)
    }
  }

  /**
   * Create Outlook category.
   *
   * @param category The category to create
   * @param colorPresetIndex The color preset index (optional, default: `-1`)
   *
   * @public
   *
   * @memberof MSGraphService
   */
  public async createOutlookCategory(
    category: string,
    colorPresetIndex = -1
  ): Promise<MSGraphOutlookCategory> {
    try {
      if (colorPresetIndex === -1) {
        colorPresetIndex =
          category
            .split('')
            .map((c) => c.charCodeAt(0))
            .reduce((a, b) => a + b) % 24
      }
      const content = JSON.stringify({
        displayName: category,
        color: `preset${colorPresetIndex}`
      })
      const client = await this._getClient()
      const result = await client
        .api('/me/outlook/masterCategories')
        .post(content)
      return result
    } catch (error) {
      throw new MSGraphError('createOutlookCategory', error.message)
    }
  }

  /**
   * Get Outlook categories. This method uses the Microsoft Graph endpoint
   * `/me/outlook/masterCategories`. The response is default cached for
   * 60 seconds.
   *
   * @public
   *
   * @param cacheExpiry - Cache expiry in seconds
   *
   * @memberof MSGraphService
   */
  public getOutlookCategories(cacheExpiry = 60): Promise<any[]> {
    try {
      return this._cache.usingCache(
        async () => {
          const client = await this._getClient()
          const { value } = await client
            .api('/me/outlook/masterCategories')
            .get()
          return value
        },
        {
          key: 'getoutlookcategories',
          expiry: cacheExpiry,
          scope: CacheScope.USER
        }
      )
    } catch (error) {
      throw new MSGraphError('getOutlookCategories', error.message)
    }
  }

  /**
   * Get events for the specified period using Microsoft Graph endpoint /me/calendar/calendarView
   *
   * @param startDateTimeIso - Start date time in `ISO format`
   * @param endDateTimeIso - End date time in `ISO format`
   * @param cache - Use cache (default: `true`)
   * @param filterString - Filter string for the query (default: `sensitivity ne 'private' and isallday eq false and iscancelled eq false`)
   * @param orderBy - Order by string for the query (default: `start/dateTime asc`)
   *
   * @public
   *
   * @memberof MSGraphService
   */
  public async getEvents(
    startDateTimeIso: string,
    endDateTimeIso: string,
    cache: boolean = true,
    filterString = "sensitivity ne 'private' and isallday eq false and iscancelled eq false",
    orderBy = 'start/dateTime asc'
  ): Promise<EventObject[]> {
    try {
      const cacheOptions: CacheOptions = {
        key: ['events', startDateTimeIso, endDateTimeIso],
        scope: CacheScope.USER,
        expiry: 20,
        disabled: !cache
      }
      const events = await this._cache.usingCache(async () => {
        const query = {
          startDateTime: startDateTimeIso,
          endDateTime: endDateTimeIso
        }
        const client = await this._getClient()
        return (
          await client
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
            .filter(filterString)
            .orderby(orderBy)
            .top(500)
            .get()
        ).value
      }, cacheOptions)
      return events
        .map(
          (event: any) =>
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
        .filter(
          (event: EventObject) =>
            event.startDateTime >= new Date(startDateTimeIso)
        )
    } catch (error) {
      throw new MSGraphError('getEvents', error.message)
    }
  }

  /**
   * Checks if a user is a member of a security group.
   *
   * @param groupId The ID of the security group.
   * @param mail The email address of the user.
   *
   * @public
   *
   * @memberof MSGraphService
   */
  public async isUserMemberOfSecurityGroup(
    groupId: string,
    mail: string
  ): Promise<boolean> {
    try {
      const client = await this._getClient()
      const response = await (client
        .api(`/groups/${groupId}/members?$select=id,mail`)
        .get() as Promise<{ value: any[] }>)
      return response.value.some((member) => member.mail === mail)
    } catch {
      return false
    }
  }

  /**
   * Get manager for a specific user.
   * Returns minimal manager object or null if not found / no permission.
   *
   * @param userId - User ID (GUID)
   */
  public async getUserManager(userId: string): Promise<any | null> {
    try {
      const client = await this._getClient()
      const manager = await client
        .api(`/users/${userId}/manager`)
        .select(['id', 'displayName', 'mail'])
        .get()
      return manager
    } catch {
      return null
    }
  }

  /**
   * Get a specific user by ID with full profile information including manager.
   * Returns user object or null if not found / no permission.
   *
   * @param userId - User ID (GUID)
   */
  public async getUser(userId: string): Promise<any | null> {
    try {
      const client = await this._getClient()
      const user = await client
        .api(`/users/${userId}`)
        .expand('manager')
        .select([
          'id', 'displayName', 'givenName', 'surname', 'mail', 
          'jobTitle', 'department', 'officeLocation', 'mobilePhone',
          'accountEnabled', 'manager'
        ])
        .get()
      return user
    } catch {
      return null
    }
  }

  /**
   * Get users delta - fetch incremental changes using MS Graph delta query
   * Follows the delta link pattern with @odata.nextLink and @odata.deltaLink
   *
   * @param deltaLink - Previous delta link URL (null for initial sync)
   *
   * @returns Object containing users array, deleted user IDs, and new delta link
   *
   * @public
   *
   * @memberof MSGraphService
   */
  public async getUsersDelta(deltaLink: string | null = null): Promise<{
    users: any[]
    deletedUserIds: string[]
    newDeltaLink: string | null
  }> {
    try {
      const client = await this._getClient()
      const users: any[] = []
      const deletedUserIds: string[] = []

      if (deltaLink === null) {
        // Initial delta request (do NOT add filter/expand to keep delta supported)
        // Only use $select (allowed) to reduce payload size.
        // NOTE: Some tenants / permissions setups reject filters on delta for users.
        const request = client
          .api('/users/delta')
          .select([
            'id',
            'givenName',
            'surname',
            'jobTitle',
            'displayName',
            'mobilePhone',
            'mail',
            'preferredLanguage',
            'accountEnabled'
          ])

        let response = await request.get()

        // Process initial response
        this._processDeltaResponse(response, users, deletedUserIds)

        // Follow nextLink pagination
        while (response['@odata.nextLink']) {
          response = await client.api(response['@odata.nextLink']).get()
          this._processDeltaResponse(response, users, deletedUserIds)
        }

        // Get the final delta link
        const newDeltaLink = response['@odata.deltaLink'] || null

        return { users, deletedUserIds, newDeltaLink }
      } else {
        // Use existing delta link for incremental changes
        let response = await client.api(deltaLink).get()

        // Process delta response
        this._processDeltaResponse(response, users, deletedUserIds)

        // Follow nextLink if there are more changes
        while (response['@odata.nextLink']) {
          response = await client.api(response['@odata.nextLink']).get()
          this._processDeltaResponse(response, users, deletedUserIds)
        }

        // Get the new delta link
        const newDeltaLink = response['@odata.deltaLink'] || deltaLink

        return { users, deletedUserIds, newDeltaLink }
      }
    } catch (error) {
      throw new MSGraphError('getUsersDelta', error instanceof Error ? error.message : String(error))
    }
  }

  /**
   * Process a delta response and extract users and deleted user IDs
   *
   * @param response - The response from MS Graph delta query
   * @param users - Array to accumulate users
   * @param deletedUserIds - Array to accumulate deleted user IDs
   *
   * @private
   *
   * @memberof MSGraphService
   */
  private _processDeltaResponse(
    response: any,
    users: any[],
    deletedUserIds: string[]
  ): void {
    if (response.value) {
      for (const item of response.value) {
        if (item['@removed']) {
          // User was deleted or removed
          deletedUserIds.push(item.id)
        } else {
          // User was added or updated
          users.push(item)
        }
      }
    }
  }

  /**
   * Enrich users with manager information by fetching it separately.
   * Delta queries don't support expand(), so we need to fetch managers individually.
   * This is done in batches to avoid overwhelming the API.
   *
   * @param client - MS Graph client
   * @param users - Array of users to enrich
   *
   * @private
   *
   * @memberof MSGraphService
   */
  // Manager enrichment removed for now to keep delta queries fast and compliant.
}
