import { useCallback, useEffect, useRef, useState } from 'react'
import { OutboxEntry, OutboxFlushResult } from './types'

const OUTBOX_STORAGE_KEY = 'did_outbox'
const MAX_RETRIES = 3

/**
 * Generates a unique operation ID
 *
 * @returns A unique string ID
 */
export function generateOpId(): string {
  // Use crypto.randomUUID if available, otherwise fallback to timestamp + random
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

/**
 * Load outbox from localStorage
 */
function loadOutbox(): OutboxEntry[] {
  try {
    const data = localStorage.getItem(OUTBOX_STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

/**
 * Save outbox to localStorage
 */
function saveOutbox(entries: OutboxEntry[]): void {
  try {
    localStorage.setItem(OUTBOX_STORAGE_KEY, JSON.stringify(entries))
  } catch {
    // Storage quota exceeded or other error - log but don't throw
  }
}

/**
 * Hook for managing offline mutation queue with idempotency support
 *
 * @param onFlush - Callback to execute each mutation during flush
 *
 * @returns Outbox state and operations
 *
 * @category React Hook
 */
export function useOutbox(
  onFlush?: (
    entry: OutboxEntry
  ) => Promise<{ success: boolean; duplicate?: boolean; error?: string }>
) {
  const [entries, setEntries] = useState<OutboxEntry[]>(loadOutbox)
  const [isFlushing, setIsFlushing] = useState(false)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const flushingRef = useRef(false)

  // Persist changes to localStorage
  useEffect(() => {
    saveOutbox(entries)
  }, [entries])

  // Online/offline detection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  /**
   * Add a mutation to the outbox queue
   *
   * @param operationType - Name of the mutation
   * @param variables - Mutation variables
   * @param opId - Optional operation ID (will be generated if not provided)
   *
   * @returns The operation ID
   */
  const add = useCallback(
    (
      operationType: string,
      variables: Record<string, unknown>,
      opId?: string
    ): string => {
      const id = opId ?? generateOpId()
      const entry: OutboxEntry = {
        opId: id,
        operationType,
        variables,
        createdAt: Date.now(),
        retryCount: 0
      }
      setEntries((prev) => [...prev, entry])
      return id
    },
    []
  )

  /**
   * Remove an entry from the outbox
   */
  const remove = useCallback((opId: string) => {
    setEntries((prev) => prev.filter((e) => e.opId !== opId))
  }, [])

  /**
   * Clear all entries from the outbox
   */
  const clear = useCallback(() => {
    setEntries([])
  }, [])

  /**
   * Flush all pending mutations
   *
   * @returns Flush result with success, duplicates, and failures
   */
  const flush = useCallback(async (): Promise<OutboxFlushResult | null> => {
    if (!onFlush || entries.length === 0 || flushingRef.current) {
      return null
    }

    flushingRef.current = true
    setIsFlushing(true)

    const result: OutboxFlushResult = {
      success: [],
      duplicates: [],
      failed: []
    }

    const remainingEntries: OutboxEntry[] = []

    for (const entry of entries) {
      try {
        const response = await onFlush(entry)

        if (response.success) {
          if (response.duplicate) {
            result.duplicates.push(entry.opId)
          } else {
            result.success.push(entry.opId)
          }
          // Either way, operation is complete - don't re-add to queue
        } else {
          // Failed - maybe retry
          const updatedEntry = {
            ...entry,
            retryCount: entry.retryCount + 1,
            lastError: response.error
          }

          if (updatedEntry.retryCount < MAX_RETRIES) {
            remainingEntries.push(updatedEntry)
          } else {
            result.failed.push({
              opId: entry.opId,
              error: response.error ?? 'Max retries exceeded'
            })
          }
        }
      } catch (error) {
        // Network or unexpected error
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error'
        const updatedEntry = {
          ...entry,
          retryCount: entry.retryCount + 1,
          lastError: errorMessage
        }

        if (updatedEntry.retryCount < MAX_RETRIES) {
          remainingEntries.push(updatedEntry)
        } else {
          result.failed.push({
            opId: entry.opId,
            error: errorMessage
          })
        }
      }
    }

    const processedOpIds = new Set(entries.map((entry) => entry.opId))
    setEntries((currentEntries) => {
      const entriesAddedDuringFlush = currentEntries.filter(
        (entry) => !processedOpIds.has(entry.opId)
      )
      return [...remainingEntries, ...entriesAddedDuringFlush]
    })
    setIsFlushing(false)
    flushingRef.current = false

    return result
  }, [entries, onFlush])

  // Auto-flush when coming online
  useEffect(() => {
    if (isOnline && entries.length > 0 && onFlush && !flushingRef.current) {
      flush()
    }
  }, [isOnline, entries.length, onFlush, flush])

  return {
    /**
     * Current outbox entries
     */
    entries,

    /**
     * Number of pending entries
     */
    pendingCount: entries.length,

    /**
     * Whether currently flushing
     */
    isFlushing,

    /**
     * Whether browser is online
     */
    isOnline,

    /**
     * Add a mutation to the queue
     */
    add,

    /**
     * Remove an entry
     */
    remove,

    /**
     * Clear all entries
     */
    clear,

    /**
     * Manually trigger flush
     */
    flush,

    /**
     * Generate an operation ID
     */
    generateOpId
  }
}
