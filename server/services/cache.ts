/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { filter, isArray } from 'underscore'
import { Context } from '../graphql/context'
import Redis from '../middleware/redis'
const log = require('debug')('server/services/cache')

export enum CacheScope {
  USER,
  SUBSCRIPTION
}

export type CacheKey = string | string[]

@Service({ global: false })
export class CacheService {
  /**
   * Constructor
   *
   * @param {Context} context Context
   * @param {string} prefix Prefix
   * @param {CacheScope} scope Scope (defaults to CacheScope.SUBSCRIPTION)
   */
  constructor(
    @Inject('CONTEXT') private readonly context: Context,
    public prefix?: string,
    public scope: CacheScope = CacheScope.SUBSCRIPTION
  ) { }

  /**
   * Get scoped cache key
   *
   * Key can either be an string or  an array of string.
   * If it's an array it will be filtered to remove empty/null
   * values and joined by :.
   *
   * @param {CacheKey} key Cache key
   * @param {CacheScope} scope Cache scope
   */
  private _getScopedCacheKey(key: CacheKey, scope: CacheScope = this.scope) {
    key = isArray(key) ? filter(key, (k) => !!k) : [key]
    return [
      this.prefix,
      ...key,
      scope === CacheScope.SUBSCRIPTION ? this.context.subscription.id : this.context.userId
    ]
      .join(':')
      .replace(/\-/g, '')
      .toLowerCase()
  }

  /**
   * Get from cache by key
   *
   * @param {CacheKey} key Cache key
   * @param {CacheScope} scope Cache scope
   */
  public get<T = any>(key: CacheKey, scope: CacheScope = this.scope): Promise<T> {
    return new Promise((resolve) => {
      const scopedCacheKey = this._getScopedCacheKey(key, scope)
      log(`Retrieving cached value for key ${scopedCacheKey}...`)
      Redis.get(scopedCacheKey, (err, reply) => {
        if (err) {
          log(`Failed to retrieve cachedd value for key ${scopedCacheKey}.`)
          resolve(null)
        }
        else {
          log(`Retrieved cached value for key ${scopedCacheKey}.`)
          resolve(JSON.parse(reply) as T)
        }
      })
    })
  }

  /**
   * Get from cache by key
   *
   * @param {CacheKey} key Cache key
   * @param {any} value Cache value
   * @param {number} seconds Cache seconds
   * @param {CacheScope} scope Cache scope
   */
  public set(key: CacheKey, value: any, seconds: number = 60, scope: CacheScope = this.scope) {
    return new Promise((resolve) => {
      const scopedCacheKey = this._getScopedCacheKey(key, scope)
      log(`Setting value for key ${scopedCacheKey} with a expiration of ${seconds} seconds...`)
      Redis.setex(
        scopedCacheKey,
        seconds,
        JSON.stringify(value),
        (err, reply) => {
          if (err) {
            log(`Failed to set value for key ${scopedCacheKey}.`)
            resolve(err)
          }
          else {
            log(`Value for key ${scopedCacheKey} set with a expiration of ${seconds} seconds.`)
            resolve(reply)
          }
        })
    })
  }

  /**
   * Clear cache for the specified key and scope
   *
   * @param {string} key Cache key
   * @param {CacheScope} scope Cache scope
   */
  public clear(key: string, scope?: CacheScope) {
    const pattern = `${this._getScopedCacheKey(key, scope)}*`
    return new Promise((resolve) => {
      Redis.keys(pattern, (_err, keys) => {
        Redis.del(keys, () => {
          resolve(null)
        })
      })
    })
  }
}
