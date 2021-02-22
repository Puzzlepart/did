/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { Context } from '../graphql/context'
import Redis from '../middleware/redis'

export enum CacheScope {
    USER,
    SUBSCRIPTION
}

@Service({ global: false })
export class CacheService {
    public prefix: string;
    public scope = CacheScope.SUBSCRIPTION

    /**
     * Constructor
     *
     * @param {Context} context Context
     */
    constructor(@Inject('CONTEXT') private readonly context: Context) {}

    /**
     * Get cache key
     *
     * @param {string} key Cache key
     * @param {CacheScope} scope Cache scope
     */
    private _getCacheKey(key: string, scope: CacheScope = this.scope) {
        return [
            this.prefix,
            key,
            scope === CacheScope.SUBSCRIPTION
                ? this.context.subscription.id
                : this.context.userId
        ]
            .join(':')
            .replace(/\-/g, '')
            .toLowerCase()
    }

    /**
     * Get from cache by key
     *
     * @param {string} key Cache key
     * @param {CacheScope} scope Cache scope
     */
    public get<T = any>(key: string, scope: CacheScope = this.scope): Promise<T> {
        return new Promise((resolve) => {
            Redis.get(this._getCacheKey(key, scope), (err, reply) => {
                if (err) resolve(null)
                else resolve(JSON.parse(reply) as T)
            })
        })
    }

    /**
     * Get from cache by key
     *
     * @param {string} key Cache key
     * @param {any} value Cache value
     * @param {number} seconds Cache seconds
     * @param {CacheScope} scope Cache scope
     */
    public set(key: string, value: any, seconds: number = 60, scope: CacheScope = this.scope) {
        return new Promise((resolve) => {
            Redis.setex(this._getCacheKey(key, scope), seconds, JSON.stringify(value), resolve)
        })
    }
}