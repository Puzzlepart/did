/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-classes-per-file */
import colors from 'colors/safe'
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import _ from 'underscore'
import { RequestContext } from '../graphql/requestContext'
import { redisMiddlware } from '../middleware/redis'
const log = require('debug')('server/services/cache')

/**
 * Cache scope - `USER` or `SUBSCRIPTION`
 */
export enum CacheScope {
  /**
   * User scope
   */
  USER,

  /**
   * Subscription scope
   */
  SUBSCRIPTION,

  /**
   * Global scope
   */
  GLOBAL
}

/**
 * Cache key can either be an string or an array of string.
 */
export type CacheKey = string | string[]

/**
 * Cache options for `CacheService`.
 * 
 * - `key` - Cache key
 * - `expiry` - Cache expiry in seconds
 * - `scope` - Cache scope
 * - `disabled` - Cache disabled (defaults to `false`)
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

  /**
   * Cache disabled (defaults to `false`)
   */
  disabled?: boolean
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
    @Inject('CONTEXT') private readonly context: RequestContext,
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
      scope !== CacheScope.GLOBAL && (scope === CacheScope.SUBSCRIPTION
        ? this.context.subscription.id
        : this.context.userId)
    ]
      .filter(Boolean)
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
      log(
        `Retrieving cached value for key ${colors.magenta(scopedCacheKey)}...`
      )
      redisMiddlware.get(scopedCacheKey, (error, reply) => {
        if (error) {
          log(
            `Failed to retrieve cachedd value for key ${colors.magenta(
              scopedCacheKey
            )}.`
          )
          resolve(null)
        } else {
          log(
            `Retrieved cached value for key ${colors.magenta(scopedCacheKey)}.`
          )
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
        `Setting value for key ${colors.magenta(
          scopedCacheKey
        )} with a expiration of ${colors.magenta(expiry.toString())} seconds.`
      )
      redisMiddlware.setex(
        scopedCacheKey,
        expiry,
        JSON.stringify(value),
        (error, reply) => {
          if (error) {
            log(
              `Failed to set value for key ${colors.magenta(scopedCacheKey)}.`
            )
            resolve(error)
          } else {
            log(
              `Value for key ${colors.magenta(
                scopedCacheKey
              )} set with a expiration of ${colors.magenta(expiry.toString())} seconds.`
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
   * @param key - Cache key
   */
  public clear(key: CacheKey) {
    const pattern = `${this._getScopedCacheKey(key, CacheScope.GLOBAL)}*`
    return new Promise((resolve) => {
      redisMiddlware.keys(pattern, (_error, keys) => {
        redisMiddlware.del(keys, () => {
          resolve(null)
        })
      })
    })
  }

  /**
   * Using cache for the provided `asyncFunction` using the specified `options`.
   * If the value is not cached, the `asyncFunction` is executed and the value
   * is cached with redis.
   *
   * @param asyncFunction - Async function to execute if the value is not cached
   * @param options - Cache options
   */
  public async usingCache<T = any>(
    asyncFunction: () => Promise<T>,
    { key, expiry = 60, scope, disabled = false }: CacheOptions
  ) {
    if(disabled) return await asyncFunction()
    const cachedValue: T = await this._get<T>({ key, scope })
    if (cachedValue) return cachedValue
    const value: T = await asyncFunction()
    await this._set({ key, scope, expiry }, value)
    return value
  }
}
