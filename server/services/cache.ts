/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import _ from 'underscore'
import { Context } from '../graphql/context'
import { redisMiddlware } from '../middleware/redis'
const log = require('debug')('server/services/cache')

/**
 * Cache scope - `USER` or `SUBSCRIPTION`
 */
export enum CacheScope {
  USER,
  SUBSCRIPTION
}

export type CacheKey = string | string[]

/**
 * Cache options
 */
export type CacheOptions = {
  /**
   * Cache key
   */
  key: CacheKey

  /**
   * Cache expiry in seconds
   */
  expiry?: number

  /**
   * Cache scope
   */
  scope?: CacheScope
}

/**
 * Cache service
 *
 * @category Injectable Container Service
 */
@Service({ global: false })
export class CacheService {
  /**
   * Constructor
   *
   * @param context - Injected context through `typedi`
   * @param prefix - Prefix
   * @param context - Scope (defaults to CacheScope.SUBSCRIPTION)
   */
  constructor(
    @Inject('CONTEXT') private readonly context: Context,
    public prefix?: string,
    public scope: CacheScope = CacheScope.SUBSCRIPTION
  ) {}

  /**
   * Get scoped cache key
   *
   * Key can either be an string or  an array of string.
   * If it's an array it will be filtered to remove empty/null
   * values and joined by :.
   *
   * @param key - Cache key
   * @param scope - Cache scope
   */
  private _getScopedCacheKey(key: CacheKey, scope: CacheScope = this.scope) {
    key = _.isArray(key) ? _.filter(key, (k) => !!k) : [key]
    const scopedCacheKey = [
      this.prefix,
      ...key,
      scope === CacheScope.SUBSCRIPTION
        ? this.context.subscription.id
        : this.context.userId
    ]
      .join(':')
      .replace(/-/g, '')
      .toLowerCase()
    return scopedCacheKey
  }

  /**
   * Get from cache by key
   *
   * @param options - Cache options
   */
  private _get<T = any>({ key, scope }: CacheOptions): Promise<T> {
    return new Promise((resolve) => {
      const scopedCacheKey = this._getScopedCacheKey(key, scope)
      log(`Retrieving cached value for key ${scopedCacheKey}...`)
      redisMiddlware.get(scopedCacheKey, (error, reply) => {
        if (error) {
          log(`Failed to retrieve cachedd value for key ${scopedCacheKey}.`)
          resolve(null)
        } else {
          log(`Retrieved cached value for key ${scopedCacheKey}.`)
          resolve(JSON.parse(reply) as T)
        }
      })
    })
  }

  /**
   * Set value in cache
   *
   * @param options - Cache options
   * @param value - Cache value
   */
  private _set<T = any>({ key, scope, expiry }: CacheOptions, value: T) {
    return new Promise((resolve) => {
      const scopedCacheKey = this._getScopedCacheKey(key, scope)
      log(
        `Setting value for key ${scopedCacheKey} with a expiration of ${expiry} seconds...`
      )
      redisMiddlware.setex(
        scopedCacheKey,
        expiry,
        JSON.stringify(value),
        (error, reply) => {
          if (error) {
            log(`Failed to set value for key ${scopedCacheKey}.`)
            resolve(error)
          } else {
            log(
              `Value for key ${scopedCacheKey} set with a expiration of ${expiry} seconds.`
            )
            resolve(reply)
          }
        }
      )
    })
  }

  /**
   * Clear cache for the specified key and scope
   *
   * @param options - Cache options
   */
  public clear({ key, scope }: CacheOptions) {
    const pattern = `${this._getScopedCacheKey(key, scope)}*`
    return new Promise((resolve) => {
      redisMiddlware.keys(pattern, (_error, keys) => {
        redisMiddlware.del(keys, () => {
          resolve(null)
        })
      })
    })
  }

  /**
   * Using cache
   *
   * @param func - Promise function
   * @param options - Cache options
   */
  public async usingCache<T = any>(
    function_: () => Promise<T>,
    { key, expiry = 60, scope }: CacheOptions
  ) {
    const cachedValue: T = await this._get<T>({ key, scope })
    if (cachedValue) return cachedValue
    const value: T = await function_()
    await this._set({ key, scope, expiry }, value)
    return value
  }
}
