/**
 * @internal
 */
declare namespace Express {
  /**
   * Subscription shape stored in the session. Kept whole for tenant routing
   * (`subscription.db`) and per-request settings access.
   *
   * @internal
   */
  interface UserSubscription {
    id: string
    name: string
    db?: string
    settings?: Record<string, unknown>
  }

  /**
   * Minimal user shape written to the Redis-backed session store.
   * Only fields actually consumed during request handling are included.
   * Profile fields (givenName, surname, jobTitle, mobilePhone,
   * preferredLanguage, displayName) are intentionally excluded - they
   * are never read from `request.user` at runtime.
   *
   * @internal
   */
  interface User {
    id?: string
    mail?: string
    provider?: string
    role?: { name?: string; permissions?: string[] }
    subscription?: UserSubscription
    configuration?: string | Record<string, unknown>
    tokenParams?: Record<string, unknown>
  }
}
