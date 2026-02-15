/**
 * Represents a pending mutation in the outbox
 */
export interface OutboxEntry {
  /**
   * Unique operation ID for idempotency
   */
  opId: string

  /**
   * Name of the mutation (e.g., 'submitPeriod', 'unsubmitPeriod')
   */
  operationType: string

  /**
   * Input variables for the mutation
   */
  variables: Record<string, unknown>

  /**
   * Timestamp when the entry was added
   */
  createdAt: number

  /**
   * Number of retry attempts
   */
  retryCount: number

  /**
   * Last error message if any
   */
  lastError?: string
}

/**
 * Outbox flush result
 */
export interface OutboxFlushResult {
  /**
   * Successfully processed entries
   */
  success: string[]

  /**
   * Entries that were duplicates (already processed server-side)
   */
  duplicates: string[]

  /**
   * Entries that failed
   */
  failed: { opId: string; error: string }[]
}
