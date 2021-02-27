import { IPnPClientStore, PnPClientStorage } from '@pnp/common'
import { DateObject } from 'DateUtils'
import AppConfig from 'AppConfig'

export class BrowserStorage<T = any> {
  private _key: string
  private _store: IPnPClientStore
  private _defaultExpire = new DateObject().add(
    AppConfig.BROWSER_STORAGE_DEFAULT_EXPIRE
  ).jsDate

  constructor(key: string, store: 'local' | 'session') {
    this._key = `${AppConfig.BROWSER_STORAGE_KEY_PREFIX}_${key}`
    this._store = new PnPClientStorage()[store]
  }

  /**
   * Get value
   *
   * @param {T} fallback Fallback value
   */
  public get(fallback: T = null): T {
    return this._store.get(this._key) || fallback
  }

  /**
   * Set value
   *
   * @param {T} value New value
   */
  public set(value: T): void {
    this._store.put(this._key, value, this._defaultExpire)
  }

  /**
   * Merge value
   *
   * @param {T} value New value
   */
  public merge(value: T): void {
    const currentValue = this.get()
    this._store.put(
      this._key,
      { ...currentValue, ...value },
      this._defaultExpire
    )
  }
}
