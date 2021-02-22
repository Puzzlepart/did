/* eslint-disable max-classes-per-file */
import 'reflect-metadata'
import { Inject, Service } from 'typedi'
import { Context } from '../graphql/context'
import Redis from '../middleware/redis'

@Service({ global: false })
export class CacheService {
    public prefix: string;

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
     */
    private _getCacheKey(key: string) {
        return [
            this.prefix,
            key,
            this.context.subscription.id
        ]
            .join(':')
            .replace(/\-/g, '')
            .toLowerCase()
    }

    /**
     * Get from cache by key
     *
     * @param {string} key Cache key
     */
    public get<T = any>(key: string): Promise<T> {
        return new Promise((resolve) => {
            Redis.get(this._getCacheKey(key), (err, reply) => {
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
     */
    public set(key: string, value: any, seconds: number = 60) {
        return new Promise((resolve) => {
            Redis.setex(this._getCacheKey(key), seconds, JSON.stringify(value), resolve)
        })
    }
}