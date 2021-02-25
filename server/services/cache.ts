/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { filter, isArray } from 'underscore'
import { Context } from '../graphql/context'
import Redis from '../middleware/redis'

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
    key = isArray(key) ? filter(key, k => !!k) : [key]
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
   * @param {sCacheKey} key Cache key
   * @param {CacheScope} scope Cache scope
   */
  public get<T = any>(key: CacheKey, scope: CacheScope = this.scope): Promise<T> {
    return new Promise((resolve) => {
      Redis.get(this._getScopedCacheKey(key, scope), (err, reply) => {
        if (err) resolve(null)
        else resolve(JSON.parse(reply) as T)
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
      Redis.setex(this._getScopedCacheKey(key, scope), seconds, JSON.stringify(value), resolve)
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
