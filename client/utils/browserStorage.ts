import { IPnPClientStore, PnPClientStorage } from '@pnp/common'
import { DateObject } from './date'

export class BrowserStorage<T = any> {
    private _key: string
    private _store: IPnPClientStore
    private _defaultExpire = new DateObject().add('2month').jsDate

    constructor(key: string, store: 'local' | 'session') {
        this._key = `did_${key}`
        this._store = new PnPClientStorage()[store]
    }

    public get(fallback = null): T {
        return this._store.get(this._key) || fallback
    }

    public set(value: T): void {
        this._store.put(
            this._key,
            value,
            this._defaultExpire
        )
    }
}